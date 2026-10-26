// Builds the static site into dist/: copies src/ (except the Tailwind input) and compiles styles.css.
import { cpSync, rmSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
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
console.log('Built', path.relative(root, dist));
