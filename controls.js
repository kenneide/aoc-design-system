// Interaction patterns adapted to this identity; state changes never wait for motion.
(() => {
  const $ = id => document.getElementById(id);
  const composition = $('live-composition');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const name = $('project-name');
  const flow = $('flow-range');
  const colour = $('colour-field');
  const accent = $('accent-select');
  name.addEventListener('input', () => { $('preview-headline').textContent = name.value.trim() || 'Ideas in motion.'; });
  document.querySelectorAll('input[name="format"]').forEach((input, index) => {
    input.addEventListener('change', () => {
      if (!input.checked) return;
      composition.dataset.format = input.value;
      input.closest('.segment').style.setProperty('--selected', index);
      $('format-label').textContent = input.value[0].toUpperCase() + input.value.slice(1);
    });
  });
  function updateFlow() {
    const value = Number(flow.value);
    $('flow-value').value = `${value}%`;
    flow.style.setProperty('--progress', `${value}%`);
    composition.style.setProperty('--flow', value / 100);
  }
  updateFlow();
  flow.addEventListener('input', updateFlow);
  colour.addEventListener('change', () => { composition.dataset.colour = String(colour.checked); });
  accent.addEventListener('change', () => { composition.style.setProperty('--composition-accent', `var(--colour-${accent.value})`); });
  $('show-grid').addEventListener('change', event => { composition.classList.toggle('show-grid', event.target.checked); });
  const action = $('try-action');
  let actionTimer;
  action.addEventListener('click', () => {
    clearTimeout(actionTimer);
    action.classList.add('is-done');
    action.querySelector('.action-label').textContent = 'Done';
    action.querySelector('.action-symbol').textContent = '✓';
    $('control-feedback').textContent = 'Done. A small response, right where you clicked.';
    actionTimer = setTimeout(() => {
      action.classList.remove('is-done');
      action.querySelector('.action-label').textContent = 'Try an action';
      action.querySelector('.action-symbol').textContent = '↗';
    }, 1800);
  });
  const panel = $('example-panel');
  const opener = $('open-panel');
  let animation = null;
  let generation = 0;
  let closing = false;
  function animate(frames, duration) {
    animation?.cancel();
    animation = reduced.matches || !panel.animate ? null : panel.animate(frames, {duration, easing:'cubic-bezier(.22,1,.36,1)', fill:'both'});
    return animation?.finished.catch(() => {}) || Promise.resolve();
  }
  opener.addEventListener('click', () => {
    if (panel.open) return;
    generation++;
    closing = false;
    panel.showModal();
    animate([{transform:'translateY(36px)',opacity:0},{transform:'translateY(0)',opacity:1}],420);
  });
  async function closePanel() {
    if (!panel.open || closing) return;
    closing = true;
    const current = ++generation;
    await animate([{transform:'translateY(0)',opacity:1},{transform:'translateY(24px)',opacity:0}],320);
    if (current !== generation) return;
    panel.close();
    animation?.cancel();
    animation = null;
    closing = false;
    opener.focus({preventScroll:true});
  }
  $('close-panel').addEventListener('click', closePanel);
  $('panel-done').addEventListener('click', closePanel);
  panel.addEventListener('cancel', event => { event.preventDefault(); closePanel(); });
  reduced.addEventListener('change', () => { if (reduced.matches) animation?.cancel(); });
})();
