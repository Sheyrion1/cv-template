// main.js — Funciones de interacción
// Creado por Facundo Camacho — facundo@flowit-ar.com

// Año automático
document.getElementById('year').textContent = new Date().getFullYear();

// Efecto Typewriter
(function(){
  const el = document.querySelector('.typewriter');
  if (!el) return;
  const text = el.getAttribute('data-text') || '';
  let i = 0;
  const speed = 35;
  const write = () => {
    el.textContent = text.slice(0, i++);
    if (i <= text.length) setTimeout(write, speed);
  };
  write();
})();

// Fade-in al hacer scroll
const faders = document.querySelectorAll('.fade');
const appear = new IntersectionObserver((entries, obs)=>{
  entries.forEach(entry=>{
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    obs.unobserve(entry.target);
  });
},{threshold:0.2});
faders.forEach(f=>appear.observe(f));

// Tema día/noche
const themeBtn = document.getElementById('themeToggle');
if (themeBtn) {
  const saved = localStorage.getItem('theme');
  if (saved === 'light') {
    document.body.classList.add('light');
    themeBtn.textContent = '☀️';
  }
  themeBtn.addEventListener('click',()=>{
    document.body.classList.toggle('light');
    const light = document.body.classList.contains('light');
    themeBtn.textContent = light ? '☀️' : '🌙';
    localStorage.setItem('theme', light ? 'light' : 'dark');
  });
}

// Visitor Console
(function(){
  const term = document.getElementById('terminalOutput');
  const btn = document.getElementById('refreshConsole');
  if (!term) return;
  const log = msg => { term.textContent += `\n${msg}`; term.scrollTop = term.scrollHeight; };

  async function loadVisitorData(clear=false){
    if (clear) term.textContent = '';
    log("[ Visitor Console initialized... ]");
    try {
      const res = await fetch('https://api.ipify.org?format=json');
      const data = await res.json();
      log(`Public IP: ${data.ip}`);
    } catch { log("Public IP: unavailable"); }
    const agent = navigator.userAgent.split(')')[0] + ')';
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    log(`User Agent: ${agent}`);
    log(`Timezone: ${tz}`);
    log(`Status: ${location.protocol === 'https:' ? '✅ Secure' : '⚠️ Not Secure'}`);
    log("[ Console ready. ]");
  }

  setTimeout(()=>loadVisitorData(true), 800);
  btn?.addEventListener('click',()=>loadVisitorData(true));
})();
