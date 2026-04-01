/* ============================================
   WorkSense AI — Employee Panel JavaScript
   ============================================ */

// Theme
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

// Sidebar
document.getElementById('menuBtn')?.addEventListener('click', () => document.getElementById('sidebar').classList.add('open'));
document.getElementById('sidebarClose')?.addEventListener('click', () => document.getElementById('sidebar').classList.remove('open'));

const textColor = '#8892b0';

const employees = [
  { id:1, name:'John Doe',     initials:'JD', color:'#6c63ff', role:'Senior Developer',  dept:'Engineering', status:'active',  focus:92, productivity:94, workHours:'7h 20m', breakTime:'35m', phone:false, posture:'Good',    burnout:'Low',   anomaly:'None' },
  { id:2, name:'Sarah Miller', initials:'SM', color:'#ff6b9d', role:'UI/UX Designer',    dept:'Design',      status:'break',   focus:65, productivity:72, workHours:'5h 10m', breakTime:'1h 5m',phone:false, posture:'Slouch',  burnout:'Medium',anomaly:'Long Break' },
  { id:3, name:'Raj Kumar',    initials:'RK', color:'#00d4aa', role:'Data Analyst',      dept:'Analytics',   status:'active',  focus:88, productivity:89, workHours:'6h 45m', breakTime:'28m', phone:false, posture:'Good',    burnout:'Low',   anomaly:'None' },
  { id:4, name:'Amy Liu',      initials:'AL', color:'#ff9f43', role:'Product Manager',   dept:'Product',     status:'idle',    focus:42, productivity:55, workHours:'4h 50m', breakTime:'45m', phone:true,  posture:'Leaning', burnout:'High',  anomaly:'Low Activity' },
  { id:5, name:'Tom Harris',   initials:'TH', color:'#54a0ff', role:'Backend Developer', dept:'Engineering', status:'active',  focus:95, productivity:97, workHours:'8h 05m', breakTime:'20m', phone:false, posture:'Good',    burnout:'Medium',anomaly:'None' },
  { id:6, name:'Priya Singh',  initials:'PS', color:'#a29bfe', role:'QA Engineer',       dept:'QA',          status:'active',  focus:80, productivity:83, workHours:'6h 30m', breakTime:'30m', phone:false, posture:'Good',    burnout:'Low',   anomaly:'None' },
  { id:7, name:'Carlos R.',    initials:'CR', color:'#fd79a8', role:'DevOps Engineer',   dept:'Ops',         status:'active',  focus:78, productivity:81, workHours:'7h 00m', breakTime:'25m', phone:false, posture:'Good',    burnout:'Low',   anomaly:'None' },
  { id:8, name:'Lisa Chen',    initials:'LC', color:'#00cec9', role:'Data Scientist',    dept:'Analytics',   status:'break',   focus:70, productivity:75, workHours:'5h 40m', breakTime:'50m', phone:false, posture:'Good',    burnout:'Low',   anomaly:'None' },
];

let currentFilter = 'all';
let timelineChart = null;
let weekChart = null;

function getStatusColor(s) {
  return s === 'active' ? '#00d4aa' : s === 'break' ? '#ff9f43' : '#ff6b9d';
}
function getScoreColor(v) {
  return v >= 80 ? '#00d4aa' : v >= 60 ? '#ff9f43' : '#ff6b9d';
}

function renderCards(filter = 'all', search = '') {
  const grid = document.getElementById('empCardsGrid');
  grid.innerHTML = '';
  const filtered = employees.filter(e => {
    const matchFilter = filter === 'all' || e.status === filter;
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase()) || e.role.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });
  filtered.forEach(e => {
    const sc = getStatusColor(e.status);
    const pc = getScoreColor(e.productivity);
    grid.innerHTML += `
      <div class="emp-card" data-id="${e.id}" style="--emp-color:${e.color}">
        <div class="ec-top">
          <div class="ec-avatar" style="background:${e.color}">${e.initials}</div>
          <div class="ec-status" style="color:${sc}">
            <div class="ec-status-dot" style="background:${sc}"></div>
            ${e.status.charAt(0).toUpperCase()+e.status.slice(1)}
          </div>
        </div>
        <div class="ec-name">${e.name}</div>
        <div class="ec-role">${e.role} · ${e.dept}</div>
        <div class="ec-scores">
          <div class="ec-score"><div class="ec-score-val" style="color:${pc}">${e.productivity}</div><div class="ec-score-lbl">Score</div></div>
          <div class="ec-score"><div class="ec-score-val" style="color:#6c63ff">${e.focus}%</div><div class="ec-score-lbl">Focus</div></div>
          <div class="ec-score"><div class="ec-score-val" style="color:${e.burnout==='High'?'#ff6b9d':e.burnout==='Medium'?'#ff9f43':'#00d4aa'}">${e.burnout}</div><div class="ec-score-lbl">Burnout</div></div>
        </div>
        <div class="ec-bar-row">
          <span class="ec-bar-lbl">Focus</span>
          <div class="ec-bar-track"><div class="ec-bar-fill" style="width:${e.focus}%;background:#6c63ff"></div></div>
          <span class="ec-bar-val">${e.focus}%</span>
        </div>
        <div class="ec-bar-row">
          <span class="ec-bar-lbl">Prod.</span>
          <div class="ec-bar-track"><div class="ec-bar-fill" style="width:${e.productivity}%;background:${pc}"></div></div>
          <span class="ec-bar-val">${e.productivity}</span>
        </div>
        <div class="ec-footer">
          <span class="ec-time"><i class="fas fa-clock"></i> ${e.workHours}</span>
          <button class="ec-view-btn" onclick="showDetail(${e.id})">View Detail</button>
        </div>
      </div>`;
  });
}

function showDetail(id) {
  const e = employees.find(x => x.id === id);
  if (!e) return;
  document.getElementById('empCardsGrid').style.display = 'none';
  document.querySelector('.filter-bar').style.display = 'none';
  const panel = document.getElementById('empDetail');
  panel.style.display = 'block';
  document.getElementById('edpTitle').textContent = e.name + ' — Detail View';

  const pc = getScoreColor(e.productivity);
  document.getElementById('edpProfile').innerHTML = `
    <div class="edp-avatar" style="background:${e.color}">${e.initials}</div>
    <div class="edp-name">${e.name}</div>
    <div class="edp-role-tag">${e.role} · ${e.dept}</div>
    <div class="edp-info-row"><span>Status</span><span style="color:${getStatusColor(e.status)}">${e.status.charAt(0).toUpperCase()+e.status.slice(1)}</span></div>
    <div class="edp-info-row"><span>Work Hours</span><span>${e.workHours}</span></div>
    <div class="edp-info-row"><span>Break Time</span><span>${e.breakTime}</span></div>
    <div class="edp-info-row"><span>Posture</span><span>${e.posture}</span></div>
    <div class="edp-info-row"><span>Phone Usage</span><span style="color:${e.phone?'#ff6b9d':'#00d4aa'}">${e.phone?'Detected':'None'}</span></div>
    <div class="edp-info-row"><span>Burnout Risk</span><span style="color:${e.burnout==='High'?'#ff6b9d':e.burnout==='Medium'?'#ff9f43':'#00d4aa'}">${e.burnout}</span></div>
    <div class="edp-info-row"><span>Anomaly</span><span style="color:${e.anomaly==='None'?'#00d4aa':'#ff9f43'}">${e.anomaly}</span></div>`;

  document.getElementById('edpMetrics').innerHTML = `
    <div style="font-size:14px;font-weight:700;color:var(--text-primary);margin-bottom:8px">Performance Metrics</div>
    ${[
      ['Productivity Score', e.productivity, pc],
      ['Focus Score', e.focus, '#6c63ff'],
      ['Attention Level', Math.round(e.focus * 0.95), '#54a0ff'],
      ['Engagement', Math.round(e.productivity * 0.9), '#00d4aa'],
    ].map(([lbl, val, col]) => `
      <div>
        <div class="edp-metric-row"><span class="edp-metric-label">${lbl}</span><span class="edp-metric-val" style="color:${col}">${val}${lbl.includes('Score')||lbl.includes('Level')||lbl.includes('Engagement')?'':''}</span></div>
        <div style="height:5px;background:var(--border-color);border-radius:3px;overflow:hidden;margin-top:4px">
          <div style="height:100%;width:${val}%;background:${col};border-radius:3px"></div>
        </div>
      </div>`).join('')}`;

  // Timeline chart
  if (timelineChart) timelineChart.destroy();
  const tlCtx = document.getElementById('empTimelineChart');
  if (tlCtx) {
    timelineChart = new Chart(tlCtx, {
      type: 'line',
      data: {
        labels: ['8AM','9AM','10AM','11AM','12PM','1PM','2PM','3PM','4PM','5PM'],
        datasets: [{
          label: 'Productivity',
          data: Array.from({length:10}, () => Math.round(e.productivity + (Math.random()-0.5)*20)),
          borderColor: e.color, backgroundColor: e.color + '18',
          borderWidth: 2.5, fill: true, tension: 0.4, pointRadius: 4,
          pointBackgroundColor: e.color
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { color: textColor, font: { size: 10 } }, grid: { color: 'rgba(108,99,255,0.07)' } },
          y: { ticks: { color: textColor, font: { size: 10 } }, grid: { color: 'rgba(108,99,255,0.07)' }, min: 40, max: 100 }
        }
      }
    });
  }

  // Weekly chart
  if (weekChart) weekChart.destroy();
  const wkCtx = document.getElementById('empWeekChart');
  if (wkCtx) {
    weekChart = new Chart(wkCtx, {
      type: 'bar',
      data: {
        labels: ['Mon','Tue','Wed','Thu','Fri'],
        datasets: [
          { label: 'Productivity', data: Array.from({length:5}, () => Math.round(e.productivity + (Math.random()-0.5)*15)), backgroundColor: 'rgba(108,99,255,0.7)', borderRadius: 5 },
          { label: 'Focus', data: Array.from({length:5}, () => Math.round(e.focus + (Math.random()-0.5)*12)), backgroundColor: 'rgba(0,212,170,0.7)', borderRadius: 5 }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { labels: { color: textColor, font: { size: 11 }, boxWidth: 10 } } },
        scales: {
          x: { ticks: { color: textColor, font: { size: 10 } }, grid: { display: false } },
          y: { ticks: { color: textColor, font: { size: 10 } }, grid: { color: 'rgba(108,99,255,0.07)' }, min: 40, max: 100 }
        }
      }
    });
  }
}

document.getElementById('edpBack')?.addEventListener('click', () => {
  document.getElementById('empDetail').style.display = 'none';
  document.getElementById('empCardsGrid').style.display = 'grid';
  document.querySelector('.filter-bar').style.display = 'flex';
});

document.querySelectorAll('.ftab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.ftab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    currentFilter = tab.dataset.filter;
    renderCards(currentFilter, document.getElementById('empSearch')?.value || '');
  });
});

document.getElementById('empSearch')?.addEventListener('input', e => {
  renderCards(currentFilter, e.target.value);
});

renderCards();
