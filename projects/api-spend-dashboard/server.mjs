import http from 'node:http';
import {readFile} from 'node:fs/promises';
const assets = new Map([['/', ['index.html','text/html']],['/app.js',['app.js','text/javascript']],['/core.js',['core.js','text/javascript']],['/catalog.js',['catalog.js','text/javascript']],['/style.css',['style.css','text/css']]]);
const port = Number(process.env.PORT || 4176);
if (!Number.isInteger(port) || port < 1024 || port > 65535) throw new Error('Invalid PORT');
http.createServer(async (req,res) => {
  const asset = assets.get(req.url);
  if (req.headers.host !== `127.0.0.1:${port}` && req.headers.host !== `localhost:${port}`) {res.writeHead(403);return res.end('Loopback host required');}
  if (!asset || !['GET','HEAD'].includes(req.method)) {res.writeHead(404);return res.end('Not found');}
  try {
    const body = await readFile(new URL(`./web/${asset[0]}`, import.meta.url));
    res.writeHead(200, {'Content-Type':`${asset[1]}; charset=utf-8`,'Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer','Content-Security-Policy':"default-src 'self'; connect-src 'none'; script-src 'self'; style-src 'self'; img-src 'self'; object-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'"});
    res.end(req.method === 'HEAD' ? undefined : body);
  } catch {res.writeHead(500);res.end('Asset unavailable');}
}).listen(port,'127.0.0.1',()=>console.log(`API Spend Dashboard: http://127.0.0.1:${port} — local only; no billing connections`));
