const slides = [...document.querySelectorAll('.slide-frame')];
const toolbar = document.querySelector('.deck-toolbar');
const previous = document.querySelector('#previous');
const next = document.querySelector('#next');
const present = document.querySelector('#present');
const overview = document.querySelector('#overview');
const fullscreen = document.querySelector('#fullscreen');
const status = document.querySelector('#slide-status');
const preview = new URLSearchParams(location.search).get('preview') === '1';
let index = Math.max(0, slides.findIndex(slide => `#${slide.id}` === location.hash));
let presenting = false;
function update(writeHash = false) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('is-active', i === index);
    slide.inert = (presenting || preview) && i !== index;
    if ((presenting || preview) && i !== index) slide.setAttribute('aria-hidden', 'true');
    else slide.removeAttribute('aria-hidden');
  });
  status.textContent = `${index + 1} / ${slides.length}`;
  previous.disabled = index === 0;
  next.disabled = index === slides.length - 1;
  if (writeHash) history.replaceState(null, '', `#${slides[index].id}`);
}
function go(to) { index = Math.max(0, Math.min(slides.length - 1, to)); update(true); if (!presenting) slides[index].scrollIntoView({behavior:'instant'}); }
function enter() {
  const hashIndex = slides.findIndex(slide => `#${slide.id}` === location.hash);
  if (hashIndex >= 0) index = hashIndex;
  presenting = true;
  document.body.classList.add('is-presenting');
  present.hidden = true;
  overview.hidden = false;
  update(true);
  overview.focus();
}
async function leave() {
  if (document.fullscreenElement) await document.exitFullscreen().catch(() => {});
  presenting = false;
  document.body.classList.remove('is-presenting');
  present.hidden = false;
  overview.hidden = true;
  update();
  slides[index].scrollIntoView({behavior:'instant'});
  present.focus({preventScroll:true});
}
if (preview) {
  document.body.classList.add('is-preview');
  document.body.inert = true;
  update();
} else {
  toolbar.hidden = false;
  fullscreen.hidden = !document.fullscreenEnabled;
  update();
  previous.addEventListener('click', () => go(index - 1));
  next.addEventListener('click', () => go(index + 1));
  present.addEventListener('click', enter);
  overview.addEventListener('click', leave);
  fullscreen.addEventListener('click', async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else { if (!presenting) enter(); await document.documentElement.requestFullscreen(); }
    } catch { status.textContent = 'Full screen unavailable. Presentation view is ready.'; }
  });
  document.addEventListener('fullscreenchange', () => { fullscreen.textContent = document.fullscreenElement ? 'Exit full screen' : 'Full screen'; });
  window.addEventListener('hashchange', () => { const found = slides.findIndex(slide => `#${slide.id}` === location.hash); if (found >= 0) { index = found; update(); } });
  document.addEventListener('keydown', event => {
    if (!presenting || event.altKey || event.ctrlKey || event.metaKey || event.target.closest('input,textarea,select,[contenteditable="true"]')) return;
    if (event.key === 'Escape') { event.preventDefault(); leave(); return; }
    if (['Enter',' '].includes(event.key) && event.target.closest('button,a')) return;
    const action = {ArrowRight:() => go(index + 1),ArrowDown:() => go(index + 1),PageDown:() => go(index + 1),' ':() => go(index + (event.shiftKey ? -1 : 1)),ArrowLeft:() => go(index - 1),ArrowUp:() => go(index - 1),PageUp:() => go(index - 1),Home:() => go(0),End:() => go(slides.length - 1)}[event.key];
    if (action) { event.preventDefault(); action(); }
  });
}
