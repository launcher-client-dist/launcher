// Builds the static site into dist/: copies src/ (except the Tailwind input), compiles styles.css, and stamps the
// CSS/JS links in the pages with a content hash (?v=...) so a deploy never mixes new HTML with cached old CSS/JS.
import { cpSync, rmSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const src = path.join(root, 'src');
const dist = path.join(root, 'dist');

rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });
cpSync(src, dist, { recursive: true, filter: (p) => p !== path.join(src, 'styles.css') });

const tailwind = createRequire(import.meta.url).resolve('tailwindcss/lib/cli.js');
execFileSync(process.execPath, [tailwind, '-c', path.join(root, 'tailwind.config.cjs'), '-i', path.join(src, 'styles.css'), '-o', path.join(dist, 'styles.css'), '--minify'], { stdio: 'inherit' });

const hash = (file) => createHash('sha256').update(readFileSync(path.join(dist, file))).digest('hex').slice(0, 10);
const versions = { 'styles.css': hash('styles.css'), 'app.js': hash('app.js') };
for (const page of ['index.html', 'legal.html', '404.html']) {
  const file = path.join(dist, page);
  let html = readFileSync(file, 'utf8');
  for (const [asset, v] of Object.entries(versions)) {
    html = html.replace(new RegExp(`(["/])${asset.replace('.', '\\.')}"`, 'g'), `$1${asset}?v=${v}"`);
  }
  writeFileSync(file, html);
}
console.log('Built', path.relative(root, dist), versions);
