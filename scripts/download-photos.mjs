import { mkdir, writeFile, access } from 'node:fs/promises';
import { photos } from '../dist/data.js';
await mkdir('.qa/originals', { recursive: true });
for (const p of photos) {
  try { await access(`.qa/originals/${p.id}.jpg`); console.log(`Retained ${p.id}`); continue; } catch {}
  let response;
  for (let attempt = 0; attempt < 4; attempt++) {
    response = await fetch(p.remote + (attempt ? `?download=${attempt}` : ''), { headers: { 'User-Agent': 'TetouanDiscovery/1.0 (educational travel guide; photo credit included)' } });
    if (response.ok || ![429,503].includes(response.status)) break;
    console.log(`${p.id}: retrying after HTTP ${response.status}`);
    await new Promise(resolve => setTimeout(resolve, 5000 * (attempt + 1)));
  }
  if (!response.ok) throw new Error(`${p.id}: HTTP ${response.status}`);
  await writeFile(`.qa/originals/${p.id}.jpg`, Buffer.from(await response.arrayBuffer()));
  console.log(`Downloaded ${p.id}`);
  await new Promise(resolve => setTimeout(resolve, 1200));
}
