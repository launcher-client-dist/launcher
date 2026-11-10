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

// The guide pages (scripts/seo/pages.mjs): one folder each (/apogea-release-date/index.html), then the
// sitemap and robots.txt that list them with the home and legal pages.
const { PAGES } = await import('./seo/pages.mjs');
const { render, url, SITE } = await import('./seo/template.mjs');
const bySlug = Object.fromEntries(PAGES.map((p) => [p.slug, p]));
for (const page of PAGES) {
  for (const s of [page.alt, ...(page.related || [])].filter(Boolean)) {
    if (!bySlug[s]) throw new Error(`seo page ${page.slug}: unknown link ${s}`);
  }
  const dir = path.join(dist, ...page.slug.split('/'));
  mkdirSync(dir, { recursive: true });
  writeFileSync(path.join(dir, 'index.html'), render(page, bySlug, versions));
}
const today = new Date().toISOString().slice(0, 10);
const entry = (loc, alts = []) => `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>${alts.map((a) => `\n    <xhtml:link rel="alternate" hreflang="${a.lang}" href="${a.href}" />`).join('')}\n  </url>`;
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  entry(`${SITE}/`),
  entry(`${SITE}/legal.html`),
  ...PAGES.map((p) => entry(url(p.slug), p.alt ? [{ lang: p.lang, href: url(p.slug) }, { lang: bySlug[p.alt].lang, href: url(p.alt) }] : [])),
  '</urlset>',
  '',
].join('\n');
writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);
writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
console.log('Built', path.relative(root, dist), versions, `${PAGES.length} guide pages`);
