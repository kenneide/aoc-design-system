import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFile } from 'node:fs/promises';
const source = await readFile('controls.js','utf8');
function element() {
  const props = {}, classes = new Set();
  return {
    value:'',checked:false,open:false,dataset:{},events:{},textContent:'',
    style:{setProperty:(k,v)=>{props[k]=v;},getPropertyValue:k=>props[k]},
    classList:{add:k=>classes.add(k),remove:k=>classes.delete(k),toggle:(k,on)=>on?classes.add(k):classes.delete(k)},
    addEventListener(name,fn){this.events[name]=fn;},
    showModal(){this.open=true;},close(){this.open=false;},focus(){this.focused=true;}
  };
}
function setup() {
  const nodes = Object.fromEntries(['live-composition','project-name','flow-range','colour-field','accent-select','show-grid','try-action','control-feedback','example-panel','open-panel','close-panel','panel-done','preview-headline','flow-value','format-label'].map(id=>[id,element()]));
  nodes['flow-range'].value='50';
  const radios = ['web','slide','card'].map(value=>Object.assign(element(),{value,closest:()=>segment}));
  const segment=element();
  vm.runInNewContext(source,{
    document:{getElementById:id=>nodes[id],querySelectorAll:()=>radios},
    matchMedia:()=>({matches:true,addEventListener(){}}),
    setTimeout,clearTimeout
  });
  return {nodes,radios,segment};
}
test('controls update the composition without waiting for animation',()=>{
  const {nodes:n,radios,segment}=setup();
  n['flow-range'].value='100';n['flow-range'].events.input();
  assert.equal(n['flow-value'].value,'100%');
  assert.equal(n['live-composition'].style.getPropertyValue('--flow'),1);
  n['project-name'].value='';n['project-name'].events.input();
  assert.equal(n['preview-headline'].textContent,'Ideas in motion.');
  radios[2].checked=true;radios[2].events.change();
  assert.equal(n['live-composition'].dataset.format,'card');
  assert.equal(segment.style.getPropertyValue('--selected'),2);
  n['colour-field'].checked=false;n['colour-field'].events.change();
  assert.equal(n['live-composition'].dataset.colour,'false');
});
test('reduced-motion dialog closes on Escape and restores its opener',async()=>{
  const {nodes:n}=setup();
  n['open-panel'].events.click();
  assert.equal(n['example-panel'].open,true);
  let prevented=false;
  n['example-panel'].events.cancel({preventDefault(){prevented=true;}});
  await new Promise(resolve=>setImmediate(resolve));
  assert.equal(prevented,true);
  assert.equal(n['example-panel'].open,false);
  assert.equal(n['open-panel'].focused,true);
  n['open-panel'].events.click();
  assert.equal(n['example-panel'].open,true);
});
