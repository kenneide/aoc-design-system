// Optional authoring tool. Uses the supplied artifact-tool runtime, not site dependencies.
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const runtime = process.env.AOC_SLIDE_RUNTIME;
const require = createRequire(runtime ? path.join(runtime, 'package.json') : import.meta.url);
const { Presentation, PresentationFile } = await import(pathToFileURL(require.resolve('@oai/artifact-tool')).href);
const { GlobalFonts } = require('@napi-rs/canvas');
GlobalFonts.registerFromPath(path.join(root, 'assets/fonts/SpaceGrotesk.ttf'), 'Space Grotesk');
const sharp = require('sharp');
const tokens = JSON.parse(await fs.readFile(path.join(root, 'design/tokens.json')));
const company = JSON.parse(await fs.readFile(path.join(root, 'design/company.json')));
const c = tokens.colour;
const out = path.resolve(process.env.AOC_SLIDE_BUILD || '/tmp/aoc-slide-build');
await fs.mkdir(out, {recursive:true});
const deck = Presentation.create({slideSize:{width:1280,height:720}});
const meta = [];
const images = {};
for (const name of ['bands','bands-calm','bands-resonance','wave-trim','signal']) {
  images[name] = await sharp(await fs.readFile(path.join(root, `assets/${name}.svg`))).resize({width:2560}).png().toBuffer();
}
function text(s, str, x,y,w,h,size=32,colour=c.ink,bold=false) {
  const shape=s.shapes.add({name:str.replaceAll('\n',' ').slice(0,55),geometry:'textbox',position:{left:x,top:y,width:w,height:h},fill:'none',line:{fill:'none',width:0}});
  shape.text=str;
  shape.text.style={typeface:'Space Grotesk',fontSize:size,color:colour,bold,insets:0,autoFit:'none',verticalAlignment:'top',wrap:'none'};
  return shape;
}
function rect(s,x,y,w,h,colour) { return s.shapes.add({geometry:'rect',position:{left:x,top:y,width:w,height:h},fill:colour,line:{fill:'none',width:0}}); }
function image(s,name,x,y,w,h,fit='contain') {const bytes=images[name];s.images.add({name,blob:bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength),contentType:'image/png',alt:`Company ${name} artwork`,position:{left:x,top:y,width:w,height:h},fit});}
function rule(s,y,x=64,w=1152,colour=c.line){rect(s,x,y,w,1,colour);}
function base(name,bg=c.paper,fg=c.ink) {
  const s=deck.slides.add();s.background.fill=bg;
  meta.push({name,number:meta.length+1});
  text(s,company.name,64,674,1000,24,16,fg);
  text(s,String(meta.length).padStart(2,'0'),1160,674,56,24,16,fg);
  s.speakerNotes.text='Reusable layout: '+name+'. Sample presentation content. Replace copy with your own material. Brand sources: design/tokens.json, design/company.json, design/README.md and the generated SVG assets in this repository. Artwork is a new company interpretation. Space Grotesk is supplied under SIL OFL. Preserve artwork proportions and keep text on quiet surfaces.';
  return s;
}
function kicker(s,label,dark=false){image(s,'wave-trim',64,60,128,16);text(s,label.toUpperCase(),216,56,950,32,20,dark?c.white:c.ink);}
function heading(s,title){text(s,title,64,132,1152,100,64);}
let s=base('Paper title');
text(s,'PROJECT PRESENTATION / SAMPLE CONTENT',64,64,1100,32,20);
text(s,'Project\ndirection',64,162,1100,224,100);
text(s,'A presentation title with room to breathe',68,430,1080,56,32);
image(s,'bands',0,516,1280,144,'cover');
s=base('Lime title',c.lime);text(s,'PROJECT PRESENTATION',64,64,700,32,20);
text(s,'A fresh\nperspective',64,180,800,230,96);
text(s,'Presenter name\nPresentation date',64,486,700,96,32);
image(s,'bands-calm',948,0,332,642,'cover');
s=base('Section divider',c.ink,c.white);text(s,'02',64,60,500,210,176,c.lime);
text(s,'The next\nchapter',64,282,1100,218,88,c.white);image(s,'wave-trim',0,520,1280,160);
// Keep footer text on the quiet margin below the graphic.
s.shapes.items[0].position={left:64,top:684,width:1000,height:24};
s.shapes.items[1].position={left:1160,top:684,width:56,height:24};
s=base('Agenda');kicker(s,'Today’s discussion');heading(s,'The conversation');
for (const [i,label] of ['Context and purpose','Scope of the work','Decisions to make','Next steps'].entries()){
 const y=272+i*84;rule(s,y);text(s,String(i+1).padStart(2,'0'),64,y+17,96,48,32,c.muted);text(s,label,192,y+17,1024,48,36);
}
s=base('Two-column content');kicker(s,'Context');heading(s,'The question and the context');
text(s,'The question',64,292,496,54,40);text(s,'What needs to change?\nWho will use the result?\nWhat does success mean?',64,374,520,176,32);
rect(s,624,292,1,284,c.line);
text(s,'The context',688,292,528,54,40);text(s,'A short explanation of the\ncurrent situation, supported\nby one useful example.',688,374,528,176,32);
s=base('Statement',c.yellow);text(s,'A CENTRAL IDEA',64,64,1100,36,20);
text(s,'One clear idea,\ngiven room to\nbe understood',64,188,1152,310,82);
image(s,'wave-trim',64,556,384,48);
s=base('Comparison',c.white);kicker(s,'Two approaches');heading(s,'A clear comparison');
for(const [x,title,copy] of [[64,'Approach A','What this approach includes\nWhere it works well\nThe trade-off to consider'],[688,'Approach B','What this approach includes\nWhere it works well\nThe trade-off to consider']]){
 text(s,title,x,288,520,60,44);rule(s,366,x,528);text(s,copy,x,402,528,160,32);
}image(s,'wave-trim',64,592,1152,144);
// Keep the graphic above the footer, at its native aspect ratio.
s.images.items[s.images.items.length-1].position={left:64,top:588,width:384,height:48};
s=base('Roadmap');kicker(s,'A sequence of work');heading(s,'A plan in four stages');
const stages=[['01','Understand','Questions\nand constraints'],['02','Explore','Options\nand examples'],['03','Make','A working\nfirst version'],['04','Review','Feedback\nand next steps']];
for(const [i,[n,title,copy]] of stages.entries()){let x=64+i*296;text(s,n,x,282,256,80,60,c.muted);rule(s,388,x,248);text(s,title,x,422,268,62,34);text(s,copy,x,510,268,108,32);}
s=base('Data chart',c.white);kicker(s,'Evidence');heading(s,'A chart with a clear takeaway');
text(s,'Illustrative data',64,242,480,36,22,c.muted);
const chart=s.charts.add('bar',{position:{left:48,top:294,width:780,height:324},categories:['A','B','C','D'],series:[{name:'Example',values:[20,40,60,80],fill:c.blue}],hasLegend:false,barOptions:{direction:'column',gapWidth:100},xAxis:{textStyle:{fontSize:22,typeface:'Space Grotesk',fill:c.ink}},yAxis:{minimumScale:0,maximumScale:100,textStyle:{fontSize:20,typeface:'Space Grotesk',fill:c.muted},majorGridlines:{fill:c.line,width:1}},dataLabels:{showValue:true,position:'outEnd',textStyle:{fontSize:22,typeface:'Space Grotesk',fill:c.ink}}});
text(s,'The finding',900,304,316,54,36);text(s,'A short explanation\nof what the chart\nshows and why\nit matters.',900,386,316,208,32);
s.speakerNotes.text+=' Chart values 20, 40, 60 and 80 are illustrative placeholders, not company results. Replace the categories, series and source before presenting.';
s=base('Visual and commentary');kicker(s,'Visual evidence');heading(s,'One visual, one explanation');
image(s,'signal',64,288,736,368);
text(s,'The detail\nthat matters',864,300,352,112,44);text(s,'A concise observation\nthat helps the audience\ninterpret the visual.',864,456,352,152,30);
s=base('Decision',c.orange);text(s,'FOR DISCUSSION',64,64,1152,32,20);
text(s,'The decision\nin front of us',64,170,1120,210,88);
rule(s,430,64,1152,c.ink);text(s,'A proposed direction, with a short reason\nand a clear description of the next step.',64,474,1152,120,36);
s=base('Closing',c.ink,c.white);text(s,'THANK YOU',64,64,1152,32,20,c.white);
text(s,'The next\nconversation',64,160,1152,224,96,c.white);
const email=text(s,company.inquiriesEmail,64,442,1152,56,36,c.white);email.text.get(company.inquiriesEmail).link={uri:`mailto:${company.inquiriesEmail}`,isExternal:true};
image(s,'wave-trim',0,520,1280,160);s.shapes.items[0].position={left:64,top:684,width:1000,height:24};s.shapes.items[1].position={left:1160,top:684,width:56,height:24};
for(let i=0;i<deck.slides.items.length;i++){
 const slide=deck.slides.items[i];const png=await deck.export({slide,format:'png',scale:1});await fs.writeFile(path.join(out,`slide-${String(i+1).padStart(2,'0')}.png`),new Uint8Array(await png.arrayBuffer()));
}
await fs.writeFile(path.join(out,'slides.json'),JSON.stringify(meta,null,2));
await (await PresentationFile.exportPptx(deck)).save(path.join(out,'candidate.pptx'));
console.log(JSON.stringify({out,slides:deck.slides.items.length}));
