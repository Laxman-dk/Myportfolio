/* ================================================================
   LAXMAN KADASIDDA — FULL ANIMATION ENGINE
   ✦ Matrix Rain  ✦ 3D Tilt Cards  ✦ Particle Cursor
   ✦ Typed Text   ✦ Scroll Reveal  ✦ Particle Burst on Click
   ✦ Skill Bars   ✦ Counter        ✦ Ripple Buttons
   ✦ Neon Cursor Trail ✦ Section Entrance FX
   ================================================================ */

/* ──────────────────────────────────────────────────────────────
   1. MATRIX RAIN  (cyan characters falling)
   ────────────────────────────────────────────────────────────── */
(function matrixRain() {
  const c   = document.getElementById('matrix-canvas');
  const ctx = c.getContext('2d');
  const CH  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&アイウエオカキクサシスソNULLBYTE><{}[]';
  let W, H, cols, drops;
  function init() {
    W = c.width  = window.innerWidth;
    H = c.height = window.innerHeight;
    cols  = Math.floor(W / 16);
    drops = Array.from({ length: cols }, () => Math.random() * -50);
  }
  function tick() {
    ctx.fillStyle = 'rgba(2,10,18,0.055)';
    ctx.fillRect(0, 0, W, H);
    drops.forEach((y, i) => {
      // bright leading char
      ctx.fillStyle = '#ffffff';
      ctx.font = `bold 13px 'Share Tech Mono',monospace`;
      ctx.fillText(CH[Math.floor(Math.random() * CH.length)], i * 16, y * 16);
      // trail chars cyan
      ctx.fillStyle = '#00f5ff';
      ctx.font = `12px 'Share Tech Mono',monospace`;
      ctx.fillText(CH[Math.floor(Math.random() * CH.length)], i * 16, (y - 1) * 16);
      if (y * 16 > H && Math.random() > 0.97) drops[i] = 0;
      drops[i] += 0.5;
    });
  }
  init();
  setInterval(tick, 40);
  window.addEventListener('resize', init);
})();

/* ──────────────────────────────────────────────────────────────
   2. NEON CURSOR TRAIL
   ────────────────────────────────────────────────────────────── */
(function cursorTrail() {
  const trail = [];
  const N = 18;
  for (let i = 0; i < N; i++) {
    const d = document.createElement('div');
    d.className = 'cursor-trail';
    d.style.cssText = `
      position:fixed;pointer-events:none;z-index:9999;border-radius:50%;
      width:${8 - i * 0.35}px;height:${8 - i * 0.35}px;
      background:rgba(0,245,255,${0.7 - i * 0.035});
      box-shadow:0 0 ${6 - i * 0.2}px rgba(0,245,255,0.8);
      transition:left ${10 + i * 8}ms linear,top ${10 + i * 8}ms linear;
      transform:translate(-50%,-50%);left:-100px;top:-100px;
    `;
    document.body.appendChild(d);
    trail.push(d);
  }
  document.addEventListener('mousemove', e => {
    trail.forEach(d => { d.style.left = e.clientX + 'px'; d.style.top = e.clientY + 'px'; });
  });
})();

/* ──────────────────────────────────────────────────────────────
   3. CLICK PARTICLE BURST
   ────────────────────────────────────────────────────────────── */
document.addEventListener('click', function burst(e) {
  const colors = ['#00f5ff', '#bf00ff', '#00ff88', '#ff0080', '#ffffff'];
  for (let i = 0; i < 12; i++) {
    const p = document.createElement('span');
    const angle = (i / 12) * 360;
    const dist  = 40 + Math.random() * 50;
    p.style.cssText = `
      position:fixed;pointer-events:none;z-index:9999;
      width:5px;height:5px;border-radius:50%;
      background:${colors[Math.floor(Math.random() * colors.length)]};
      left:${e.clientX}px;top:${e.clientY}px;
      transform:translate(-50%,-50%);
      animation:burst-fly .6s ease-out forwards;
      --bx:${Math.cos(angle * Math.PI / 180) * dist}px;
      --by:${Math.sin(angle * Math.PI / 180) * dist}px;
    `;
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 700);
  }
});

/* ──────────────────────────────────────────────────────────────
   4. NAVBAR SCROLL SHRINK
   ────────────────────────────────────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

/* ──────────────────────────────────────────────────────────────
   5. MOBILE HAMBURGER
   ────────────────────────────────────────────────────────────── */
const burger   = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  burger.innerHTML = navLinks.classList.contains('open')
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navLinks.classList.remove('open');
  burger.innerHTML = '<i class="fas fa-bars"></i>';
}));

/* ──────────────────────────────────────────────────────────────
   6. TYPED TEXT  (multi-role cycling)
   ────────────────────────────────────────────────────────────── */
const roles = [
  'SOC Analyst',
  'Cybersecurity Enthusiast',
  'Threat Hunter',
  'SIEM Specialist',
  'Blue Team Defender',
  'Incident Responder',
  'AI & ML Engineer'
];
let ri = 0, ci = 0, deleting = false;
const typedEl = document.getElementById('typed');

function typeLoop() {
  const word = roles[ri];
  if (!deleting) {
    typedEl.textContent = word.slice(0, ++ci);
    if (ci === word.length) { deleting = true; setTimeout(typeLoop, 1800); return; }
  } else {
    typedEl.textContent = word.slice(0, --ci);
    if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
  }
  setTimeout(typeLoop, deleting ? 50 : 90);
}
typeLoop();

/* ──────────────────────────────────────────────────────────────
   7. SCROLL REVEAL  (stagger by group)
   ────────────────────────────────────────────────────────────── */
const revealSelectors = [
  '.sec-head', '.about-left p', '.info-glass', '.sbox',
  '.flip-card', '.cert-card', '.proj-card',
  '.tl-item', '.ci-item', '#cform', '.ff'
];
document.querySelectorAll(revealSelectors.join(',')).forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(50px)';
  el.style.transition = `opacity .65s ease ${(i % 6) * 0.08}s, transform .65s ease ${(i % 6) * 0.08}s`;
});

const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity  = '1';
      e.target.style.transform = 'translateY(0)';
      revObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(revealSelectors.join(',')).forEach(el => revObs.observe(el));

/* ──────────────────────────────────────────────────────────────
   8. ANIMATED STAT COUNTERS
   ────────────────────────────────────────────────────────────── */
function animateCounter(el) {
  const target = parseInt(el.dataset.to, 10);
  const suffix = el.dataset.suffix || '';
  let cur = 0;
  const step = Math.max(1, Math.ceil(target / 60));
  const t = setInterval(() => {
    cur = Math.min(cur + step, target);
    el.textContent = cur + suffix;
    if (cur >= target) clearInterval(t);
  }, 30);
}
const statsRow = document.querySelector('.stats-row');
if (statsRow) {
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting) {
      document.querySelectorAll('.snum').forEach(animateCounter);
    }
  }, { threshold: 0.6 }).observe(statsRow);
}

/* ──────────────────────────────────────────────────────────────
   9. 3D TILT ON CARDS  (mouse parallax)
   ────────────────────────────────────────────────────────────── */
function applyTilt(selector, intensity = 15) {
  document.querySelectorAll(selector).forEach(card => {
    card.addEventListener('mousemove', e => {
      const r  = card.getBoundingClientRect();
      const x  = ((e.clientX - r.left) / r.width  - 0.5) * intensity;
      const y  = ((e.clientY - r.top)  / r.height - 0.5) * intensity;
      card.style.transform = `perspective(600px) rotateX(${-y}deg) rotateY(${x}deg) translateY(-6px) scale(1.02)`;
      card.style.transition = 'transform .1s';
      card.style.boxShadow = `${-x}px ${-y}px 30px rgba(0,245,255,.2)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.boxShadow = '';
      card.style.transition = 'transform .5s ease, box-shadow .5s ease';
    });
  });
}
applyTilt('.cert-card', 12);
applyTilt('.proj-card', 10);
applyTilt('.sbox', 18);
applyTilt('.tl-body', 6);

/* ──────────────────────────────────────────────────────────────
   10. RIPPLE EFFECT ON BUTTONS
   ────────────────────────────────────────────────────────────── */
document.querySelectorAll('.btn-primary-neon, .btn-outline-neon').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const r = this.getBoundingClientRect();
    const size = Math.max(r.width, r.height);
    ripple.style.cssText = `
      position:absolute;border-radius:50%;
      width:${size}px;height:${size}px;
      left:${e.clientX - r.left - size / 2}px;
      top:${e.clientY - r.top  - size / 2}px;
      background:rgba(0,245,255,.3);
      transform:scale(0);animation:ripple-anim .6s linear;
      pointer-events:none;
    `;
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 650);
  });
});

/* ──────────────────────────────────────────────────────────────
   11. ACTIVE NAV HIGHLIGHT ON SCROLL
   ────────────────────────────────────────────────────────────── */
const secs = document.querySelectorAll('section[id]');
const navAs = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let cur = '';
  secs.forEach(s => { if (window.scrollY >= s.offsetTop - 130) cur = s.id; });
  navAs.forEach(a => {
    const active = a.getAttribute('href') === '#' + cur;
    a.style.color = active ? 'var(--c)' : '';
  });
}, { passive: true });

/* ──────────────────────────────────────────────────────────────
   12. SECTION TITLE UNDERLINE PULSE ON ENTRY
   ────────────────────────────────────────────────────────────── */
document.querySelectorAll('.underline-bar').forEach(bar => {
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting) {
      bar.style.width = '0';
      setTimeout(() => {
        bar.style.transition = 'width .9s cubic-bezier(.22,1,.36,1), box-shadow .6s ease';
        bar.style.width = '80px';
        bar.style.boxShadow = '0 0 20px var(--c), 0 0 40px rgba(0,245,255,.5)';
      }, 100);
    }
  }, { threshold: 1 }).observe(bar);
});

/* ──────────────────────────────────────────────────────────────
   13. SKILL CARD ICON SPIN ON HOVER
   ────────────────────────────────────────────────────────────── */
document.querySelectorAll('.fc-icon').forEach(icon => {
  icon.closest('.flip-front').addEventListener('mouseenter', () => {
    icon.style.transform = 'rotate(360deg) scale(1.2)';
    icon.style.transition = 'transform .5s ease';
  });
  icon.closest('.flip-front').addEventListener('mouseleave', () => {
    icon.style.transform = '';
  });
});

/* ──────────────────────────────────────────────────────────────
   14. CONTACT FORM SUBMIT WITH VALIDATION FX
   ────────────────────────────────────────────────────────────── */
const cform    = document.getElementById('cform');
const fsuccess = document.getElementById('fsuccess');
if (cform) {
  cform.querySelectorAll('input, textarea').forEach(inp => {
    inp.addEventListener('focus', () => {
      inp.parentElement.style.transform = 'scale(1.01)';
      inp.parentElement.style.transition = 'transform .2s ease';
    });
    inp.addEventListener('blur', () => {
      inp.parentElement.style.transform = '';
    });
  });

  cform.addEventListener('submit', e => {
    e.preventDefault();
    const btn = cform.querySelector('button[type=submit]');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';
    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
      fsuccess.style.display = 'block';
      fsuccess.style.animation = 'fadeSlideIn .5s ease';
      cform.reset();
      setTimeout(() => { fsuccess.style.display = 'none'; }, 5000);
    }, 1400);
  });
}

/* ──────────────────────────────────────────────────────────────
   15. FLOATING PARTICLES  (ambient background dots)
   ────────────────────────────────────────────────────────────── */
(function floatingParticles() {
  const container = document.createElement('div');
  container.id = 'particles-bg';
  container.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:1;overflow:hidden';
  document.body.prepend(container);

  for (let i = 0; i < 35; i++) {
    const p = document.createElement('div');
    const size = Math.random() * 3 + 1;
    const colors = ['rgba(0,245,255,.4)', 'rgba(191,0,255,.3)', 'rgba(0,255,136,.3)'];
    p.style.cssText = `
      position:absolute;border-radius:50%;
      width:${size}px;height:${size}px;
      background:${colors[Math.floor(Math.random() * 3)]};
      left:${Math.random() * 100}%;
      top:${Math.random() * 100}%;
      animation:floatParticle ${6 + Math.random() * 10}s ease-in-out infinite;
      animation-delay:${Math.random() * 5}s;
      box-shadow:0 0 ${size * 3}px ${colors[Math.floor(Math.random() * 3)]};
    `;
    container.appendChild(p);
  }
})();

/* ──────────────────────────────────────────────────────────────
   16. HERO TEXT ENTRANCE  (stagger slide-in)
   ────────────────────────────────────────────────────────────── */
window.addEventListener('load', () => {
  const items = [
    '.hello-tag', '.hero-name', '.hero-typed-line',
    '.hero-bio', '.hero-actions', '.hero-links', '.avail-pill'
  ];
  items.forEach((sel, i) => {
    const el = document.querySelector(sel);
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateX(-40px)';
    setTimeout(() => {
      el.style.transition = 'opacity .7s ease, transform .7s ease';
      el.style.opacity    = '1';
      el.style.transform  = 'translateX(0)';
    }, 200 + i * 130);
  });

  // Photo side slides from right
  const photoSide = document.querySelector('.hero-photo-side');
  if (photoSide) {
    photoSide.style.opacity = '0';
    photoSide.style.transform = 'translateX(60px) scale(.9)';
    setTimeout(() => {
      photoSide.style.transition = 'opacity .9s ease, transform .9s ease';
      photoSide.style.opacity    = '1';
      photoSide.style.transform  = 'translateX(0) scale(1)';
    }, 300);
  }
});
