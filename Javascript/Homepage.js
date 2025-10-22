const btn = document.getElementById('sidebarToggle');
const backdrop = document.getElementById('drawerBackdrop');

function toggle() {
  document.body.classList.toggle('sidebar-open');
  const opened = document.body.classList.contains('sidebar-open');
  if (btn) btn.setAttribute('aria-expanded', String(opened));
}

if (btn) btn.addEventListener('click', toggle);
if (backdrop) backdrop.addEventListener('click', toggle);