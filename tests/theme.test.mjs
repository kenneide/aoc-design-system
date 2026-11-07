import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFile } from 'node:fs/promises';
const source = await readFile('theme.js', 'utf8');
function setup({saved = null, dark = false, denied = false} = {}) {
  const root = {dataset:{}};
  const toggle = {hidden:true, attrs:{}, setAttribute(k,v){this.attrs[k]=v;}, addEventListener(k,v){this[k]=v;}};
  const preference = {matches:dark, addEventListener(k,v){this[k]=v;}};
  let ready, stored;
  vm.runInNewContext(source, {
    document: {documentElement:root, querySelector:()=>toggle, addEventListener(k,v){ready=v;}},
    matchMedia:()=>preference,
    localStorage:{getItem(){if(denied)throw Error(); return saved;},setItem(k,v){if(denied)throw Error(); stored=v;}}
  });
  ready();
  return {root,toggle,preference,stored:()=>stored};
}
test('system theme changes apply until an explicit keyboard-compatible button choice', () => {
  const {root,toggle,preference,stored} = setup();
  assert.equal(root.dataset.theme,'light');
  assert.equal(toggle.hidden,false);
  preference.matches=true; preference.change();
  assert.equal(root.dataset.theme,'dark');
  assert.equal(toggle.attrs['aria-pressed'],'true');
  toggle.click();
  assert.equal(stored(),'light');
  preference.change();
  assert.equal(root.dataset.theme,'light');
});
test('saved choices override system preference, invalid values and denied storage remain usable', () => {
  assert.equal(setup({saved:'dark'}).root.dataset.theme,'dark');
  assert.equal(setup({saved:'light',dark:true}).root.dataset.theme,'light');
  assert.equal(setup({saved:'invalid',dark:true}).root.dataset.theme,'dark');
  const {root,toggle} = setup({denied:true,dark:true});
  toggle.click(); assert.equal(root.dataset.theme,'light');
});
test('dark reading, input boundary, focus and action pairs have sufficient contrast', async () => {
  const {colour:c,darkRole:r} = JSON.parse(await readFile('design/tokens.json','utf8'));
  function lum(hex) {
    const v=hex.slice(1).match(/../g).map(x=>parseInt(x,16)/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4);
    return v[0]*.2126+v[1]*.7152+v[2]*.0722;
  }
  function ratio(a,b) { const [x,y]=[lum(c[r[a]]),lum(c[r[b]])].sort((x,y)=>y-x); return (x+.05)/(y+.05); }
  for (const bg of ['background','surface']) {
    for (const fg of ['text','secondaryText']) assert.ok(ratio(fg,bg)>=4.5,`${fg} on ${bg}`);
    assert.ok(ratio('focus',bg)>=3);
  }
  assert.ok(ratio('onAction','action')>=4.5);
});
