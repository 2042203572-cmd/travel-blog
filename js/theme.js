export function initTheme() {
  const btn = document.getElementById('theme-toggle');
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (saved === 'dark' || (!saved && prefersDark)) {
    document.body.classList.add('dark-mode');
    btn.textContent = '☀️';
  }
  btn.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    btn.textContent = isDark ? '☀️' : '🌙';
  });
}