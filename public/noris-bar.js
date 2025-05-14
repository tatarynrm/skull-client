(function () {
  const bar = document.createElement('div');
  bar.innerHTML = `
    <span style="margin-right: 8px;">Розробка</span>
    <a href="https://noris-dev.site" target="_blank" rel="noopener noreferrer" style="color: gray; text-decoration: none; font-weight: bold;">
      Noris Development
    </a>
    <span style="margin: 0 8px;">|</span>
    <a href="mailto:tatarynrm@gmail.com" style="color: gray; text-decoration: none;">
      tatarynrm@gmail.com
    </a>
  `;

  Object.assign(bar.style, {
    position: 'relative',
    bottom: '0',
    width: '100%',
    backgroundColor: '#f9f9f9',
    color: '#111',
    borderTop: '1px solid #ccc',
    textAlign: 'center',
    padding: '12px 12px',
    fontFamily: 'Segoe UI, sans-serif',
    fontSize: '14px',
    zIndex: '9999',
    boxShadow: '0 -1px 5px rgba(0, 0, 0, 0.05)',
    height:"40px",

  });

  // Hover styles (динамічно через CSS, щоб не створювати окремий <style>)
  const style = document.createElement('style');
  style.textContent = `
    .noris-bar a:hover {
      color: #0051a3;
      text-decoration: underline;
    }
  `;
  document.head.appendChild(style);

  bar.className = 'noris-bar';
  document.body.appendChild(bar);
})();
