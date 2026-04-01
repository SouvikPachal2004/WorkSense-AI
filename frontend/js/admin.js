/* ============================================
   WorkSense AI — Admin Panel JavaScript
   ============================================ */

const html = document.documentElement;
// Auth guard
const wsUser = JSON.parse(localStorage.getItem('ws-user') || '{}');
if (wsUser.role === 'employee') window.location.href = 'employee-dashboard.html';
html.setAttribute('data-theme', localStorage.getItem('ws-theme') || 'dark');
const themeIcon = document.getElementById('themeIcon');
if (themeIcon) themeIcon.className = html.getAttribute('data-theme') === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
document.getElementById('themeToggle')?.addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('ws-theme', next);
  document.getElementById('themeIcon').className = next === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
});
document.getElementById('menuBtn')?.addEventListener('click', () => document.getElementById('sidebar').classList.add('open'));
document.getElementById('sidebarClose')?.addEventListener('click', () => document.getElementById('sidebar').classList.remove('open'));

const textColor = '#8892b0';

const employees = [
  { name:'John Doe',     initials:'JD', color:'#6c63ff', dept:'Engineering', status:'active',  prod:94, focus:92, burnout:'Low',    hours:'7h 20m', alert:'None' },
  { name:'Sarah Miller', initials:'SM', color:'#ff6b9d', dept:'Design',      status:'break',   prod:72, focus:65, burnout:'Medium', hours:'5h 10m', alert:'Long Break' },
  { name:'Raj Kumar',    initials:'RK', color:'#00d4aa', dept:'Analytics',   status:'active',  prod:89, focus:88, burnout:'Low',    hours:'6h 45m', alert:'None' },
  { name:'Amy Liu',      initials:'AL', color:'#ff9f43', dept:'Product',     status:'idle',    prod:55, focus:42, burnout:'High',   hours:'4h 50m', alert:'Low Activity' },
  { name:'Tom Harris',   initials:'TH', color:'#54a0ff', dept:'Engineering', status:'active',  prod:97, focus:95, burnout:'Medium', hours:'8h 05m', alert:'Burnout Risk' },
  { name:'Priya Singh',  initials:'PS', color:'#a29bfe', dept:'QA',          status:'active',  prod:83, focus:80, burnout:'Low',    hours:'6h 30m', alert:'None' },
  { name:'Carlos R.',    initials:'CR', color:'#fd79a8', dept:'Ops',         status:'active',  prod:81, focus:78, burnout:'Low',    hours:'7h 00m', alert:'None' },
  { name:'Lisa Chen',    initials:'LC', color:'#00cec9', dept:'Analytics',   status:'break',   prod:75, focus:70, burnout:'Low',    hours:'5h 40m', alert:'None' },
];

// Top Performers
const sorted = [...employees].sort((a,b) => b.prod - a.prod);
const topEl = document.getElementById('topPerformers');
if (topEl) {
  sorted.slice(0,4).forEach((e,i) => {
    const medals = ['🥇','🥈','🥉','4️⃣'];
    topEl.innerHTML += `
      <div style="display:flex;align-items:center;gap:10px;padding:8px;background:var(--bg-secondary);border-radius:8px">
        <span style="font-size:16px">${medals[i]}</span>
        <div class="emp-avatar" style="background:${e.color};width:28px;height:28px;font-size:10px">${e.initials}</div>
        <div style="flex:1"><div style="font-size:13px;font-weight:600;color:var(--text-primary)">${e.name}</div><div style="font-size:11px;color:var(--text-muted)">${e.dept}</div></div>
        <span style="font-size:15px;font-weight:800;color:#00d4aa">${e.prod}</span>
      </div>`;
  });
}

// Low Performers
const lowEl = document.getElementById('lowPerformers');
if (lowEl) {
  sorted.slice(-4).reverse().forEach(e => {
    const c = e.prod >= 70 ? '#ff9f43' : '#ff6b9d';
    lowEl.innerHTML += `
      <div style="display:flex;align-items:center;gap:10px;padding:8px;background:var(--bg-secondary);border-radius:8px">
        <div class="emp-avatar" style="background:${e.color};width:28px;height:28px;font-size:10px">${e.initials}</div>
        <div style="flex:1"><div style="font-size:13px;font-weight:600;color:var(--text-primary)">${e.name}</div><div style="font-size:11px;color:var(--text-muted)">${e.dept}</div></div>
        <span style="font-size:15px;font-weight:800;color:${c}">${e.prod}</span>
      </div>`;
  });
}

// Dept Chart
const deptCtx = document.getElementById('deptChart');
if (deptCtx) {
  new Chart(deptCtx, {
    type: 'bar',
    data: {
      labels: ['Engineering','Design','Analytics','Product','QA','Ops'],
      datasets: [{
        data: [92, 78, 85, 62, 83, 81],
        backgroundColor: ['#6c63ff','#ff6b9d','#00d4aa','#ff9f43','#a29bfe','#54a0ff'],
        borderRadius: 6
      }]
    },
    options: {
      indexAxis: 'y', responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { color: textColor, font: { size: 10 } }, grid: { color: 'rgba(108,99,255,0.07)' }, min: 0, max: 100 },
        y: { ticks: { color: textColor, font: { size: 10 } }, grid: { display: false } }
      }
    }
  });
}

// Team Weekly Chart
const twCtx = document.getElementById('teamWeekChart');
if (twCtx) {
  new Chart(twCtx, {
    type: 'line',
    data: {
      labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
      datasets: [
        { label: 'Engineering', data: [88,91,94,89,92,85,0], borderColor:'#6c63ff', backgroundColor:'rgba(108,99,255,0.05)', borderWidth:2, fill:false, tension:0.4, pointRadius:3 },
        { label: 'Design',      data: [75,78,80,76,79,72,0], borderColor:'#ff6b9d', backgroundColor:'rgba(255,107,157,0.05)', borderWidth:2, fill:false, tension:0.4, pointRadius:3 },
        { label: 'Analytics',   data: [82,85,88,83,87,80,0], borderColor:'#00d4aa', backgroundColor:'rgba(0,212,170,0.05)',   borderWidth:2, fill:false, tension:0.4, pointRadius:3 },
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { labels: { color: textColor, font: { size: 11 }, boxWidth: 10 } } },
      scales: {
        x: { ticks: { color: textColor, font: { size: 11 } }, grid: { color: 'rgba(108,99,255,0.07)' } },
        y: { ticks: { color: textColor, font: { size: 11 } }, grid: { color: 'rgba(108,99,255,0.07)' }, min: 60, max: 100 }
      }
    }
  });
}

// Attendance Chart
const attCtx = document.getElementById('attendanceChart');
if (attCtx) {
  new Chart(attCtx, {
    type: 'bar',
    data: {
      labels: ['Mon','Tue','Wed','Thu','Fri'],
      datasets: [
        { label: 'Present', data: [26,27,28,25,27], backgroundColor: 'rgba(0,212,170,0.7)', borderRadius: 5 },
        { label: 'Absent',  data: [2,1,0,3,1],      backgroundColor: 'rgba(255,107,157,0.7)', borderRadius: 5 }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { labels: { color: textColor, font: { size: 11 }, boxWidth: 10 } } },
      scales: {
        x: { stacked: true, ticks: { color: textColor, font: { size: 11 } }, grid: { display: false } },
        y: { stacked: true, ticks: { color: textColor, font: { size: 11 } }, grid: { color: 'rgba(108,99,255,0.07)' } }
      }
    }
  });
}

// Admin Table
const tbody = document.getElementById('adminTableBody');
if (tbody) {
  employees.forEach(e => {
    const pc = e.prod >= 80 ? '#00d4aa' : e.prod >= 60 ? '#ff9f43' : '#ff6b9d';
    const bc = e.burnout === 'High' ? '#ff6b9d' : e.burnout === 'Medium' ? '#ff9f43' : '#00d4aa';
    const ac = e.alert === 'None' ? 'none' : e.alert.includes('Break') ? 'warn' : 'danger';
    tbody.innerHTML += `
      <tr>
        <td><div class="emp-cell">
          <div class="emp-avatar" style="background:${e.color}">${e.initials}</div>
          <div><div class="emp-name">${e.name}</div></div>
        </div></td>
        <td>${e.dept}</td>
        <td><span class="status-pill ${e.status}">${e.status.charAt(0).toUpperCase()+e.status.slice(1)}</span></td>
        <td><div class="score-bar">
          <div class="score-track"><div class="score-fill" style="width:${e.prod}%;background:${pc}"></div></div>
          <span class="score-val">${e.prod}</span>
        </div></td>
        <td><span style="color:#6c63ff;font-weight:700">${e.focus}%</span></td>
        <td><span style="color:${bc};font-weight:600">${e.burnout}</span></td>
        <td>${e.hours}</td>
        <td><span class="alert-tag ${ac}">${e.alert}</span></td>
        <td>
          <button style="padding:4px 10px;border-radius:6px;background:rgba(108,99,255,0.1);border:1px solid rgba(108,99,255,0.2);color:#6c63ff;font-size:11px;cursor:pointer">View</button>
        </td>
      </tr>`;
  });
}

// Alerts
const alertsData = [
  { color:'red',    msg:'<strong>Amy Liu</strong> — Low activity 25+ min', time:'2 min ago' },
  { color:'orange', msg:'<strong>Sarah M.</strong> — Break exceeds 20 min', time:'5 min ago' },
  { color:'red',    msg:'<strong>Unknown person</strong> detected Zone B', time:'8 min ago' },
  { color:'blue',   msg:'<strong>Burnout risk</strong> — Tom Harris', time:'15 min ago' },
  { color:'orange', msg:'<strong>Drowsiness</strong> — Employee #3', time:'22 min ago' },
];
const alertsEl = document.getElementById('adminAlerts');
if (alertsEl) {
  alertsData.forEach(a => {
    alertsEl.innerHTML += `<div class="alert-item"><div class="alert-dot ${a.color}"></div><div><div class="alert-msg">${a.msg}</div><div class="alert-time">${a.time}</div></div></div>`;
  });
}

// Anomaly Log
const anomalies = [
  { type:'Excessive Break',   emp:'Sarah M.',  time:'10:45 AM', severity:'Medium' },
  { type:'Low Activity',      emp:'Amy Liu',   time:'11:20 AM', severity:'High' },
  { type:'Unknown Person',    emp:'Zone B',    time:'11:35 AM', severity:'High' },
  { type:'Burnout Pattern',   emp:'Tom Harris',time:'09:15 AM', severity:'Medium' },
  { type:'Phone Usage',       emp:'Carlos R.', time:'02:10 PM', severity:'Low' },
];
const anomalyEl = document.getElementById('anomalyLog');
if (anomalyEl) {
  anomalies.forEach(a => {
    const c = a.severity === 'High' ? '#ff6b9d' : a.severity === 'Medium' ? '#ff9f43' : '#54a0ff';
    anomalyEl.innerHTML += `
      <div style="display:flex;align-items:center;gap:10px;padding:10px;background:var(--bg-secondary);border:1px solid var(--border-color);border-radius:8px">
        <div style="width:8px;height:8px;border-radius:50%;background:${c};flex-shrink:0"></div>
        <div style="flex:1">
          <div style="font-size:13px;font-weight:600;color:var(--text-primary)">${a.type}</div>
          <div style="font-size:11px;color:var(--text-muted)">${a.emp} · ${a.time}</div>
        </div>
        <span style="font-size:10px;font-weight:700;color:${c};padding:2px 8px;background:${c}18;border-radius:20px">${a.severity}</span>
      </div>`;
  });
}

document.querySelectorAll('.chart-actions').forEach(group => {
  group.querySelectorAll('.chart-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      group.querySelectorAll('.chart-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
});
