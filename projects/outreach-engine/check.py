#!/usr/bin/env python3
"""Offline syntax, schema/fixture, link and capability-boundary checks."""
import ast
from pathlib import Path
import re

from validation import ROOT, domain, load_json, require, validate


def main():
    runtime = ['engine.py', 'validation.py', 'demo.py', 'profiles.py']
    forbidden = ('socket', 'requests', 'http', 'urllib.request', 'subprocess', 'webbrowser', 'pickle')
    for file in runtime:
        tree = ast.parse((ROOT / file).read_text(), filename=file)
        for node in ast.walk(tree):
            imports = [n.name for n in node.names] if isinstance(node, ast.Import) else ([node.module or ''] if isinstance(node, ast.ImportFrom) else [])
            require(not any(name == denied or name.startswith(denied + '.') for name in imports for denied in forbidden), file + ': external execution/network capability added')
            if isinstance(node, ast.Call) and isinstance(node.func, ast.Name):
                require(node.func.id not in ('eval', 'exec', '__import__'), file + ': dynamic execution added')
    count = 0
    for path in sorted((ROOT / 'fixtures').rglob('*.example.json')):
        data = load_json(path)
        if path.name == 'candidates.example.json': kind, rows = 'candidate', data
        elif path.name == 'evidence.example.json': kind, rows = 'evidence', data
        elif path.name == 'registry-seeds.example.json': kind, rows = 'registry_seed', data
        elif path.name == 'usage-event.example.json': kind, rows = 'usage_event', [data]
        elif path.stem.split('.')[0] in ('icp', 'contact', 'brief', 'outcome'): kind, rows = path.stem.split('.')[0], [data]
        else: kind, rows = 'evidence', [data]
        for row in rows:
            validate(row, kind)
            if kind in ('candidate', 'registry_seed'):
                require(row['synthetic'], 'Public fixture must be synthetic')
                require(domain(row['source']['url']).endswith('.example'), 'Public fixture source must be .example')
            elif kind == 'evidence':
                require(domain(row['source_url']).endswith('.example'), 'Public evidence fixture must be .example')
            count += 1
    for path in [ROOT / 'README.md', *(ROOT / 'docs').glob('*.md')]:
        for target in re.findall(r'\]\(([^)]+)\)', path.read_text()):
            if not target.startswith(('https://', '#')):
                require((path.parent / target.split('#')[0]).is_file(), 'Broken local documentation link: ' + target)
    require('.local/' in (ROOT / '.gitignore').read_text(), 'Private-state ignore rule missing')
    print('PASS: syntax/capability boundary, ' + str(count) + ' schema-validated fixture records, local documentation links, private-state ignore rule')


if __name__ == '__main__':
    main()
