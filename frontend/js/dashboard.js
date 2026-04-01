/* ============================================
   WorkSense AI — Dashboard JavaScript
   ============================================ */

// ---- Auth guard: redirect employees to their dashboard ----
const wsUser = JSON.parse(localStorage.getItem('ws-user') || '{}');
if (wsUser.role === 'employee') {
  window.location.href = 'employee-dashboard.html';
}

// ---- Theme ----
const html = document.documentElement;
const savedTheme = localStorage.getItem('ws-theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
const themeIcon = document.getElementById('themeIcon');
if (themeIcon) themeIcon.className = savedTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';

document.getElementById('themeToggle')?.addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('ws-theme', next);
  document.getElementById('themeIcon').className = next === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
});

// ---- Sidebar ----
document.getElementById('menuBtn')?.addEventListener('click', () => document.getElementById('sidebar').classList.add('open'));
document.getElementById('sidebarClose')?.addEventListener('click', () => document.getElementById('sidebar').classList.remove('open'));

// ---- Chart defaults ----
const gridColor = () => getComputedStyle(document.documentElement).getPropertyValue('--border-color').trim() || 'rgba(108,99,255,0.1)';
const textColor = '#8892b0';

// ---- Productivity Trend Chart ----
const prodCtx = document.getElementById('productivityChart');
if (prodCtx) {
  new Chart(prodCtx, {
    type: 'line',
    data: {
      labels: ['8AM','9AM','10AM','11AM','12PM','1PM','2PM','3PM','4PM','5PM','6PM'],
      datasets: [
        {
          label: 'Productivity',
          data: [62, 71, 85, 91, 76, 83, 94, 89, 87, 92, 88],
          borderColor: '#6c63ff', backgroundColor: 'rgba(108,99,255,0.08)',
          borderWidth: 2.5, fill: true, tension: 0.4, pointRadius: 4,
          pointBackgroundColor: '#6c63ff', pointBorderColor: '#fff', pointBorderWidth: 2
        },
        {
          label: 'Focus',
          data: [58, 68, 82, 88, 70, 79, 91, 85, 83, 89, 84],
          borderColor: '#00d4aa', backgroundColor: 'rgba(0,212,170,0.05)',
          borderWidth: 2, fill: false, tension: 0.4, pointRadius: 3,
          pointBackgroundColor: '#00d4aa'
        }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { labels: { color: textColor, font: { size: 12 }, boxWidth: 12, padding: 16 } },
        tooltip: { mode: 'index', intersect: false }
      },
      scales: {
        x: { ticks: { color: textColor, font: { size: 11 } }, grid: { color: 'rgba(108,99,255,0.07)' } },
        y: { ticks: { color: textColor, font: { size: 11 } }, grid: { color: 'rgba(108,99,255,0.07)' }, min: 50, max: 100 }
      }
    }
  });
}

// ---- Activity Doughnut ----
const actCtx = document.getElementById('activityChart');
if (actCtx) {
  new Chart(actCtx, {
    type: 'doughnut',
    data: {
      labels: ['Focused', 'Active', 'Break', 'Idle', 'Distracted'],
      datasets: [{
        data: [45, 22, 14, 11, 8],
        backgroundColor: ['#6c63ff','#00d4aa','#ff9f43','#54a0ff','#ff6b9d'],
        borderWidth: 0, hoverOffset: 6
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false, cutout: '68%',
      plugins: {
        legend: { position: 'bottom', labels: { color: textColor, font: { size: 11 }, padding: 12, boxWidth: 10 } }
      }
    }
  });
}

// ---- Focus vs Distraction Bar ----
const focusCtx = document.getElementById('focusChart');
if (focusCtx) {
  new Chart(focusCtx, {
    type: 'bar',
    data: {
      labels: ['Mon','Tue','Wed','Thu','Fri','Sat'],
      datasets: [
        { label: 'Focus', data: [82,88,91,85,90,78], backgroundColor: 'rgba(108,99,255,0.75)', borderRadius: 5 },
        { label: 'Distraction', data: [18,12,9,15,10,22], backgroundColor: 'rgba(255,107,157,0.75)', borderRadius: 5 }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { labels: { color: textColor, font: { size: 11 }, boxWidth: 10 } } },
      scales: {
        x: { stacked: true, ticks: { color: textColor, font: { size: 10 } }, grid: { display: false } },
        y: { stacked: true, ticks: { color: textColor, font: { size: 10 } }, grid: { color: 'rgba(108,99,255,0.07)' } }
      }
    }
  });
}

// ---- Hourly Active Count ----
const activeCtx = document.getElementById('activeChart');
if (activeCtx) {
  new Chart(activeCtx, {
    type: 'line',
    data: {
      labels: ['8','9','10','11','12','1','2','3','4','5'],
      datasets: [{
        label: 'Active',
        data: [18,22,26,28,20,24,27,25,23,21],
        borderColor: '#00d4aa', backgroundColor: 'rgba(0,212,170,0.1)',
        borderWidth: 2, fill: true, tension: 0.4, pointRadius: 3,
        pointBackgroundColor: '#00d4aa'
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { color: textColor, font: { size: 10 } }, grid: { color: 'rgba(108,99,255,0.07)' } },
        y: { ticks: { color: textColor, font: { size: 10 } }, grid: { color: 'rgba(108,99,255,0.07)' } }
      }
    }
  });
}

// ---- Break Patterns ----
const breakCtx = document.getElementById('breakChart');
if (breakCtx) {
  new Chart(breakCtx, {
    type: 'bar',
    data: {
      labels: ['9AM','10AM','11AM','12PM','1PM','2PM','3PM','4PM'],
      datasets: [{
        label: 'Breaks',
        data: [2,1,3,8,2,4,3,2],
        backgroundColor: 'rgba(255,159,67,0.7)', borderRadius: 5
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { color: textColor, font: { size: 10 } }, grid: { display: false } },
        y: { ticks: { color: textColor, font: { size: 10 } }, grid: { color: 'rgba(108,99,255,0.07)' } }
      }
    }
  });
}

// ---- Burnout Risk Radar ----
const burnoutCtx = document.getElementById('burnoutChart');
if (burnoutCtx) {
  new Chart(burnoutCtx, {
    type: 'radar',
    data: {
      labels: ['Fatigue','Overwork','Low Focus','Long Hours','Stress','Idle Time'],
      datasets: [{
        label: 'Risk Level',
        data: [35, 55, 28, 62, 40, 20],
        borderColor: '#ff6b9d', backgroundColor: 'rgba(255,107,157,0.15)',
        borderWidth: 2, pointBackgroundColor: '#ff6b9d', pointRadius: 4
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        r: {
          ticks: { color: textColor, font: { size: 9 }, backdropColor: 'transparent' },
          grid: { color: 'rgba(108,99,255,0.1)' },
          pointLabels: { color: textColor, font: { size: 10 } },
          min: 0, max: 100
        }
      }
    }
  });
}

// ---- Employee Table Data ----
const employees = [
  { name:'John Doe',    initials:'JD', color:'#6c63ff', role:'Developer',  status:'active',  focus:92, score:94, alert:'none' },
  { name:'Sarah M.',    initials:'SM', color:'#ff6b9d', role:'Designer',   status:'break',   focus:65, score:72, alert:'Long Break' },
  { name:'Raj Kumar',   initials:'RK', color:'#00d4aa', role:'Analyst',    status:'active',  focus:88, score:89, alert:'none' },
  { name:'Amy Liu',     initials:'AL', color:'#ff9f43', role:'Manager',    status:'idle',    focus:42, score:55, alert:'Low Activity' },
  { name:'Tom Harris',  initials:'TH', color:'#54a0ff', role:'Developer',  status:'active',  focus:95, score:97, alert:'none' },
  { name:'Priya S.',    initials:'PS', color:'#a29bfe', role:'QA Engineer',status:'active',  focus:80, score:83, alert:'none' },
];

const tbody = document.getElementById('empTableBody');
if (tbody) {
  employees.forEach(e => {
    const scoreColor = e.score >= 80 ? '#00d4aa' : e.score >= 60 ? '#ff9f43' : '#ff6b9d';
    const alertClass = e.alert === 'none' ? 'none' : e.alert === 'Long Break' ? 'warn' : 'danger';
    tbody.innerHTML += `
      <tr>
        <td><div class="emp-cell">
          <div class="emp-avatar" style="background:${e.color}">${e.initials}</div>
          <div><div class="emp-name">${e.name}</div><div class="emp-role">${e.role}</div></div>
        </div></td>
        <td><span class="status-pill ${e.status}">${e.status.charAt(0).toUpperCase()+e.status.slice(1)}</span></td>
        <td><div class="score-bar">
          <div class="score-track"><div class="score-fill" style="width:${e.focus}%;background:${scoreColor}"></div></div>
          <span class="score-val">${e.focus}%</span>
        </div></td>
        <td><span style="font-weight:700;color:${scoreColor}">${e.score}</span></td>
        <td><span class="alert-tag ${alertClass}">${e.alert === 'none' ? '—' : e.alert}</span></td>
      </tr>`;
  });
}

// ---- Alert Feed ----
const alerts = [
  { color:'red',    msg:'<strong>Amy Liu</strong> — Low activity detected for 25 min', time:'2 min ago' },
  { color:'orange', msg:'<strong>Sarah M.</strong> — Break exceeds 20 minutes', time:'5 min ago' },
  { color:'red',    msg:'<strong>Unknown person</strong> detected in Zone B', time:'8 min ago' },
  { color:'blue',   msg:'<strong>Burnout risk</strong> flagged for Tom Harris', time:'15 min ago' },
  { color:'orange', msg:'<strong>Drowsiness</strong> detected — Employee #3', time:'22 min ago' },
];

const feed = document.getElementById('alertFeed');
if (feed) {
  alerts.forEach(a => {
    feed.innerHTML += `
      <div class="alert-item">
        <div class="alert-dot ${a.color}"></div>
        <div>
          <div class="alert-msg">${a.msg}</div>
          <div class="alert-time">${a.time}</div>
        </div>
      </div>`;
  });
}

// ---- AI Recommendations ----
const recs = [
  { icon:'fa-clock',   color:'#6c63ff', text:'Schedule a 10-min break for Amy Liu — idle 25+ min' },
  { icon:'fa-sun',     color:'#ff9f43', text:'Peak productivity at 10AM — schedule deep work then' },
  { icon:'fa-heart',   color:'#ff6b9d', text:'Tom Harris shows burnout signals — reduce workload' },
  { icon:'fa-bolt',    color:'#00d4aa', text:'Team focus is 8% above weekly average — great day!' },
];

const recsEl = document.getElementById('aiRecs');
if (recsEl) {
  recs.forEach(r => {
    recsEl.innerHTML += `
      <div style="display:flex;align-items:flex-start;gap:10px;padding:10px;background:var(--bg-secondary);border:1px solid var(--border-color);border-radius:8px">
        <div style="width:30px;height:30px;border-radius:8px;background:color-mix(in srgb,${r.color} 15%,transparent);display:flex;align-items:center;justify-content:center;color:${r.color};font-size:13px;flex-shrink:0">
          <i class="fas ${r.icon}"></i>
        </div>
        <div style="font-size:12px;color:var(--text-secondary);line-height:1.5">${r.text}</div>
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

// ---- Live metric ticker ----
function randomDelta(val, range) {
  return Math.max(0, Math.min(100, val + (Math.random() - 0.5) * range));
}
setInterval(() => {
  const focusEl = document.getElementById('m-focus');
  if (focusEl) {
    const v = Math.round(randomDelta(87, 4));
    focusEl.textContent = v + '%';
  }
}, 4000);
