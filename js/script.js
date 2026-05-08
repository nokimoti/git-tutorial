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
});
