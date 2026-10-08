import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { allEntries, photos, sources, routes, timeline, places } from '../dist/data.js';
import { uiTranslations } from '../dist/i18n.js';
import { busLines } from '../dist/extra-pages.js';

const languages=['fr','ar','en','es'];
function checkLanguages(value,path='data'){
  if(!value || typeof value!=='object')return;
  if('fr' in value && 'ar' in value){for(const lang of languages)assert(typeof value[lang]==='string'&&value[lang].length,`Missing ${lang}: ${path}`);return;}
  for(const [key,child] of Object.entries(value))checkLanguages(child,`${path}.${key}`);
}
checkLanguages({allEntries,photos,sources,routes,timeline,busLines});

const unique = new Set();
for (const item of allEntries) {
  assert(!unique.has(item.id), `Duplicate id: ${item.id}`); unique.add(item.id);
  for (const field of ['title','summary','body','tips']) for(const lang of languages)assert(item[field][lang], `${item.id}: missing ${lang} ${field}`);
  assert(photos.some(p=>p.id===item.photoId), `${item.id}: missing image record`);
  for (const id of item.sourceIds) assert(sources[id], `${item.id}: unknown source ${id}`);
}
for (const route of routes) for (const id of route.stops) assert(unique.has(id), `Unknown itinerary stop: ${id}`);
// Read actual JPEG frame dimensions; metadata alone is insufficient.
function jpegDimensions(buffer){
 assert.equal(buffer.readUInt16BE(0),0xffd8,'Invalid JPEG');let i=2;
 while(i<buffer.length){if(buffer[i]!==0xff){i++;continue;}const marker=buffer[i+1];i+=2;if(marker===0xd9||marker===0xda)break;if(marker===0x00||marker===0xff)continue;const size=buffer.readUInt16BE(i);if([0xc0,0xc1,0xc2].includes(marker))return {height:buffer.readUInt16BE(i+3),width:buffer.readUInt16BE(i+5)};i+=size;}
 throw new Error('JPEG frame missing');
}
for (const photo of photos) { await access(`dist/${photo.src}`); const dimensions=jpegDimensions(await readFile(`dist/${photo.src}`));assert(dimensions.width>=1920&&dimensions.height>=1080,`Below Full HD: ${photo.id}`);assert.equal(photo.width,dimensions.width);assert.equal(photo.height,dimensions.height); }
assert.equal(places.filter(p=>p.type==='district').length,19);
assert.equal(busLines.length,25);assert.equal(new Set(busLines.map(x=>x.number)).size,25);
for(const line of busLines){assert(line.sourceUrl.startsWith('https://moovitapp.com/'));assert.equal(line.checkedOn,'2026-10-08');assert(!('fare' in line)&&!('hours' in line));}
for (const file of ['dist/main.js','dist/app.js','dist/data.js','dist/extra-data.js','dist/extra-pages.js','dist/content-locales.js','dist/i18n.js','scripts/server.mjs']) {
  const result=spawnSync(process.execPath,['--check',file],{encoding:'utf8'}); assert.equal(result.status,0,result.stderr);
}
const html=await readFile('dist/index.html','utf8');
assert(html.includes('main.js') && html.includes('styles.css') && html.includes('favicon.svg'));
for(const file of ['dist/main.js','dist/extra-pages.js']){
 const js=await readFile(file,'utf8');
 const pattern=/\b(?:L|B)\((('(?:[^'\\]|\\.)*')(?:,\s*'(?:[^'\\]|\\.)*')*)\)/g;
 for(const match of js.matchAll(pattern)){
  const args=Function(`return [${match[1]}]`)();
  if(args.length===2)assert(uiTranslations[args[0]]?.en&&uiTranslations[args[0]]?.es,`Missing UI translation: ${args[0]}`);
 }
}
console.log(`Verified ${allEntries.length} entries in four languages, ${photos.length} genuine Full HD photographs, 19 districts, 25 sourced bus labels and ${routes.length} itineraries. JavaScript syntax passed.`);
