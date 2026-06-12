// Converts the heavy PNGs in public/img to web-sized WebP and regenerates
// the PWA icons from the favicon source. Run after replacing any source image:
//   node scripts/optimize-images.mjs
import sharp from 'sharp';
import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const IMG = path.join(ROOT, 'public/img');
const PUB = path.join(ROOT, 'public');

// max width per image — screenshots render at ~400px wide cards (2x for retina)
const WIDTHS = { 'avatar.png': 800 };
const DEFAULT_WIDTH = 1280;

const kb = (n) => `${(n / 1024).toFixed(0)} KB`;

for (const file of await readdir(IMG)) {
  if (!file.endsWith('.png')) continue;
  const src = path.join(IMG, file);
  const out = src.replace(/\.png$/, '.webp');
  const width = WIDTHS[file] ?? DEFAULT_WIDTH;
  await sharp(src)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(out);
  console.log(`${file} ${kb((await stat(src)).size)} -> ${path.basename(out)} ${kb((await stat(out)).size)}`);
}

// og.png must stay PNG/JPEG for link scrapers, but compress it to 1200x630
const og = path.join(PUB, 'og.png');
await sharp(og)
  .resize({ width: 1200, height: 630, fit: 'cover' })
  .png({ compressionLevel: 9, palette: true, quality: 90 })
  .toFile(og + '.tmp');
const { rename } = await import('node:fs/promises');
await rename(og + '.tmp', og);
console.log(`og.png -> ${kb((await stat(og)).size)}`);

// PWA / touch icons from the favicon source
for (const size of [180, 192, 512]) {
  const out = path.join(PUB, `icon-${size}.png`);
  await sharp(path.join(PUB, 'favicon.png'))
    .resize(size, size)
    .png({ compressionLevel: 9, palette: true })
    .toFile(out);
  console.log(`icon-${size}.png ${kb((await stat(out)).size)}`);
}
