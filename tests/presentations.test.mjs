import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import path from 'node:path';

test('online slide links, assets and company identity resolve in the built site', async () => {
  const html = await readFile('presentations/index.html', 'utf8');
  const index = await readFile('index.html', 'utf8');
  const company = JSON.parse(await readFile('design/company.json', 'utf8'));
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length, 'duplicate slide/document IDs');
  for (const [, ref] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (/^(https:|mailto:)/.test(ref)) continue;
    assert.ok(!ref.startsWith('/'), `root-relative reference: ${ref}`);
    if (ref.startsWith('#')) assert.ok(ids.includes(ref.slice(1)), `missing slide: ${ref}`);
    else await access(path.join('presentations', ref.split(/[?#]/)[0]));
  }
  for (const [, id] of index.matchAll(/presentations\/index.html(?:\?preview=1)?#([^"\s]+)/g)) {
    assert.ok(ids.includes(id), `gallery references missing slide ${id}`);
  }
  assert.ok(html.includes(company.name));
  assert.ok(html.includes(`mailto:${company.inquiriesEmail}`));
  assert.ok(html.includes(company.kvk.url.replaceAll('&', '&amp;')));
  assert.ok(html.includes('Illustrative data'));
  const build = await readFile('scripts/build.mjs', 'utf8');
  assert.ok(build.includes("'presentations'"));
});
