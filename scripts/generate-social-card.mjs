import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

// Try sharp first; fall back to resvg-js if unavailable
let renderer = null;
let use = 'sharp';
try {
  const { default: sharp } = await import('sharp');
  renderer = async (svg) => sharp(svg).png({ quality: 90 }).toBuffer();
} catch (e) {
  use = 'resvg';
}
if (!renderer) {
  try {
    const { Resvg } = await import('@resvg/resvg-js');
    renderer = async (svg) => {
      const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } });
      const pngData = resvg.render();
      return Buffer.from(pngData.asPng());
    };
  } catch (e) {
    console.error('\nNo renderer available. Install one of:');
    console.error('  npm i -D sharp');
    console.error('  npm i -D @resvg/resvg-js');
    process.exit(1);
  }
}

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const root = path.resolve(__dirname, '..');
const publicDir = path.join(root, 'public');

const srcSvg = path.join(publicDir, 'social-card.svg');
const outPng = path.join(publicDir, 'social-card.png');

try {
  const svg = await readFile(srcSvg);
  const png = await renderer(svg);
  await writeFile(outPng, png);
  console.log(`Generated (${use}):`, path.relative(root, outPng));
} catch (err) {
  console.error('Failed to generate social-card.png:', err.message);
  process.exit(1);
}
