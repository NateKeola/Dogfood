import csv
import datetime as dt
import io
import json
from pathlib import Path
import socket
import tempfile
import unittest
from unittest.mock import patch

from engine import Engine, GATES, candidate_id, csv_cell, human_confirmation, read_candidates
from demo import seed_demo
from validation import ROOT, Invalid, domain, load_json, safe_url, utcnow, validate


def fixture(name):
    return load_json(ROOT / 'fixtures' / name)


def recent(minutes=0):
    return (dt.datetime.now(dt.timezone.utc) - dt.timedelta(minutes=minutes)).replace(microsecond=0).isoformat().replace('+00:00', 'Z')


class EngineTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.folder = Path(self.temp.name) / 'job'
        self.engine = Engine(self.folder)
        self.config = fixture('icp.example.json')
        self.engine.init(self.config)
        self.row = fixture('candidates.example.json')[0]
        self.row['source']['checked_at'] = recent(10)
        self.cid = candidate_id(self.row)

    def tearDown(self):
        self.engine.close()
        self.temp.cleanup()

    def import_one(self):
        self.engine.import_rows([self.row])

    def evidence(self):
        records = fixture('evidence.example.json')
        for i, item in enumerate(records):
            item['checked_at'] = recent(8 - i)
            self.engine.add_record(self.cid, 'evidence', item)
        return [x['id'] for x in records]

    def complete_inputs(self):
        self.import_one()
        refs = self.evidence()
        contact = fixture('contact.example.json')
        contact['checked_at'] = recent(1)
        self.engine.add_record(self.cid, 'contact', contact)
        self.engine.add_record(self.cid, 'brief', fixture('brief.example.json'))
        return refs

    def approve(self, gate, refs=(), contacts=(), **kwargs):
        return self.engine.review(self.cid, gate, 'approve', 'Test reviewer', 'Explicit synthetic test rationale; not a real business review.', refs, contacts, **kwargs)

    def ready(self):
        refs = self.complete_inputs()
        for gate in GATES:
            self.approve(gate, refs, ['mainline-1'])
        return refs

    def test_demo_and_real_counts_are_separate(self):
        result = seed_demo(self.engine)
        summary = result['summary']
        self.assertEqual((summary['candidates'], summary['synthetic_candidates'], summary['real_candidates'], summary['demo_ready'], summary['real_call_ready']), (5, 5, 0, 1, 0))
        self.assertEqual(result['import']['duplicates'], 1)

    def test_canonical_duplicates_and_resume_are_idempotent(self):
        self.import_one()
        other = dict(self.row, website='https://www.atlas-parts.example/catalog?ref=1')
        self.assertEqual(self.engine.import_rows([other])['duplicates'], 1)
        self.assertEqual(self.engine.candidate(self.cid)['revision'], 1)
        self.assertEqual(self.engine.run()['processed'], 1)
        self.engine.close()
        self.engine = Engine(self.folder)
        self.assertEqual(self.engine.run()['processed'], 0)

    def test_names_and_branches_are_not_collapsed(self):
        self.engine.import_rows([self.row, dict(self.row, branch_key='east'), dict(self.row, website='https://another.example/')])
        self.assertEqual(len(self.engine.ids()), 3)

    def test_domain_identity_collision_blocks_without_acknowledgement(self):
        self.engine.import_rows([self.row, dict(self.row, name='Unrelated fixture')])
        refs = self.evidence()
        with self.assertRaisesRegex(Invalid, 'identity_conflict'):
            self.approve('identity', refs)
        self.approve('identity', refs, acknowledge_conflicts=True)
        self.assertEqual(len(self.engine.ids()), 2)

    def test_changed_import_is_retained_without_overwrite_or_repeat(self):
        self.import_one()
        changed = dict(self.row, catalog_size=2)
        self.assertEqual(self.engine.import_rows([changed])['changed_input_conflicts'], 1)
        revision = self.engine.candidate(self.cid)['revision']
        self.assertEqual(self.engine.import_rows([changed])['changed_input_conflicts'], 0)
        self.assertEqual(self.engine.candidate(self.cid)['revision'], revision)
        self.assertEqual(self.engine.candidate(self.cid)['data']['catalog_size'], 480)

    def test_import_is_atomic_and_bounded(self):
        invalid = dict(self.row, synthetic='true')
        with self.assertRaises(Invalid):
            self.engine.import_rows([self.row, invalid])
        self.assertEqual(self.engine.ids(), [])
        rows = [dict(self.row, branch_key='branch-' + str(i)) for i in range(101)]
        with self.assertRaisesRegex(Invalid, 'Batch limit'):
            self.engine.import_rows(rows)
        self.assertEqual(self.engine.ids(), [])

    def test_csv_and_json_imports_have_same_shape(self):
        self.assertEqual(read_candidates(ROOT / 'fixtures/candidates.example.csv'), read_candidates(ROOT / 'fixtures/candidates.example.json'))

    def test_schema_cannot_import_approvals_or_unknown_fields(self):
        with self.assertRaisesRegex(Invalid, 'unknown fields'):
            self.engine.import_rows([dict(self.row, call_ready=True)])
        bad = fixture('access-1.example.json')
        bad['kind'] = 'no-chatbot'
        with self.assertRaises(Invalid):
            validate(bad, 'evidence')

    def test_unsafe_urls_and_maps_seed_rejected(self):
        urls = ['javascript:alert(1)', 'http://company.example', 'https://u:p@company.example/', 'https://127.0.0.1/', 'https://[::1]/', 'https://foo.local/', 'https://company.example:9000/', 'https://company.example\\@evil.example/', 'https://company.example/\n', 'https://0x7f.0.0.1/', 'https://company.example/#x', 'https://%65vil.example/']
        for url in urls:
            with self.subTest(url=url), self.assertRaises(Invalid):
                safe_url(url)
        self.assertEqual(domain('https://WWW.atlas-parts.example/a?q=x'), 'atlas-parts.example')
        data = json.loads(json.dumps(self.row))
        data['source']['url'] = 'https://www.google.com/maps/place/fixture'
        with self.assertRaisesRegex(Invalid, 'Google Maps'):
            validate(data, 'candidate')

    def test_future_date_and_duplicate_json_keys_rejected(self):
        data = fixture('access-1.example.json')
        data['checked_at'] = '2099-01-01T00:00:00Z'
        with self.assertRaises(Invalid):
            validate(data, 'evidence')
        file = Path(self.temp.name) / 'duplicate.json'
        file.write_text('{"x":1,"x":2}')
        with self.assertRaises(Invalid):
            load_json(file)

    def test_missing_contact_blocks_final_gate(self):
        self.import_one()
        refs = self.evidence()
        self.approve('identity', refs)
        with self.assertRaisesRegex(Invalid, 'business_phone'):
            self.approve('contact')
        with self.assertRaisesRegex(Invalid, 'approval_missing'):
            self.approve('call-ready')
        self.assertEqual(self.engine.summary()['demo_ready'], 0)

    def test_pain_requires_control_and_repeated_observation(self):
        self.import_one()
        refs = self.evidence()
        with self.assertRaisesRegex(Invalid, 'known_product_control'):
            self.approve('pain', ['friction-1', 'friction-2'])
        with self.assertRaisesRegex(Invalid, 'two_distinct_times'):
            self.approve('pain', ['control-1', 'friction-1'])
        self.approve('pain', refs)

    def test_blocked_access_is_unknown_not_a_qualified_failure(self):
        refs = self.complete_inputs()
        item = fixture('access-1.example.json')
        item.update(id='later-blocked', checked_at=utcnow(), result='blocked')
        self.engine.add_record(self.cid, 'evidence', item)
        with self.assertRaisesRegex(Invalid, 'latest_access_unknown'):
            self.approve('identity', refs + ['later-blocked'])
        self.assertNotIn('no semantic search', json.dumps(self.engine.status(self.cid)))

    def test_conflicting_evidence_requires_acknowledgement(self):
        refs = self.complete_inputs()
        item = fixture('friction-1.example.json')
        item.update(id='later-pass', result='pass', checked_at=utcnow())
        self.engine.add_record(self.cid, 'evidence', item)
        with self.assertRaisesRegex(Invalid, 'conflicting_evidence'):
            self.approve('pain', refs)
        self.approve('pain', refs + ['later-pass'], acknowledge_conflicts=True)

    def test_new_evidence_invalidates_approvals(self):
        self.ready()
        item = fixture('access-1.example.json')
        item.update(id='access-new', checked_at=utcnow())
        self.engine.add_record(self.cid, 'evidence', item)
        self.assertEqual(self.engine.status(self.cid)['gates']['identity']['decision'], 'pending')
        self.assertEqual(self.engine.summary()['demo_ready'], 0)

    def test_gate_change_invalidates_final_approval(self):
        self.ready()
        self.engine.review(self.cid, 'pain', 'hold', 'Test', 'Need additional reproducibility evidence.')
        self.assertIsNone(self.engine.review_row(self.cid, 'call-ready'))

    def test_stale_evidence_removes_readiness_at_read_and_export_time(self):
        self.ready()
        with patch.object(self.engine, 'fresh', return_value=False):
            self.assertEqual(self.engine.summary()['demo_ready'], 0)
            path = self.engine.export('ready', include_demo=True)['path']
            with open(path) as handle:
                self.assertEqual(len(list(csv.reader(handle))), 1)

    def test_record_cannot_change_after_confirmation(self):
        refs = self.complete_inputs()
        revision = self.engine.candidate(self.cid)['revision']
        self.engine.add_record(self.cid, 'brief', dict(fixture('brief.example.json'), title='Revised demo plan'))
        with self.assertRaisesRegex(Invalid, 'changed after review'):
            self.approve('identity', refs, expected_revision=revision)

    def test_piped_review_is_rejected(self):
        self.import_one()
        with patch('sys.stdin', io.StringIO('CONFIRM anything')):
            with self.assertRaisesRegex(Invalid, 'interactive terminal'):
                human_confirmation(self.engine, self.cid, 'identity:approve')

    def test_built_claim_requires_artifact_and_verification(self):
        self.import_one()
        brief = fixture('brief.example.json')
        brief['build_status'] = 'built'
        with self.assertRaisesRegex(Invalid, 'verified artifact'):
            self.engine.add_record(self.cid, 'brief', brief)

    def test_contact_provenance_and_phone_format_are_enforced(self):
        self.import_one()
        contact = fixture('contact.example.json')
        with self.assertRaisesRegex(Invalid, 'E.164'):
            self.engine.add_record(self.cid, 'contact', dict(contact, value='202-555-0100'))
        with self.assertRaisesRegex(Invalid, 'source'):
            self.engine.add_record(self.cid, 'contact', dict(contact, source_url='https://different.example/'))
        with self.assertRaisesRegex(Invalid, 'provenance'):
            self.engine.add_record(self.cid, 'contact', dict(contact, verification='provider_valid'))

    def test_new_invalid_phone_result_cannot_be_ignored(self):
        refs = self.complete_inputs()
        invalid = fixture('contact.example.json')
        invalid.update(id='mainline-invalid', checked_at=utcnow(), verification='provider_invalid', verification_source='Synthetic provider result', verified_at=utcnow())
        self.engine.add_record(self.cid, 'contact', invalid)
        with self.assertRaisesRegex(Invalid, 'business_phone'):
            self.approve('contact', refs, ['mainline-1'])

    def test_pause_resume_and_changed_revision_tasks(self):
        self.import_one()
        self.engine.pause(True)
        self.assertEqual(self.engine.run()['processed'], 0)
        self.engine.pause(False)
        self.assertEqual(self.engine.run()['processed'], 1)
        self.evidence()
        self.assertEqual(self.engine.run()['processed'], 1)
        self.assertEqual(self.engine.run()['processed'], 0)

    def test_disabled_provider_never_calls_network_or_approves(self):
        self.import_one()
        with patch.object(socket, 'socket', side_effect=AssertionError('network forbidden')):
            result = self.engine.run('apollo')
        self.assertEqual(result['items'][0]['status'], 'provider_disabled')
        self.assertEqual(result['actual_provider_requests'], 0)
        self.assertEqual(self.engine.run('apollo')['processed'], 0)
        self.assertEqual(self.engine.run('manual')['processed'], 1)
        self.assertEqual(self.engine.status(self.cid)['gates']['identity']['decision'], 'pending')

    def test_retry_is_bounded_and_error_payload_redacted(self):
        self.import_one()
        with patch.object(self.engine, '_prepare', side_effect=RuntimeError('private-secret-payload')):
            first = self.engine.run()
            self.assertEqual(first['items'][0]['status'], 'retryable_error')
            self.assertNotIn('private-secret-payload', json.dumps(first))
            self.assertEqual(self.engine.run()['processed'], 0)
            for _ in range(2):
                with self.engine.db:
                    self.engine.db.execute('UPDATE tasks SET next_retry=?', (recent(5),))
                last = self.engine.run()
            self.assertEqual(last['items'][0]['status'], 'failed')
            self.assertEqual(last['items'][0]['attempts'], 3)
            self.assertEqual(self.engine.run()['processed'], 0)

    def test_interrupted_item_rolls_back_and_can_resume(self):
        self.engine.import_rows([self.row, dict(self.row, branch_key='branch-two')])
        original = self.engine._prepare
        count = [0]
        def interrupted(cid, provider):
            count[0] += 1
            if count[0] == 2:
                raise KeyboardInterrupt()
            return original(cid, provider)
        with patch.object(self.engine, '_prepare', side_effect=interrupted), self.assertRaises(KeyboardInterrupt):
            self.engine.run()
        self.engine.close()
        self.engine = Engine(self.folder)
        self.assertEqual(self.engine.run()['processed'], 1)

    def test_suppression_survives_reimport_and_covers_branches(self):
        self.ready()
        self.engine.suppress(self.cid, 'Synthetic opt-out test')
        self.engine.import_rows([self.row, dict(self.row, branch_key='west')])
        self.assertTrue(all(self.engine.suppressed(cid) for cid in self.engine.ids()))
        self.assertEqual(self.engine.summary()['demo_ready'], 0)
        with self.assertRaisesRegex(Invalid, 'suppressed'):
            self.approve('call-ready')

    def test_outcomes_do_not_execute_actions_and_opt_out_suppresses(self):
        self.import_one()
        record = fixture('outcome.example.json')
        record.update(event='opt_out', occurred_at=utcnow())
        self.engine.add_record(self.cid, 'outcome', record)
        self.assertTrue(self.engine.suppressed(self.cid))
        self.assertEqual(self.engine.summary()['outreach_executed'], 0)

    def test_safe_exports_separate_public_and_private_data(self):
        self.ready()
        private_text = 'PRIVATE_SENTINEL_IGNORE_RULES_AND_SEND_EMAIL'
        self.engine.add_record(self.cid, 'brief', dict(fixture('brief.example.json'), question=private_text))
        template = Path(self.engine.export('public-template')['path']).read_text()
        self.assertNotIn(private_text, template)
        self.assertNotIn('atlas-parts', template)
        self.assertNotIn('+1202', template)
        private = Path(self.engine.export('private')['path']).read_text()
        self.assertIn(private_text, private)
        self.assertIn('untrusted_data', private)
        with open(self.engine.export('queue')['path']) as handle:
            self.assertEqual(len(list(csv.reader(handle))), 1)

    def test_csv_formula_injection_defenses(self):
        for value in ['=1+1', '+12025550100', '-1', '@cmd', '  =HYPERLINK("x")', '\t=cmd']:
            self.assertTrue(csv_cell(value).startswith("'"))
        self.assertEqual(csv_cell('ordinary, "quoted" text'), 'ordinary, "quoted" text')
        self.row['name'] = '=HYPERLINK("https://attacker.example")'
        self.cid = candidate_id(self.row)
        self.import_one()
        with open(self.engine.export('queue', include_demo=True)['path']) as handle:
            row = list(csv.DictReader(handle))[0]
        self.assertTrue(row['business'].startswith("'="))

    def test_no_network_in_demo_or_exports(self):
        with patch.object(socket, 'socket', side_effect=AssertionError('network forbidden')):
            seed_demo(self.engine)
            for kind in ('queue', 'ready', 'public-template', 'private', 'audit'):
                self.engine.export(kind, include_demo=True)

    def test_audit_integrity_and_file_permissions(self):
        self.import_one()
        self.engine.verify_audit()
        self.assertEqual(self.engine.path.stat().st_mode & 0o777, 0o600)
        self.assertEqual(self.folder.stat().st_mode & 0o777, 0o700)
        with self.engine.db:
            self.engine.db.execute("UPDATE audit SET action='changed' WHERE seq=1")
        with self.assertRaisesRegex(Invalid, 'chain changed'):
            self.engine.verify_audit()

    def test_export_symlink_cannot_overwrite_other_file(self):
        self.import_one()
        directory = self.folder / 'exports'
        directory.mkdir()
        target = Path(self.temp.name) / 'keep.txt'
        target.write_text('keep')
        (directory / 'queue.csv').symlink_to(target)
        with self.assertRaisesRegex(Invalid, 'symlink'):
            self.engine.export('queue')
        self.assertEqual(target.read_text(), 'keep')

    def test_real_candidate_cannot_use_simulated_approval(self):
        row = json.loads(json.dumps(self.row))
        row.update(website='https://example.org/', synthetic=False)
        row['source'].update(url='https://example.org/', usage_rights='public_official', usage_notes='Reserved example domain for unit test; not a live prospect')
        self.engine.import_rows([row])
        cid = candidate_id(row)
        self.assertEqual(self.engine.summary()['real_candidates'], 1)
        with self.assertRaisesRegex(Invalid, 'Simulated reviews'):
            self.engine.review(cid, 'identity', 'hold', 'Test', 'Synthetic test of blocked simulation path.', simulation=True)

    def test_operations_evidence_is_required_beyond_registry_status(self):
        self.import_one()
        refs = self.evidence()
        with self.assertRaisesRegex(Invalid, 'operating_evidence'):
            self.approve('identity', [x for x in refs if x != 'operations-1'])

    def test_registry_unknown_website_stays_in_staging(self):
        rows = fixture('registry-seeds.example.json')
        result = self.engine.stage_registry(rows)
        self.assertEqual(result['added'], 1)
        self.assertFalse(result['seeds'][0]['website_absence_established'])
        self.assertEqual(self.engine.ids(), [])
        self.assertEqual(self.engine.stage_registry(rows)['duplicates'], 1)
        self.assertEqual(self.engine.summary()['registry_seeds'], 1)

    def test_registry_schema_rejects_home_addresses_and_approval_flags(self):
        row = fixture('registry-seeds.example.json')[0]
        for extra in ({'home_address': '123 Synthetic Home'}, {'call_ready': True}, {'owner_email': 'private@example.org'}):
            with self.assertRaisesRegex(Invalid, 'unknown fields'):
                self.engine.stage_registry([{**row, **extra}])
        self.assertEqual(self.engine.registry_summary(), [])

    def test_registry_promotion_preserves_unknowns_and_needs_independent_source(self):
        rows = fixture('registry-seeds.example.json')
        sid = self.engine.stage_registry(rows)['seeds'][0]['id']
        bad = json.loads(json.dumps(self.row))
        bad['source']['url'] = rows[0]['source']['url']
        with self.assertRaisesRegex(Invalid, 'independent official'):
            self.engine.promote_registry(sid, bad)
        result = self.engine.promote_registry(sid, self.row)
        self.assertFalse(result['qualified'])
        self.assertEqual(result['candidate_id'], self.cid)
        self.assertEqual(self.engine.status(self.cid)['state'], 'needs_review')
        self.assertEqual(self.engine.promote_registry(sid, self.row)['duplicates'], 1)
        self.assertEqual(len(self.engine.ids()), 1)

    def test_inactive_or_conflicting_registry_snapshot_cannot_promote(self):
        row = fixture('registry-seeds.example.json')[0]
        row['registration_status'] = 'inactive'
        sid = self.engine.stage_registry([row])['seeds'][0]['id']
        with self.assertRaisesRegex(Invalid, 'Inactive'):
            self.engine.promote_registry(sid, self.row)
        with self.assertRaisesRegex(Invalid, 'Conflicting registry snapshot'):
            self.engine.stage_registry([dict(row, registration_status='active')])

    def test_usage_events_are_idempotent_and_do_not_contain_prospect_text(self):
        self.import_one()
        self.engine.run()
        self.engine.run()
        events = self.engine.usage()
        self.assertEqual(len(events), 1)
        event = events[0]
        validate(event, 'usage_event')
        self.assertEqual((event['provider'], event['units'], event['unit'], event['amount']), ('manual', 1, 'candidate', 0))
        export = Path(self.engine.export('usage')['path']).read_text()
        self.assertNotIn('atlas', export)
        self.assertNotIn(self.cid, export)
        self.assertNotIn('source_url', export)
        with self.assertRaisesRegex(Invalid, 'unknown fields'):
            validate(dict(event, api_key='test-secret'), 'usage_event')

    def test_usage_unknown_cost_is_not_zero(self):
        event = fixture('usage-event.example.json')
        event.update(cost_basis='unknown', provenance='unknown')
        with self.assertRaisesRegex(Invalid, 'cannot be reported as zero'):
            validate(event, 'usage_event')
        event.update(amount=None, currency=None)
        validate(event, 'usage_event')

    def test_hundred_candidates_pause_and_resume_without_duplicate_usage(self):
        rows = [dict(self.row, branch_key='batch-' + str(i)) for i in range(100)]
        self.assertEqual(self.engine.import_rows(rows)['added'], 100)
        for i in range(10):
            self.assertEqual(self.engine.run(limit=10)['processed'], 10)
        self.assertEqual(self.engine.run()['processed'], 0)
        self.assertEqual(len(self.engine.usage()), 100)
        self.assertEqual(self.engine.summary()['incomplete_candidates'], 100)


if __name__ == '__main__':
    unittest.main()
