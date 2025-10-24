document.addEventListener("DOMContentLoaded", function () {
  const hamburgerButton = document.getElementById("hamburger-menu");
  const navMenu = document.getElementById("nav-menu");
  const backdrop = document.querySelector(".backdrop");

  if (!hamburgerButton || !navMenu) return;

  hamburgerButton.addEventListener("click", function () {
    hamburgerButton.classList.toggle("is-active");
    navMenu.classList.toggle("is-active");
    backdrop.classList.toggle("active");
    document.body.classList.toggle("menu-open");
  });

  backdrop.addEventListener("click", function () {
    hamburgerButton.classList.remove("is-active");
    navMenu.classList.remove("is-active");
    backdrop.classList.remove("active");
    document.body.classList.remove("menu-open");
  });
});