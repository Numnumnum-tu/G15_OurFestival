document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('sidebarToggle');
  const sidebar = document.querySelector('.left-side');

  btn.addEventListener('click', () => {
    const open = sidebar.classList.toggle('active');
    btn.setAttribute('aria-expanded', String(open));
    console.log('toggle sidebar:', open); // ไว้เช็กใน Console
  });
});