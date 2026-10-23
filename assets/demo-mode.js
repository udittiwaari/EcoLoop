(() => {
  const host = window.location.hostname.toLowerCase();
  const isLocal = host === 'localhost' || host === '127.0.0.1' || host === '::1';

  document.addEventListener('DOMContentLoaded', () => {
    if (isLocal) {
      const localAdminHint = document.getElementById('localAdminHint');
      if (localAdminHint) localAdminHint.hidden = false;
      return;
    }

    const notice = document.createElement('aside');
    notice.className = 'demo-mode-notice';
    notice.setAttribute('role', 'status');
    notice.innerHTML = '<strong>EcoLoop demo</strong><span>Browsing is available here. Sign-in and admin features use the local account service: run <code>npm start</code> and open <code>http://localhost:4173</code>.</span>';
    document.body.insertBefore(notice, document.body.firstChild);
  }, { once: true });
})();
