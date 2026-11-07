import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFile } from 'node:fs/promises';
const source = await readFile('app.js', 'utf8');
const tokens = JSON.parse(await readFile('design/tokens.json', 'utf8'));
function element() {
  const classes = new Set();
  return {
    textContent: '', children: [], events: {},
    style: { setProperty() {} }, setAttribute() {},
    classList: { add: name => classes.add(name), remove: name => classes.delete(name), contains: name => classes.has(name) },
    append(...children) { this.children.push(...children); },
    addEventListener(name, callback) { this.events[name] = callback; }
  };
}
async function setup(reduced, clipboardFails = false) {
  const elements = Object.fromEntries(['#copy-status','#palette','#motion-demo','#replay','#motion-note'].map(id=>[id,element()]));
  const preference = { matches: reduced, addEventListener(name, callback) { this.changed = callback; } };
  vm.runInNewContext(source, {
    document: { querySelector: id => elements[id], createElement: element },
    fetch: async () => ({ ok: true, json: async () => tokens }),
    matchMedia: () => preference,
    navigator: { clipboard: { writeText: async () => { if (clipboardFails) throw new Error('Permission denied'); } } },
    requestAnimationFrame: callback => callback()
  });
  await new Promise(resolve => setImmediate(resolve));
  return { elements, preference };
}
test('reduced-motion users get a static specimen, including after preference changes', async () => {
  const { elements:e, preference:p } = await setup(true);
  e['#replay'].events.click();
  assert.equal(e['#motion-demo'].classList.contains('is-playing'), false);
  assert.match(e['#motion-note'].textContent, /stays still/);
  p.matches = false; p.changed(); e['#replay'].events.click();
  assert.equal(e['#motion-demo'].classList.contains('is-playing'), true);
  e['#motion-demo'].events.animationend();
  assert.equal(e['#motion-demo'].classList.contains('is-playing'), false);
  e['#replay'].events.click(); p.matches = true; p.changed();
  assert.equal(e['#motion-demo'].classList.contains('is-playing'), false);
});
test('clipboard denial still provides the exact selected value', async () => {
  const { elements:e } = await setup(false, true);
  assert.equal(e['#palette'].children.length, 8);
  await e['#palette'].children[2].events.click();
  assert.match(e['#copy-status'].textContent, /Copy manually: #B2C906 \(Lime\)/);
});
