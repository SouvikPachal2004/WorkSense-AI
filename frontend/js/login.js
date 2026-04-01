/* ============================================================
   WorkSense AI — Login Page JavaScript
   Role-based authentication: Admin → admin dashboard
                              Employee → employee dashboard
   ============================================================ */

// ---- Theme ----
const html      = document.documentElement;
const themeIcon = document.getElementById('themeIcon');
const saved     = localStorage.getItem('ws-theme') || 'dark';
html.setAttribute('data-theme', saved);
themeIcon.className = saved === 'dark' ? 'fas fa-moon' : 'fas fa-sun';

document.getElementById('themeToggle').addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('ws-theme', next);
  themeIcon.className = next === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
});

// ---- Auth Tabs (Sign In / Sign Up) ----
document.querySelectorAll('.ltab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.ltab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.form + 'Form').classList.add('active');
  });
});

// ---- Password Toggle ----
document.querySelectorAll('.toggle-pass').forEach(btn => {
  btn.addEventListener('click', () => {
    const input = document.getElementById(btn.dataset.target);
    const isPass = input.type === 'password';
    input.type = isPass ? 'text' : 'password';
    btn.querySelector('i').className = isPass ? 'fas fa-eye-slash' : 'fas fa-eye';
  });
});

// ---- Role Selection ----
// Track selected role per form
const selectedRole = { signin: 'admin', signup: 'admin' };

function setupRoleCards(formId) {
  const form = document.getElementById(formId + 'Form');
  if (!form) return;

  form.querySelectorAll('.role-card').forEach(card => {
    card.addEventListener('click', () => {
      // Deactivate all in this form
      form.querySelectorAll('.role-card').forEach(c => c.classList.remove('active'));
      // Activate clicked
      card.classList.add('active');
      selectedRole[formId] = card.dataset.role;

      // Update button label
      const roleLabel = document.getElementById(formId + 'RoleLabel');
      if (roleLabel) {
        roleLabel.textContent = card.dataset.role === 'admin' ? 'Admin' : 'Employee';
      }

      // Update right panel info (only for signin form, but works for both)
      updateRightPanel(card.dataset.role);
    });
  });
}

function updateRightPanel(role) {
  document.querySelectorAll('.rip-card').forEach(c => c.classList.remove('active'));
  const target = document.getElementById('rip-' + role);
  if (target) target.classList.add('active');
}

setupRoleCards('signin');
setupRoleCards('signup');

// ---- Form Submit — redirect based on role ----
document.getElementById('signinForm').addEventListener('submit', e => {
  e.preventDefault();
  const role = selectedRole.signin;
  localStorage.setItem('ws-role', role);
  localStorage.setItem('ws-user', JSON.stringify({
    name:  role === 'admin' ? 'Admin User' : 'John Doe',
    email: role === 'admin' ? 'admin@worksense.ai' : 'john@worksense.ai',
    role
  }));
  // Redirect based on role
  window.location.href = role === 'admin' ? 'dashboard.html' : 'employee-dashboard.html';
});

document.getElementById('signupForm').addEventListener('submit', e => {
  e.preventDefault();
  const role = selectedRole.signup;
  localStorage.setItem('ws-role', role);
  localStorage.setItem('ws-user', JSON.stringify({
    name:  role === 'admin' ? 'Admin User' : 'New Employee',
    email: role === 'admin' ? 'admin@worksense.ai' : 'employee@worksense.ai',
    role
  }));
  window.location.href = role === 'admin' ? 'dashboard.html' : 'employee-dashboard.html';
});
