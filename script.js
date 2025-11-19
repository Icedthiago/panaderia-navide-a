document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menuBtn');
  const navLinks = document.getElementById('navLinks');

  if (!menuBtn || !navLinks) return; // nothing to do if elements missing

  // Ensure accessible state
  if (!menuBtn.hasAttribute('aria-expanded')) menuBtn.setAttribute('aria-expanded', 'false');
  menuBtn.setAttribute('aria-controls', 'navLinks');

  menuBtn.addEventListener('click', () => {
    const isShown = navLinks.classList.toggle('show');
    menuBtn.setAttribute('aria-expanded', String(isShown));
  });
});
