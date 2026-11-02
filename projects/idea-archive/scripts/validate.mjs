import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { safeExternalUrl } from '../archive.js';

// Dependency-free validation of the JSON Schema keywords used by this project's schema.
export function validateSchema(value, schema, path = '$') {
  if (schema.anyOf) {
    const options = schema.anyOf.map(option => validateSchema(value, option, path));
    return options.some(errors => errors.length === 0) ? [] : [`${path}: no permitted shape matches`, ...options.flat()];
  }
  const errors = [];
  if (schema.const !== undefined && value !== schema.const) errors.push(`${path}: expected ${schema.const}`);
  if (schema.enum && !schema.enum.includes(value)) errors.push(`${path}: unsupported value`);
  const type = value === null ? 'null' : Array.isArray(value) ? 'array' : typeof value;
  if (schema.type && schema.type !== type) return [...errors, `${path}: expected ${schema.type}, got ${type}`];
  if (type === 'string') {
    if (schema.minLength && value.trim().length < schema.minLength) errors.push(`${path}: must not be blank`);
    if (schema.pattern && !new RegExp(schema.pattern).test(value)) errors.push(`${path}: invalid format`);
  }
  if (type === 'number' && schema.minimum !== undefined && value < schema.minimum) errors.push(`${path}: below minimum`);
  if (type === 'array') {
    if (schema.minItems && value.length < schema.minItems) errors.push(`${path}: needs at least ${schema.minItems} item(s)`);
    value.forEach((item, index) => errors.push(...validateSchema(item, schema.items, `${path}[${index}]`)));
  }
  if (type === 'object') {
    for (const key of schema.required || []) if (!(key in value)) errors.push(`${path}.${key}: required`);
    for (const [key, child] of Object.entries(value)) {
      if (schema.properties?.[key]) errors.push(...validateSchema(child, schema.properties[key], `${path}.${key}`));
      else if (schema.additionalProperties === false) errors.push(`${path}.${key}: unknown field`);
    }
  }
  return errors;
}

export function validateRecords(records, schema) {
  if (!Array.isArray(records)) return ['Archive must be an array'];
  const errors = [];
  const ids = new Set();
  const sources = new Set();
  for (const [index, idea] of records.entries()) {
    const path = `idea[${index}]`;
    const structural = validateSchema(idea, schema, path);
    errors.push(...structural);
    if (structural.length) continue;
    if (ids.has(idea.id)) errors.push(`${path}: duplicate id`);
    ids.add(idea.id);
    if (idea.source) {
      const safeUrl = safeExternalUrl(idea.source.url);
      if (!safeUrl) errors.push(`${path}: source must be a safe absolute HTTPS URL without credentials`);
      if (sources.has(idea.source.url)) errors.push(`${path}: duplicate source URL`);
      sources.add(idea.source.url);
    }
    const urls = [idea.source?.url, idea.source?.creator?.url, idea.review.evidenceUrl, ...(idea.review.supportingSources || []).map(source => source.url), idea.build.url, idea.freshness.publicationEvidenceUrl, idea.freshness.toolVersionEvidenceUrl, idea.novelty.evidenceUrl, ...Object.values(idea.popularity).map(metric => metric.sourceUrl)].filter(Boolean);
    if (urls.some(url => !safeExternalUrl(url))) errors.push(`${path}: unsafe external URL`);
    for (const [name, metric] of Object.entries(idea.popularity)) {
      const observed = metric.status !== 'unknown';
      if (observed && (!(metric.observedAt || metric.observedWindow) || !metric.sourceUrl)) errors.push(`${path}.${name}: observed metric requires timestamp or observation window and source`);
      if (metric.observedAt && metric.observedWindow) errors.push(`${path}.${name}: use an exact timestamp or an observation window, not both`);
      if (!observed && Object.entries(metric).some(([key, value]) => key !== 'status' && value !== null)) errors.push(`${path}.${name}: unknown metric fields must be null`);
      if (['hidden', 'unavailable'].includes(metric.status) && metric.value !== null) errors.push(`${path}.${name}: hidden or unavailable values must be null`);
      if (['exact', 'rounded'].includes(metric.status) && (metric.value === null || !metric.display)) errors.push(`${path}.${name}: visible metric requires value and recorded display`);
      if (metric.value !== null && !Number.isInteger(metric.value)) errors.push(`${path}.${name}: count must be a whole number`);
      if (metric.observedAt) {
        const instant = new Date(metric.observedAt);
        if (Number.isNaN(instant.getTime()) || instant.toISOString().replace('.000Z', 'Z') !== metric.observedAt) errors.push(`${path}.${name}: invalid observation timestamp`);
      }
      if (metric.observedWindow) {
        const { start, end } = metric.observedWindow;
        const valid = value => !Number.isNaN(Date.parse(value)) && new Date(value).toISOString().slice(0, 16) + 'Z' === value;
        if (!valid(start) || !valid(end) || Date.parse(start) > Date.parse(end)) errors.push(`${path}.${name}: invalid observation window`);
      }
    }
    if (idea.kind === 'observed' && (!idea.source || idea.review.method === 'none' || !idea.review.reviewedOn || !idea.review.evidenceUrl || !idea.review.observations.length)) errors.push(`${path}: observed examples require source, review date, method, evidence and observations`);
    if (idea.kind === 'concept' && (idea.source || idea.review.method !== 'none' || idea.review.reviewedOn || idea.review.evidenceUrl || idea.review.observations.length || idea.review.audioReviewed)) errors.push(`${path}: uncited concepts must not imply a source review`);
    if (idea.source && idea.source.type !== 'website' && (!idea.source.creator || !idea.source.contentType || !Array.isArray(idea.source.observedStack))) errors.push(`${path}: video needs creator, content type and explicit stack evidence`);
    if (idea.source && idea.source.type !== 'website' && !['video-visual-caption', 'video-transcript', 'video-metadata', 'video'].includes(idea.review.method)) errors.push(`${path}: video intake requires video review`);
    if (idea.review.method === 'video-visual-caption' && idea.review.audioReviewed) errors.push(`${path}: muted review cannot claim audio review`);
    if (idea.review.method === 'video' && !idea.review.audioReviewed) errors.push(`${path}: video + audio method requires audio review`);
    if (idea.build.status === 'planned' && idea.build.url) errors.push(`${path}: a planned brief cannot have a completed-build URL`);
    if (idea.build.status === 'built' && !idea.build.url) errors.push(`${path}: a completed build needs a public URL`);
    if (/REPLACE_ME|YYYY-MM-DD/.test(JSON.stringify(idea))) errors.push(`${path}: unfinished intake placeholder`);
    if (Boolean(idea.freshness.publishedOn) !== Boolean(idea.freshness.publicationEvidenceUrl)) errors.push(`${path}: publication date requires matching source evidence`);
    if (Boolean(idea.freshness.toolVersionDate) !== Boolean(idea.freshness.toolVersionEvidenceUrl) || Boolean(idea.freshness.toolVersionDate) !== Boolean(idea.freshness.toolVersionLabel)) errors.push(`${path}: tool/version date requires label and evidence`);
    if (idea.novelty.status === 'verified-capability' && !idea.novelty.evidenceUrl) errors.push(`${path}: new capability requires evidence`);
    for (const date of [idea.addedOn, idea.review.reviewedOn, idea.freshness.publishedOn, idea.freshness.toolVersionDate].filter(Boolean)) {
      const parsed = new Date(`${date}T00:00:00Z`);
      if (Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== date) errors.push(`${path}: invalid calendar date`);
    }
  }
  return errors;
}

export async function validateArchive() {
  const root = new URL('../', import.meta.url);
  const [records, schema] = await Promise.all(['data/ideas.json', 'idea.schema.json'].map(async path => JSON.parse(await readFile(new URL(path, root), 'utf8'))));
  const errors = validateRecords(records, schema);
  if (errors.length) throw new Error(errors.join('\n'));
  return records;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { const records = await validateArchive(); console.log(`Validated ${records.length} public idea records.`); }
  catch (error) { console.error(error.message); process.exitCode = 1; }
}
