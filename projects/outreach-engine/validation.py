"""Small, fail-closed validator for the JSON Schema subset used by this project."""
import datetime as dt
import ipaddress
import json
import re
import unicodedata
from pathlib import Path
from urllib.parse import urlsplit, urlunsplit

ROOT = Path(__file__).resolve().parent
MAX_BYTES = 2_000_000


class Invalid(ValueError):
    pass


def require(condition, message):
    if not condition:
        raise Invalid(message)


def utcnow():
    return dt.datetime.now(dt.timezone.utc).replace(microsecond=0).isoformat().replace('+00:00', 'Z')


def timestamp(value):
    require(isinstance(value, str) and re.fullmatch(r'\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z', value), 'Expected UTC timestamp YYYY-MM-DDTHH:MM:SSZ')
    try:
        parsed = dt.datetime.strptime(value, '%Y-%m-%dT%H:%M:%SZ').replace(tzinfo=dt.timezone.utc)
    except ValueError as exc:
        raise Invalid('Invalid calendar timestamp') from exc
    require(parsed <= dt.datetime.now(dt.timezone.utc) + dt.timedelta(minutes=5), 'Future observations are not evidence')
    return parsed


def safe_url(value):
    """Metadata-only URL filter. No DNS resolution or fetching is performed."""
    require(isinstance(value, str) and len(value) <= 2000, 'Invalid URL')
    require(not any(c.isspace() or unicodedata.category(c).startswith('C') for c in value), 'URL contains whitespace/control characters')
    require('://' in value and '\\' not in value, 'Unsafe URL authority')
    require('%' not in value.split('/', 3)[2], 'Encoded URL authority is not accepted')
    try:
        parsed = urlsplit(value)
        host = parsed.hostname
        port = parsed.port
    except ValueError as exc:
        raise Invalid('Invalid URL') from exc
    require(parsed.scheme == 'https' and host and not parsed.username and not parsed.password, 'Only HTTPS URLs without credentials are accepted')
    require(port in (None, 443) and not parsed.fragment, 'Nonstandard ports and fragments are not accepted')
    host = host.lower().rstrip('.')
    require(host.isascii() and len(host) <= 253 and '.' in host, 'Use an ASCII public hostname')
    require(all(re.fullmatch(r'[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?', label) for label in host.split('.')), 'Invalid hostname')
    require(not host.endswith(('.localhost', '.local', '.internal', '.test', '.invalid')), 'Local/private hostname is not permitted')
    try:
        ipaddress.ip_address(host)
    except ValueError:
        pass
    else:
        raise Invalid('IP-literal URLs are not permitted')
    require(not all(re.fullmatch(r'(?:0x[0-9a-f]+|[0-9]+)', label) for label in host.split('.')), 'Numeric host is not permitted')
    return urlunsplit(('https', host, parsed.path or '/', parsed.query, ''))


def domain(value):
    host = urlsplit(safe_url(value)).hostname
    return host[4:] if host.startswith('www.') else host


def normalized_name(value):
    return ' '.join(unicodedata.normalize('NFKC', value).casefold().split())


def load_json(path):
    file = Path(path)
    require(file.is_file() and file.stat().st_size <= MAX_BYTES, 'Input missing or exceeds 2 MB')
    def pairs(items):
        result = {}
        for key, value in items:
            require(key not in result, 'Duplicate JSON key')
            result[key] = value
        return result
    try:
        return json.loads(file.read_text(encoding='utf-8'), object_pairs_hook=pairs,
                          parse_constant=lambda _: (_ for _ in ()).throw(Invalid('Non-finite JSON number')))
    except (ValueError, RecursionError, UnicodeError) as exc:
        raise Invalid('Invalid JSON input: ' + type(exc).__name__) from exc


SCHEMA = load_json(ROOT / 'schema.json') if (ROOT / 'schema.json').exists() else None


def validate(value, kind):
    """Validate the checked-in schema, then project-specific evidence invariants."""
    def visit(data, schema, location):
        if '$ref' in schema:
            require(schema['$ref'].startswith('#/$defs/'), 'External schema references disabled')
            return visit(data, SCHEMA['$defs'][schema['$ref'].split('/')[-1]], location)
        known = {'type', 'properties', 'required', 'additionalProperties', 'items', 'minItems', 'maxItems', 'enum', 'const', 'minLength', 'maxLength', 'minimum', 'maximum', 'pattern', 'format', 'description', 'uniqueItems'}
        require(set(schema) <= known, 'Unsupported schema keyword')
        types = schema.get('type', [])
        types = [types] if isinstance(types, str) else types
        matches = {'object': isinstance(data, dict), 'array': isinstance(data, list), 'string': isinstance(data, str),
                   'integer': type(data) is int, 'number': type(data) in (int, float), 'boolean': type(data) is bool, 'null': data is None}
        require(not types or any(matches[t] for t in types), location + ': wrong type')
        if 'const' in schema:
            require(type(data) is type(schema['const']) and data == schema['const'], location + ': wrong constant')
        if 'enum' in schema:
            require(data in schema['enum'], location + ': unsupported value')
        if isinstance(data, dict):
            require(set(schema.get('required', [])) <= set(data), location + ': missing fields')
            if schema.get('additionalProperties') is False:
                require(set(data) <= set(schema.get('properties', {})), location + ': unknown fields')
            for key, item in data.items():
                if key in schema.get('properties', {}):
                    visit(item, schema['properties'][key], location + '.' + key)
        if isinstance(data, list):
            require(schema.get('minItems', 0) <= len(data) <= schema.get('maxItems', 1000), location + ': invalid item count')
            if schema.get('uniqueItems'):
                require(len({json.dumps(x, sort_keys=True) for x in data}) == len(data), location + ': duplicate items')
            for item in data:
                visit(item, schema['items'], location + '[]')
        if isinstance(data, str):
            require(schema.get('minLength', 0) <= len(data) <= schema.get('maxLength', 4000), location + ': invalid text length')
            require(not any(unicodedata.category(c).startswith('C') for c in data), location + ': control/format characters are not accepted')
            require(not data or data.strip(), location + ': blank text')
            if 'pattern' in schema:
                require(re.search(schema['pattern'], data), location + ': invalid format')
            if schema.get('format') == 'uri':
                safe_url(data)
            elif schema.get('format') == 'date-time':
                timestamp(data)
            elif schema.get('format') == 'date':
                try:
                    parsed = dt.date.fromisoformat(data)
                except ValueError as exc:
                    raise Invalid(location + ': invalid calendar date') from exc
                require(parsed <= dt.datetime.now(dt.timezone.utc).date(), location + ': future registration date')
        if type(data) in (int, float):
            require(schema.get('minimum', float('-inf')) <= data <= schema.get('maximum', float('inf')), location + ': out of range')
    visit(value, SCHEMA['$defs'][kind], kind)
    if kind == 'icp':
        from profiles import get_profile
        profile = get_profile(value)
        require(not profile.requires_catalog or type(value['catalog_min_products']) is int,
                'Catalog profile requires a numeric catalog_min_products')
    if kind == 'candidate':
        host = domain(value['website'])
        require(value['synthetic'] == host.endswith('.example'), 'Synthetic candidates must use .example; real candidates cannot')
        require(value['synthetic'] == (value['source']['usage_rights'] == 'synthetic'), 'Synthetic source classification mismatch')
        source = urlsplit(value['source']['url'])
        require(source.hostname not in ('maps.googleapis.com', 'maps.google.com', 'maps.app.goo.gl') and not (source.hostname in ('google.com', 'www.google.com') and source.path.startswith('/maps')), 'Google Maps is not an approved prospect import source')
    if kind == 'contact':
        if value['kind'] == 'phone':
            require(re.fullmatch(r'\+[1-9]\d{6,14}', value['value']), 'Phone must be explicit E.164; never infer country code')
        else:
            require(re.fullmatch(r'[^\s@]+@[^\s@]+\.[^\s@]+', value['value']), 'Invalid email')
        if value['verification'] != 'not_checked':
            require(value['verification_source'] and value['verified_at'], 'Verification needs its provenance and checked time')
    if kind == 'brief':
        if value['build_status'] == 'built':
            require(value['artifact_ref'] and value['verified_at'] and value['verification_notes'], 'Built requires a verified artifact and test evidence')
        if value['seo_status'] == 'reviewed':
            require(value['seo_reference'], 'Reviewed SEO needs report reference')
    if kind == 'registry_seed':
        require(value['synthetic'] == (value['source']['usage_rights'] == 'synthetic'), 'Registry synthetic classification mismatch')
        if value['synthetic']:
            require(domain(value['source']['url']).endswith('.example'), 'Synthetic registry source must use .example')
        if value['website']:
            require(value['synthetic'] == domain(value['website']).endswith('.example'), 'Registry website classification mismatch')
    if kind == 'usage_event':
        require((value['amount'] is None) == (value['currency'] is None), 'Unknown amount and currency must both be null')
        require(value['cost_basis'] != 'unknown' or value['amount'] is None, 'Unknown costs cannot be reported as zero')
    return value
