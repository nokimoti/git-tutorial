// Tab switching
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.tabs').forEach(function (tabGroup) {
    const buttons = tabGroup.querySelectorAll('.tab-button');
    const groupId = tabGroup.dataset.group;
    const contents = document.querySelectorAll('.tab-content[data-group="' + groupId + '"]');

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const target = btn.dataset.target;
        buttons.forEach(b => b.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        const targetContent = document.querySelector('.tab-content[data-group="' + groupId + '"][data-name="' + target + '"]');
        if (targetContent) targetContent.classList.add('active');
      });
    });
  });

  // Highlight current page in sidebar
  const path = window.location.pathname.split('/').pop();
  document.querySelectorAll('.sidebar .nav-list a').forEach(function (link) {
    const href = link.getAttribute('href').split('/').pop();
    if (href === path) {
      link.classList.add('active');
    }
  });

  // Mobile menu (inject hamburger button & backdrop)
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) {
    const toggle = document.createElement('button');
    toggle.className = 'menu-toggle';
    toggle.setAttribute('aria-label', 'メニューを開く');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.textContent = '☰';

    const backdrop = document.createElement('div');
    backdrop.className = 'sidebar-backdrop';
    backdrop.setAttribute('aria-hidden', 'true');

    document.body.appendChild(toggle);
    document.body.appendChild(backdrop);

    function openMenu() {
      sidebar.classList.add('open');
      backdrop.classList.add('open');
      toggle.textContent = '✕';
      toggle.setAttribute('aria-label', 'メニューを閉じる');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      sidebar.classList.remove('open');
      backdrop.classList.remove('open');
      toggle.textContent = '☰';
      toggle.setAttribute('aria-label', 'メニューを開く');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    toggle.addEventListener('click', function () {
      if (sidebar.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    backdrop.addEventListener('click', closeMenu);

    // Close menu when clicking any sidebar link
    sidebar.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    // Close menu on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && sidebar.classList.contains('open')) {
        closeMenu();
      }
    });

    // Close menu when window resizes to desktop width
    let resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        if (window.innerWidth > 768 && sidebar.classList.contains('open')) {
          closeMenu();
        }
      }, 100);
    });
  }
});
