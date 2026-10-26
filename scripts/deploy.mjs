// Publishes dist/ to the gh-pages branch of origin (GitHub Pages serves that branch).
import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const dist = path.join(root, 'dist');
const rootGit = (...args) => execFileSync('git', args, { cwd: root }).toString().trim();
const remote = rootGit('remote', 'get-url', 'origin');
const commit = rootGit('rev-parse', '--short', 'HEAD');

// dist/ is a fresh repo, so its commit would take the global git identity: author it as this repo's commits are.
const identity = (key) => {
  try {
    return rootGit('config', key);
  } catch {
    throw new Error(`No ${key} for this repo: set it with \`git config ${key} ...\` before deploying.`);
  }
};
const user = ['-c', `user.name=${identity('user.name')}`, '-c', `user.email=${identity('user.email')}`];
const git = (...args) => execFileSync('git', [...user, ...args], { cwd: dist, stdio: 'inherit' });

writeFileSync(path.join(dist, '.nojekyll'), '');
git('init', '-q', '-b', 'gh-pages');
git('add', '-A');
git('commit', '-q', '-m', `Deploy site ${commit}`);
git('push', '-f', remote, 'gh-pages');
