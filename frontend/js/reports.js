/* ============================================
   WorkSense AI — Reports JavaScript
   ============================================ */

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
document.getElementById('menuBtn')?.addEventListener('click', () => document.getElementById('sidebar').classList.add('open'));
document.getElementById('sidebarClose')?.addEventListener('click', () => document.getElementById('sidebar').classList.remove('open'));

const tc = '#8892b0';
const gc = 'rgba(108,99,255,0.07)';

// Report type tabs
const reportTitles = {
  daily:   ['Daily Productivity Report',   'Tuesday, March 31, 2026'],
  weekly:  ['Weekly Performance Report',   'March 25 – March 31, 2026'],
  monthly: ['Monthly Analytics Report',    'March 2026'],
  custom:  ['Custom Date Range Report',    'Select date range above'],
};
document.querySelectorAll('.report-type-card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.report-type-card').forEach(c => c.classList.remove('active'));
    card.classList.add('active');
    const [title, date] = reportTitles[card.dataset.type];
    document.getElementById('rpTitle').textContent = title;
    document.getElementById('rpDate').textContent = date;
  });
});

// Report Chart 1
const rc1 = document.getElementById('reportChart1');
if (rc1) {
  new Chart(rc1, {
    type: 'line',
    data: {
      labels: ['8AM','9AM','10AM','11AM','12PM','1PM','2PM','3PM','4PM','5PM'],
      datasets: [{
        label: 'Productivity',
        data: [65,72,88,91,75,82,94,89,85,90],
        borderColor: '#6c63ff', backgroundColor: 'rgba(108,99,255,0.1)',
        borderWidth: 2.5, fill: true, tension: 0.4, pointRadius: 4,
        pointBackgroundColor: '#6c63ff'
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

// Report Chart 2
const rc2 = document.getElementById('reportChart2');
if (rc2) {
  new Chart(rc2, {
    type: 'doughnut',
    data: {
      labels: ['Focused','Active Work','Break','Idle','Distracted'],
      datasets: [{
        data: [45,22,14,11,8],
        backgroundColor: ['#6c63ff','#00d4aa','#ff9f43','#54a0ff','#ff6b9d'],
        borderWidth: 0, hoverOffset: 6
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false, cutout: '65%',
      plugins: { legend: { position: 'bottom', labels: { color: tc, font: { size: 10 }, padding: 10, boxWidth: 8 } } }
    }
  });
}

// Employee Report Table
const employees = [
  { name:'John Doe',     initials:'JD', color:'#6c63ff', dept:'Engineering', hours:'7h 20m', focus:92, prod:94, breaks:'35m', alert:'None',        status:'active' },
  { name:'Sarah Miller', initials:'SM', color:'#ff6b9d', dept:'Design',      hours:'5h 10m', focus:65, prod:72, breaks:'1h 5m',alert:'Long Break',  status:'break'  },
  { name:'Raj Kumar',    initials:'RK', color:'#00d4aa', dept:'Analytics',   hours:'6h 45m', focus:88, prod:89, breaks:'28m', alert:'None',        status:'active' },
  { name:'Amy Liu',      initials:'AL', color:'#ff9f43', dept:'Product',     hours:'4h 50m', focus:42, prod:55, breaks:'45m', alert:'Low Activity',status:'idle'   },
  { name:'Tom Harris',   initials:'TH', color:'#54a0ff', dept:'Engineering', hours:'8h 05m', focus:95, prod:97, breaks:'20m', alert:'Burnout Risk',status:'active' },
  { name:'Priya Singh',  initials:'PS', color:'#a29bfe', dept:'QA',          hours:'6h 30m', focus:80, prod:83, breaks:'30m', alert:'None',        status:'active' },
  { name:'Carlos R.',    initials:'CR', color:'#fd79a8', dept:'Ops',         hours:'7h 00m', focus:78, prod:81, breaks:'25m', alert:'None',        status:'active' },
  { name:'Lisa Chen',    initials:'LC', color:'#00cec9', dept:'Analytics',   hours:'5h 40m', focus:70, prod:75, breaks:'50m', alert:'None',        status:'break'  },
];

const tbody = document.getElementById('reportTableBody');
if (tbody) {
  employees.forEach((e, i) => {
    const pc = e.prod >= 80 ? '#00d4aa' : e.prod >= 60 ? '#ff9f43' : '#ff6b9d';
    const ac = e.alert === 'None' ? 'none' : e.alert.includes('Break') ? 'warn' : 'danger';
    tbody.innerHTML += `
      <tr>
        <td style="color:var(--text-muted)">${i+1}</td>
        <td><div class="emp-cell">
          <div class="emp-avatar" style="background:${e.color}">${e.initials}</div>
          <span class="emp-name">${e.name}</span>
        </div></td>
        <td>${e.dept}</td>
        <td>${e.hours}</td>
        <td><span style="color:#6c63ff;font-weight:700">${e.focus}%</span></td>
        <td><div class="score-bar">
          <div class="score-track"><div class="score-fill" style="width:${e.prod}%;background:${pc}"></div></div>
          <span class="score-val">${e.prod}</span>
        </div></td>
        <td>${e.breaks}</td>
        <td><span class="alert-tag ${ac}">${e.alert}</span></td>
        <td><span class="status-pill ${e.status}">${e.status.charAt(0).toUpperCase()+e.status.slice(1)}</span></td>
      </tr>`;
  });
}

// AI Insights
const insights = [
  { icon:'fa-sun',   color:'#ff9f43', text:'<strong>Peak productivity</strong> observed between 10AM–11AM. Schedule critical tasks in this window.' },
  { icon:'fa-fire',  color:'#ff6b9d', text:'<strong>Tom Harris</strong> shows burnout signals — 8+ hour workdays for 5 consecutive days.' },
  { icon:'fa-clock', color:'#6c63ff', text:'<strong>Break optimization:</strong> Team takes 38% of breaks between 12–1PM. Stagger to reduce idle time.' },
  { icon:'fa-chart-line', color:'#00d4aa', text:'<strong>Productivity up 6%</strong> this week vs last week. AI monitoring is showing measurable impact.' },
];
const rpiGrid = document.getElementById('rpiGrid');
if (rpiGrid) {
  insights.forEach(ins => {
    rpiGrid.innerHTML += `
      <div class="rpi-item">
        <div class="rpi-icon" style="background:color-mix(in srgb,${ins.color} 15%,transparent);color:${ins.color}">
          <i class="fas ${ins.icon}"></i>
        </div>
        <div class="rpi-text">${ins.text}</div>
      </div>`;
  });
}

// Export buttons (demo)
document.getElementById('exportCSV')?.addEventListener('click', () => {
  const btn = document.getElementById('exportCSV');
  btn.innerHTML = '<i class="fas fa-check"></i> Exported!';
  setTimeout(() => btn.innerHTML = '<i class="fas fa-file-csv"></i> Export CSV', 2000);
});
document.getElementById('exportPDF')?.addEventListener('click', () => {
  const btn = document.getElementById('exportPDF');
  btn.innerHTML = '<i class="fas fa-check"></i> Exported!';
  setTimeout(() => btn.innerHTML = '<i class="fas fa-file-pdf"></i> Export PDF', 2000);
});
