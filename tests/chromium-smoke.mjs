import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {mkdtemp, readFile, rm} from 'node:fs/promises';
import {once} from 'node:events';
const dir = await mkdtemp('/tmp/bullet-forge-chromium-');
const browser = spawn('chromium', ['--headless', '--no-sandbox', '--disable-dev-shm-usage', '--no-first-run', '--remote-debugging-port=0', '--user-data-dir='+dir, 'about:blank'], {stdio:'ignore'});
let ws;
try {
  let port;
  for (let i=0; i<100 && !port; i++) {
    port = await readFile(dir+'/DevToolsActivePort', 'utf8').then(s=>s.split('\n')[0], ()=>null);
    if (!port) await new Promise(r=>setTimeout(r,100));
  }
  assert(port, 'Chromium debugging port');
  const [tab] = await (await fetch('http://127.0.0.1:'+port+'/json/list')).json();
  ws = new WebSocket(tab.webSocketDebuggerUrl);
  await once(ws, 'open');
  const pending = new Map();
  const errors = [];
  let id=0, loaded;
  ws.addEventListener('message', ({data})=>{
    const msg = JSON.parse(data);
    if (msg.id) {const {resolve,reject}=pending.get(msg.id); pending.delete(msg.id); msg.error ? reject(msg.error) : resolve(msg.result);}
    if (msg.method==='Page.loadEventFired') loaded?.();
    if (msg.method==='Runtime.exceptionThrown') errors.push(msg.params.exceptionDetails.exception?.description ?? msg.params.exceptionDetails.text);
  });
  const send = (method,params={})=>new Promise((resolve,reject)=>{
    pending.set(++id,{resolve,reject});
    ws.send(JSON.stringify({id,method,params}));
  });
  const evaluate = async expression=>{
    const response=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});
    assert(!response.exceptionDetails, response.exceptionDetails?.exception?.description);
    return response.result.value;
  };
  await send('Page.enable');
  await send('Runtime.enable');
  async function visit(method,params) {
    const ready=new Promise(resolve=>{loaded=resolve});
    await send(method,params);
    await ready;
  }
  await visit('Page.navigate',{url:process.argv[2] ?? 'http://127.0.0.1:8000/'});
  assert.match(await evaluate('document.title'), /Bullet Forge/);
  const click = selector => evaluate('document.querySelector('+JSON.stringify(selector)+').click()');
  const write = (selector,text,delay) => evaluate(
    '{const field=document.querySelector('+JSON.stringify(selector)+'); field.value='+JSON.stringify(text)+
    '; field.dispatchEvent(new Event("input",{bubbles:true}));} new Promise(r=>setTimeout(r,'+delay+'));');
  const metrics = text => evaluate('numCount('+JSON.stringify(text)+')');
  const placement = text => evaluate('grade1206('+JSON.stringify(text)+
    ').parts.find(part=>part.label==="Institutional Placement").s');
  for (const [text,expected] of [
    ['',0],
    ['Helped on 2026-01-15 and 1/15/2026 with B2B and 374th routing.',0],
    ['Ranked #2 of 12.',1],
    ['Ranked 2 of 12 and top 3 of 24.',2],
    ['Saved $1,250.50, logged 2.5K requests, and cut delays by 15%.',3],
    ['Closed 0 gaps (12 pending), cut the queue from 8 to 3.',4],
  ]) assert.equal(await metrics(text),expected,text);
  assert.equal(await placement('HELPED WITH QA QA QA.'),2);
  assert.equal(await placement('Helped with PACAF, PACAF, and Pacific Air Forces.'),6);
  assert.equal(await placement('Helped with Pacific Air Forces and Defense Health Agency.'),8);
  assert.equal(await placement('Helped PACAF, DHA, and Professional Military Education.'),10);
  assert.equal(await placement('Helped the Department of the Air Force.'),6);
  assert.equal(await evaluate('blProfile("HELPED WITH QA QA QA.").orgN'),0);
  console.log('PASS numeric cues and institutional placement');

  assert.match(await evaluate('document.body.innerText'), /Scores and format checks are advisory/);
  await click('button[onclick="addBullet()"]');
  assert.doesNotMatch(await evaluate("document.querySelector('#score').innerText"), /GRADE \/100/);
  await write('textarea.bx','Helped with work. The team plans to improve it.',350);
  assert.match(await evaluate("document.querySelector('#bullets').innerText"), /planned|pending/i);
  const award='Led 12 volunteers through 3 workshops and earned an award.';
  await write('textarea.bx',award,350);
  assert.match(await evaluate("document.querySelector('#score').innerText"), /1\/1\nFIT 2-LINE/);
  assert.match(await evaluate("document.querySelector('#score').innerText"), /2\.0\nEVIDENCE/);
  await visit('Page.reload',{});
  assert.equal(await evaluate("document.querySelector('textarea.bx').value"),award);
  console.log('PASS 1206 blank, weak and quantified drafts, scoring and reload persistence');

  await click('[data-m="epb"]');
  await write('#epb-mission','Ranked #2 of 12. Helped with planning (draft).',550);
  await click('[onclick="setEpbView(\'proof\')"]');
  assert.match(await evaluate("document.querySelector('#mode-epb').innerText"), /1 numeric cue across the evaluation/);
  assert.match(await evaluate("document.querySelector('#mode-epb').innerText"), /rephrasing the parenthetical/);
  console.log('PASS evaluation drafting and proofing with one cue for one explicit ranking');

  await click('[data-m="deco"]');
  const citation='During this period, the member organized a practice workshop and created sample checklists.';
  await write('#dbody',citation,650);
  assert.match(await evaluate("document.querySelector('#mode-deco').innerText"), /Fits above GIVEN UNDER MY HAND/);
  await write('#dbody',(citation+' ').repeat(30),650);
  assert.match(await evaluate("document.querySelector('#mode-deco').innerText"), /Exceeds the preview layout/);
  await visit('Page.reload',{});
  assert.match(await evaluate("document.querySelector('#dbody').value"), /practice workshop/);
  assert.deepEqual(errors,[]);
  console.log('PASS decoration preview, overflow and persistence with no uncaught page exceptions');
} finally {
  ws?.close();
  browser.kill();
  if (browser.exitCode === null && browser.signalCode === null) await once(browser,'exit');
  await rm(dir,{recursive:true,force:true});
}
