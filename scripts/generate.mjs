import { readFile, writeFile } from 'node:fs/promises';
const tokens = JSON.parse(await readFile(new URL('../design/tokens.json', import.meta.url)));
const vars = [];
for (const group of ['colour', 'font', 'space', 'layout', 'motion']) {
  for (const [key, value] of Object.entries(tokens[group])) vars.push(`  --${group}-${key.replace(/[A-Z]/g, m => '-' + m.toLowerCase())}: ${value};`);
}
for (const [key, value] of Object.entries(tokens.role)) vars.push(`  --${key.replace(/[A-Z]/g, m => '-' + m.toLowerCase())}: var(--colour-${value});`);
const css = `/* Generated from design/tokens.json. Run npm run generate. */\n:root {\n${vars.join('\n')}\n}\n`;
// Analytic sine curves sampled as cubic Hermite segments: scalable, smooth paths.
// Each boundary shares the same signal plus a vertical offset, so bands never cross.
const colours = ['red','blue','green','lime','gold','white','orange','yellow'];
function wave(x, {amplitude, period, phase, overtone}) {
  const t = x * 2 * Math.PI / period + phase;
  return amplitude * Math.sin(t) + overtone * Math.sin(2 * t + .7);
}
function slope(x, {amplitude, period, phase, overtone}) {
  const k = 2 * Math.PI / period;
  const t = x * k + phase;
  return amplitude * k * Math.cos(t) + 2 * overtone * k * Math.cos(2 * t + .7);
}
const n = value => Number(value.toFixed(3));
function curve(base, spec) {
  let d = `M0 ${n(base + wave(0, spec))}`;
  for (let x = 0; x < 1280; x += 40) {
    const end = x + 40;
    d += ` C${n(x + 40/3)} ${n(base + wave(x, spec) + slope(x, spec)*40/3)} ${n(end - 40/3)} ${n(base + wave(end, spec) - slope(end, spec)*40/3)} ${end} ${n(base + wave(end, spec))}`;
  }
  return d;
}
const variants = [
  {file:'bands', title:'Organic sinusoidal bands', amplitude:155,period:1040,phase:-.8,overtone:24},
  {file:'bands-calm', title:'Long-wave sinusoidal bands', amplitude:110,period:1600,phase:-1.1,overtone:12},
  {file:'bands-resonance', title:'Harmonic sinusoidal bands', amplitude:130,period:900,phase:.3,overtone:35}
];
const outputs = [['../design/tokens.css', css]];
for (const spec of variants) {
  const paths = colours.slice(1).map((c,i) => `<path fill="${tokens.colour[c]}" d="${curve(-170+(i+1)*85,spec)} L1280 640 H0Z"/>`).join('\n  ');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 640"><title>${spec.title}</title><desc>Original company graphic: a fundamental sine wave with a gentle second harmonic, connecting flowing colour to audio roots. Flat gold uses the sampled reference colour.</desc>\n  <rect width="1280" height="640" fill="${tokens.colour.red}"/>\n  ${paths}\n</svg>\n`;
  outputs.push([`../assets/${spec.file}.svg`,svg]);
}
const signalPaths = ['blue','gold','green'].map((colour,i) => `<path d="${curve(320,{amplitude:115-i*28,period:1100-i*220,phase:-.6,overtone:i*12})}" stroke="${tokens.colour[colour]}"/>`).join('\n  ');
outputs.push(['../assets/signal.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 640"><title>Audio roots: superposed sinusoids</title><desc>Three continuous waveforms in blue, gold and green. An original illustration of the audio influence, not a measured audio signal.</desc><rect width="1280" height="640" fill="${tokens.colour.paper}"/><g fill="none" stroke-width="6" stroke-linecap="round">${signalPaths}</g></svg>\n`]);
for (const [file, content] of outputs) {
  const url = new URL(file, import.meta.url);
  if (process.argv.includes('--check')) {
    if (await readFile(url, 'utf8') !== content) throw new Error(`${file} is stale; run npm run generate`);
  } else await writeFile(url, content);
}
