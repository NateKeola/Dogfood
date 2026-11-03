import {
  parseImport,
  stageImport,
  makeCandidate,
  validateCandidate,
  validateEvidence,
  classify,
  qualify,
  presenceLabels,
  healthLabels,
  evidenceKinds,
  safeUrl,
  privateBrief,
  publicTemplate,
  exportCsv,
  MAX_BYTES,
} from "./core.js";
const $ = (selector) => document.querySelector(selector);
const el = (tag, text, className) => {
  const n = document.createElement(tag);
  if (text !== undefined) n.textContent = text;
  if (className) n.className = className;
  return n;
};
const link = (text, url) => {
  const n = el("a", text);
  const safe = safeUrl(url);
  if (safe) {
    n.href = safe;
    n.target = "_blank";
    n.rel = "noopener noreferrer";
  }
  return n;
};
const button = (text, action, className = "") => {
  const b = el("button", text, className);
  b.type = "button";
  b.addEventListener("click", action);
  return b;
};
const STORE = "dogfood-research-workspace-v1";
let candidates = [],
  patterns = [],
  selected = null,
  tab = "evidence",
  staged = [];
let storageReadable = true;
const today = () => new Date().toISOString().slice(0, 10);
const id = () => crypto.randomUUID();
function notify(message) {
  $("#notice").textContent = message;
}
function save() {
  if (!storageReadable) {
    notify(
      "Saving is disabled because the previous workspace could not be read. Download a private snapshot of this tab and recover the existing browser data first.",
    );
    return;
  }
  try {
    localStorage.setItem(STORE, JSON.stringify({ version: 1, candidates }));
    $("#storage-status").textContent = "Saved locally in this browser.";
  } catch {
    $("#storage-status").textContent =
      "Storage unavailable or full. Changes exist only in this tab; download a private backup before closing.";
  }
}
function commit(candidate) {
  const errors = validateCandidate(candidate);
  if (errors.length) {
    notify(errors.join("; "));
    return false;
  }
  const index = candidates.findIndex((c) => c.id === candidate.id);
  if (index < 0) candidates.push(candidate);
  else candidates[index] = candidate;
  save();
  render();
  return true;
}
function download(name, text, type = "text/plain") {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const a = el("a");
  a.href = url;
  a.download = name;
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  notify(
    name.startsWith("PRIVATE")
      ? "Private export requested. It may contain prospect details; keep it out of public sharing."
      : "Public template download requested. No prospect data included.",
  );
}
function field(form, label, name, value = "", type = "text", options = null) {
  const wrapper = el("label", label);
  let input;
  if (options) {
    input = el("select");
    for (const [key, text] of options) {
      const option = el("option", text);
      option.value = key;
      input.append(option);
    }
  } else input = el(type === "textarea" ? "textarea" : "input");
  if (!options && type !== "textarea") input.type = type;
  input.name = name;
  input.value = value;
  input.setAttribute("aria-label", label);
  if (type === "textarea") input.rows = 3;
  wrapper.append(input);
  form.append(wrapper);
  return input;
}
function check(form, label, name, checked = false) {
  const wrap = el("label", undefined, "check"),
    input = el("input");
  input.type = "checkbox";
  input.name = name;
  input.checked = checked;
  wrap.append(input, document.createTextNode(label));
  form.append(wrap);
  return input;
}
const values = (form) => Object.fromEntries(new FormData(form));
function render() {
  const real = candidates.filter((c) => !c.fictional);
  $("#real-count").textContent = real.length;
  $("#demo-count").textContent = candidates.length - real.length;
  $("#ready-count").textContent = real.filter((c) => qualify(c).ready).length;
  const term = $("#search").value.toLowerCase(),
    filter = $("#filter").value;
  const shown = candidates
    .filter((c) =>
      [c.name, c.city, c.website, c.dba, c.branch]
        .join(" ")
        .toLowerCase()
        .includes(term),
    )
    .filter(
      (c) =>
        filter === "all" ||
        (filter === "real" && !c.fictional) ||
        (filter === "fictional" && c.fictional) ||
        (filter === "ready" && qualify(c).ready) ||
        (filter === "conflict" && classify(c).conflict),
    )
    .sort(
      (a, b) =>
        Number(qualify(b).ready) - Number(qualify(a).ready) ||
        a.name.localeCompare(b.name),
    );
  $("#queue-count").textContent =
    `${shown.length} records shown · prioritized by reviewed need and capacity, never age or appearance`;
  $("#empty").hidden = shown.length > 0;
  $("#candidate-list").replaceChildren(
    ...shown.map((c) => {
      const state = classify(c),
        q = qualify(c);
      const n = button(
        "",
        () => {
          selected = c.id;
          render();
        },
        "candidate",
      );
      n.setAttribute("aria-pressed", String(selected === c.id));
      n.setAttribute("aria-label", `Review ${c.name}`);
      n.append(
        el(
          "span",
          c.fictional ? "Fictional test data" : "Private local candidate",
          `tag ${c.fictional ? "fictional" : ""}`,
        ),
        el("strong", c.name),
        el(
          "small",
          `${c.city}${c.region ? ", " + c.region : ""} · ${c.branch || "Branch not specified"}`,
        ),
        el("small", presenceLabels[state.presence]),
        el("small", q.priority),
      );
      return n;
    }),
  );
  renderInspector();
}
function renderInspector() {
  const c = candidates.find((c) => c.id === selected);
  if (!c) {
    $("#inspector").replaceChildren(
      el(
        "div",
        "Choose a record to review. Match identity and keep conflicting findings visible.",
        "empty",
      ),
    );
    return;
  }
  const section = $("#inspector");
  section.replaceChildren();
  const state = classify(c),
    q = qualify(c);
  section.append(
    el(
      "span",
      c.fictional
        ? "FICTIONAL TEST DATA · NOT A REAL LEAD"
        : "PRIVATE LOCAL CANDIDATE",
      `tag ${c.fictional ? "fictional" : ""}`,
    ),
    el("h2", c.name),
    el(
      "p",
      `${c.city}${c.region ? ", " + c.region : ""} · DBA: ${c.dba || "not supplied"} · Branch: ${c.branch || "not supplied"}`,
      "meta",
    ),
    el(
      "p",
      `Presence: ${presenceLabels[state.presence]} · Health: ${healthLabels[state.health]}`,
      "callout",
    ),
  );
  const gate = el("div", undefined, "callout");
  gate.append(el("strong", q.priority));
  if (q.blockers.length) {
    const list = el("ul");
    list.append(...q.blockers.map((x) => el("li", x)));
    gate.append(list);
  } else
    gate.append(
      el(
        "p",
        "Ready means the analyst recorded a need and capacity. It is not permission to contact the business, proof of a sale, or a completed build.",
      ),
    );
  section.append(gate);
  const tabs = el("div", undefined, "tabs");
  for (const [key, title] of [
    ["evidence", "1. Evidence"],
    ["qualification", "2. Need & capacity"],
    ["offer", "3. Prototype & price"],
  ]) {
    const b = button(title, () => {
      tab = key;
      renderInspector();
    });
    b.setAttribute("aria-pressed", String(tab === key));
    tabs.append(b);
  }
  section.append(tabs);
  if (tab === "evidence") renderEvidence(section, c);
  if (tab === "qualification") renderQualification(section, c);
  if (tab === "offer") renderOffer(section, c);
}
function renderEvidence(section, c) {
  const info = el("details");
  info.append(
    el("summary", "Imported provenance & limits"),
    el("p", `Source meaning: ${c.sourceMeaning}`),
    link("Intake source ↗", c.sourceUrl),
    el(
      "p",
      `Checked: ${c.checkedOn}. License: ${c.license}. Publication allowance: ${c.publicationAllowance}.`,
    ),
    el(
      "p",
      `Registry date: ${c.registrationDate || "unknown"}. This retains its source meaning; it is not a founding date or proof of current operation.`,
    ),
  );
  section.append(info);
  section.append(
    el(
      "p",
      "Match the company name with city, DBA and branch before linking a domain. Presence and health are separate. 403, 429, timeout, TLS, CORS or robots errors remain unknown.",
      "meta",
    ),
  );
  for (const evidence of c.evidence) {
    const item = el(
      "article",
      undefined,
      `evidence ${evidence.active ? "" : "suspended"}`,
    );
    item.append(
      el(
        "span",
        evidence.active
          ? evidence.humanReviewed
            ? "Analyst reviewed"
            : "Pending human review"
          : "Superseded · history retained",
        "tag",
      ),
      el("h4", evidence.kind.replaceAll("_", " ")),
      el("p", evidence.observation),
      el(
        "p",
        `${evidence.checkedOn} · ${evidence.method} · Identity: ${evidence.identity}`,
        "meta",
      ),
      el("p", `Limits: ${evidence.limitations}`, "meta"),
      el(
        "p",
        `License: ${evidence.license}. Publication: ${evidence.publicationAllowance}.`,
        "meta",
      ),
    );
    if (evidence.sourceUrl)
      item.append(link("Exact evidence source ↗", evidence.sourceUrl));
    if (!evidence.active)
      item.append(el("p", `Superseded because: ${evidence.supersededReason}`));
    if (evidence.active) {
      const review = el("form");
      review.addEventListener("submit", (e) => e.preventDefault());
      if (!evidence.humanReviewed) {
        const identity = field(
          review,
          "Identity match",
          "identity",
          evidence.identity,
          "text",
          [
            ["not_checked", "Not checked"],
            ["matched", "Matched name + locality / DBA / branch"],
            ["uncertain", "Uncertain"],
          ],
        );
        const attested = check(
          review,
          "I manually checked the exact source and observation. Imported text is not a verification.",
          "attested",
        );
        review.append(
          button("Mark evidence reviewed", () => {
            if (!attested.checked) {
              notify(
                "Manually review the evidence and confirm the review checkbox first.",
              );
              return;
            }
            const changed = {
              ...evidence,
              identity: identity.value,
              humanReviewed: true,
              method:
                "Manual analyst review of cited source and identity (attested in this workspace)",
            };
            const errors = validateEvidence(changed);
            if (errors.length) {
              notify(errors.join("; "));
              return;
            }
            commit({
              ...c,
              evidence: c.evidence.map((x) =>
                x.id === evidence.id ? changed : x,
              ),
            });
          }),
        );
      }
      const reason = field(
        review,
        "Reason to supersede (keeps history)",
        "supersededReason",
        "",
        "text",
      );
      review.append(
        button(
          "Supersede this finding",
          () => {
            if (!reason.value.trim()) {
              notify("Record why this evidence is superseded.");
              return;
            }
            commit({
              ...c,
              evidence: c.evidence.map((x) =>
                x.id === evidence.id
                  ? { ...x, active: false, supersededReason: reason.value }
                  : x,
              ),
            });
          },
          "subtle",
        ),
      );
      item.append(review);
    }
    section.append(item);
  }
  const details = el("details");
  details.append(el("summary", "Add a dated evidence observation"));
  const form = el("form");
  form.addEventListener("submit", (e) => e.preventDefault());
  field(
    form,
    "Evidence kind",
    "kind",
    "website_found",
    "text",
    evidenceKinds.map((key) => [key, key.replaceAll("_", " ")]),
  );
  field(
    form,
    "Source URL (optional only for explicit business confirmation)",
    "sourceUrl",
    "",
    "url",
  );
  field(form, "Checked date", "checkedOn", today(), "date");
  field(
    form,
    "Review method / private confirmation method",
    "method",
    "",
    "text",
  );
  field(
    form,
    "Exact observation (not source instructions)",
    "observation",
    "",
    "textarea",
  );
  field(form, "Identity match", "identity", "not_checked", "text", [
    ["not_checked", "Not checked"],
    ["matched", "Matched name + locality / DBA / branch"],
    ["uncertain", "Uncertain"],
  ]);
  field(form, "Uncertainty / limitations", "limitations", "", "textarea");
  field(form, "Source license", "license", "unknown");
  field(form, "Publication allowance", "publicationAllowance", "unknown");
  check(
    form,
    "I personally reviewed this evidence. Business-confirmed absence requires an explicit dated statement, not a missing field.",
    "humanReviewed",
  );
  form.append(
    button(
      "Add evidence",
      () => {
        const data = values(form);
        const evidence = {
          ...data,
          id: id(),
          humanReviewed: data.humanReviewed === "on",
          active: true,
          supersededReason: "",
        };
        const errors = validateEvidence(evidence);
        if (errors.length) {
          notify(errors.join("; "));
          return;
        }
        if (commit({ ...c, evidence: [...c.evidence, evidence] }))
          notify(
            "Evidence added. Contradictions remain visible until explicitly resolved.",
          );
      },
      "primary",
    ),
  );
  details.append(form);
  section.append(details);
}
function renderQualification(section, c) {
  const q = c.qualification;
  section.append(
    el(
      "p",
      "A missing website is not a customer problem by itself. Record an actual friction point and whether the business has capacity and timing for the proposed work. Do not infer need from age, styling or registration dates.",
      "meta",
    ),
  );
  const form = el("form");
  form.addEventListener("submit", (e) => e.preventDefault());
  field(
    form,
    "Specific customer problem / friction",
    "pain",
    q.pain,
    "textarea",
  );
  field(
    form,
    "Problem evidence source / private method note",
    "painSource",
    q.painSource,
  );
  field(form, "Problem checked date", "painDate", q.painDate, "date");
  field(form, "Capacity / timing", "capacity", q.capacity, "text", [
    ["unknown", "Unknown"],
    ["available", "Available — supported by evidence"],
    ["unavailable", "Unavailable / hold"],
  ]);
  field(
    form,
    "Capacity evidence source / private method note",
    "capacitySource",
    q.capacitySource,
  );
  field(form, "Capacity checked date", "capacityDate", q.capacityDate, "date");
  check(
    form,
    "I reviewed the problem and capacity evidence; these are not assumptions from appearance or popularity.",
    "reviewed",
    q.reviewed,
  );
  form.append(
    button(
      "Save qualification",
      () => {
        const data = values(form);
        if (
          commit({
            ...c,
            qualification: { ...data, reviewed: data.reviewed === "on" },
          })
        )
          notify(
            "Qualification saved. Readiness gates have been recalculated.",
          );
      },
      "primary",
    ),
  );
  section.append(form);
}
function renderOffer(section, c) {
  const p = c.prototype,
    chosen = patterns.find((x) => x.id === p.patternId) || patterns[0];
  const form = el("form");
  form.addEventListener("submit", (e) => e.preventDefault());
  field(
    form,
    "Original prototype direction",
    "patternId",
    chosen.id,
    "text",
    patterns.map((x) => [x.id, x.title]),
  );
  field(form, "Build status", "status", p.status, "text", [
    ["planned", "Planned brief — no customer demo built"],
    ["built", "Built artifact — requires analyst evidence"],
  ]);
  section.append(
    el(
      "p",
      "Say “I built this” only after a working artifact exists and you checked what it actually does. A source video, wireframe or copied brief is not your completed demo.",
      "callout",
    ),
  );
  field(form, "Built artifact URL", "artifactUrl", p.artifactUrl, "url");
  field(form, "Artifact checked date", "checkedOn", p.checkedOn, "date");
  field(
    form,
    "Observed working behavior / limits",
    "behavior",
    p.behavior,
    "textarea",
  );
  check(
    form,
    "I opened this artifact and checked its stated behavior. This is an analyst attestation, not automated independent verification.",
    "verified",
    p.verified,
  );
  const scope = el("div", undefined, "columns");
  field(scope, "Low hours", "hoursLow", p.hoursLow, "number");
  field(scope, "High hours", "hoursHigh", p.hoursHigh, "number");
  field(scope, "Planning rate (USD / hour)", "rate", p.rate, "number");
  form.append(scope);
  form.append(
    button(
      "Save prototype scope",
      () => {
        const data = values(form);
        const changed = {
          ...data,
          hoursLow: Number(data.hoursLow),
          hoursHigh: Number(data.hoursHigh),
          rate: Number(data.rate),
          verified: data.verified === "on",
        };
        if (commit({ ...c, prototype: changed }))
          notify(
            "Scope saved as an estimate hypothesis, not a quote or revenue claim.",
          );
      },
      "primary",
    ),
  );
  section.append(
    form,
    el("h3", chosen.title),
    el("p", chosen.prototype.scope),
    el("h4", "Why it might help"),
    el("p", chosen.valueHypothesis),
    el(
      "h4",
      `USD ${p.hoursLow * p.rate}–${p.hoursHigh * p.rate} · planning hypothesis`,
    ),
    el(
      "p",
      `${p.hoursLow}–${p.hoursHigh} hours × USD ${p.rate}/hour. The default rate is an illustrative assumption, not a market benchmark. Confirm scope, content, revisions and actual costs before quoting.`,
      "meta",
    ),
  );
  const assumptions = el("ul");
  assumptions.append(
    ...chosen.pricing.assumptions
      .filter((x) => !x.startsWith("Illustrative planning rate"))
      .map((x) => el("li", x)),
  );
  section.append(assumptions, el("h4", "Source videos"));
  const links = el("ul");
  for (const video of chosen.videos) {
    const item = el("li");
    item.append(link(`${video.creator} — ${video.title} ↗`, video.url));
    links.append(item);
  }
  section.append(
    links,
    el(
      "p",
      `${chosen.uniqueContent} unique source videos; ${chosen.distinctCreators} distinct credited creators; ${chosen.sameCreatorRepeats} same-creator repetitions. Independent origins have not been verified. Repetition is an investigation signal, not proof of demand.`,
      "meta",
    ),
    el("h4", "Next validation"),
    el("p", chosen.nextValidation),
  );
  if (chosen.seo)
    section.append(
      el("h4", "SEO planning reference · no audit pass"),
      link("Reviewed build checklist ↗", chosen.seo.checklistUrl),
      el("p", chosen.seo.planning, "meta"),
      el("p", chosen.seo.acceptance, "meta"),
      el("p", chosen.seo.limits, "meta"),
    );
  const actions = el("div", undefined, "actions");
  actions.append(
    button("Download public template", () =>
      download(
        `${chosen.id}-PUBLIC-template.md`,
        publicTemplate(chosen),
        "text/markdown",
      ),
    ),
  );
  const privateButton = button(
    "Generate private offer brief",
    () => {
      try {
        output.value = privateBrief(c, chosen);
        output.hidden = false;
        exportButton.hidden = false;
        notify(
          "Private brief generated below. It includes prospect context; review before sharing.",
        );
      } catch (error) {
        notify(error.message);
      }
    },
    "primary",
  );
  privateButton.disabled = !qualify(c).ready;
  actions.append(privateButton);
  section.append(actions);
  const output = el("textarea", undefined, "brief-output");
  output.readOnly = true;
  output.hidden = true;
  output.setAttribute("aria-label", "Private prototype brief");
  const exportButton = button("Download PRIVATE offer .md", () =>
    download("PRIVATE-prototype-offer.md", output.value, "text/markdown"),
  );
  exportButton.hidden = true;
  section.append(output, exportButton);
}
function showStaged() {
  const box = $("#import-preview");
  box.hidden = false;
  box.replaceChildren(
    ...staged.map(({ candidate, duplicate }) => {
      const row = el("div", undefined, "preview-row");
      row.append(
        el("strong", candidate.name),
        el(
          "p",
          `${candidate.city} · ${candidate.website || "No website field supplied"}`,
          "meta",
        ),
      );
      if (duplicate)
        row.append(
          el(
            "p",
            `Possible duplicate of ${duplicate.name}: ${duplicate.reason}`,
            "meta",
          ),
        );
      return row;
    }),
  );
  $("#duplicate-option").hidden = !staged.some((x) => x.duplicate);
  $("#commit-import").hidden = false;
  $("#import-status").textContent =
    `${staged.length} valid records. ${staged.filter((x) => x.duplicate).length} possible duplicates. Nothing imported yet. All imported evidence starts unreviewed.`;
}
$("#preview-import").addEventListener("click", () => {
  try {
    staged = stageImport(parseImport($("#import-text").value), candidates, id);
    $("#keep-duplicates").checked = false;
    $("#commit-import").textContent = "Import unique records";
    showStaged();
  } catch (error) {
    staged = [];
    $("#commit-import").hidden = true;
    $("#import-preview").hidden = true;
    $("#duplicate-option").hidden = true;
    $("#import-status").textContent = error.message;
  }
});
$("#keep-duplicates").addEventListener("change", () => {
  $("#commit-import").textContent = $("#keep-duplicates").checked
    ? "Import including possible duplicates"
    : "Import unique records";
});
$("#commit-import").addEventListener("click", () => {
  const selectedRows = staged.filter(
    (x) => !x.duplicate || $("#keep-duplicates").checked,
  );
  const added = selectedRows.map((x) => x.candidate);
  if (candidates.length + added.length > 5000) {
    notify(
      "Local workspace limit is 5,000 records. Keep the first pilot small.",
    );
    return;
  }
  candidates.push(...added);
  if (added.length) selected = added[0].id;
  staged = [];
  $("#commit-import").hidden = true;
  $("#import-preview").hidden = true;
  $("#duplicate-option").hidden = true;
  $("#import-text").value = "";
  $("#import-file").value = "";
  $("#import-status").textContent =
    `Imported ${added.length} private local records. Evidence remains unreviewed.`;
  save();
  render();
});
$("#import-file").addEventListener("change", async (event) => {
  const file = event.target.files[0];
  if (!file) return;
  if (file.size > MAX_BYTES) {
    $("#import-status").textContent = "File exceeds 2 MB";
    return;
  }
  try {
    $("#import-text").value = await file.text();
    $("#import-status").textContent =
      "File loaded locally. Preview before importing.";
  } catch {
    $("#import-status").textContent = "Could not read that local file.";
  }
});
$("#load-demo").addEventListener("click", async () => {
  try {
    const response = await fetch("templates/intake.json");
    if (!response.ok) throw new Error("Fixture unavailable");
    const rows = await response.json();
    const existing = candidates.filter((c) => c.fictional);
    const fresh = stageImport(rows, existing, id, true)
      .filter((x) => !x.duplicate)
      .map((x) => x.candidate);
    candidates.push(...fresh);
    if (fresh.length) selected = fresh[0].id;
    save();
    render();
    notify(
      `${fresh.length} fictional fixtures added. Real candidate count is unchanged. No research has run.`,
    );
  } catch (error) {
    notify(error.message);
  }
});
$("#clear-demo").addEventListener("click", () => {
  candidates = candidates.filter((c) => !c.fictional);
  if (!candidates.some((c) => c.id === selected)) selected = null;
  save();
  render();
  notify("Fictional examples removed. Private real candidates retained.");
});
$("#private-json").addEventListener("click", () =>
  download(
    "PRIVATE-research-workspace.json",
    JSON.stringify(
      {
        version: 1,
        exportedOn: today(),
        note: "Private review snapshot. Do not publish. Intake imports accept only the flat template fields and never import trusted verification flags.",
        candidates,
      },
      null,
      2,
    ),
    "application/json",
  ),
);
$("#private-csv").addEventListener("click", () =>
  download("PRIVATE-candidate-summary.csv", exportCsv(candidates), "text/csv"),
);
$("#search").addEventListener("input", render);
$("#filter").addEventListener("change", render);
async function init() {
  try {
    const response = await fetch("patterns.json");
    if (!response.ok) throw new Error("Patterns unavailable");
    patterns = await response.json();
    const policies = await (await fetch("providers.json")).json();
    $("#provider-list").replaceChildren(
      ...policies.map((policy) => {
        const item = el("article", undefined, "provider");
        item.append(
          el("h3", policy.name),
          el("span", policy.status, "tag"),
          el("p", policy.notes),
        );
        for (const source of policy.sources)
          item.append(link(source.label + " ↗", source.url));
        return item;
      }),
    );
    try {
      const raw = localStorage.getItem(STORE);
      if (raw) {
        const stored = JSON.parse(raw);
        if (
          stored.version !== 1 ||
          !Array.isArray(stored.candidates) ||
          stored.candidates.length > 5000 ||
          stored.candidates.some((c) => validateCandidate(c).length)
        )
          throw new Error("Invalid saved data");
        candidates = stored.candidates;
        $("#storage-status").textContent =
          "Restored private local records from this browser.";
      }
    } catch {
      storageReadable = false;
      $("#storage-status").textContent =
        "Saved workspace could not be read. It has not been changed. Avoid saving until you recover your browser data.";
      notify(
        "Local storage could not be restored. Saving is disabled to preserve the existing data; new work in this tab can be exported privately.",
      );
    }
    render();
  } catch (error) {
    notify(
      `Workspace failed to load: ${error.message}. Run npm start from this project.`,
    );
  }
}
init();
