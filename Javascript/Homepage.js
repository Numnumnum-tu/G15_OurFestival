const body = document.body;
  const btn = document.getElementById('sidebarToggle');

  // โหลดสถานะเดิม
  const saved = localStorage.getItem('sidebar-collapsed') === '1';
  if (saved) {
    body.classList.add('sidebar-collapsed');
    btn.setAttribute('aria-expanded', 'false');
  }

  btn.addEventListener('click', () => {
    const collapsed = body.classList.toggle('sidebar-collapsed');
    btn.setAttribute('aria-expanded', String(!collapsed));
    localStorage.setItem('sidebar-collapsed', collapsed ? '1' : '0');
});