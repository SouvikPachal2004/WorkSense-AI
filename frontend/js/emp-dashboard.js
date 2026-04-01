/* ============================================================
   WorkSense AI — Employee Dashboard JavaScript
   ============================================================ */

// ---- Auth guard: redirect if not employee ----
const user = JSON.parse(localStorage.getItem('ws-user') || '{}');
if (user.role === 'admin') {
  window.location.href = 'dashboard.html';
}

// ---- Theme ----
const html = document.documentElement;
html.setAttribute('data-theme', localStorage.getItem('ws-theme') || 'dark');
const themeIcon = document.getElementById('themeIcon');
if (themeIcon) themeIcon.className = html.getAttribute('data-theme') === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
document.getElementById('themeToggle')?.addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('ws-theme', next);
  document.getElementById('themeIcon').className = next === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
});

// ---- Sidebar ----
document.getElementById('menuBtn')?.addEventListener('click', () => document.getElementById('sidebar').classList.add('open'));
document.getElementById('sidebarClose')?.addEventListener('click', () => document.getElementById('sidebar').classList.remove('open'));

// ---- Populate user info ----
const name  = user.name  || 'John Doe';
const email = user.email || 'john@worksense.ai';
const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

document.getElementById('empName').textContent  = name;
document.getElementById('empEmail').textContent = email;
document.getElementById('empAvatar').textContent = initials;
document.getElementById('ewbAvatar').textContent = initials;

const hour = new Date().getHours();
const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';
document.getElementById('ewbGreeting').textContent = `${greeting}, ${name.split(' ')[0]}!`;

const tc = '#8892b0';
const gc = 'rgba(108,99,255,0.07)';

// ---- My Productivity Chart ----
const mpCtx = document.getElementById('myProdChart');
if (mpCtx) {
  new Chart(mpCtx, {
    type: 'line',
    data: {
      labels: ['8AM','9AM','10AM','11AM','12PM','1PM','2PM','3PM','4PM','5PM'],
      datasets: [{
        label: 'Productivity',
        data: [70, 82, 94, 91, 75, 85, 96, 92, 88, 94],
        borderColor: '#6c63ff',
        backgroundColor: 'rgba(108,99,255,0.1)',
        borderWidth: 2.5, fill: true, tension: 0.4,
        pointRadius: 4, pointBackgroundColor: '#6c63ff',
        pointBorderColor: '#fff', pointBorderWidth: 2
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { color: tc, font: { size: 10 } }, grid: { color: gc } },
        y: { ticks: { color: tc, font: { size: 10 } }, grid: { color: gc }, min: 50, max: 100 }
      }
    }
  });
}

// ---- My Activity Doughnut ----
const maCtx = document.getElementById('myActivityChart');
if (maCtx) {
  new Chart(maCtx, {
    type: 'doughnut',
    data: {
      labels: ['Focused', 'Active', 'Break', 'Idle'],
      datasets: [{
        data: [55, 25, 12, 8],
        backgroundColor: ['#6c63ff', '#00d4aa', '#ff9f43', '#ff6b9d'],
        borderWidth: 0, hoverOffset: 6
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false, cutout: '68%',
      plugins: {
        legend: { position: 'bottom', labels: { color: tc, font: { size: 11 }, padding: 12, boxWidth: 10 } }
      }
    }
  });
}

// ---- Weekly Performance ----
const mwCtx = document.getElementById('myWeekChart');
if (mwCtx) {
  new Chart(mwCtx, {
    type: 'bar',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      datasets: [
        { label: 'Productivity', data: [88, 91, 94, 89, 94], backgroundColor: 'rgba(108,99,255,0.75)', borderRadius: 5 },
        { label: 'Focus',        data: [85, 88, 92, 86, 92], backgroundColor: 'rgba(0,212,170,0.75)',   borderRadius: 5 }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { labels: { color: tc, font: { size: 11 }, boxWidth: 10 } } },
      scales: {
        x: { ticks: { color: tc, font: { size: 10 } }, grid: { display: false } },
        y: { ticks: { color: tc, font: { size: 10 } }, grid: { color: gc }, min: 70, max: 100 }
      }
    }
  });
}

// ---- Break Timeline ----
const mbCtx = document.getElementById('myBreakChart');
if (mbCtx) {
  new Chart(mbCtx, {
    type: 'bar',
    data: {
      labels: ['10:30','12:00','2:30','4:00'],
      datasets: [{
        label: 'Break (min)',
        data: [10, 15, 5, 5],
        backgroundColor: 'rgba(255,159,67,0.75)',
        borderRadius: 5
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { color: tc, font: { size: 10 } }, grid: { display: false } },
        y: { ticks: { color: tc, font: { size: 10 } }, grid: { color: gc }, title: { display: true, text: 'Minutes', color: tc, font: { size: 10 } } }
      }
    }
  });
}

// ---- AI Tips ----
const tips = [
  { icon: 'fa-sun',        color: '#ff9f43', text: 'Your peak focus is 10–11AM. Schedule deep work then.' },
  { icon: 'fa-mug-hot',    color: '#6c63ff', text: 'Take a 5-min break every 90 min to maintain focus.' },
  { icon: 'fa-person-walking', color: '#00d4aa', text: 'Posture alert: Sit upright to reduce fatigue.' },
  { icon: 'fa-trophy',     color: '#ffd700', text: 'You\'re in the top 10% of your team this week!' },
];
const tipsEl = document.getElementById('myAiTips');
if (tipsEl) {
  tips.forEach(t => {
    tipsEl.innerHTML += `
      <div style="display:flex;align-items:flex-start;gap:10px;padding:10px;background:var(--bg-secondary);border:1px solid var(--border-color);border-radius:8px">
        <div style="width:28px;height:28px;border-radius:7px;background:color-mix(in srgb,${t.color} 15%,transparent);display:flex;align-items:center;justify-content:center;color:${t.color};font-size:12px;flex-shrink:0">
          <i class="fas ${t.icon}"></i>
        </div>
        <div style="font-size:12px;color:var(--text-secondary);line-height:1.5">${t.text}</div>
      </div>`;
  });
}

// ---- Posture Log ----
const postureLogs = [
  { time: '09:15 AM', type: 'Good Posture',    color: '#00d4aa', icon: 'fa-check-circle' },
  { time: '10:42 AM', type: 'Slouching Detected', color: '#ff9f43', icon: 'fa-triangle-exclamation' },
  { time: '11:30 AM', type: 'Focused',         color: '#6c63ff', icon: 'fa-eye' },
  { time: '01:15 PM', type: 'Looking Away',    color: '#ff6b9d', icon: 'fa-eye-slash' },
  { time: '02:50 PM', type: 'Good Posture',    color: '#00d4aa', icon: 'fa-check-circle' },
];
const postureEl = document.getElementById('postureLog');
if (postureEl) {
  postureLogs.forEach(p => {
    postureEl.innerHTML += `
      <div style="display:flex;align-items:center;gap:10px;padding:9px 12px;background:var(--bg-secondary);border:1px solid var(--border-color);border-radius:8px">
        <i class="fas ${p.icon}" style="color:${p.color};font-size:13px;width:16px;text-align:center"></i>
        <span style="font-size:13px;color:var(--text-primary);flex:1">${p.type}</span>
        <span style="font-size:11px;color:var(--text-muted)">${p.time}</span>
      </div>`;
  });
}

// ---- Chart period buttons ----
document.querySelectorAll('.chart-actions').forEach(group => {
  group.querySelectorAll('.chart-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      group.querySelectorAll('.chart-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
});
