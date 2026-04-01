/* ============================================================
   WorkSense AI — Analytics JavaScript
   All charts use compact heights (130–150px)
   ============================================================ */

// ---- Auth guard ----
const wsUser = JSON.parse(localStorage.getItem('ws-user') || '{}');
if (wsUser.role === 'employee') window.location.href = 'employee-dashboard.html';

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
document.getElementById('menuBtn')?.addEventListener('click', () => document.getElementById('sidebar').classList.add('open'));
document.getElementById('sidebarClose')?.addEventListener('click', () => document.getElementById('sidebar').classList.remove('open'));

// Shared chart defaults
const tc = '#8892b0';
const gc = 'rgba(108,99,255,0.07)';
const defaultScales = {
  x: { ticks: { color: tc, font: { size: 10 } }, grid: { color: gc } },
  y: { ticks: { color: tc, font: { size: 10 } }, grid: { color: gc } }
};
const defaultLegend = { labels: { color: tc, font: { size: 11 }, boxWidth: 10, padding: 10 } };

// ---- Monthly Trend ----
const mCtx = document.getElementById('monthlyChart');
if (mCtx) {
  new Chart(mCtx, {
    type: 'line',
    data: {
      labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
      datasets: [
        { label: 'Productivity', data: [72,74,76,79,82,85,83,87,89,88,91,90], borderColor: '#6c63ff', backgroundColor: 'rgba(108,99,255,0.08)', borderWidth: 2, fill: true, tension: 0.4, pointRadius: 3 },
        { label: 'Focus',        data: [68,70,73,76,79,82,80,84,86,85,88,87], borderColor: '#00d4aa', backgroundColor: 'transparent', borderWidth: 1.5, fill: false, tension: 0.4, pointRadius: 2 },
        { label: 'Engagement',   data: [65,68,71,74,77,80,78,82,84,83,86,85], borderColor: '#ff9f43', backgroundColor: 'transparent', borderWidth: 1.5, fill: false, tension: 0.4, pointRadius: 2 }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: defaultLegend },
      scales: { x: { ...defaultScales.x }, y: { ...defaultScales.y, min: 60, max: 100 } }
    }
  });
}

// ---- Behavioral Clusters (Scatter) ----
const clCtx = document.getElementById('clusterChart');
if (clCtx) {
  const cluster = (cx, cy, n, s) => Array.from({ length: n }, () => ({ x: cx + (Math.random() - 0.5) * s, y: cy + (Math.random() - 0.5) * s }));
  new Chart(clCtx, {
    type: 'scatter',
    data: {
      datasets: [
        { label: 'High Performers', data: cluster(85, 90, 7, 10), backgroundColor: 'rgba(0,212,170,0.75)',   pointRadius: 6 },
        { label: 'Average',         data: cluster(65, 70, 9, 12), backgroundColor: 'rgba(108,99,255,0.75)', pointRadius: 6 },
        { label: 'At Risk',         data: cluster(45, 50, 5, 10), backgroundColor: 'rgba(255,107,157,0.75)', pointRadius: 6 },
        { label: 'Burnout Risk',    data: cluster(35, 38, 3,  8), backgroundColor: 'rgba(255,159,67,0.75)',  pointRadius: 6 },
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: defaultLegend },
      scales: {
        x: { ...defaultScales.x, title: { display: true, text: 'Focus Score', color: tc, font: { size: 10 } }, min: 20, max: 100 },
        y: { ...defaultScales.y, title: { display: true, text: 'Productivity', color: tc, font: { size: 10 } }, min: 20, max: 100 }
      }
    }
  });
}

// ---- Hourly Focus Heatmap ----
const hmCtx = document.getElementById('heatmapChart');
if (hmCtx) {
  new Chart(hmCtx, {
    type: 'bar',
    data: {
      labels: ['8AM','9AM','10AM','11AM','12PM','1PM','2PM','3PM','4PM','5PM'],
      datasets: [{
        label: 'Avg Focus %',
        data: [68, 78, 91, 89, 72, 80, 88, 85, 82, 75],
        backgroundColor: (ctx) => {
          const v = ctx.raw;
          return v >= 85 ? 'rgba(0,212,170,0.75)' : v >= 70 ? 'rgba(108,99,255,0.75)' : 'rgba(255,159,67,0.75)';
        },
        borderRadius: 5
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { ...defaultScales.x },
        y: { ...defaultScales.y, min: 50, max: 100 }
      }
    }
  });
}

// ---- Productivity Forecast ----
const predCtx = document.getElementById('predictionChart');
if (predCtx) {
  new Chart(predCtx, {
    type: 'line',
    data: {
      labels: ['Today','D+1','D+2','D+3','D+4','D+5','D+6'],
      datasets: [
        { label: 'Actual',    data: [88, null, null, null, null, null, null], borderColor: '#6c63ff', backgroundColor: 'rgba(108,99,255,0.1)', borderWidth: 2.5, fill: true, tension: 0.4, pointRadius: 5, pointBackgroundColor: '#6c63ff' },
        { label: 'Predicted', data: [88, 86, 89, 91, 88, 90, 92], borderColor: '#00d4aa', borderDash: [5, 3], borderWidth: 2, fill: false, tension: 0.4, pointRadius: 3, pointBackgroundColor: '#00d4aa' }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: defaultLegend },
      scales: {
        x: { ...defaultScales.x },
        y: { ...defaultScales.y, min: 75, max: 100 }
      }
    }
  });
}

// ---- Distraction Sources ----
const distCtx = document.getElementById('distractionChart');
if (distCtx) {
  new Chart(distCtx, {
    type: 'doughnut',
    data: {
      labels: ['Phone', 'Looking Away', 'Drowsiness', 'Idle', 'Social Media'],
      datasets: [{
        data: [28, 22, 15, 20, 15],
        backgroundColor: ['#ff6b9d', '#ff9f43', '#a29bfe', '#54a0ff', '#fd79a8'],
        borderWidth: 0, hoverOffset: 5
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false, cutout: '60%',
      plugins: { legend: { position: 'bottom', labels: { color: tc, font: { size: 10 }, padding: 8, boxWidth: 8 } } }
    }
  });
}

// ---- Focus Distribution ----
const fdCtx = document.getElementById('focusDistChart');
if (fdCtx) {
  new Chart(fdCtx, {
    type: 'bar',
    data: {
      labels: ['8AM','9AM','10AM','11AM','12PM','1PM','2PM','3PM','4PM','5PM'],
      datasets: [{
        label: 'Focus %',
        data: [68, 78, 91, 89, 72, 80, 88, 85, 82, 75],
        backgroundColor: (ctx) => {
          const v = ctx.raw;
          return v >= 85 ? 'rgba(0,212,170,0.75)' : v >= 70 ? 'rgba(108,99,255,0.75)' : 'rgba(255,159,67,0.75)';
        },
        borderRadius: 5
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { ...defaultScales.x },
        y: { ...defaultScales.y, min: 50, max: 100 }
      }
    }
  });
}

// ---- Burnout Trend ----
const btCtx = document.getElementById('burnoutTrendChart');
if (btCtx) {
  new Chart(btCtx, {
    type: 'line',
    data: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [
        { label: 'High Risk',   data: [1, 2, 2, 2], borderColor: '#ff6b9d', backgroundColor: 'rgba(255,107,157,0.1)', borderWidth: 2, fill: true, tension: 0.4, pointRadius: 5, pointBackgroundColor: '#ff6b9d' },
        { label: 'Medium Risk', data: [3, 3, 4, 3], borderColor: '#ff9f43', backgroundColor: 'rgba(255,159,67,0.08)', borderWidth: 2, fill: true, tension: 0.4, pointRadius: 5, pointBackgroundColor: '#ff9f43' },
        { label: 'Low Risk',    data: [24, 23, 22, 23], borderColor: '#00d4aa', backgroundColor: 'transparent', borderWidth: 1.5, fill: false, tension: 0.4, pointRadius: 4, pointBackgroundColor: '#00d4aa' }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: defaultLegend },
      scales: {
        x: { ...defaultScales.x },
        y: { ...defaultScales.y }
      }
    }
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
