import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFile } from 'node:fs/promises';
const source = await readFile('theme.js', 'utf8');
const tokens = JSON.parse(await readFile('design/tokens.json', 'utf8'));
function setup({saved = null, dark = false, denied = false, reducedMotion = false, animation = false} = {}) {
  const values = new Map();
  const root = {dataset:{}, style:{setProperty(k,v){values.set(k,v);},removeProperty(k){values.delete(k);}}};
  const toggle = {hidden:true, attrs:{}, setAttribute(k,v){this.attrs[k]=v;}, addEventListener(k,v){this[k]=v;}};
  const preference = {matches:dark, addEventListener(k,v){this[k]=v;}};
  const reduced = {matches:reducedMotion, addEventListener(k,v){this[k]=v;}};
  let ready, stored, now = 0, nextFrame = 0;
  const frames = new Map();
  const context = {
    document: {documentElement:root, querySelector:()=>toggle, addEventListener(k,v){ready=v;}},
    matchMedia:query=>query.includes('reduced-motion') ? reduced : preference,
    localStorage:{getItem(){if(denied)throw Error(); return saved;},setItem(k,v){if(denied)throw Error(); stored=v;}},
    performance:{now:()=>now},
    getComputedStyle:()=>({getPropertyValue(name){
      if(values.has(name)) return values.get(name);
      if(name==='--motion-theme') return tokens.motion.theme;
      const roles=root.dataset.theme==='dark' ? tokens.darkRole : tokens.role;
      const key=name.slice(2).replace(/-([a-z])/g,(_,letter)=>letter.toUpperCase());
      return tokens.colour[roles[key]] || '';
    }})
  };
  if(animation) {
    context.requestAnimationFrame=callback=>{frames.set(++nextFrame,callback);return nextFrame;};
    context.cancelAnimationFrame=id=>frames.delete(id);
  }
  vm.runInNewContext(source, context);
  ready();
  return {root,toggle,preference,reduced,values,frames,stored:()=>stored,
    advance(time){now=time;const callbacks=[...frames.values()];frames.clear();for(const callback of callbacks)callback(now);}};
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

test('palette changes gradually, reverses from the visible colour and releases inline values', () => {
  const env = setup({animation:true});
  assert.equal(env.frames.size,0,'initial load must not animate');
  env.toggle.click();
  assert.equal(env.root.dataset.theme,'dark');
  assert.equal(env.values.get('--background'),'rgb(246, 245, 239)');
  env.advance(350);
  const middle = env.values.get('--background');
  assert.equal(middle,'rgb(134, 135, 129)');
  env.toggle.click();
  assert.equal(env.frames.size,1,'interrupted animation must be cancelled');
  assert.equal(env.values.get('--background'),middle,'reversal must not jump');
  env.advance(1050);
  assert.equal(env.root.dataset.theme,'light');
  assert.equal(env.root.dataset.themeTransition,'false');
  assert.equal(env.values.size,0,'semantic CSS roles resume after settling');
  assert.equal(env.frames.size,0);
});
test('reduced motion applies immediately, including when enabled during a blend', () => {
  const immediate = setup({animation:true,reducedMotion:true});
  immediate.toggle.click();
  assert.equal(immediate.root.dataset.theme,'dark');
  assert.equal(immediate.frames.size,0);
  const env = setup({animation:true});
  env.toggle.click();env.advance(200);
  env.reduced.matches=true;env.reduced.change();
  assert.equal(env.root.dataset.theme,'dark');
  assert.equal(env.values.size,0);
  assert.equal(env.frames.size,0);
});
test('system changes animate and ignored preference changes do not interrupt a chosen blend', () => {
  const env=setup({animation:true});
  env.preference.matches=true;env.preference.change();
  assert.equal(env.frames.size,1);
  env.advance(700);
  assert.equal(env.root.dataset.theme,'dark');
  env.toggle.click();env.advance(900);
  const before=env.values.get('--background');
  env.preference.matches=false;env.preference.change();
  assert.equal(env.frames.size,1);
  assert.equal(env.values.get('--background'),before);
  env.advance(1400);
  assert.equal(env.values.size,0);
});
