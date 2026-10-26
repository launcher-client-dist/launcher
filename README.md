# opengea-site

The Opengea website: the "Vanguard" landing page (launcher-first hero, news, media, how to play, requirements),
published on GitHub Pages. Static HTML + Tailwind CSS, no framework, no cookies, no tracking.

```
src/index.html       the page (English text; pt-BR comes from app.js)
src/app.js           strings (en, pt-BR), launcher preview tabs, lightbox, menu, live release numbers
src/styles.css       Tailwind input + fonts and motion
src/assets/          self-hosted fonts (OFL), images (webp), favicon
tailwind.config.cjs  design tokens (colors, fonts, shadows)
scripts/build.mjs    builds dist/ (copies src/, compiles the CSS)
```

## Build and preview

```bash
npm ci
npm run build          # -> dist/
npm run serve          # build, then http://localhost:8080
```

## Content

* **Release numbers** (launcher version, size and SHA-256; client version and download size) are read on load from the
  GitHub API (`launcher-client-dist/launcher`, `launcher-client-dist/dist`); the values in `app.js` (`release`) and in
  the HTML are the fallback. Update them with each release so the page is right even without the API.
* **"Latest in vX" and the news cards** are written by hand in `index.html` and `app.js` (both languages).
* **Images**: the artwork comes from the launcher's `content/` folder; game screenshots (Community, Lab of innovation)
  are converted with `python scripts/add_screenshot.py <image> <name>` and listed in `MEDIA` in `app.js`.

## Deploy

Published at https://launcher-client-dist.github.io/launcher/ from the `gh-pages` branch of
`launcher-client-dist/launcher` (this source lives on its `site` branch; `main` and the releases are untouched).
To deploy: `npm run build`, then push `dist/` to `gh-pages` (`npm run deploy`).

