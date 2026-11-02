import { collectionCounts, defaultFilters, filterIdeas, formatBrief, reviewLabels } from './archive.js';
import { clusterSummary, priceLabel, formatClusterContext } from './clusters.js';
import { node, externalLink } from './dom.js';

const $ = selector => document.querySelector(selector);
let ideas = [];
let clusters = [];
const fullBrief = idea => formatBrief(idea) + clusters.filter(group => group.members.some(member => member.referenceId === idea.id)).map(group => formatClusterContext(group, ideas)).join('\n');
let state = { ...defaultFilters };
let lastTrigger;
const dialog = $('#idea-dialog');

function sketch(type) {
  const sketch = node('div', undefined, `sketch sketch-${type}`);
  sketch.setAttribute('aria-hidden', 'true');
  const miniature = node('div', undefined, 'mini-page');
  const top = node('div', undefined, 'mini-top');
  top.append(node('span', 'YOUR NEXT BUSINESS'), node('span', '•••'));
  miniature.append(top, node('div', type === 'retail' ? 'A little local.\nA lot to love.' : type === 'service' ? 'A fresh start,\nfor your space.' : 'A clear path\nto your project.', 'mini-title'));
  if (type === 'process') {
    const steps = node('div', undefined, 'steps');
    ['Choose', 'Review', 'Request'].forEach((label, index) => { const step = node('span'); step.append(node('b', `${index + 1}`), document.createTextNode(label)); steps.append(step); });
    miniature.append(steps);
  } else {
    const paths = node('div', undefined, 'mini-paths');
    const labels = type === 'retail' ? ['Daily favorites ↗', 'Something special ↗'] : ['For your home ↗', 'For your business ↗'];
    paths.append(...labels.map(label => node('span', label, 'mini-path')));
    miniature.append(paths);
  }
  sketch.append(miniature, node('span', 'Original pattern sketch · not source imagery', 'sketch-label'));
  return sketch;
}

function card(idea, index) {
  const article = node('article', undefined, 'card');
  article.append(sketch(idea.sketch));
  const body = node('div', undefined, 'card-body');
  const meta = node('div', undefined, 'card-meta');
  meta.append(node('span', idea.kind === 'concept' ? 'Untested concept' : idea.source.type === 'reel' ? 'Reel reference' : idea.source.type === 'youtube' ? 'YouTube reference' : 'Website reference'), node('span', String(index + 1).padStart(2, '0'), 'card-number'));
  const title = node('h3', idea.title);
  const tags = node('div', undefined, 'pattern-tags');
  tags.append(...idea.patterns.map(pattern => node('span', pattern, 'tag')));
  const source = node('div', undefined, 'card-source');
  source.append(idea.source ? externalLink(`${idea.source.type !== 'website' ? idea.source.creator?.name || idea.source.name : idea.source.name} ↗`, idea.source.url) : node('span', 'Original concept'), node('span', reviewLabels[idea.review.method], 'review-label'));
  const footer = node('div', undefined, 'card-footer');
  const button = node('button', 'Open brief ↗', 'card-open');
  button.type = 'button';
  button.setAttribute('aria-label', `Open brief: ${idea.title}`);
  button.addEventListener('click', () => {
    lastTrigger = button;
    history.pushState(null, '', `#idea=${encodeURIComponent(idea.id)}`);
    openIdea(idea);
  });
  footer.append(node('span', `${idea.difficulty} · ${idea.build.status === 'built' ? 'Built' : 'Planned'}`, 'difficulty'), button);
  const dateLabel = `${idea.freshness.role === 'fundamental' ? 'Fundamental · ' : ''}${idea.freshness.publishedOn ? `Published ${idea.freshness.publishedOn}` : 'Publication date unknown'}`;
  body.append(meta, title, node('p', dateLabel, 'card-date'), node('p', idea.summary, 'card-description'), tags, source, footer);
  article.append(body);
  return article;
}

function render() {
  const shown = filterIdeas(ideas, state);
  $('#cards').replaceChildren(...shown.map(idea => card(idea, ideas.indexOf(idea))));
  const planned = shown.filter(x => x.build.status === 'planned').length;
  $('#result-count').textContent = `${shown.length} of ${ideas.length} ideas · ${planned} original ${planned === 1 ? 'brief' : 'briefs'} ready to prototype`;
  $('#freshness-note').textContent = `Existing demand and demonstrated patterns first. Independent implementation/outcome evidence leads, then verified dates; novelty alone is not proof. ${shown.filter(idea => !idea.freshness.publishedOn).length} shown with publication date unknown. Review dates are not release dates.`;
  document.querySelectorAll('[data-collection]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.collection === state.collection)));
  $('#empty-state').hidden = shown.length > 0;
  if (!shown.length) {
    const noCollection = state.collection !== 'all' && collectionCounts(ideas)[state.collection] === 0;
    const emptyTitles = { reel: 'The next Reel is still to come.', youtube: 'YouTube research is on its way.', concept: 'No untested concepts in this collection.', website: 'No website references yet.' };
    $('#empty-title').textContent = noCollection ? emptyTitles[state.collection] : 'No ideas match those filters.';
    $('#empty-description').textContent = noCollection ? 'This section is intentionally empty. Add a public reference with review evidence, or an original concept clearly marked as unreviewed.' : 'Try a broader search, another business type, or reset the filters to see the whole collection.';
  }
}

function reset() {
  state = { ...defaultFilters };
  $('#filters').reset();
  render();
}

function sectionList(section, heading, items, ordered = false) {
  if (!items?.length) return;
  const list = node(ordered ? 'ol' : 'ul');
  list.append(...items.map(item => node('li', item)));
  section.append(node('h4', heading), list);
}

function openIdea(idea) {
  const fragment = document.createDocumentFragment();
  const header = node('div', undefined, 'detail-header');
  const heading = node('h2', idea.title); heading.id = 'detail-title';
  const badges = node('div', undefined, 'detail-badges');
  badges.append(...[...idea.businessTypes, idea.difficulty, idea.build.status === 'built' ? 'Built' : 'Original brief · planned, not built'].map(value => node('span', value, 'tag')));
  header.append(node('p', idea.source?.contentType || (idea.kind === 'concept' ? 'UNTESTED CONCEPT' : 'PUBLIC WEBSITE REFERENCE'), 'eyebrow'), heading, node('p', idea.summary), badges);
  const grid = node('div', undefined, 'detail-grid');
  const evidence = node('section', undefined, 'detail-section');
  evidence.append(node('h3', 'What was actually observed'));
  if (idea.source) {
    evidence.append(externalLink(`${idea.source.name} ↗`, idea.source.url));
    const attribution = node('p', undefined, 'small');
    attribution.append(document.createTextNode('Publisher / creator: '));
    attribution.append(idea.source.creator ? externalLink(idea.source.creator.name, idea.source.creator.url) : document.createTextNode('Not recorded'));
    evidence.append(attribution, node('p', idea.source.attributionNote, 'small'));
  }
  sectionList(evidence, 'Observed evidence', idea.review.observations);
  sectionList(evidence, 'Caption claims · not functionally verified', idea.review.captionClaims);
  const review = node('div', undefined, 'evidence-box');
  review.append(node('p', `${reviewLabels[idea.review.method]}${idea.review.reviewedOn ? ` · ${idea.review.reviewedOn}` : ''}`, 'eyebrow'), node('p', idea.review.notes));
  if (idea.review.evidenceUrl) review.append(externalLink('Review provenance ↗', idea.review.evidenceUrl, 'small'));
  evidence.append(review);
  if (idea.review.supportingSources?.length) {
    evidence.append(node('h4', 'Supporting public evidence'));
    for (const source of idea.review.supportingSources) {
      const item = node('p', source.note + ' ', 'small');
      item.append(externalLink('Open supporting source ↗', source.url));
      evidence.append(item);
    }
  }
  evidence.append(node('h4', 'Freshness and new capability'), node('p', `Published: ${idea.freshness.publishedOn || 'Unknown'}. Reviewed: ${idea.review.reviewedOn || 'Not reviewed'}.`), node('p', `Tool/version date: ${idea.freshness.toolVersionDate || 'Unknown'}${idea.freshness.toolVersionLabel ? ` · ${idea.freshness.toolVersionLabel}` : ''}.`), node('p', idea.freshness.caveat, 'small'), node('p', `New capability: ${idea.novelty.status}. ${idea.novelty.notes}`, 'small'));
  if (idea.freshness.publicationEvidenceUrl) evidence.append(externalLink('Publication date evidence ↗', idea.freshness.publicationEvidenceUrl, 'small'));
  if (idea.freshness.toolVersionEvidenceUrl) evidence.append(externalLink('Tool/version evidence ↗', idea.freshness.toolVersionEvidenceUrl, 'small'));
  if (idea.novelty.evidenceUrl) evidence.append(externalLink('Capability evidence ↗', idea.novelty.evidenceUrl, 'small'));
  evidence.append(node('h4', 'Evidence profile · no truth score'));
  const profile = node('dl');
  const dimensions = { sourceIdentity: 'Source identity', publicVisibility: 'Public visibility', observedContent: 'Observed content', aiContentLabel: 'AI-content label' };
  for (const [key, label] of Object.entries(dimensions)) {
    profile.append(node('dt', `${label} · ${idea.evidence[key].status.replaceAll('-', ' ')}`), node('dd', idea.evidence[key].notes));
  }
  evidence.append(profile, node('h4', 'Implementation evidence'), node('p', `Functioning artifact: ${idea.evidence.functioningArtifact.status}. ${idea.evidence.functioningArtifact.notes}`), node('p', `Reproducible steps: ${idea.evidence.reproducibleSteps.status}. ${idea.evidence.reproducibleSteps.notes}`), node('h4', 'Business evidence'), node('p', `${idea.evidence.outcomeClaims.status}. ${idea.evidence.outcomeClaims.notes}`), node('h4', 'Reach · observed popularity'), node('p', 'Site-displayed counts, not audited metrics. Popularity is context, not proof of quality, functionality, or business results. Rounded displays remain approximate.', 'small'));
  const metrics = node('dl');
  for (const [key, metric] of Object.entries(idea.popularity)) {
    const label = key[0].toUpperCase() + key.slice(1);
    metrics.append(node('dt', `${label}: ${metric.value === null ? metric.status === 'unknown' ? 'Unknown' : metric.status : metric.display || metric.value.toLocaleString()}${metric.status === 'rounded' ? ' (rounded)' : ''}`));
    if ((metric.observedAt || metric.observedWindow) && metric.sourceUrl) {
      const observed = metric.observedAt || `Between ${metric.observedWindow.start} and ${metric.observedWindow.end} (minute precision)`;
      const detail = node('dd', `${observed} · `);
      detail.append(externalLink('Metric source ↗', metric.sourceUrl));
      metrics.append(detail);
    }
  }
  evidence.append(metrics);
  sectionList(evidence, 'What this review does not establish', idea.review.limitations);
  if (idea.source && idea.source.type !== 'website') {
    evidence.append(node('h4', 'Tools established by the review'), node('p', idea.source.observedStack?.length ? idea.source.observedStack.join(', ') : 'Unknown. No tool stack is inferred.'));
  }
  sectionList(evidence, 'Useful patterns', idea.patterns);
  const brief = node('section', undefined, 'detail-section');
  brief.append(node('h3', 'Make something of your own'), node('h4', 'Practical fit · original assessment'), node('p', idea.businessUseCase), node('p', `${idea.difficulty} prototype · ${idea.businessTypes.join(', ')}. This is a proposed adaptation, not verified commercial demand.`, 'small'), node('h4', 'MVP goal'), node('p', idea.brief.goal));
  brief.append(node('h4', 'Existing pattern'), node('p', idea.brief.existingPattern), node('h4', 'Specific improvement'), node('p', idea.brief.specificImprovement), node('h4', 'New capability · only if useful'), node('p', idea.brief.newCapability), node('h4', 'Validation plan'), node('p', idea.brief.validationTest));
  sectionList(brief, 'Evidence still missing', idea.brief.missingEvidence);
  sectionList(brief, 'Build these first', idea.brief.features);
  sectionList(brief, 'Suggested build order', idea.brief.steps, true);
  sectionList(brief, 'Done when', idea.brief.acceptance);
  sectionList(brief, 'Required integrations', idea.integrations);
  sectionList(brief, 'Keep out of the first version', idea.brief.outOfScope);
  for (const group of clusters.filter(group => group.members.some(member => member.referenceId === idea.id))) brief.append(groupCard(group));
  if (idea.build.status === 'built' && idea.build.url) brief.append(externalLink('Open completed prototype ↗', idea.build.url));
  const actions = node('div', undefined, 'detail-actions');
  const copy = node('button', 'Copy prototype brief', 'button button-dark'); copy.type = 'button';
  const download = node('button', 'Download .md ↓', 'button'); download.type = 'button';
  const status = node('p', '', 'copy-status small'); status.setAttribute('role', 'status');
  const manual = node('textarea', undefined, 'manual-copy'); manual.hidden = true; manual.readOnly = true; manual.setAttribute('aria-label', 'Prototype brief for manual copying');
  copy.addEventListener('click', async () => {
    copy.disabled = true;
    status.textContent = 'Copying brief…';
    let timeout;
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      // Some browsers leave clipboard requests pending when a tab lacks focus.
      // Keep manual copying available instead of leaving the action disabled.
      await Promise.race([
        navigator.clipboard.writeText(fullBrief(idea)),
        new Promise((_, reject) => { timeout = setTimeout(() => reject(new Error('Clipboard did not respond')), 1500); }),
      ]);
      status.textContent = 'Brief copied. Ready for your next prototype.';
      copy.textContent = 'Copy again';
      manual.hidden = true;
    } catch {
      status.textContent = 'Clipboard unavailable. Select and copy the brief below, or download it.';
      manual.hidden = false;
      manual.value = fullBrief(idea);
      manual.focus();
      manual.select();
    } finally { clearTimeout(timeout); copy.disabled = false; }
  });
  download.addEventListener('click', () => {
    const url = URL.createObjectURL(new Blob([fullBrief(idea)], { type: 'text/markdown;charset=utf-8' }));
    const link = node('a'); link.href = url; link.download = `${idea.id}-brief.md`;
    document.body.append(link); link.click(); link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    status.textContent = 'Brief download requested.';
  });
  actions.append(copy, download);
  const permalink = node('a', 'Link to this idea', 'detail-permalink'); permalink.href = `#idea=${encodeURIComponent(idea.id)}`;
  brief.append(actions, status, manual, permalink, node('p', 'Adapt the principle with your own words, layout, assets, and code.', 'small'));
  grid.append(evidence, brief); fragment.append(header, grid);
  $('#detail-content').replaceChildren(fragment);
  if (!dialog.open) dialog.showModal();
  document.body.classList.add('dialog-open');
  dialog.scrollTop = 0;
  $('.close-dialog').focus();
}

function openHash() {
  if (!location.hash.startsWith('#idea=')) { if (dialog.open) dialog.close(); return; }
  let id;
  try { id = decodeURIComponent(location.hash.slice(6)); } catch { return; }
  const idea = ideas.find(item => item.id === id);
  if (idea) openIdea(idea);
}

$('#filters').addEventListener('submit', event => event.preventDefault());
$('#search').addEventListener('input', event => { state.search = event.target.value; render(); });
for (const [selector, key] of [['#business', 'business'], ['#evidence', 'evidence'], ['#difficulty', 'difficulty'], ['#build-status', 'status'], ['#sort', 'sort']]) {
  $(selector).addEventListener('change', event => { state[key] = event.target.value; render(); });
}
document.querySelectorAll('[data-collection]').forEach(button => button.addEventListener('click', () => { state.collection = button.dataset.collection; render(); }));
$('#clear-filters').addEventListener('click', reset);
$('#empty-reset').addEventListener('click', reset);
$('.close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const bounds = dialog.getBoundingClientRect(); if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close(); } });
dialog.addEventListener('close', () => {
  document.body.classList.remove('dialog-open');
  if (location.hash.startsWith('#idea=')) history.replaceState(null, '', '#library');
  if (lastTrigger?.isConnected) lastTrigger.focus();
});
window.addEventListener('hashchange', openHash);
$('#retry').addEventListener('click', () => location.reload());

function groupCard(group) {
  const card = node('article', undefined, 'group-card');
  const summary = clusterSummary(group, ideas);
  card.append(node('p', 'PROTOTYPE DIRECTION · BRIEF READY', 'eyebrow'), node('h3', group.title), node('p', group.prototype.whatIsBuilt, 'group-status'), node('p', group.prototype.scope), node('h4', priceLabel(group)), node('p', `${group.pricing.hoursLow}–${group.pricing.hoursHigh} hours × ${group.pricing.currency} ${group.pricing.hourlyRate}/hour. Illustrative planning basis; not a quote or market benchmark.`, 'small'), node('h4', `${summary.uniqueContent} unique source ${summary.uniqueContent === 1 ? 'video' : 'videos'} · ${summary.distinctCreators} distinct credited ${summary.distinctCreators === 1 ? 'creator' : 'creators'}`));
  const links = node('ul');
  for (const { reference } of summary.videos) { const item = node('li'); item.append(externalLink(`${reference.source.creator.name}: ${reference.title} ↗`, reference.source.url)); links.append(item); }
  card.append(links);
  const more = node('details'); more.append(node('summary', 'Need, value, scope & review gates'), node('h4', 'Customer need to validate'), node('p', group.customerNeed), node('h4', 'Value hypothesis'), node('p', group.valueHypothesis));
  sectionList(more, 'Scope assumptions', group.pricing.assumptions);
  sectionList(more, 'Excluded from this prototype', group.prototype.exclusions);
  more.append(node('p', `${summary.sameCreatorRepeats} same-creator repeats · ${summary.verifiedIndependent} independently verified origins · ${summary.verifiedReposts} verified reposts. Unverified origins remain unknown.`, 'small'), node('p', group.groupingRationale, 'small'), node('p', group.corroborationCaveat, 'small'), node('h4', 'Next validation'), node('p', group.nextValidation));
  if (group.seo) more.append(node('h4', 'SEO planning · no audit pass'), externalLink('Reviewed build checklist ↗', group.seo.checklistUrl), node('p', group.seo.planning, 'small'), node('p', group.seo.acceptance, 'small'), node('p', group.seo.limits, 'small'));
  card.append(more); return card;
}

async function load() {
  try {
    const response = await fetch('data/ideas.json');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    ideas = await response.json();
    if (!Array.isArray(ideas)) throw new Error('Invalid archive');
    const groupsResponse = await fetch('data/clusters.json');
    if (!groupsResponse.ok) throw new Error('Groups unavailable');
    clusters = await groupsResponse.json();
    $('#groups').replaceChildren(...clusters.map(groupCard));
    const counts = collectionCounts(ideas);
    document.querySelectorAll('[data-count]').forEach(item => { item.textContent = counts[item.dataset.count]; });
    document.querySelectorAll('[data-stat]').forEach(item => { item.textContent = String(counts[item.dataset.stat]).padStart(2, '0'); });
    [...new Set(ideas.flatMap(idea => idea.businessTypes))].sort().forEach(business => { const option = node('option', business); option.value = business; $('#business').append(option); });
    render(); openHash();
  } catch {
    $('#load-error').hidden = false;
    $('#filters').hidden = true;
    $('.collection-tabs').hidden = true;
    $('#clear-filters').hidden = true;
    $('#result-count').textContent = 'Archive unavailable';
  }
}
load();
