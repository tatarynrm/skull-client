(function () {
  // Знайти скрипт, який себе викликав
  const currentScript = document.currentScript || document.querySelector('script[src*="noris-bar.js"]');

  // Зчитування кастомних кольорів з data-атрибутів
  const backgroundColor = currentScript?.dataset.bg || '#f9f9f9';
  const textColor = currentScript?.dataset.color || 'red';
  const linkColor = currentScript?.dataset.link || 'gray';
  const borderColor = currentScript?.dataset.border || '#ccc';

  const bar = document.createElement('div');
  bar.innerHTML = `
    <span style="margin-right: 8px;">Розробка</span>
    <a href="https://noris-dev.site" target="_blank" rel="noopener noreferrer" style="color: ${linkColor}; text-decoration: none; font-weight: bold;">
      Noris Development
    </a>
    <span style="margin: 0 8px;">|</span>
    <a href="mailto:tatarynrm@gmail.com" style="color: ${linkColor}; text-decoration: none;">
      tatarynrm@gmail.com
    </a>
  `;

  Object.assign(bar.style, {
    position: 'relative',
    bottom: '0',
    width: '100%',
    backgroundColor: backgroundColor,
    color: textColor,
    borderTop: `1px solid ${borderColor}`,
    textAlign: 'center',
    padding: '12px 12px',
    fontFamily: 'Segoe UI, sans-serif',
    fontSize: '14px',
    zIndex: '9999',
    boxShadow: '0 -1px 5px rgba(0, 0, 0, 0.05)',
    height: '40px',
  });

  const style = document.createElement('style');
  style.textContent = `
    .noris-bar a:hover {
      text-decoration: underline;
      filter: brightness(1.2);
    }
  `;
  document.head.appendChild(style);

  bar.className = 'noris-bar';
  document.body.appendChild(bar);
})();
