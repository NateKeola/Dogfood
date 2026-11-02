"""Trusted built-in audit profiles. Imported configuration selects an ID only."""
from dataclasses import asdict, dataclass
from types import MappingProxyType

from validation import require

DEFAULT_PROFILE = 'catalog-discovery-v1'
# Bump when shared gate semantics change; old approvals then require re-review.
REVIEW_POLICY_VERSION = 2


@dataclass(frozen=True)
class AuditProfile:
    id: str
    label: str
    control_kind: str
    control_blocker: str
    friction_kinds: tuple
    requires_catalog: bool
    task: str
    limits: str


PROFILES = MappingProxyType({
    DEFAULT_PROFILE: AuditProfile(
        DEFAULT_PROFILE, 'Wholesale / catalog product discovery',
        'search-control', 'needs_successful_known_product_control',
        ('search-descriptive', 'search-attribute', 'filtering', 'variant', 'guided'), True,
        'Find a known compatible product from a buyer application or attributes; first prove exact product/SKU lookup succeeds.',
        'A search miss does not establish absence of semantic search or demand for a replacement.'),
    'local-service-inquiry-v1': AuditProfile(
        'local-service-inquiry-v1', 'Local-service inquiry / quote preparation',
        'service-control', 'needs_successful_known_service_control',
        ('inquiry-route', 'quote-clarity', 'service-area', 'contact-navigation'), False,
        'Identify an explicitly offered service, then inspect whether a visitor can find its service area, inquiry route and quote prerequisites.',
        'Inspect public pages only: never submit a form, place a call or send a message. Missing public prices alone do not prove friction.'),
})
AUDIT_KINDS = tuple(dict.fromkeys(kind for p in PROFILES.values() for kind in (p.control_kind, *p.friction_kinds)))


def get_profile(config):
    profile_id = config.get('audit_profile', DEFAULT_PROFILE)
    require(isinstance(profile_id, str) and profile_id in PROFILES, 'Unknown built-in audit profile')
    return PROFILES[profile_id]


def profile_contract(config):
    return {'shared_policy_version': REVIEW_POLICY_VERSION, 'profile': asdict(get_profile(config))}


def profile_catalog():
    return [asdict(profile) for profile in PROFILES.values()]
