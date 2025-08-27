(function() {
  // Mobile nav toggle
  var toggle = document.getElementById('menuToggle');
  var nav = document.getElementById('nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function() {
      if (getComputedStyle(nav).display === 'none') {
        nav.style.display = 'flex';
      } else {
        nav.style.display = 'none';
      }
    });
  }

  // Current year in footer
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();



