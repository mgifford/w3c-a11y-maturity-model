import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

let Resvg;
try {
  ({ Resvg } = await import('@resvg/resvg-js'));
} catch (e) {
  console.error('Missing @resvg/resvg-js. Install with: npm i -D @resvg/resvg-js');
  process.exit(1);
}

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const root = path.resolve(__dirname, '..');
const srcSvg = path.join(root, 'src', 'assets', 'accessibility-maturity-model-logo.svg');
const outPng = path.join(root, 'public', 'favicon-32.png');

try {
  const svg = await readFile(srcSvg, 'utf-8');
  const resvg = new Resvg(svg, { 
    fitTo: { mode: 'width', value: 32 },
    background: 'transparent'
  });
  const pngData = resvg.render();
  await writeFile(outPng, Buffer.from(pngData.asPng()));
  console.log('Generated favicon:', path.relative(root, outPng));
} catch (err) {
  console.error('Failed to generate favicon:', err.message);
  process.exit(1);
}
