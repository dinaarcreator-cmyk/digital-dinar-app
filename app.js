let bal = parseInt(localStorage.getItem('ddn_bal')||'0');
let hist = JSON.parse(localStorage.getItem('ddn_hist')||'[]');
let mining = true;
let lastTime = parseInt(localStorage.getItem('ddn_last')||Date.now());

function save(){ localStorage.setItem('ddn_bal', bal); localStorage.setItem('ddn_hist', JSON.stringify(hist)); localStorage.setItem('ddn_last', Date.now()); }
function updateUI(){
  let b=document.getElementById('bal'); if(b) b.innerText=bal;
  let s=document.getElementById('miningStatus'); if(s) s.innerText = mining ? 'Mining... +1 / 5 sec 🟢 LIVE' : 'Stopped';
  let btn=document.querySelector('button[onclick="startMining()"]'); if(btn) btn.innerText = mining ? '⏸️ Stop Mining' : '⛏️ Start Mining - LIVE';
}
function showHistory(){
  let box=document.getElementById('historyBox'); if(!box) return;
  if(hist.length==0) box.innerHTML='No history yet';
  else box.innerHTML = hist.slice(-10).reverse().map(h=>'<div>⛏️ +'+h.amt+' DDN - '+h.time+'</div>').join('');
}
function startMining(){
  if(mining){ mining=false; save(); updateUI(); return; }
  mining=true; save(); updateUI();
}
function login(){ alert('Login coming soon - Guest Mining is ON!'); }

// OFFLINE MINING - App close chesina kuda coins vasthayi!
let now = Date.now();
let diffSec = Math.floor((now - lastTime)/1000);
if(diffSec >= 5){
  let earned = Math.floor(diffSec/5);
  if(earned>0){ bal+=earned; hist.push({amt:earned, time:new Date().toLocaleString()}); if(earned>0) alert('Welcome Back! Offline Mining: +'+earned+' DDN earned while you were away!'); }
}
save(); updateUI(); showHistory();

// AUTO START - Click cheyyalsina avasaram ledu, site open cheyyagane Mining START!
setInterval(()=>{
  if(!mining) return;
  bal+=1; hist.push({amt:1, time:new Date().toLocaleString()}); save(); updateUI(); showHistory();
}, 5000);
updateUI();
