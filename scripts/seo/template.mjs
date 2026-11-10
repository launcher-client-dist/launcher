// Renders one guide page (scripts/seo/pages.mjs) into a full static HTML document.
// The pages live in sub-folders (/apogea-release-date/), so every asset and link is absolute (the site is at the
// domain root). No app.js here: the pages are plain static text.

export const SITE = 'https://opengea.tech';
export const DOWNLOAD_URL = 'https://github.com/launcher-client-dist/launcher/releases/latest/download/ClientLauncher.exe';
export const DISCORD_URL = 'https://discord.gg/a8VQhTh5tE';

const UI = {
  en: {
    home: 'Home', guides: 'Apogea guides', how: 'How to play', download: 'Download',
    downloadLauncher: 'Download the launcher', discord: 'Join the Discord',
    ctaTitle: 'Play Apogea now on Opengea', ctaText: 'Free, no donations. Windows 10/11. The launcher installs the game, keeps it updated and verifies your files.',
    faq: 'Frequently asked questions', related: 'More Apogea guides', langLink: 'Português', langLabel: 'Ler em português',
    breadcrumb: 'Breadcrumb', disclaimer: 'Opengea is a non-profit community project: 100% free, with no donations. It is an unofficial fan project, not affiliated with or endorsed by any game studio or publisher.',
    footerAbout: 'A community-made game client and server, with its own launcher that installs, updates and verifies the game.',
    legal: 'Legal', legalNotice: 'Legal notice', rules: 'Rules', terms: 'Terms of use', privacy: 'Privacy', game: 'Game', menu: 'Menu',
  },
  'pt-BR': {
    home: 'Início', guides: 'Guias de Apogea', how: 'Como jogar', download: 'Baixar',
    downloadLauncher: 'Baixar o launcher', discord: 'Entrar no Discord',
    ctaTitle: 'Jogue Apogea agora no Opengea', ctaText: 'De graça, sem doações. Windows 10/11. O launcher instala o jogo, mantém tudo atualizado e confere os seus arquivos.',
    faq: 'Perguntas frequentes', related: 'Mais guias de Apogea', langLink: 'English', langLabel: 'Read in English',
    breadcrumb: 'Navegação', disclaimer: 'O Opengea é um projeto comunitário sem fins lucrativos: 100% gratuito, sem doações. É um projeto de fãs não oficial, sem vínculo nem aprovação de nenhum estúdio ou distribuidora de jogos.',
    footerAbout: 'Um cliente e servidor de jogo feitos pela comunidade, com o próprio launcher que instala, atualiza e confere o jogo.',
    legal: 'Legal', legalNotice: 'Aviso legal', rules: 'Regras', terms: 'Termos de uso', privacy: 'Privacidade', game: 'Jogo', menu: 'Menu',
  },
};

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const strip = (html) => String(html).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
export const url = (slug) => `${SITE}/${slug}/`;
const href = (slug) => `/${slug}/`;

function jsonLd(page, bySlug) {
  const hub = page.lang === 'en' ? 'apogea' : 'pt/apogea';
  const crumbs = [{ name: 'Opengea', item: `${SITE}/` }];
  if (page.slug !== hub) crumbs.push({ name: bySlug[hub].nav, item: url(hub) });
  crumbs.push({ name: page.nav, item: url(page.slug) });
  const graph = [
    {
      '@type': 'WebPage', '@id': `${url(page.slug)}#page`, url: url(page.slug), name: page.title,
      description: page.description, inLanguage: page.lang, isPartOf: { '@id': `${SITE}/#website` },
    },
    { '@type': 'WebSite', '@id': `${SITE}/#website`, url: `${SITE}/`, name: 'Opengea' },
    {
      '@type': 'BreadcrumbList',
      itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: c.item })),
    },
  ];
  if (page.faq?.length) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: page.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: strip(a) } })),
    });
  }
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
}

export function render(page, bySlug, versions) {
  const t = UI[page.lang];
  const alt = page.alt && bySlug[page.alt];
  const hub = page.lang === 'en' ? 'apogea' : 'pt/apogea';
  const home = page.lang === 'en' ? '/' : '/';
  const css = `/styles.css?v=${versions['styles.css']}`;
  const related = (page.related || []).map((s) => bySlug[s]).filter(Boolean);

  const hreflang = alt
    ? `
  <link rel="alternate" hreflang="${page.lang}" href="${url(page.slug)}" />
  <link rel="alternate" hreflang="${alt.lang}" href="${url(alt.slug)}" />
  <link rel="alternate" hreflang="x-default" href="${url(page.lang === 'en' ? page.slug : alt.slug)}" />`
    : '';

  const sections = page.sections.map(([h2, body]) => `
          <section class="mt-10">
            <h2 class="type-h1 text-xl sm:text-2xl text-txt-primary mb-4">${esc(h2)}</h2>
            <div class="seo-prose">${body}</div>
          </section>`).join('');

  const faq = page.faq?.length ? `
          <section class="mt-12">
            <h2 class="type-h1 text-xl sm:text-2xl text-txt-primary mb-4">${t.faq}</h2>
            <div class="flex flex-col gap-3">${page.faq.map(([q, a]) => `
              <details class="group rounded-xl bg-panel border border-border px-5 py-4 open:border-gold/40">
                <summary class="cursor-pointer list-none font-semibold text-txt-primary flex items-center justify-between gap-4">${esc(q)}<span class="text-gold transition-transform group-open:rotate-45" aria-hidden="true">+</span></summary>
                <div class="seo-prose mt-3">${a}</div>
              </details>`).join('')}
            </div>
          </section>` : '';

  const relatedHtml = related.length ? `
          <nav class="mt-12" aria-label="${t.related}">
            <h2 class="type-h1 text-xl sm:text-2xl text-txt-primary mb-4">${t.related}</h2>
            <ul class="grid grid-cols-1 sm:grid-cols-2 gap-3">${related.map((r) => `
              <li><a href="${href(r.slug)}" class="block h-full rounded-xl bg-panel border border-border hover:border-gold/50 px-5 py-4 transition-colors"><span class="block font-semibold text-txt-primary">${esc(r.nav)}</span><span class="block text-sm text-txt-secondary mt-1">${esc(r.description)}</span></a></li>`).join('')}
            </ul>
          </nav>` : '';

  const cta = `
          <aside class="mt-10 rounded-2xl bg-[#060F1A] border border-gold/30 p-6 sm:p-8">
            <p class="type-h1 text-lg sm:text-xl text-gold mb-2">${t.ctaTitle}</p>
            <p class="text-sm text-txt-secondary mb-5">${t.ctaText}</p>
            <div class="flex flex-col sm:flex-row gap-3">
              <a href="${DOWNLOAD_URL}" class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gold hover:bg-gold-hover active:bg-gold-pressed text-bg font-bold shadow-gold-glow transition-colors">${t.downloadLauncher}</a>
              <a href="${DISCORD_URL}" target="_blank" rel="noopener" class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-panel border border-border hover:border-gold/50 text-txt-primary font-semibold transition-colors">${t.discord}</a>
            </div>
          </aside>`;

  return `<!DOCTYPE html>
<html lang="${page.lang}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(page.title)}</title>
  <meta name="description" content="${esc(page.description)}" />
  <meta name="theme-color" content="#08131F" />
  <meta name="color-scheme" content="dark" />
  <link rel="canonical" href="${url(page.slug)}" />${hreflang}
  <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml" />
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="Opengea" />
  <meta property="og:title" content="${esc(page.title)}" />
  <meta property="og:description" content="${esc(page.description)}" />
  <meta property="og:image" content="${SITE}/assets/img/og-image.jpg" />
  <meta property="og:url" content="${url(page.slug)}" />
  <meta property="og:locale" content="${page.lang === 'en' ? 'en_US' : 'pt_BR'}" />
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="preload" href="/assets/fonts/cinzel-latin-700-normal.woff2" as="font" type="font/woff2" crossorigin />
  <link rel="preload" href="/assets/fonts/inter-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin />
  <link rel="stylesheet" href="${css}" />
  <script type="application/ld+json">${jsonLd(page, bySlug)}</script>
</head>
<body class="min-h-screen flex flex-col selection:bg-gold selection:text-bg">
  <div class="relative flex-1 flex flex-col w-full max-w-[1440px] mx-auto bg-bg shadow-[0_0_60px_rgba(0,0,0,0.8)]">

    <header class="sticky top-0 z-50 bg-[#08131F]/85 backdrop-blur-md border-b border-border/80">
      <div class="max-w-[1280px] mx-auto px-4 sm:px-8 h-20 flex items-center justify-between gap-4">
        <a href="${home}" class="flex items-center gap-3 group shrink-0" aria-label="Opengea">
          <img src="/assets/img/logo-280.webp" width="140" height="52" alt="Opengea" class="h-9 sm:h-11 w-auto drop-shadow-[0_0_12px_rgba(210,168,75,0.35)] group-hover:brightness-110 transition" />
        </a>
        <nav class="hidden md:flex items-center gap-1" aria-label="${t.menu}">
          <a href="${home}" class="nav-link">${t.home}</a>
          <a href="${href(hub)}" class="nav-link"${page.slug === hub ? ' aria-current="true"' : ''}>${t.guides}</a>
          <a href="/#how-to-play" class="nav-link">${t.how}</a>
          <a href="${DISCORD_URL}" target="_blank" rel="noopener" class="nav-link">Discord</a>
        </nav>
        <div class="flex items-center gap-2 sm:gap-3">
          ${alt ? `<a href="${href(alt.slug)}" hreflang="${alt.lang}" lang="${alt.lang}" class="px-2.5 py-2 rounded-lg bg-panel border border-border text-xs font-mono font-semibold text-txt-secondary hover:text-txt-primary hover:border-gold/50 transition-colors" aria-label="${t.langLabel}">${alt.lang === 'en' ? 'EN' : 'PT'}</a>` : ''}
          <a href="${DOWNLOAD_URL}" class="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gold hover:bg-gold-hover active:bg-gold-pressed text-bg font-semibold text-sm shadow-gold-glow transition-all duration-150">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"/></svg>
            <span>${t.download}</span>
          </a>
        </div>
      </div>
    </header>

    <main id="main" class="flex-1">
      <article class="max-w-[820px] mx-auto px-4 sm:px-8 py-10 sm:py-14">
        <nav aria-label="${t.breadcrumb}" class="text-xs font-mono text-txt-muted mb-6">
          <a href="${home}" class="hover:text-gold">Opengea</a>${page.slug !== hub ? ` <span aria-hidden="true">/</span> <a href="${href(hub)}" class="hover:text-gold">${esc(bySlug[hub].nav)}</a>` : ''} <span aria-hidden="true">/</span> <span class="text-txt-secondary">${esc(page.nav)}</span>
        </nav>
        <span class="text-xs font-mono uppercase tracking-[0.2em] text-gold block mb-3">${esc(page.eyebrow)}</span>
        <h1 class="type-h1 text-3xl sm:text-5xl text-txt-primary mb-6">${esc(page.h1)}</h1>
        <div class="seo-prose seo-lead">${page.intro}</div>
        ${cta}
        ${sections}
        ${faq}
        ${relatedHtml}
      </article>
    </main>

    <footer class="bg-[#050C14] border-t border-border mt-auto">
      <div class="max-w-[1280px] mx-auto px-4 sm:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-border">
          <div class="md:col-span-5">
            <img src="/assets/img/logo-280.webp" width="140" height="52" alt="Opengea" loading="lazy" class="h-10 w-auto mb-4" />
            <p class="text-sm text-txt-secondary max-w-[380px]">${t.footerAbout}</p>
          </div>
          <div class="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6 text-sm">
            <div>
              <h4 class="font-mono text-xs uppercase tracking-wider text-gold mb-3">${t.game}</h4>
              <ul class="space-y-2.5 text-txt-secondary">
                <li><a href="${DOWNLOAD_URL}" class="hover:text-txt-primary transition-colors">${t.downloadLauncher}</a></li>
                <li><a href="/#how-to-play" class="hover:text-txt-primary transition-colors">${t.how}</a></li>
                <li><a href="${DISCORD_URL}" target="_blank" rel="noopener" class="hover:text-txt-primary transition-colors">Discord</a></li>
              </ul>
            </div>
            <div>
              <h4 class="font-mono text-xs uppercase tracking-wider text-gold mb-3">${t.guides}</h4>
              <ul class="space-y-2.5 text-txt-secondary">${(bySlug[hub].related || []).slice(0, 5).map((s) => bySlug[s]).filter(Boolean).map((r) => `
                <li><a href="${href(r.slug)}" class="hover:text-txt-primary transition-colors">${esc(r.nav)}</a></li>`).join('')}
              </ul>
            </div>
            <div>
              <h4 class="font-mono text-xs uppercase tracking-wider text-gold mb-3">${t.legal}</h4>
              <ul class="space-y-2.5 text-txt-secondary">
                <li><a href="/legal.html#notice" class="hover:text-txt-primary transition-colors">${t.legalNotice}</a></li>
                <li><a href="/legal.html#rules" class="hover:text-txt-primary transition-colors">${t.rules}</a></li>
                <li><a href="/legal.html#terms" class="hover:text-txt-primary transition-colors">${t.terms}</a></li>
                <li><a href="/legal.html#privacy" class="hover:text-txt-primary transition-colors">${t.privacy}</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-txt-muted">
          <div>© 2026 Opengea</div>
          <div class="text-center sm:text-right max-w-[640px]">${t.disclaimer}</div>
        </div>
      </div>
    </footer>
  </div>
</body>
</html>
`;
}
