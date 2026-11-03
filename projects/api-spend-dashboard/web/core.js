export const VERSION = 1;
export const KINDS = ['provider_reported','manual','estimate','unknown'];
export const CURRENCIES = ['USD','EUR','GBP','CAD','AUD','NZD','JPY'];
export const STAGES = ['discovered','audited','qualified','prototypes','call_ready'];
export const FIELDS = ['id','provider','operation','units','unit','timestamp','project','batch','run','status','attempt','category','costKind','amount','currency','evidence','evidenceUrl'];
export const emptyState = () => ({version:VERSION,mode:'private',events:[],stages:[],budgets:[],checklist:[]});
const fail = message => {throw new Error(message);};
const obj = v => v && typeof v === 'object' && !Array.isArray(v);
const exact = (v,keys) => {if(!obj(v) || Object.keys(v).some(k=>!keys.includes(k))) fail('Unexpected fields or invalid record. Use the documented schema.');};
const str = (v,name,max=120) => {if(typeof v !== 'string' || !v.trim() || v.length>max || /[\u0000-\u001f\u007f]/.test(v)) fail(`Invalid ${name}`);return v;};
const label = (v,name) => {str(v,name,80);if(!/^[a-zA-Z0-9][a-zA-Z0-9_. -]*$/.test(v)) fail(`Invalid ${name}: use an opaque label, not contact data`);return v;};
const num = (v,name,max=1e9) => {if(typeof v !== 'number'|| !Number.isFinite(v)||v<0||v>max) fail(`Invalid ${name}`);return v;};
const integer = (v,n,max) => {num(v,n,max);if(!Number.isInteger(v))fail(`Invalid integer ${n}`);return v;};
export function month(v) {if(typeof v!=='string'||!/^20\d{2}-(0[1-9]|1[0-2])$/.test(v))fail('Invalid month');return v;}
export function timestamp(v) {
  if(typeof v!=='string'||!/^20\d{2}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/.test(v)) fail('Use a UTC timestamp, e.g. 2026-11-02T12:00:00Z');
  const d = new Date(v);if(!Number.isFinite(d.getTime()) || d.toISOString().replace('.000Z','Z')!==v.replace('.000Z','Z')) fail('Invalid calendar date');return v;
}
export function safeUrl(v) {
  if(v===''||v===undefined)return '';
  str(v,'evidence URL',500);let u;try{u=new URL(v);}catch{fail('Invalid evidence URL');}
  if(u.protocol!=='https:'||u.username||u.password||u.search||u.hash||!u.hostname.includes('.')||/^(localhost|127\.|0\.|10\.|192\.168\.|169\.254\.|172\.(1[6-9]|2\d|3[01])\.)/.test(u.hostname)) fail('Use a public HTTPS source URL without credentials, query, or fragment');
  return u.href;
}
export function validateEvent(e) {
  exact(e,FIELDS);for(const k of ['id','provider','operation','unit','project','batch','run'])label(e[k],k);
  num(e.units,'units');timestamp(e.timestamp);if(e.attempt!==null){integer(e.attempt,'attempt',1000);if(e.attempt<1)fail('Attempt starts at 1');}
  if(!['completed','failed','incomplete','unknown'].includes(e.status))fail('Invalid status');
  if(!['usage','subscription'].includes(e.category)||!KINDS.includes(e.costKind))fail('Invalid category or cost provenance');
  if(e.amount===null) {if(e.costKind!=='unknown')fail('Null amount requires unknown provenance');}
  else {num(e.amount,'amount',1e7);if(e.costKind==='unknown')fail('Unknown costs must have null amount');if(!CURRENCIES.includes(e.currency))fail('Unsupported currency');}
  if(e.currency!==null&&!CURRENCIES.includes(e.currency))fail('Unsupported currency');
  str(e.evidence,'evidence',240);e.evidenceUrl=safeUrl(e.evidenceUrl);return {...e};
}
function validateStage(s) {
  exact(s,['project','batch','month',...STAGES]);label(s.project,'project');label(s.batch,'batch');month(s.month);
  for(const k of STAGES)if(s[k]!==null)integer(s[k],k,1e7);
  return {...s};
}
function validateBudget(b) {
  exact(b,['id','scope','target','month','amount','currency','threshold']);label(b.id,'budget ID');month(b.month);num(b.amount,'budget',1e7);num(b.threshold,'threshold',100);if(b.threshold<1)fail('Threshold must be 1–100');
  if(!['monthly','provider','project','batch'].includes(b.scope)||!CURRENCIES.includes(b.currency))fail('Invalid budget scope or currency');label(b.target,'target');return {...b};
}
export function validateState(s,mode='private') {
  exact(s,['version','mode','events','stages','budgets','checklist']);
  if(s.version!==VERSION||s.mode!==mode)fail(`Expected version 1 ${mode} data. Synthetic demo cannot be imported into private data.`);
  for(const k of ['events','stages','budgets','checklist'])if(!Array.isArray(s[k])||s[k].length>10000)fail(`Invalid ${k} collection`);
  const result={...s,events:s.events.map(validateEvent),stages:s.stages.map(validateStage),budgets:s.budgets.map(validateBudget),checklist:s.checklist.map(x=>label(x,'checklist item'))};
  if(mode==='private'&&result.events.some(e=>/^(demo-|synthetic)/i.test(e.id)||/^synthetic/i.test(e.project)||/^SYNTHETIC/i.test(e.evidence)))fail('Synthetic demonstration records cannot enter the private ledger.');
  for(const [rows,key] of [[result.events,x=>x.id],[result.stages,x=>`${x.month}|${x.project}|${x.batch}`],[result.budgets,x=>x.id]])if(new Set(rows.map(key)).size!==rows.length)fail('Duplicate IDs or stage snapshots');
  return result;
}
export function mergeEvents(state,rows) {
  const next=validateState(structuredClone(state),state.mode);const map=new Map(next.events.map(e=>[e.id,e]));let added=0,duplicates=0;
  for(const row of rows){const e=validateEvent({...row});const old=map.get(e.id);
    if(old){if(FIELDS.some(k=>old[k]!==e[k]))fail(`Conflicting event ID: ${e.id}. Remove the old record before correcting it.`);duplicates++;}
    else {map.set(e.id,e);added++;}
  }
  next.events=[...map.values()];return {state:validateState(next,next.mode),added,duplicates};
}
export function parseCsv(text) {
  if(typeof text!=='string'||new TextEncoder().encode(text).byteLength>2e6)fail('Import exceeds 2 MB');
  const rows=[];let row=[],field='',quoted=false,closed=false;
  for(let i=0;i<text.length;i++){const c=text[i];
    if(quoted){if(c==='"'){if(text[i+1]==='"'){field+='"';i++;}else{quoted=false;closed=true;}}else field+=c;}
    else if(c==='"'){if(field||closed)fail('Malformed CSV quote');quoted=true;}
    else if(c===','||c==='\n'||c==='\r'){row.push(field);field='';closed=false;if(c!==','){if(c==='\r'&&text[i+1]==='\n')i++;if(row.some(Boolean))rows.push(row);row=[];}}
    else {if(closed)fail('Unexpected text after CSV quote');field+=c;}
  }
  if(quoted)fail('Unclosed CSV quote');if(field||row.length){row.push(field);rows.push(row);}
  const header=rows.shift();if(!header||header.join(',')!==FIELDS.join(','))fail('CSV headers must match the template exactly');
  if(rows.length>10000)fail('Maximum 10,000 events');
  return rows.map((cells,i)=>{if(cells.length!==FIELDS.length)fail(`CSV row ${i+2} has incorrect column count`);const e=Object.fromEntries(FIELDS.map((k,j)=>[k,cells[j]]));
    for(const k of ['units','attempt']){if(k==='attempt'&&e[k]===''){e[k]=null;continue;}if(!/^\d+(\.\d+)?$/.test(e[k]))fail(`Invalid ${k}`);e[k]=Number(e[k]);}
    if(e.amount==='')e.amount=null;else {if(!/^\d+(\.\d+)?$/.test(e.amount))fail('Invalid amount');e.amount=Number(e.amount);}
    if(e.currency==='')e.currency=null;return validateEvent(e);
  });
}
export const csvCell = v => {let s=v===null||v===undefined?'':String(v);if(/^[\s]*[=+\-@]/.test(s))s="'"+s;return '"'+s.replaceAll('"','""')+'"';};
export const exportCsv = rows => [FIELDS.join(','),...rows.map(e=>FIELDS.map(k=>csvCell(e[k])).join(','))].join('\r\n');
export function parseImport(text,extension) {
  if(typeof text!=='string'||new TextEncoder().encode(text).byteLength>2e6)fail('Import exceeds 2 MB');
  if(extension==='csv')return {type:'events',events:parseCsv(text)};
  if(extension==='jsonl') {
    const lines=text.split(/\r?\n/).filter(x=>x.trim());if(lines.length>10000)fail('Maximum 10,000 events');
    return {type:'events',events:lines.map((line,i)=>{let raw;try{raw=JSON.parse(line);}catch{fail(`Invalid JSONL at line ${i+1}`);}return mapOutreachEvent(raw);})};
  }
  let raw;try{raw=JSON.parse(text);}catch{fail('Invalid JSON');}
  return {type:'snapshot',state:validateState(raw)};
}
export function mapOutreachEvent(e) {
  const keys=['version','event_id','provider','operation','units','unit','timestamp','run_id','batch_id','amount','currency','cost_basis','provenance'];
  exact(e,keys);if(keys.some(k=>!(k in e))||e.version!==1)fail('Outreach-Engine usage version 1 and all fields are required');
  for(const k of ['event_id','provider','operation','run_id','batch_id']){str(e[k],k,80);if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(e[k]))fail(`Invalid Outreach-Engine ${k}`);}
  if(!['candidate','request','page','credit','token','minute'].includes(e.unit)||!['actual','estimated','unknown'].includes(e.cost_basis)||!['local_execution','provider_response','invoice','rate_card_estimate','unknown'].includes(e.provenance))fail('Invalid Outreach-Engine enum');
  if(e.cost_basis==='unknown'){if(e.amount!==null||e.currency!==null)fail('Unknown Outreach-Engine cost requires null amount and currency');}
  else {num(e.amount,'amount',1e6);if(!CURRENCIES.includes(e.currency))fail('Unsupported currency');}
  const kind=e.cost_basis==='unknown'?'unknown':e.cost_basis==='estimated'?'estimate':['provider_response','invoice'].includes(e.provenance)?'provider_reported':'manual';
  return validateEvent({id:e.event_id,provider:e.provider,operation:e.operation,units:e.units,unit:e.unit,timestamp:e.timestamp,project:'outreach-engine',batch:e.batch_id,run:e.run_id,status:'unknown',attempt:null,category:'usage',costKind:kind,amount:e.amount,currency:e.currency,evidence:`Outreach-Engine v1: ${e.provenance} / ${e.cost_basis}. ${e.provenance==='local_execution'?'Local operation only; excludes subscriptions and provider invoices. ':''}Status and attempt not supplied.`,evidenceUrl:''});
}
export function selectEvents(state,filter){return state.events.filter(e=>e.timestamp.slice(0,7)===filter.month&&(!filter.project||e.project===filter.project)&&(!filter.batch||e.batch===filter.batch));}
export function totals(rows) {
  const sums={};for(const e of rows){const c=e.currency||'UNSPECIFIED';sums[c]??={provider_reported:null,manual:null,estimate:null,unknown:0};if(e.amount===null)sums[c].unknown++;else sums[c][e.costKind]=(sums[c][e.costKind]??0)+e.amount;}
  return sums;
}
export function unitCosts(state,filter,kind,currency) {
  const rows=selectEvents(state,filter).filter(e=>e.currency===currency&&e.costKind===kind);
  const amount=rows.length?rows.reduce((n,e)=>n+e.amount,0):null;
  const snapshots=state.stages.filter(s=>s.month===filter.month&&(!filter.project||s.project===filter.project)&&(!filter.batch||s.batch===filter.batch));
  // Every cost batch needs a stage snapshot, and every stage batch needs observed cost of this provenance.
  const costKeys=new Set(rows.map(e=>`${e.project}|${e.batch}`));
  const stageKeys=new Set(snapshots.map(s=>`${s.project}|${s.batch}`));
  const aligned=costKeys.size===stageKeys.size&&[...costKeys].every(k=>stageKeys.has(k));
  return Object.fromEntries(STAGES.map(k=>{const count=snapshots.length&&snapshots.every(s=>s[k]!==null)?snapshots.reduce((n,s)=>n+s[k],0):null;return [k,{count,cost:aligned&&amount!==null&&count>0?amount/count:null}];}));
}
export function budgetStatus(state,b) {
  const scoped=state.events.filter(e=>e.timestamp.slice(0,7)===b.month&&(b.scope==='monthly'||e[b.scope]===b.target));
  const rows=scoped.filter(e=>e.currency===b.currency);
  const sums=totals(rows)[b.currency];const recorded=sums&&(sums.manual!==null||sums.provider_reported!==null)?(sums.manual??0)+(sums.provider_reported??0):null;
  return {recorded,estimate:sums?.estimate??null,unknown:scoped.filter(e=>e.amount===null).length,percent:recorded===null?null:b.amount===0?(recorded>0?Infinity:0):recorded/b.amount*100,alert:recorded!==null&&(b.amount===0?recorded>0:recorded/b.amount*100>=b.threshold)};
}
export function forecast(s) {
  exact(s,Object.keys(DEFAULT_SCENARIO));
  for(const k of Object.keys(DEFAULT_SCENARIO))if(k!=='browser'&&!(k==='creditPrice'&&s[k]===null))num(s[k],k,1e8);
  integer(s.candidates,'candidates',1e6);
  for(const k of ['auditRate','enrichRate','retryRate','allocation'])if(s[k]>100)fail(`${k} must be 0–100`);
  if(![0,1,9].includes(s.depth)||!['local','browserbase'].includes(s.browser))fail('Invalid scenario option');
  const ceil = n => Math.ceil(n-1e-9);
  const multiplier=(100+s.retryRate)/100, audits=ceil(s.candidates*s.auditRate/100),attempts=ceil(audits*multiplier),searches=ceil(s.candidates*s.searches*multiplier);
  const credits=ceil(audits*s.enrichRate/100*multiplier)*s.depth;
  const searchGross=searches*0.004, searchNet=Math.max(0,searchGross-s.exaCredit);
  const model=attempts*(s.inputTokens*0.4+s.outputTokens*1.6)/1e6;
  const hours=attempts*Math.max(1,Math.ceil(s.browserMinutes))/60;
  const browserOverage=s.browser==='browserbase'?Math.max(0,hours-s.browserRemainingHours)*0.12:0;
  const apollo=credits<=s.includedCredits?0:s.creditPrice===null?null:Math.max(0,credits-s.includedCredits)*s.creditPrice;
  const subscription=(s.browser==='browserbase'?20:0)+s.subscription;
  const marginalKnown=searchNet+model+browserOverage+(apollo??0);
  return {audits,attempts,searches,credits,hours,searchGross,searchNet,model,browserOverage,apollo,subscription,marginalKnown,allocated:subscription*s.allocation/100,forecast:apollo===null?null:marginalKnown+subscription*s.allocation/100};
}
export const DEFAULT_SCENARIO = {candidates:100,auditRate:50,enrichRate:25,retryRate:10,searches:1,inputTokens:4000,outputTokens:800,browserMinutes:2,browser:'local',browserRemainingHours:100,exaCredit:0,depth:1,creditPrice:null,includedCredits:0,subscription:0,allocation:100};
export function freshness(checked,now=new Date()) {const age=Math.floor((now-new Date(checked))/86400000);return {age,stale:age>30||age<0};}
