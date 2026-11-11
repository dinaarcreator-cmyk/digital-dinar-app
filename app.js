let balance = parseInt(localStorage.getItem('ddn_bal') || '0');
let miningOn = false;
function updateUI(){ document.getElementById('bal').innerText = balance.toLocaleString('en-IN'); document.getElementById('miningStatus').innerText = miningOn ? 'Mining... +1 / 5 sec' : 'Stopped'; }
function startMining(){ if(miningOn){ alert('Already Mining!'); return; } miningOn = true; updateUI(); setInterval(()=>{ balance += 1; localStorage.setItem('ddn_bal', balance); let h = JSON.parse(localStorage.getItem('ddn_history') || '[]'); h.unshift(new Date().toLocaleString() + ' - Mined +1 DDN'); localStorage.setItem('ddn_history', JSON.stringify(h.slice(0,10))); updateUI(); }, 5000); alert('Mining STARTED!'); }
function showHistory(){ let h = JSON.parse(localStorage.getItem('ddn_history') || '[]'); document.getElementById('historyBox').innerHTML = h.length ? h.map(x=>'<div>'+x+'</div>').join('') : 'No mining yet!'; }
function login(){ let e=document.getElementById('email').value; if(!e){ alert('Email pettu!'); return; } document.getElementById('walletAddr').innerText='DDN-'+e.split('@')[0]; alert('Welcome '+e); }
updateUI();
