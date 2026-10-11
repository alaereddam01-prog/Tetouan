import {mkdir,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const version='1.9.4',base=`https://unpkg.com/leaflet@${version}`;
const files=['leaflet.js','leaflet.js.map','leaflet.css','images/layers.png','images/layers-2x.png','images/marker-icon.png','images/marker-icon-2x.png','images/marker-shadow.png'];
await mkdir('dist/vendor/leaflet/images',{recursive:true});
const hashes={};
for(const file of files){const response=await fetch(`${base}/dist/${file}`);if(!response.ok)throw Error(`${file}: ${response.status}`);const bytes=Buffer.from(await response.arrayBuffer());await writeFile(`dist/vendor/leaflet/${file}`,bytes);hashes[file]=createHash('sha256').update(bytes).digest('hex');}
const license=await fetch(`${base}/LICENSE`);if(!license.ok)throw Error('Leaflet license missing');await writeFile('dist/vendor/leaflet/LICENSE',await license.text());
await writeFile('dist/vendor/leaflet/provenance.json',JSON.stringify({name:'Leaflet',version,source:'https://github.com/Leaflet/Leaflet/tree/v1.9.4',license:'BSD-2-Clause',sha256:hashes},null,2)+'\n');
console.log(`Vendored Leaflet ${version}, its styles, images, license and checksums.`);
