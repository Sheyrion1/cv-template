// matrix.js — Matrix Rain adaptativo
// Creado por Facundo Camacho — facundo@flowit-ar.com

const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  columns = Math.floor(canvas.width / fontSize);
  drops = new Array(columns).fill(1);
}
window.addEventListener('resize', resize);
resize();

const letters = 'アイウエオカキクケコ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const fontSize = 16;
let columns = Math.floor(canvas.width / fontSize);
let drops = new Array(columns).fill(1);
const speedFactor = 0.6;

function getMatrixColor() {
  return document.body.classList.contains('light')
    ? 'rgba(0,150,80,0.4)'
    : '#27ff7a';
}

function draw() {
  ctx.fillStyle = document.body.classList.contains('light')
    ? 'rgba(250,250,250,0.08)'
    : 'rgba(6,7,10,0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = getMatrixColor();
  ctx.shadowColor = getMatrixColor();
  ctx.shadowBlur = document.body.classList.contains('light') ? 0 : 8;
  ctx.font = `${fontSize}px monospace`;

  for (let i = 0; i < drops.length; i++) {
    const text = letters.charAt(Math.floor(Math.random() * letters.length));
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.985) drops[i] = 0;
    drops[i] += speedFactor;
  }

  requestAnimationFrame(draw);
}

draw();
