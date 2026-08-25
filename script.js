// ===== nav scroll state =====
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ===== mobile nav toggle =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ===== scroll reveal =====
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => revealObserver.observe(el));

// ===== hero knowledge-graph canvas =====
const canvas = document.getElementById('graphCanvas');
const ctx = canvas.getContext('2d');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let W, H, nodes = [];
const NODE_COUNT = 46;
const LINK_DIST = 150;

function resize() {
  W = canvas.width = canvas.offsetWidth * devicePixelRatio;
  H = canvas.height = canvas.offsetHeight * devicePixelRatio;
}

function initNodes() {
  nodes = [];
  for (let i = 0; i < NODE_COUNT; i++) {
    nodes.push({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.25 * devicePixelRatio,
      vy: (Math.random() - 0.5) * 0.25 * devicePixelRatio,
      r: (Math.random() * 1.6 + 1) * devicePixelRatio,
      gold: Math.random() < 0.22
    });
  }
}

function step() {
  ctx.clearRect(0, 0, W, H);

  // update
  nodes.forEach(n => {
    n.x += n.vx;
    n.y += n.vy;
    if (n.x < 0 || n.x > W) n.vx *= -1;
    if (n.y < 0 || n.y > H) n.vy *= -1;
  });

  // links
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i], b = nodes[j];
      const dx = a.x - b.x, dy = a.y - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = LINK_DIST * devicePixelRatio;
      if (dist < maxDist) {
        const alpha = (1 - dist / maxDist) * 0.28;
        ctx.strokeStyle = `rgba(127,184,166,${alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }

  // nodes
  nodes.forEach(n => {
    ctx.beginPath();
    ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
    ctx.fillStyle = n.gold ? 'rgba(227,177,92,0.85)' : 'rgba(237,234,226,0.55)';
    ctx.fill();
  });

  if (!reduceMotion) requestAnimationFrame(step);
}

function setup() {
  resize();
  initNodes();
  step();
}

if (canvas) {
  setup();
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { resize(); initNodes(); if (reduceMotion) step(); }, 200);
  });
}
