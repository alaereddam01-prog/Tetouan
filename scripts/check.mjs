import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { allEntries, photos, sources, routes } from '../dist/data.js';

const unique = new Set();
for (const item of allEntries) {
  assert(!unique.has(item.id), `Duplicate id: ${item.id}`); unique.add(item.id);
  for (const field of ['title','summary','body','tips']) assert(item[field].fr && item[field].ar, `${item.id}: missing bilingual ${field}`);
  assert(photos.some(p=>p.id===item.photoId), `${item.id}: missing image record`);
  for (const id of item.sourceIds) assert(sources[id], `${item.id}: unknown source ${id}`);
}
for (const route of routes) for (const id of route.stops) assert(unique.has(id), `Unknown itinerary stop: ${id}`);
for (const photo of photos) { await access(`dist/${photo.src}`); assert((await readFile(`dist/${photo.src}`)).length > 1000, `Empty image: ${photo.id}`); }
for (const file of ['dist/main.js','dist/app.js','dist/data.js','scripts/server.mjs']) {
  const result=spawnSync(process.execPath,['--check',file],{encoding:'utf8'}); assert.equal(result.status,0,result.stderr);
}
const html=await readFile('dist/index.html','utf8');
assert(html.includes('main.js') && html.includes('styles.css') && html.includes('favicon.svg'));
console.log(`Verified ${allEntries.length} bilingual entries, ${photos.length} local photographs and ${routes.length} itineraries. JavaScript syntax passed.`);
