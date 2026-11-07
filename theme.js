(() => {
  const root = document.documentElement;
  const preference = matchMedia('(prefers-color-scheme: dark)');
  let choice;
  try { choice = localStorage.getItem('aoc-theme'); } catch {}
  if (choice !== 'light' && choice !== 'dark') choice = null;
  const current = () => choice || (preference.matches ? 'dark' : 'light');
  function apply() {
    root.dataset.theme = current();
    const toggle = document.querySelector('.theme-toggle');
    if (toggle) toggle.setAttribute('aria-pressed', String(current() === 'dark'));
  }
  apply();
  preference.addEventListener('change', apply);
  document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.theme-toggle');
    toggle.hidden = false;
    apply();
    toggle.addEventListener('click', () => {
      choice = current() === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem('aoc-theme', choice); } catch {}
      apply();
    });
  });
})();
