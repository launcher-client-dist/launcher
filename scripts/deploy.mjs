// Publishes dist/ to the gh-pages branch of origin (GitHub Pages serves that branch).
import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const dist = path.join(root, 'dist');
const git = (...args) => execFileSync('git', args, { cwd: dist, stdio: 'inherit' });
const remote = execFileSync('git', ['remote', 'get-url', 'origin'], { cwd: root }).toString().trim();
const commit = execFileSync('git', ['rev-parse', '--short', 'HEAD'], { cwd: root }).toString().trim();

writeFileSync(path.join(dist, '.nojekyll'), '');
git('init', '-q', '-b', 'gh-pages');
git('add', '-A');
git('commit', '-q', '-m', `Deploy site ${commit}`);
git('push', '-f', remote, 'gh-pages');
