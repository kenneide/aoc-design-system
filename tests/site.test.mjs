import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
const html = await readFile('index.html', 'utf8');
const tokens = JSON.parse(await readFile('design/tokens.json', 'utf8'));
const css = await readFile('styles.css', 'utf8');
function luminance(hex) {
  const rgb = hex.slice(1).match(/../g).map(x => parseInt(x, 16) / 255).map(x => x <= .04045 ? x / 12.92 : ((x + .055) / 1.055) ** 2.4);
  return rgb[0] * .2126 + rgb[1] * .7152 + rgb[2] * .0722;
}
function contrast(a, b) {
  const [light, dark] = [luminance(a), luminance(b)].sort((a,b) => b-a);
  return (light + .05) / (dark + .05);
}
test('every local asset and section link resolves under a repository prefix', async () => {
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]));
  assert.equal(ids.size, [...html.matchAll(/\bid="([^"]+)"/g)].length, 'Duplicate IDs');
  for (const [, ref] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (ref.startsWith('https:')) continue;
    assert.ok(!ref.startsWith('/'), `Root-relative asset breaks Pages: ${ref}`);
    if (ref.startsWith('#')) { if (ref !== '#') assert.ok(ids.has(ref.slice(1)), `Missing section ${ref}`); }
    else await access(ref);
  }
});
test('documented reading pairs meet WCAG AA for normal text', () => {
  const {colour:c} = tokens;
  for (const [fg,bg] of [['ink','paper'],['ink','white'],['muted','paper'],['muted','white'],['white','ink'],['ink','lime'],['ink','yellow'],['ink','orange']]) assert.ok(contrast(c[fg],c[bg]) >= 4.5, `${fg} on ${bg}: ${contrast(c[fg],c[bg])}`);
});
test('reduced motion and original-source disclosure are present', () => {
  assert.match(css, /@media\(prefers-reduced-motion:reduce\)/);
  assert.match(css, /animation:none!important/);
  assert.match(html, /new interpretation, not a recovered print file/);
  assert.match(html, /Print colour and paper need proofing/);
});
