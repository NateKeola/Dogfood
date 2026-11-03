"""Deterministic fictional workflow; never reads, discovers or contacts a business."""
import datetime as dt

from engine import GATES, candidate_id
from profiles import DEFAULT_PROFILE, get_profile
from validation import ROOT, load_json, require


def seed_demo(engine, profile=DEFAULT_PROFILE):
    require(not engine.ids(), 'Demo requires an empty workspace; choose a new --workspace name')
    get_profile({'audit_profile': profile})
    fixtures = ROOT / 'fixtures' / ('local-service' if profile == 'local-service-inquiry-v1' else '')
    config = load_json(fixtures / 'icp.example.json')
    engine.init(config)
    now = dt.datetime.now(dt.timezone.utc).replace(microsecond=0)
    def recent(minutes=0):
        return (now - dt.timedelta(minutes=minutes)).isoformat().replace('+00:00', 'Z')
    rows = load_json(fixtures / 'candidates.example.json')
    for row in rows:
        row['source']['checked_at'] = recent(10)
    imported = engine.import_rows(rows)
    first = candidate_id(rows[0])
    evidence = load_json(fixtures / 'evidence.example.json')
    for index, item in enumerate(evidence):
        item['checked_at'] = recent(8 - index)
        engine.add_record(first, 'evidence', item)
    contact = load_json(fixtures / 'contact.example.json')
    contact['checked_at'] = recent(1)
    engine.add_record(first, 'contact', contact)
    engine.add_record(first, 'brief', load_json(fixtures / 'brief.example.json'))
    for gate in GATES:
        engine.review(first, gate, 'approve', 'DEMO SIMULATION', 'Synthetic walkthrough only; not a human approval for a real prospect.', [e['id'] for e in evidence], [contact['id']], simulation=True)
    second = rows[2] if profile == DEFAULT_PROFILE else rows[1]
    blocked = candidate_id(second)
    item = dict(evidence[1], id='access-blocked', result='blocked', observed='SYNTHETIC: login/CAPTCHA gate. Need remains unknown.', source_url=second['website'])
    if profile != DEFAULT_PROFILE:
        item.update(id='quote-unknown', kind='quote-clarity', test_key='quote-prerequisites', result='unknown',
                    expected='Determine the public quote preparation route without submitting anything',
                    observed='SYNTHETIC: available public information is inconclusive. No form was submitted; friction is unestablished.')
    engine.add_record(blocked, 'evidence', item)
    run = engine.run()
    return {'warning': 'All records and approvals are simulated. ZERO real leads, ZERO live audits, ZERO outreach.',
            'import': imported, 'run': run, 'summary': engine.summary()}
