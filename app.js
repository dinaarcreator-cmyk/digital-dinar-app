let bal = parseInt(localStorage.getItem('ddn_bal')||'0');
let hist = JSON.parse(localStorage.getItem('ddn_hist')||'[]');
let mining = true;
let lastTime = parseInt(localStorage.getItem('ddn_last')||Date.now());
const PRICE = 52186;
let clicks = 0;
function save(){ localStorage.setItem('ddn_bal', bal); localStorage.setItem('ddn_hist', JSON.stringify(hist)); localStorage.setItem('ddn_last', Date.now()); }
function updateUI(){ ['bal','bal2','bal3'].forEach(id=>{let e=document.getElementById(id); if(e) e.innerText=bal;}); let v=document.getElementById('myValue'); if(v) v.innerText=(bal*PRICE).toLocaleString('en-IN'); let v3=document.getElementById('myValue3'); if(v3) v3.innerText=(bal*PRICE).toLocaleString('en-IN'); let s=document.getElementById('miningStatus'); if(s) s.innerText = mining ? 'Mining... +1 / 5 sec 🟢 LIVE' : 'Stopped'; let s2=document.getElementById('miningStatus2'); if(s2) s2.innerText = mining ? 'LIVE 🟢' : 'Stopped'; }
function showHistory(){ let h = hist.length==0 ? 'No history yet' : hist.slice(-10).reverse().map(x=>'<div>⛏️ +'+x.amt+' DDN - Rs '+(x.amt*PRICE).toLocaleString('en-IN')+' - '+x.time+'</div>').join(''); let b=document.getElementById('historyBox'); if(b) b.innerHTML=h; let b2=document.getElementById('historyBox2'); if(b2) b2.innerHTML=h; }
function startMining(){ mining=!mining; save(); updateUI(); }
function creatorClick(){ clicks++; if(clicks>=5){ clicks=0; openCreator(); } setTimeout(()=>clicks=0,2000); }
function openCreator(){ let saved = localStorage.getItem('ddn_creator_pin'); if(!saved){ let np = prompt('First Time - Set Your Secret Creator PIN (4 digits - Do not disclose it):'); if(!np) return; localStorage.setItem('ddn_creator_pin', np); alert('PIN Set. Click the logo five times again and enter the PIN.'); return; } let pin = prompt('Enter Creator PIN:'); if(pin===saved){ document.getElementById('mainView').style.display='none'; document.getElementById('creatorView').style.display='block'; updateUI(); showHistory(); } else { alert('Incorrect PIN.'); } }
function closeCreator(){ document.getElementById('creatorView').style.display='none'; document.getElementById('mainView').style.display='block'; }
let now = Date.now(); let diffSec = Math.floor((now - lastTime)/1000);
if(diffSec >= 5){ let earned = Math.floor(diffSec/5); if(earned>0){ bal+=earned; hist.push({amt:earned, time:new Date().toLocaleString()}); alert('Welcome Back. Offline Mining: +'+earned+' DDN = Rs '+(earned*PRICE).toLocaleString('en-IN')); } }
save(); updateUI(); showHistory();
setInterval(()=>{ if(!mining) return; bal+=1; hist.push({amt:1, time:new Date().toLocaleString()}); save(); updateUI(); showHistory(); }, 5000);
