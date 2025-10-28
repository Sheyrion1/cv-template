// main.js
// Packaged by Facundo Camacho - facundo@flowit-ar.com

// ==== Año automático en footer ====
document.getElementById('year').textContent = new Date().getFullYear();

// ==== Efecto typewriter en el subtítulo del hero ====
(function typewriter(){
  const el = document.querySelector('.typewriter');
  if (!el) return;
  const text = el.getAttribute('data-text') || '';
  let i = 0;
  const speed = 35; // ms por letra
  const write = () => {
    el.textContent = text.slice(0, i++);
    if (i <= text.length) setTimeout(write, speed);
  };
  write();
})();

// ==== Resalta enlace activo al hacer clic ====
document.querySelectorAll('.nav nav a[href^="#"]').forEach(a=>{
  a.addEventListener('click', ()=>{
    document.querySelectorAll('.nav nav a').forEach(x=>x.classList.remove('active'));
    a.classList.add('active');
  });
});

// ==== Fade-in on scroll ====
const faders = document.querySelectorAll('.fade');

const appearOptions = {
  threshold: 0.18,
  rootMargin: "0px 0px -40px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fade => {
  appearOnScroll.observe(fade);
});

// ==== Theme toggle (día/noche) ====
const themeBtn = document.getElementById('themeToggle');
if (themeBtn) {
  const userPref = localStorage.getItem('theme');
  if (userPref === 'light') {
    document.body.classList.add('light');
    themeBtn.textContent = '☀️';
  }

  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light');
    const isLight = document.body.classList.contains('light');
    themeBtn.textContent = isLight ? '☀️' : '🌙';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');

    // dispatch storage event for other tabs (optional)
    try {
      localStorage.setItem('theme-change', Date.now().toString());
    } catch (e) {}
  });
}

// ==== Visitor Console (robusta) ====
(function setupVisitorConsole(){
  const term = document.getElementById('terminalOutput');
  const refreshBtn = document.getElementById('refreshConsole');
  if (!term) return;

  const log = msg => {
    term.textContent += `\n${msg}`;
    term.scrollTop = term.scrollHeight;
  };

  async function loadVisitorData(clear=false){
    if (clear) term.textContent = '';
    log("[ Visitor Console initialized... ]");

    try {
      const res = await fetch('https://api.ipify.org?format=json');
      if (res.ok) {
        const data = await res.json();
        log(`Public IP: ${data.ip}`);
      } else {
        log("Public IP: unavailable");
      }
    } catch (err) {
      log("Public IP: unavailable");
    }

    const agent = navigator.userAgent;
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const lang = navigator.language || navigator.userLanguage;
    const secure = location.protocol === "https:" ? "✅ Secure" : "⚠️ Not Secure";

    // short agent (more readable)
    const shortAgent = agent.split(')')[0] + ')';
    log(`User Agent: ${shortAgent}`);
    log(`Timezone: ${tz}`);
    log(`Language: ${lang}`);
    log(`Connection: ${secure}`);

    log("[ Console ready. ]");
  }

  // initial load (after small delay)
  setTimeout(()=>loadVisitorData(true), 800);

  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => loadVisitorData(true));
  }
})();
