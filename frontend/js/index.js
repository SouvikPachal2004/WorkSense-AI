/* ============================================
   WorkSense AI — Landing Page JavaScript
   ============================================ */

// ---- Theme Toggle ----
const themeToggle = document.getElementById('themeToggle');
const themeIcon   = document.getElementById('themeIcon');
const html        = document.documentElement;

const savedTheme = localStorage.getItem('ws-theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
themeIcon.className = savedTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next    = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('ws-theme', next);
  themeIcon.className = next === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
});

// ---- Navbar Scroll ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
  document.getElementById('scrollTop').classList.toggle('visible', window.scrollY > 400);
});

// ---- Hamburger ----
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('open');
});

// ---- Scroll Top ----
document.getElementById('scrollTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ---- Counter Animation ----
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current);
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.stat-number').forEach(animateCounter);
      counterObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) counterObserver.observe(heroStats);

// ---- Hero Canvas Particles ----
const canvas = document.getElementById('heroCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let particles = [];

  function resizeCanvas() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x  = Math.random() * canvas.width;
      this.y  = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.r  = Math.random() * 2 + 0.5;
      this.alpha = Math.random() * 0.5 + 0.1;
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(108,99,255,${this.alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < 120; i++) particles.push(new Particle());

  function drawLines() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(108,99,255,${0.08 * (1 - dist / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    drawLines();
    requestAnimationFrame(animateParticles);
  }
  animateParticles();
}

// ---- Mockup Chart ----
const mockupCtx = document.getElementById('mockupChart');
if (mockupCtx) {
  new Chart(mockupCtx, {
    type: 'line',
    data: {
      labels: ['9AM','10AM','11AM','12PM','1PM','2PM','3PM'],
      datasets: [{
        data: [72, 85, 91, 78, 88, 94, 87],
        borderColor: '#6c63ff',
        backgroundColor: 'rgba(108,99,255,0.1)',
        borderWidth: 2, fill: true, tension: 0.4,
        pointRadius: 0
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { display: false },
        y: { display: false, min: 60, max: 100 }
      }
    }
  });
}

// ---- Preview Charts ----
function getChartColors() {
  return { grid: 'rgba(108,99,255,0.08)', text: '#8892b0' };
}

const p1 = document.getElementById('previewChart1');
if (p1) {
  new Chart(p1, {
    type: 'line',
    data: {
      labels: ['8AM','9AM','10AM','11AM','12PM','1PM','2PM','3PM','4PM','5PM'],
      datasets: [{
        label: 'Productivity',
        data: [65, 72, 88, 91, 75, 82, 94, 89, 85, 90],
        borderColor: '#6c63ff', backgroundColor: 'rgba(108,99,255,0.1)',
        borderWidth: 2, fill: true, tension: 0.4, pointRadius: 3,
        pointBackgroundColor: '#6c63ff'
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { color: '#8892b0', font: { size: 10 } }, grid: { color: 'rgba(108,99,255,0.08)' } },
        y: { ticks: { color: '#8892b0', font: { size: 10 } }, grid: { color: 'rgba(108,99,255,0.08)' }, min: 50, max: 100 }
      }
    }
  });
}

const p2 = document.getElementById('previewChart2');
if (p2) {
  new Chart(p2, {
    type: 'doughnut',
    data: {
      labels: ['Focused', 'Idle', 'Break', 'Distracted'],
      datasets: [{
        data: [62, 15, 14, 9],
        backgroundColor: ['#6c63ff','#00d4aa','#ff9f43','#ff6b9d'],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom', labels: { color: '#8892b0', font: { size: 10 }, padding: 10, boxWidth: 10 } }
      },
      cutout: '65%'
    }
  });
}

const p3 = document.getElementById('previewChart3');
if (p3) {
  new Chart(p3, {
    type: 'bar',
    data: {
      labels: ['Mon','Tue','Wed','Thu','Fri'],
      datasets: [
        { label: 'Focus', data: [82, 88, 91, 85, 90], backgroundColor: 'rgba(108,99,255,0.7)', borderRadius: 4 },
        { label: 'Distraction', data: [18, 12, 9, 15, 10], backgroundColor: 'rgba(255,107,157,0.7)', borderRadius: 4 }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { labels: { color: '#8892b0', font: { size: 10 }, boxWidth: 10 } } },
      scales: {
        x: { stacked: true, ticks: { color: '#8892b0', font: { size: 10 } }, grid: { display: false } },
        y: { stacked: true, ticks: { color: '#8892b0', font: { size: 10 } }, grid: { color: 'rgba(108,99,255,0.08)' } }
      }
    }
  });
}

// ---- AI Tabs ----
document.querySelectorAll('.ai-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.ai-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.ai-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('tab-' + tab.dataset.tab).classList.add('active');
  });
});

// ---- Preview Tabs ----
document.querySelectorAll('.preview-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.preview-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  });
});

// ---- Contact Form ----
document.getElementById('contactForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
  btn.style.background = 'linear-gradient(135deg,#00d4aa,#00b894)';
  setTimeout(() => {
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    btn.style.background = '';
    e.target.reset();
  }, 3000);
});

// ---- Scroll Animations ----
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.feature-card, .testimonial-card, .pricing-card, .flow-step').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// ---- Smooth nav link close on mobile ----
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('navLinks').classList.remove('open');
  });
});
