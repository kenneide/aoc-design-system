import { readFile, writeFile } from 'node:fs/promises';
const tokens = JSON.parse(await readFile(new URL('../design/tokens.json', import.meta.url)));
const vars = [];
for (const group of ['colour', 'font', 'space', 'layout', 'motion']) {
  for (const [key, value] of Object.entries(tokens[group])) vars.push(`  --${group}-${key.replace(/[A-Z]/g, m => '-' + m.toLowerCase())}: ${value};`);
}
for (const [key, value] of Object.entries(tokens.role)) vars.push(`  --${key.replace(/[A-Z]/g, m => '-' + m.toLowerCase())}: var(--colour-${value});`);
const css = `/* Generated from design/tokens.json. Run npm run generate. */\n:root {\n${vars.join('\n')}\n}\n`;
// Broad, continuous bands; the curves are a new interpretation of the reference.
const colours = ['red','blue','green','lime','olive','white','orange','yellow'];
const boundaries = [0, 72, 144, 216, 288, 360, 432, 504];
const paths = colours.map((c, i) => {
  const y = boundaries[i];
  return `<path fill="${tokens.colour[c]}" d="M-160 ${y-170} C100 ${y-170} 180 ${y+165} 390 ${y+165} S650 ${y-170} 850 ${y-170} S1100 ${y+135} 1440 ${y+135} L1440 1100 H-160Z"/>`;
}).join('\n  ');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 640"><title>Flowing colour bands</title><desc>A new interpretation of the company's surviving business-card artwork.</desc>\n  ${paths}\n</svg>\n`;
const outputs = [['../design/tokens.css', css], ['../assets/bands.svg', svg]];
for (const [file, content] of outputs) {
  const url = new URL(file, import.meta.url);
  if (process.argv.includes('--check')) {
    if (await readFile(url, 'utf8') !== content) throw new Error(`${file} is stale; run npm run generate`);
  } else await writeFile(url, content);
}
