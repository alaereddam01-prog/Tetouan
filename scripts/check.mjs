import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import {createHash} from 'node:crypto';
import {audioStories, storyForEntry} from '../dist/audio-stories.js';
import {audioRecordings} from '../dist/audio-recordings.js';
import {audioLabels} from '../dist/audio-i18n.js';
import { allEntries, photos, sources, routes, timeline, places } from '../dist/data.js';
import { uiTranslations } from '../dist/i18n.js';
import { busLines } from '../dist/extra-pages.js';
import {people} from '../dist/people-data.js';
import {locationRecords,locationPhotos,photoCoverage} from '../dist/location-data.js';
import {footballDetails} from '../dist/football-data.js';
import {mapLabels} from '../dist/map-i18n.js';
import {mapTileProvider} from '../dist/map-config.js';

const languages=['fr','ar','en','es'];
function checkLanguages(value,path='data'){
  if(!value || typeof value!=='object')return;
  if('fr' in value && 'ar' in value){for(const lang of languages)assert(typeof value[lang]==='string'&&value[lang].length,`Missing ${lang}: ${path}`);return;}
  for(const [key,child] of Object.entries(value))checkLanguages(child,`${path}.${key}`);
}
checkLanguages({allEntries,photos,sources,routes,timeline,busLines});
checkLanguages({people,locationRecords,locationPhotos,photoCoverage,footballDetails,mapLabels});
assert.equal(people.length,22);assert.equal(new Set(people.map(p=>p.id)).size,22);
assert.equal(new Set(people.map(p=>p.portrait.src)).size,22,'Each personality needs their own distinct image');
for(const p of people){assert(p.references.length>0);assert(p.portrait.width>0&&p.portrait.height>0);assert(/^https:\/\//.test(p.portrait.source));assert(p.portrait.author&&p.portrait.license);for(const v of p.videos){assert(/^[a-zA-Z0-9_-]{11}$/.test(v.id));assert(v.url.endsWith(v.id));}}
const photoIds=new Set([...photos,...locationPhotos].map(p=>p.id));assert.equal(photoIds.size,photos.length+locationPhotos.length);
for(const [id,r] of Object.entries(locationRecords)){assert(places.some(e=>e.id===id));assert(Number.isFinite(r.lat)&&Number.isFinite(r.lng));assert(r.lat>35.5&&r.lat<35.7&&r.lng>-5.5&&r.lng<-5.2,`Point outside the documented Tetouan region: ${id}`);assert(r.checkedOn&&r.sourceName&&r.sourceUrl.startsWith('https://'));}
for(const [id,c] of Object.entries(photoCoverage)){assert(places.some(e=>e.id===id));assert(c.status==='verified'||c.status==='unavailable');for(const photoId of c.photoIds)assert(photoIds.has(photoId),`Unknown exact-place photograph ${id}/${photoId}`);if(c.status==='unavailable')assert.equal(c.photoIds.length,0);}
for(const id of ['museum','dar-oddi','dar-sanaa','bab-okla','palais','tamuda','martil','feddan','ensanche'])assert(photoCoverage[id].photoIds.length>=3,`Needs three distinct photographs: ${id}`);
assert.equal(mapTileProvider.url,'https://tile.openstreetmap.org/{z}/{x}/{y}.png');assert(mapTileProvider.attribution.includes('OpenStreetMap'));
assert.equal(footballDetails.leadership.length,2);for(const p of footballDetails.leadership)assert(p.confirmedOn&&p.sourceUrl.startsWith('https://www.matfoot.com/'));assert.equal(footballDetails.stadium.photos.length,3);assert.equal(new Set(footballDetails.stadium.photos.map(p=>p.src)).size,3);
for(const p of [...locationPhotos,...people.map(p=>p.portrait)])if(!p.src.startsWith('https://'))await access(`dist/${p.src}`);

const unique = new Set();
for (const item of allEntries) {
  assert(!unique.has(item.id), `Duplicate id: ${item.id}`); unique.add(item.id);
  for (const field of ['title','summary','body','tips']) for(const lang of languages)assert(item[field][lang], `${item.id}: missing ${lang} ${field}`);
  assert(photos.some(p=>p.id===item.photoId), `${item.id}: missing image record`);
  for (const id of item.sourceIds) assert(sources[id], `${item.id}: unknown source ${id}`);
}
for (const route of routes) for (const id of route.stops) assert(unique.has(id), `Unknown itinerary stop: ${id}`);
assert.equal(audioStories.length,5);
assert.equal(new Set(audioStories.map(s=>s.id)).size,5);
let recordings=0;
for(const story of audioStories){
 assert(photos.some(p=>p.id===story.photoId),`Audio photo: ${story.id}`);
 for(const id of story.entryIds)assert(unique.has(id),`Audio entry: ${id}`);
 for(const id of story.sourceIds)assert(sources[id],`Audio source: ${id}`);
 for(const lang of languages){
  assert(story.title[lang]&&story.intro[lang],`Audio translation: ${story.id}/${lang}`);
  assert(story.paragraphs[lang].length>=3&&story.paragraphs[lang].every(p=>typeof p==='string'&&p.length>40),`Audio transcript: ${story.id}/${lang}`);
  const recording=audioRecordings[story.id]?.[lang];if(!recording)continue;
  recordings++;assert(recording.duration>10&&recording.duration<300);assert(recording.license&&recording.attribution);
  assert.equal(recording.transcriptHash,createHash('sha256').update(story.paragraphs[lang].join('\n\n')).digest('hex'),`Outdated recording: ${story.id}/${lang}`);
  const mp3=await readFile(`dist/${recording.src}`);assert(mp3.length>5000,`Empty recording: ${recording.src}`);
 }
}
assert.equal(recordings,15);
for(const lang of languages){assert.deepEqual(Object.keys(audioLabels[lang]).sort(),Object.keys(audioLabels.en).sort());for(const label of Object.values(audioLabels[lang]))assert(label&&typeof label==='string'||label&&typeof label==='object');}
assert.equal(storyForEntry(allEntries.find(e=>e.id==='mat-story')),null,'Football belongs on its own page');
// Read actual JPEG frame dimensions; metadata alone is insufficient.
function jpegDimensions(buffer){
 assert.equal(buffer.readUInt16BE(0),0xffd8,'Invalid JPEG');let i=2;
 while(i<buffer.length){if(buffer[i]!==0xff){i++;continue;}const marker=buffer[i+1];i+=2;if(marker===0xd9||marker===0xda)break;if(marker===0x00||marker===0xff)continue;const size=buffer.readUInt16BE(i);if([0xc0,0xc1,0xc2].includes(marker))return {height:buffer.readUInt16BE(i+3),width:buffer.readUInt16BE(i+5)};i+=size;}
 throw new Error('JPEG frame missing');
}
for (const photo of photos) { await access(`dist/${photo.src}`); const dimensions=jpegDimensions(await readFile(`dist/${photo.src}`));assert(dimensions.width>=1920&&dimensions.height>=1080,`Below Full HD: ${photo.id}`);assert.equal(photo.width,dimensions.width);assert.equal(photo.height,dimensions.height); }
for(const p of locationPhotos){assert(p.width>0&&p.height>0&&p.author&&p.source&&p.license);if(!p.src.startsWith('https://')){const dimensions=jpegDimensions(await readFile(`dist/${p.src}`));assert.equal(p.width,dimensions.width,`Photo width: ${p.id}`);assert.equal(p.height,dimensions.height,`Photo height: ${p.id}`);}}
const provenance=JSON.parse(await readFile('dist/vendor/leaflet/provenance.json','utf8'));assert.equal(provenance.version,'1.9.4');
for(const [file,hash] of Object.entries(provenance.sha256))assert.equal(createHash('sha256').update(await readFile(`dist/vendor/leaflet/${file}`)).digest('hex'),hash,`Leaflet integrity: ${file}`);
assert.equal(places.filter(p=>p.type==='district').length,19);
assert.equal(busLines.length,25);assert.equal(new Set(busLines.map(x=>x.number)).size,25);
for(const line of busLines){assert(line.sourceUrl.startsWith('https://moovitapp.com/'));assert.equal(line.checkedOn,'2026-10-08');assert(!('fare' in line)&&!('hours' in line));}
for (const file of ['dist/main.js','dist/app.js','dist/data.js','dist/extra-data.js','dist/extra-pages.js','dist/content-locales.js','dist/i18n.js','dist/audio-guide.js','dist/audio-i18n.js','dist/audio-stories.js','dist/audio-recordings.js','dist/city-map.js','dist/map-config.js','dist/map-i18n.js','dist/location-data.js','dist/people-data.js','dist/people-feature.js','dist/football-data.js','dist/football-feature.js','dist/contacts.js','scripts/server.mjs']) {
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
console.log(`Verified ${allEntries.length} entries in four languages, ${photos.length} original Full HD photographs, ${locationPhotos.length} sourced location images, ${people.length} personalities, ${Object.keys(locationRecords).length} verified map points, 19 districts, 25 sourced bus labels, ${routes.length} itineraries and five audio stories with 15 recordings matching their transcripts. JavaScript syntax passed.`);
