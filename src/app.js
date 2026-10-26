/* Opengea website — "The Vanguard" landing page.
 * No framework, no cookies. The only network calls are to the public GitHub API, for the latest release numbers;
 * when that fails the values baked in below (and in the HTML) stay. */
(() => {
  'use strict';

  const LAUNCHER_REPO = 'launcher-client-dist/launcher';
  const CLIENT_REPO = 'launcher-client-dist/dist';
  const DOWNLOAD_URL = `https://github.com/${LAUNCHER_REPO}/releases/latest/download/ClientLauncher.exe`;

  // Fallback release data (launcher v0.3.1, client v0.0.14), refreshed from GitHub on load.
  const release = {
    launcherVersion: '0.3.1',
    launcherBytes: 66397722,
    launcherSha: '7c256aa2ae8b66d8c2b3e5ae461e02c710accebef7afee24cf96cadeed724588',
    clientVersion: '0.0.14',
    clientBytes: 488378839,
    clientInstalledBytes: 756767672
  };

  /* ------------------------------------------------------------------ */
  /* Strings                                                            */
  /* ------------------------------------------------------------------ */
  const STRINGS = {
    en: {
      'meta.title': 'Opengea — Launcher and custom Apogea client',
      'skip': 'Skip to content',
      'brand.tagline': 'Custom<br/>Apogea client',
      'nav.label': 'Primary',
      'nav.home': 'Home',
      'nav.news': 'News',
      'nav.media': 'Media',
      'nav.how': 'How to play',
      'nav.req': 'Requirements',
      'nav.patches': 'Patch notes',
      'pill.title': 'Latest client release',
      'pill.client': 'Client',
      'lang.code': 'PT',
      'lang.switch': 'Mudar para português',
      'menu.open': 'Open menu',
      'menu.close': 'Close menu',
      'menu.label': 'Menu',
      'cta.short': 'Download',
      'cta.drawer': 'Download launcher',
      'cta.main': 'DOWNLOAD LAUNCHER',
      'cta.windowsOnly': 'Windows only',
      'cta.anyway': 'Download anyway →',
      'cta.otherOs': 'Opengea runs on Windows 10/11 (64-bit). Download it on your Windows PC.',
      'os.windows': 'Windows 10/11',
      'hero.badge': 'CLIENT',
      'hero.badge2': 'WINDOWS 10/11',
      'hero.title': 'YOUR ADVENTURE AWAITS IN OPENGEA.',
      'hero.lead': 'Download the <span data-rel="launcherSize"></span> Opengea launcher: it installs the custom Apogea client, keeps it on the latest build and verifies your files. No .NET install, no admin rights.',
      'patch.title': 'Latest in v0.0.14',
      'patch.all': 'Full changelog →',
      'patch.1': 'Movement is now 100% server-side',
      'patch.2': 'Black world from v0.0.12 (map data restored in v0.0.13)',
      'patch.3': 'Leaner client: the server now holds NPC, door and sign data',
      'tag.new': 'NEW',
      'tag.improved': 'IMPROVED',
      'tag.fixed': 'FIXED',
      'launcher.name': 'OPENGEA LAUNCHER',
      'launcher.uptodate': 'Up to date',
      'launcher.tabs': 'Launcher preview',
      'launcher.tab0': '▶ Play Opengea',
      'launcher.tab1': '🎉 Seasonal events',
      'launcher.tab2': '🦌 Mounts',
      'launcher.verified': 'SHA-256 verified',
      'launcher.client': 'Client:',
      'launcher.synced': '100% verified',
      'launcher.play': 'INSTALL & PLAY',
      'launcher.s0.title': 'Welcome to Opengea',
      'launcher.s0.sub': 'The custom Apogea client, always up to date.',
      'launcher.s0.status': 'Client {client} · Ready to play',
      'launcher.s1.title': 'Seasonal events',
      'launcher.s1.sub': 'Event news shows up right on the launcher home.',
      'launcher.s1.status': 'News and patch notes · One click away',
      'launcher.s2.title': 'Mounts and more',
      'launcher.s2.sub': 'Highlights and announcements, straight from the team.',
      'launcher.s2.status': 'Client {client} · Mounts built into the client',
      'cat.update': 'Update',
      'cat.community': 'Community',
      'news.eyebrow': 'Dispatches from Opengea',
      'news.title': 'Latest news & updates',
      'news.all': 'All releases',
      'news.client': 'Game client',
      'news.launcher': 'Launcher',
      'news.team': 'Opengea Team',
      'news.read': 'Read the release notes',
      'news.readLauncher': 'See launcher releases',
      'news.1.title': 'Client v0.0.14: movement goes server-side',
      'news.1.text': 'Walking is now handled 100% by the server, so the client no longer needs its own movement hooks.',
      'news.2.title': 'Launcher v0.3.1 installs itself',
      'news.2.text': 'Run it from anywhere: it installs for your user, adds a Start menu entry and updates itself before the game.',
      'news.3.title': 'An active community',
      'news.3.text': 'Call your friends to take on quests and slay bosses together.',
      'news.readCommunity': 'See the screenshots',
      'media.eyebrow': 'Community & artwork',
      'media.title': 'Media & artwork',
      'media.hint': 'Click any image to view it full size',
      'media.cat.art': 'Launcher artwork',
      'media.cat.community': 'Community',
      'media.open': 'Open {title} full size',
      'media.gathering': 'Community gathering',
      'media.gathering.sub': 'Players gathered with the Game Master.',
      'media.active': 'Active community',
      'media.active.sub': 'Call your friends to take on quests and slay bosses.',
      'media.boss': 'Pestilence Knight',
      'media.boss.sub': 'Face the most feared bosses in the game.',
      'media.heroes': 'The adventuring party',
      'media.festival': 'Festival nights',
      'media.stag': 'The golden stag',
      'media.tower': 'The storm tower',
      'media.campfire': 'Campfire tales',
      'media.harvest': 'Harvest market',
      'how.eyebrow': 'Quick setup',
      'how.title': 'Enter Opengea in 3 steps',
      'how.lead': 'The launcher installs, updates and verifies the game for you, so you are always on the latest client.',
      'how.1.title': '1. Download the launcher',
      'how.1.text': 'Get <code class="font-mono text-txt-primary">ClientLauncher.exe</code> (<span data-rel="launcherSize"></span>, Windows x64) from the official GitHub releases. No .NET install needed.',
      'how.2.title': '2. Open it and install',
      'how.2.text': 'It installs itself for your user (no admin), then downloads client v<span data-rel="clientVersion"></span> (<span data-rel="clientSize"></span>) and checks it against its SHA-256.',
      'how.3.title': '3. Create your account and play',
      'how.3.text': 'Create your account right inside the game client, sign in and play. The launcher keeps the client up to date and can verify or repair your files at any time.',
      'req.eyebrow': 'What you need',
      'req.title': 'System requirements',
      'req.lead': 'Opengea runs on Windows. Here is what the launcher and the game client need.',
      'req.launcher': 'Launcher',
      'req.client': 'Game client',
      'req.os': 'OS',
      'req.osValue': 'Windows 10 / 11 (64-bit)',
      'req.download': 'Download',
      'req.runtime': 'Runtime',
      'req.runtimeValue': 'Self-contained, no .NET install',
      'req.perm': 'Permissions',
      'req.permValue': 'Per-user install, no admin',
      'req.lang': 'Languages',
      'req.copy': 'Copy',
      'req.copied': 'SHA-256 copied to the clipboard',
      'req.copyFailed': 'Could not copy; select the hash instead',
      'req.base': 'Based on',
      'req.baseValue': 'Apogea client 3.2.6 (custom build)',
      'req.installed': 'Installed size',
      'req.free': 'Free space to install',
      'req.freeValue': '≈ 1.3 GB (during install)',
      'req.updates': 'Updates',
      'req.updatesValue': 'Automatic, through the launcher',
      'community.badge': 'Launcher v<span data-rel="launcherVersion"></span> · Client v<span data-rel="clientVersion"></span>',
      'community.title': 'Follow every release on GitHub',
      'community.text': 'Every launcher and client build is published openly on GitHub with its notes. The launcher picks up new versions by itself; this is where you can read what changed.',
      'community.client': 'Client releases',
      'community.launcher': 'Launcher releases',
      'footer.about': 'A community-made custom client and server for Apogea, with its own launcher that installs, updates and verifies the game.',
      'footer.game': 'Game',
      'footer.releases': 'Releases',
      'footer.privacy': 'Privacy',
      'footer.privacyText': 'This site sets no cookies and has no tracking. It only asks GitHub for the latest release numbers.',
      'footer.disclaimer': 'Opengea is an unofficial community project. It is not made by, affiliated with or endorsed by the developers of Apogea.',
      'lightbox.close': 'Close',
      'lightbox.prev': 'Previous image',
      'lightbox.next': 'Next image',
      'lightbox.hint': 'Use ← / → keys or the arrows'
    },
    'pt-BR': {
      'meta.title': 'Opengea — Launcher e cliente Apogea personalizado',
      'skip': 'Pular para o conteúdo',
      'brand.tagline': 'Cliente Apogea<br/>personalizado',
      'nav.label': 'Principal',
      'nav.home': 'Início',
      'nav.news': 'Notícias',
      'nav.media': 'Mídia',
      'nav.how': 'Como jogar',
      'nav.req': 'Requisitos',
      'nav.patches': 'Notas de atualização',
      'pill.title': 'Versão mais recente do cliente',
      'pill.client': 'Cliente',
      'lang.code': 'EN',
      'lang.switch': 'Switch to English',
      'menu.open': 'Abrir menu',
      'menu.close': 'Fechar menu',
      'menu.label': 'Menu',
      'cta.short': 'Baixar',
      'cta.drawer': 'Baixar o launcher',
      'cta.main': 'BAIXAR O LAUNCHER',
      'cta.windowsOnly': 'Apenas Windows',
      'cta.anyway': 'Baixar mesmo assim →',
      'cta.otherOs': 'O Opengea roda no Windows 10/11 (64 bits). Baixe no seu PC com Windows.',
      'os.windows': 'Windows 10/11',
      'hero.badge': 'CLIENTE',
      'hero.badge2': 'WINDOWS 10/11',
      'hero.title': 'SUA AVENTURA TE ESPERA EM OPENGEA.',
      'hero.lead': 'Baixe o launcher do Opengea (<span data-rel="launcherSize"></span>): ele instala o cliente Apogea personalizado, mantém tudo na versão mais recente e verifica seus arquivos. Sem instalar .NET, sem precisar de administrador.',
      'patch.title': 'Novidades da v0.0.14',
      'patch.all': 'Changelog completo →',
      'patch.1': 'A movimentação agora é 100% no servidor',
      'patch.2': 'Mundo preto da v0.0.12 (dados do mapa restaurados na v0.0.13)',
      'patch.3': 'Cliente mais leve: NPCs, portas e placas agora ficam no servidor',
      'tag.new': 'NOVO',
      'tag.improved': 'MELHORIA',
      'tag.fixed': 'CORREÇÃO',
      'launcher.name': 'LAUNCHER OPENGEA',
      'launcher.uptodate': 'Atualizado',
      'launcher.tabs': 'Prévia do launcher',
      'launcher.tab0': '▶ Jogar Opengea',
      'launcher.tab1': '🎉 Eventos sazonais',
      'launcher.tab2': '🦌 Montarias',
      'launcher.verified': 'SHA-256 verificado',
      'launcher.client': 'Cliente:',
      'launcher.synced': '100% verificado',
      'launcher.play': 'INSTALAR E JOGAR',
      'launcher.s0.title': 'Bem-vindo ao Opengea',
      'launcher.s0.sub': 'O cliente Apogea personalizado, sempre atualizado.',
      'launcher.s0.status': 'Cliente {client} · Pronto para jogar',
      'launcher.s1.title': 'Eventos sazonais',
      'launcher.s1.sub': 'As notícias de eventos aparecem direto no início do launcher.',
      'launcher.s1.status': 'Notícias e notas de atualização · A um clique',
      'launcher.s2.title': 'Montarias e mais',
      'launcher.s2.sub': 'Destaques e anúncios, direto da equipe.',
      'launcher.s2.status': 'Cliente {client} · Montarias no próprio cliente',
      'cat.update': 'Atualização',
      'cat.community': 'Comunidade',
      'news.eyebrow': 'Direto de Opengea',
      'news.title': 'Últimas notícias e atualizações',
      'news.all': 'Todas as versões',
      'news.client': 'Cliente do jogo',
      'news.launcher': 'Launcher',
      'news.team': 'Equipe Opengea',
      'news.read': 'Ler as notas da versão',
      'news.readLauncher': 'Ver versões do launcher',
      'news.1.title': 'Cliente v0.0.14: movimentação no servidor',
      'news.1.text': 'Andar agora é tratado 100% pelo servidor, e o cliente não precisa mais dos próprios ganchos de movimento.',
      'news.2.title': 'Launcher v0.3.1 se instala sozinho',
      'news.2.text': 'Abra de qualquer lugar: ele se instala para o seu usuário, cria um atalho no menu Iniciar e se atualiza antes do jogo.',
      'news.3.title': 'Comunidade ativa',
      'news.3.text': 'Chame seus amigos para fazer quests e matar bosses juntos.',
      'news.readCommunity': 'Ver as capturas',
      'media.eyebrow': 'Comunidade e artes',
      'media.title': 'Mídia e artes',
      'media.hint': 'Clique em uma imagem para ver em tamanho real',
      'media.cat.art': 'Arte do launcher',
      'media.cat.community': 'Comunidade',
      'media.open': 'Abrir {title} em tamanho real',
      'media.gathering': 'Encontro da comunidade',
      'media.gathering.sub': 'Jogadores reunidos com o Game Master.',
      'media.active': 'Comunidade ativa',
      'media.active.sub': 'Chame seus amigos para fazer quests e matar bosses.',
      'media.boss': 'Pestilence Knight',
      'media.boss.sub': 'Enfrente os bosses mais temidos do jogo.',
      'media.heroes': 'O grupo de aventureiros',
      'media.festival': 'Noites de festival',
      'media.stag': 'O cervo dourado',
      'media.tower': 'A torre da tempestade',
      'media.campfire': 'Histórias na fogueira',
      'media.harvest': 'Mercado da colheita',
      'how.eyebrow': 'Instalação rápida',
      'how.title': 'Entre em Opengea em 3 passos',
      'how.lead': 'O launcher instala, atualiza e verifica o jogo para você, então você está sempre na versão mais recente do cliente.',
      'how.1.title': '1. Baixe o launcher',
      'how.1.text': 'Baixe o <code class="font-mono text-txt-primary">ClientLauncher.exe</code> (<span data-rel="launcherSize"></span>, Windows x64) das versões oficiais no GitHub. Não precisa instalar .NET.',
      'how.2.title': '2. Abra e instale',
      'how.2.text': 'Ele se instala para o seu usuário (sem administrador), baixa o cliente v<span data-rel="clientVersion"></span> (<span data-rel="clientSize"></span>) e confere o SHA-256.',
      'how.3.title': '3. Crie sua conta e jogue',
      'how.3.text': 'Crie sua conta direto no cliente do jogo, entre e jogue. O launcher mantém o cliente atualizado e pode verificar ou reparar seus arquivos a qualquer momento.',
      'req.eyebrow': 'O que você precisa',
      'req.title': 'Requisitos do sistema',
      'req.lead': 'O Opengea roda no Windows. Veja o que o launcher e o cliente do jogo precisam.',
      'req.launcher': 'Launcher',
      'req.client': 'Cliente do jogo',
      'req.os': 'Sistema',
      'req.osValue': 'Windows 10 / 11 (64 bits)',
      'req.download': 'Download',
      'req.runtime': 'Runtime',
      'req.runtimeValue': 'Autocontido, sem instalar .NET',
      'req.perm': 'Permissões',
      'req.permValue': 'Instala por usuário, sem administrador',
      'req.lang': 'Idiomas',
      'req.copy': 'Copiar',
      'req.copied': 'SHA-256 copiado para a área de transferência',
      'req.copyFailed': 'Não foi possível copiar; selecione o hash',
      'req.base': 'Baseado em',
      'req.baseValue': 'Cliente Apogea 3.2.6 (versão personalizada)',
      'req.installed': 'Tamanho instalado',
      'req.free': 'Espaço livre para instalar',
      'req.freeValue': '≈ 1,3 GB (durante a instalação)',
      'req.updates': 'Atualizações',
      'req.updatesValue': 'Automáticas, pelo launcher',
      'community.badge': 'Launcher v<span data-rel="launcherVersion"></span> · Cliente v<span data-rel="clientVersion"></span>',
      'community.title': 'Acompanhe cada versão no GitHub',
      'community.text': 'Toda versão do launcher e do cliente é publicada abertamente no GitHub, com as notas. O launcher pega as novas versões sozinho; aqui você lê o que mudou.',
      'community.client': 'Versões do cliente',
      'community.launcher': 'Versões do launcher',
      'footer.about': 'Um cliente e servidor personalizados para Apogea, feitos pela comunidade, com um launcher próprio que instala, atualiza e verifica o jogo.',
      'footer.game': 'Jogo',
      'footer.releases': 'Versões',
      'footer.privacy': 'Privacidade',
      'footer.privacyText': 'Este site não usa cookies nem rastreamento. Ele só consulta o GitHub para saber as versões mais recentes.',
      'footer.disclaimer': 'Opengea é um projeto não oficial da comunidade. Não é feito, afiliado ou endossado pelos desenvolvedores de Apogea.',
      'lightbox.close': 'Fechar',
      'lightbox.prev': 'Imagem anterior',
      'lightbox.next': 'Próxima imagem',
      'lightbox.hint': 'Use as teclas ← / → ou as setas'
    }
  };

  // cat: 'community' (in-game screenshots from players) or 'art' (launcher artwork). Strings: media.<key>[.sub].
  const MEDIA = [
    { key: 'gathering', img: 'community-gathering', w: 'full', cat: 'community' },
    { key: 'active', img: 'community-active', w: 'full', cat: 'community' },
    { key: 'boss', img: 'community-boss', w: 'full', cat: 'community' },
    { key: 'heroes', img: 'heroes', w: 1600, cat: 'art' },
    { key: 'festival', img: 'festival', w: 1600, cat: 'art' },
    { key: 'stag', img: 'stag', w: 1600, cat: 'art' },
    { key: 'tower', img: 'tower', w: 1600, cat: 'art' },
    { key: 'campfire', img: 'campfire', w: 800, cat: 'art' },
    { key: 'harvest', img: 'harvest', w: 800, cat: 'art' }
  ];

  const LAUNCHER_SLIDES = ['heroes', 'festival', 'stag'];

  /* ------------------------------------------------------------------ */
  /* Helpers                                                            */
  /* ------------------------------------------------------------------ */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const storage = {
    get(key) { try { return localStorage.getItem(key); } catch { return null; } },
    set(key, value) { try { localStorage.setItem(key, value); } catch { /* private mode */ } }
  };

  let lang = (() => {
    const saved = storage.get('opengea.lang');
    if (saved && STRINGS[saved]) return saved;
    return (navigator.language || 'en').toLowerCase().startsWith('pt') ? 'pt-BR' : 'en';
  })();

  const t = (key, vars = {}) => {
    const s = (STRINGS[lang] && STRINGS[lang][key]) ?? STRINGS.en[key] ?? key;
    return s.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '');
  };

  const formatMB = (bytes) => `${Math.round(bytes / 1e6).toLocaleString(lang)} MB`;

  const relValues = () => ({
    launcherVersion: release.launcherVersion,
    launcherSize: formatMB(release.launcherBytes),
    clientVersion: release.clientVersion,
    clientSize: formatMB(release.clientBytes),
    clientInstalled: formatMB(release.clientInstalledBytes)
  });

  /* ------------------------------------------------------------------ */
  /* Rendering                                                          */
  /* ------------------------------------------------------------------ */
  function applyRelease() {
    const v = relValues();
    $$('[data-rel]').forEach((el) => {
      const key = el.getAttribute('data-rel');
      if (key in v) el.textContent = v[key];
    });
    const sha = $('#launcher-sha');
    if (sha) { sha.textContent = release.launcherSha; sha.title = release.launcherSha; }
  }

  function applyStrings() {
    document.documentElement.lang = lang;
    document.title = t('meta.title');
    $$('[data-i18n]').forEach((el) => { el.textContent = t(el.getAttribute('data-i18n')); });
    // Only our own strings above go through innerHTML.
    $$('[data-i18n-html]').forEach((el) => { el.innerHTML = t(el.getAttribute('data-i18n-html')); });
    $$('[data-i18n-attr]').forEach((el) => {
      el.getAttribute('data-i18n-attr').split(';').forEach((pair) => {
        const [attr, key] = pair.split(':');
        el.setAttribute(attr, t(key));
      });
    });
    const dateFmt = new Intl.DateTimeFormat(lang, { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });
    $$('time[datetime]').forEach((el) => { el.textContent = dateFmt.format(new Date(el.getAttribute('datetime'))); });
  }

  function detectOS() {
    const platform = (navigator.userAgentData && navigator.userAgentData.platform) || navigator.platform || '';
    const ua = navigator.userAgent || '';
    if (/win/i.test(platform) || /windows/i.test(ua)) return 'windows';
    if (/mac|iphone|ipad|ipod|android|linux|cros/i.test(platform + ' ' + ua)) return 'other';
    return 'windows'; // unknown: offer the normal download
  }

  const DOWNLOAD_ICON = '<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2.4" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"/></svg>';
  const BLOCKED_ICON = '<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/></svg>';

  function renderCTAs() {
    const v = relValues();
    const os = detectOS();
    $$('[data-cta]').forEach((slot) => {
      const centered = slot.id === 'how-cta';
      if (os === 'other') {
        slot.innerHTML = `
          <div class="flex flex-col ${centered ? 'items-center' : 'items-start'}">
            <div class="flex flex-wrap items-center ${centered ? 'justify-center' : ''} gap-3">
              <span class="px-7 py-4 rounded-xl bg-panel border border-border text-txt-muted font-bold text-base inline-flex items-center gap-2.5 cursor-not-allowed" aria-disabled="true">
                ${BLOCKED_ICON}<span>${t('cta.windowsOnly')} (v${v.launcherVersion})</span>
              </span>
              <a href="${DOWNLOAD_URL}" class="px-5 py-4 rounded-xl bg-gold/15 hover:bg-gold/25 border border-gold/50 text-gold font-semibold text-sm transition-colors">${t('cta.anyway')}</a>
            </div>
            <p class="text-xs text-warning mt-2.5 font-medium">${t('cta.otherOs')}</p>
          </div>`;
        return;
      }
      slot.innerHTML = `
        <a href="${DOWNLOAD_URL}" class="w-full sm:w-auto px-9 py-4 rounded-xl bg-gold hover:bg-gold-hover active:bg-gold-pressed text-bg font-bold text-base sm:text-lg shadow-gold-glow hover:shadow-gold-glow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150 inline-flex items-center justify-center gap-3">
          ${DOWNLOAD_ICON}<span>${t('cta.main')}</span>
        </a>
        <p class="text-xs font-mono text-txt-secondary mt-2.5 tracking-wide">${t('os.windows')} · v${v.launcherVersion} · ${v.launcherSize}</p>`;
    });
  }

  /* Launcher preview tabs ------------------------------------------- */
  let currentTab = 0;
  function setLauncherTab(idx, focus = false) {
    currentTab = idx;
    LAUNCHER_SLIDES.forEach((_, i) => {
      const btn = $(`#vg-tab-${i}`);
      btn.setAttribute('aria-selected', String(i === idx));
      btn.tabIndex = i === idx ? 0 : -1;
      if (i === idx && focus) btn.focus();
    });
    const name = LAUNCHER_SLIDES[idx];
    const img = $('#vg-img');
    if (!img.src.includes(`${name}-800`)) {
      const fresh = img.cloneNode();
      fresh.src = `assets/img/${name}-800.webp`;
      fresh.srcset = `assets/img/${name}-800.webp 800w, assets/img/${name}-1600.webp 1600w`;
      img.replaceWith(fresh); // restarts the Ken Burns animation
    }
    $('#vg-stage').setAttribute('aria-labelledby', `vg-tab-${idx}`);
    $('#vg-title').textContent = t(`launcher.s${idx}.title`);
    $('#vg-sub').textContent = t(`launcher.s${idx}.sub`);
    $('#vg-status').textContent = t(`launcher.s${idx}.status`, { client: release.clientVersion });
  }

  function initLauncherTabs() {
    LAUNCHER_SLIDES.forEach((_, i) => {
      const btn = $(`#vg-tab-${i}`);
      btn.addEventListener('click', () => setLauncherTab(i));
      btn.addEventListener('keydown', (e) => {
        const n = LAUNCHER_SLIDES.length;
        const keys = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
        if (e.key in keys) { e.preventDefault(); setLauncherTab((i + keys[e.key] + n) % n, true); }
        else if (e.key === 'Home') { e.preventDefault(); setLauncherTab(0, true); }
        else if (e.key === 'End') { e.preventDefault(); setLauncherTab(n - 1, true); }
      });
    });
  }

  /* Media grid + lightbox ------------------------------------------- */
  // Items whose image is not on the server (a screenshot not added yet) are left out of the grid and the lightbox.
  const missingMedia = new Set();
  const shownMedia = () => MEDIA.filter((m) => !missingMedia.has(m.key));

  function probeMedia() {
    MEDIA.filter((m) => m.cat === 'community').forEach((m) => {
      const probe = new Image();
      probe.onerror = () => { missingMedia.add(m.key); renderMedia(); };
      probe.src = `assets/img/${m.img}-800.webp`;
    });
  }

  function renderMedia() {
    const grid = $('#media-grid');
    grid.innerHTML = shownMedia().map((m, i) => `
      <li class="snap-start shrink-0 w-[85%] sm:w-auto">
        <button type="button" data-media="${i}" class="group block w-full text-left rounded-xl overflow-hidden bg-panel border border-border shadow-card card-interactive" aria-label="${t('media.open', { title: t(`media.${m.key}`) })}">
          <span class="block h-48 sm:h-56 relative overflow-hidden">
            <img src="assets/img/${m.img}-800.webp" loading="lazy" alt="" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            <span class="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
              <span class="text-xs font-mono text-gold">⤢</span>
            </span>
          </span>
          <span class="px-4 py-3 bg-panel border-t border-border text-xs text-txt-secondary flex items-center justify-between gap-3">
            <span class="text-txt-primary font-medium">${t(`media.${m.key}`)}</span>
            <span class="font-mono ${m.cat === 'community' ? 'text-success' : 'text-txt-muted'}">${t(`media.cat.${m.cat}`)}</span>
          </span>
        </button>
      </li>`).join('');
  }

  let lightboxIndex = 0;
  function showLightbox(i) {
    const items = shownMedia();
    lightboxIndex = (i + items.length) % items.length;
    const m = items[lightboxIndex];
    const img = $('#lightbox-img');
    img.src = `assets/img/${m.img}-${m.w}.webp`;
    const sub = STRINGS.en[`media.${m.key}.sub`] ? ` · ${t(`media.${m.key}.sub`)}` : '';
    img.alt = t(`media.${m.key}`);
    $('#lightbox-title').textContent = t(`media.${m.key}`);
    $('#lightbox-caption').textContent = t(`media.cat.${m.cat}`) + sub;
    $('#lightbox-counter').textContent = `${lightboxIndex + 1} / ${items.length}`;
  }

  function initLightbox() {
    const dlg = $('#lightbox');
    $('#media-grid').addEventListener('click', (e) => {
      const btn = e.target.closest('[data-media]');
      if (!btn) return;
      showLightbox(Number(btn.getAttribute('data-media')));
      dlg.showModal();
    });
    $('#lightbox-close').addEventListener('click', () => dlg.close());
    $('#lightbox-prev').addEventListener('click', () => showLightbox(lightboxIndex - 1));
    $('#lightbox-next').addEventListener('click', () => showLightbox(lightboxIndex + 1));
    dlg.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') showLightbox(lightboxIndex - 1);
      if (e.key === 'ArrowRight') showLightbox(lightboxIndex + 1);
    });
    dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); }); // backdrop
  }

  /* Mobile drawer ---------------------------------------------------- */
  function initDrawer() {
    const drawer = $('#mobile-drawer');
    const backdrop = $('#drawer-backdrop');
    const trigger = $('#menu-open');
    const set = (open) => {
      trigger.setAttribute('aria-expanded', String(open));
      drawer.classList.toggle('translate-x-full', !open);
      drawer.classList.toggle('invisible', !open);
      document.body.classList.toggle('overflow-hidden', open);
      if (open) {
        backdrop.classList.remove('hidden');
        requestAnimationFrame(() => backdrop.classList.remove('opacity-0'));
        $('#menu-close').focus();
      } else {
        backdrop.classList.add('opacity-0');
        setTimeout(() => backdrop.classList.add('hidden'), 200);
      }
    };
    trigger.addEventListener('click', () => set(true));
    $('#menu-close').addEventListener('click', () => { set(false); trigger.focus(); });
    backdrop.addEventListener('click', () => set(false));
    $$('[data-close-drawer]', drawer).forEach((a) => a.addEventListener('click', () => set(false)));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && trigger.getAttribute('aria-expanded') === 'true') { set(false); trigger.focus(); }
    });
    window.matchMedia('(min-width: 1280px)').addEventListener('change', (e) => { if (e.matches) set(false); });
  }

  /* Scroll spy for the header nav ------------------------------------ */
  function initScrollSpy() {
    const links = $$('#desktop-nav [data-spy]');
    const sections = links.map((a) => document.getElementById(a.getAttribute('data-spy'))).filter(Boolean);
    const mark = (id) => links.forEach((a) => {
      if (a.getAttribute('data-spy') === id) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    });
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) mark(en.target.id); });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach((s) => obs.observe(s));
  }

  /* Toast + copy ----------------------------------------------------- */
  let toastTimer;
  function toast(msg) {
    const box = $('#toast');
    $('#toast-text').textContent = msg;
    box.classList.remove('translate-y-20', 'opacity-0');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => box.classList.add('translate-y-20', 'opacity-0'), 2600);
  }

  function initCopy() {
    $('#copy-sha').addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(release.launcherSha);
        toast(t('req.copied'));
      } catch {
        toast(t('req.copyFailed'));
      }
    });
  }

  /* Language --------------------------------------------------------- */
  function render() {
    applyStrings();
    applyRelease();
    renderCTAs();
    renderMedia();
    setLauncherTab(currentTab);
  }

  function initLang() {
    $('#lang-toggle').addEventListener('click', () => {
      lang = lang === 'en' ? 'pt-BR' : 'en';
      storage.set('opengea.lang', lang);
      render();
    });
  }

  /* Live release numbers from GitHub --------------------------------- */
  async function latest(repo) {
    const res = await fetch(`https://api.github.com/repos/${repo}/releases/latest`, { headers: { Accept: 'application/vnd.github+json' } });
    if (!res.ok) throw new Error(`${repo}: HTTP ${res.status}`);
    return res.json();
  }

  async function refreshRelease() {
    const [launcher, client] = await Promise.allSettled([latest(LAUNCHER_REPO), latest(CLIENT_REPO)]);
    if (launcher.status === 'fulfilled') {
      const r = launcher.value;
      const exe = (r.assets || []).find((a) => a.name === 'ClientLauncher.exe');
      release.launcherVersion = String(r.tag_name || release.launcherVersion).replace(/^v/, '');
      if (exe) {
        release.launcherBytes = exe.size;
        if (typeof exe.digest === 'string' && exe.digest.startsWith('sha256:')) release.launcherSha = exe.digest.slice(7);
      }
    }
    if (client.status === 'fulfilled') {
      const r = client.value;
      const pkg = (r.assets || []).find((a) => a.name === 'client.zip.enc');
      // Tags can carry a suffix (v0.0.10-r2); the version is the number.
      const m = String(r.tag_name || '').match(/\d+(\.\d+)+/);
      if (m && m[0] !== release.clientVersion) {
        release.clientVersion = m[0];
      }
      if (pkg) release.clientBytes = pkg.size;
    }
    applyRelease();
    renderCTAs();
    setLauncherTab(currentTab);
  }

  /* Boot ------------------------------------------------------------- */
  initLauncherTabs();
  initLightbox();
  probeMedia();
  initDrawer();
  initScrollSpy();
  initCopy();
  initLang();
  render();
  refreshRelease().catch(() => { /* keep the baked-in values */ });
})();
