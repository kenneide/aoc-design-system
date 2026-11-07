const status = document.querySelector('#copy-status');
async function loadPalette() {
  try {
    const response = await fetch('design/tokens.json');
    if (!response.ok) throw new Error('Unable to load tokens');
    const { colour } = await response.json();
    const names = ['blue', 'green', 'lime', 'gold', 'white', 'orange', 'yellow', 'red'];
    for (const name of names) {
      const hex = colour[name];
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'swatch';
      button.style.setProperty('--swatch-colour', hex);
      button.setAttribute('aria-label', `Copy ${name} ${hex}`);
      const fill = document.createElement('span');
      fill.className = 'swatch-fill';
      fill.setAttribute('aria-hidden', 'true');
      const meta = document.createElement('span');
      meta.className = 'swatch-meta';
      const label = document.createElement('b');
      label.textContent = name[0].toUpperCase() + name.slice(1);
      const value = document.createElement('code');
      value.textContent = hex.toUpperCase();
      meta.append(label, value);
      button.append(fill, meta);
      button.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(hex.toUpperCase());
          status.textContent = `${label.textContent} ${hex.toUpperCase()} copied.`;
        } catch {
          status.textContent = `Copy manually: ${hex.toUpperCase()} (${label.textContent}).`;
        }
      });
      document.querySelector('#palette').append(button);
    }
  } catch {
    status.textContent = 'The palette could not load. Download the tokens above to see the colour values.';
  }
}
loadPalette();
const demo = document.querySelector('#motion-demo');
const replay = document.querySelector('#replay');
const note = document.querySelector('#motion-note');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
function updateMotionPreference() {
  demo.classList.remove('is-playing');
  note.textContent = reducedMotion.matches ? 'Reduced motion is on. This specimen stays still.' : 'One pass, 1.8 seconds. Never an endless loop.';
}
updateMotionPreference();
reducedMotion.addEventListener('change', updateMotionPreference);
replay.addEventListener('click', () => {
  if (reducedMotion.matches) return;
  demo.classList.remove('is-playing');
  requestAnimationFrame(() => requestAnimationFrame(() => demo.classList.add('is-playing')));
});
demo.addEventListener('animationend', () => demo.classList.remove('is-playing'));
