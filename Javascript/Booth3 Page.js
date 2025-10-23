document.addEventListener('DOMContentLoaded', function() {
  const hamburgerButton = document.getElementById('hamburger-menu');
  const navMenu = document.getElementById('nav-menu');
  hamburgerButton.addEventListener('click', function() {
    hamburgerButton.classList.toggle('is-active');
    navMenu.classList.toggle('is-active');
  });
});