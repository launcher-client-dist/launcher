/* Opengea website — "The Vanguard" landing page.
 * No framework, no cookies. The only network calls are to the public GitHub API, for the latest release numbers;
 * when that fails the values baked in below (and in the HTML) stay. */
(() => {
  'use strict';

  const LAUNCHER_REPO = 'launcher-client-dist/launcher';
  const CLIENT_REPO = 'launcher-client-dist/dist';
  const DOWNLOAD_URL = `https://github.com/${LAUNCHER_REPO}/releases/latest/download/ClientLauncher.exe`;

  // Fallback release data (launcher v0.3.5, client v0.0.22), refreshed from GitHub on load.
  const release = {
    launcherVersion: '0.3.5',
    launcherBytes: 66404117,
    launcherSha: '63428b684ba266c2acb674860cf6b341262f7b703d2b452d0715c1a4f3b106da',
    clientVersion: '0.0.22',
    clientBytes: 661946857,
    clientInstalledBytes: 1127217891
  };

  /* ------------------------------------------------------------------ */
  /* Strings                                                            */
  /* ------------------------------------------------------------------ */
  const STRINGS = {
    en: {
      'meta.title': 'Opengea — Launcher and game client',
      'skip': 'Skip to content',
      'brand.tagline': 'Launcher &amp;<br/>game client',
      'nav.label': 'Primary',
      'nav.home': 'Home',
      'nav.market': 'Market',
      'nav.news': 'News',
      'nav.media': 'Media',
      'nav.how': 'How to play',
      'nav.req': 'Requirements',
      'nav.patches': 'Patch notes',
      'nav.legal': 'Legal',
      'footer.legal': 'Legal',
      'footer.legalNote': 'Non-profit · 100% free · no donations',
      'legal.eyebrow': 'Legal documents',
      'legal.title': 'Legal & privacy',
      'legal.lead': 'Opengea is a non-profit project made by members of the community who love the game. It is 100% free: there are no donations, no shop and nothing for sale. Here is everything about how it works.',
      'legal.badge1': '✓ 100% free',
      'legal.badge2': '✓ Non-profit',
      'legal.badge3': '✓ No donations',
      'legal.badge4': '✓ No data shared or sold',
      'legal.notice': 'Legal notice',
      'legal.noticeDesc': 'Who we are, non-profit, no affiliation',
      'legal.rules': 'Rules',
      'legal.rulesDesc': 'Game rules and player conduct',
      'legal.terms': 'Terms of use',
      'legal.termsDesc': 'The conditions for using Opengea',
      'legal.privacy': 'Privacy',
      'legal.privacyDesc': 'What is stored, and what never leaves',
      'legal.metaTitle': 'Legal — Opengea',
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
      'hero.badge2': '100% FREE',
      'hero.title': 'YOUR ADVENTURE AWAITS IN OPENGEA.',
      'hero.lead': 'Download the <span data-rel="launcherSize"></span> Opengea launcher: it installs the Opengea client, keeps it on the latest build and verifies your files. No .NET install, no admin rights.',
      'patch.title': 'Latest in v0.0.22',
      'patch.all': 'Full changelog →',
      'patch.1': 'Closing the Market always clears it from the screen',
      'patch.2': 'Smoother Market interface',
      'patch.3': 'General fixes and polish',
      'tag.new': 'NEW',
      'tag.improved': 'IMPROVED',
      'tag.fixed': 'FIXED',
      'launcher.name': 'OPENGEA LAUNCHER',
      'launcher.uptodate': 'Up to date',
      'launcher.tabs': 'Launcher preview',
      'launcher.tab0': '▶ Play Opengea',
      'launcher.tab1': '⚔️ Bosses',
      'launcher.tab2': '🧪 Lab of innovation',
      'launcher.tab3': '⚖️ Market',
      'launcher.verified': 'SHA-256 verified',
      'launcher.client': 'Client:',
      'launcher.synced': '100% verified',
      'launcher.play': 'INSTALL & PLAY',
      'launcher.s0.title': 'Welcome to Opengea',
      'launcher.s0.sub': 'An active community. Call your friends to take on quests and slay bosses.',
      'launcher.s0.status': 'Client {client} · Ready to play',
      'launcher.s1.title': 'Face the most feared bosses',
      'launcher.s1.sub': 'The Pestilence Knight is waiting for a party brave enough.',
      'launcher.s1.status': 'News and patch notes · One click away',
      'launcher.s2.title': 'Lab of innovation',
      'launcher.s2.sub': 'We test your ideas, even a motorcycle in a medieval world. Your feedback is essential.',
      'launcher.s2.status': 'Client {client} · New features in testing',
      'launcher.s3.title': 'The Market is open',
      'launcher.s3.sub': 'Buy and sell with every player, right at your depot.',
      'launcher.s3.status': 'Client {client} · Trade at any depot',
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
      'news.1.title': 'The new Market is here',
      'news.1.text': 'Client v0.0.20 brings a brand-new Market: browse every item, buy from other players, place buy orders and sell your own, right from your depot.',
      'news.2.title': 'Launcher v0.3.3: pick your language',
      'news.2.text': 'A new language button at the top of the launcher switches the launcher and the game. It updates itself the next time it opens.',
      'news.3.title': 'An active community',
      'news.3.text': 'Call your friends to take on quests and slay bosses together.',
      'news.readCommunity': 'See the screenshots',
      'market.eyebrow': 'Trade with every player',
      'market.badge': 'New',
      'market.title': 'The Market',
      'market.lead': 'Buy and sell with the whole world without leaving your depot. Post an offer, set your price, and pick up what you bought or earned in your inbox.',
      'market.f1.title': 'Trade with everyone',
      'market.f1.text': 'Sell to and buy from every player, right at the depot. Browse the offers for any item and take the price you like.',
      'market.f2.title': 'Your offer, your price',
      'market.f2.text': 'Post sell or buy offers, anonymously if you prefer. A small fee per listing keeps the books clean.',
      'market.f3.title': 'Every item, every rarity',
      'market.f3.text': 'Dozens of categories from Common to Legendary, with 30 days of price history for each item.',
      'market.f4.title': 'Safe from start to finish',
      'market.f4.text': 'You pay with the gold in your depot and collect in your inbox. A trade goes through whole or not at all.',
      'market.note': 'In client v<span data-rel="clientVersion"></span>: stand at any depot and press Market in the top bar.',
      'market.alt': 'The Market window: the item list by category, the Broadsword with its offers and the buy panel.',
      'market.caption': 'In game: the Broadsword in Browse, with three offers and the buy panel.',
      'media.eyebrow': 'Community & lab',
      'media.title': 'Media',
      'media.hint': 'Click any image to view it full size',
      'media.filters': 'Filter the gallery',
      'media.f.all': 'All',
      'media.f.community': 'Community',
      'media.f.lab': '🧪 Lab of innovation',
      'media.desc.all': 'Real moments from Opengea players and the experiments in our lab. Every picture here was taken in game.',
      'media.desc.community': 'Parties, bosses and gatherings with the Game Master, captured in game by the community. Your adventure could be the next one here.',
      'media.desc.lab': 'The Lab of innovation is where we test new features, like mounts. Everything here is still in testing and may change, or never leave the lab.',
      'media.cat.community': 'Community',
      'media.cat.lab': 'Lab · in testing',
      'media.open': 'Open {title} full size',
      'media.gathering': 'Community gathering',
      'media.gathering.sub': 'Players gathered with the Game Master.',
      'media.active': 'Active community',
      'media.active.sub': 'Call your friends to take on quests and slay bosses.',
      'media.boss': 'Pestilence Knight',
      'media.boss.sub': 'Face the most feared bosses in the game.',
      'media.title-screen': 'The Opengea title screen',
      'media.title-screen.sub': 'Log in or create your account right in the client.',
      'media.horse': 'Horse mount',
      'media.horse.sub': 'Completely for fun, and still in the testing lab.',
      'media.motorcycle': 'A motorcycle? Why not!',
      'media.motorcycle.sub': 'We hear your suggestions and build them, even the funny, completely out-of-place ones (why a motorcycle in a medieval game?). We implement and test your ideas: your feedback is essential.',
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
      'req.base': 'Game client',
      'req.baseValue': 'Opengea 3.2.6',
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
      'footer.about': 'A community-made game client and server, with its own launcher that installs, updates and verifies the game.',
      'footer.game': 'Game',
      'footer.releases': 'Releases',
      'footer.disclaimer': 'Opengea is a non-profit community project: 100% free, with no donations. It is an unofficial fan project, not affiliated with or endorsed by any game studio or publisher.',
      'lightbox.close': 'Close',
      'lightbox.prev': 'Previous image',
      'lightbox.next': 'Next image',
      'lightbox.hint': 'Use ← / → keys or the arrows'
    },
    'pt-BR': {
      'meta.title': 'Opengea — Launcher e cliente do jogo',
      'skip': 'Pular para o conteúdo',
      'brand.tagline': 'Launcher e<br/>cliente do jogo',
      'nav.label': 'Principal',
      'nav.home': 'Início',
      'nav.market': 'Market',
      'nav.news': 'Notícias',
      'nav.media': 'Mídia',
      'nav.how': 'Como jogar',
      'nav.req': 'Requisitos',
      'nav.patches': 'Notas de atualização',
      'nav.legal': 'Legal',
      'footer.legal': 'Legal',
      'footer.legalNote': 'Sem fins lucrativos · 100% gratuito · sem doações',
      'legal.eyebrow': 'Documentos legais',
      'legal.title': 'Legal e privacidade',
      'legal.lead': 'O Opengea é um projeto sem fins lucrativos feito por membros da comunidade que gostam do jogo. Ele é 100% gratuito: não há doações, loja nem nada à venda. Aqui está tudo sobre como ele funciona.',
      'legal.badge1': '✓ 100% gratuito',
      'legal.badge2': '✓ Sem fins lucrativos',
      'legal.badge3': '✓ Sem doações',
      'legal.badge4': '✓ Nenhum dado compartilhado ou vendido',
      'legal.notice': 'Aviso legal',
      'legal.noticeDesc': 'Quem somos, sem fins lucrativos, sem afiliação',
      'legal.rules': 'Regras',
      'legal.rulesDesc': 'Regras do jogo e conduta dos jogadores',
      'legal.terms': 'Termos de uso',
      'legal.termsDesc': 'As condições para usar o Opengea',
      'legal.privacy': 'Privacidade',
      'legal.privacyDesc': 'O que é guardado, e o que nunca sai daqui',
      'legal.metaTitle': 'Legal — Opengea',
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
      'hero.badge2': '100% GRATUITO',
      'hero.title': 'SUA AVENTURA TE ESPERA EM OPENGEA.',
      'hero.lead': 'Baixe o launcher do Opengea (<span data-rel="launcherSize"></span>): ele instala o cliente Opengea, mantém tudo na versão mais recente e verifica seus arquivos. Sem instalar .NET, sem precisar de administrador.',
      'patch.title': 'Novidades da v0.0.22',
      'patch.all': 'Changelog completo →',
      'patch.1': 'Fechar o Market sempre o tira da tela',
      'patch.2': 'Interface do Market mais fluida',
      'patch.3': 'Correções gerais e ajustes',
      'tag.new': 'NOVO',
      'tag.improved': 'MELHORIA',
      'tag.fixed': 'CORREÇÃO',
      'launcher.name': 'LAUNCHER OPENGEA',
      'launcher.uptodate': 'Atualizado',
      'launcher.tabs': 'Prévia do launcher',
      'launcher.tab0': '▶ Jogar Opengea',
      'launcher.tab1': '⚔️ Bosses',
      'launcher.tab2': '🧪 Laboratório de inovação',
      'launcher.tab3': '⚖️ Market',
      'launcher.verified': 'SHA-256 verificado',
      'launcher.client': 'Cliente:',
      'launcher.synced': '100% verificado',
      'launcher.play': 'INSTALAR E JOGAR',
      'launcher.s0.title': 'Bem-vindo ao Opengea',
      'launcher.s0.sub': 'Uma comunidade ativa. Chame seus amigos para fazer quests e matar bosses.',
      'launcher.s0.status': 'Cliente {client} · Pronto para jogar',
      'launcher.s1.title': 'Enfrente os bosses mais temidos',
      'launcher.s1.sub': 'O Pestilence Knight espera por um grupo corajoso o bastante.',
      'launcher.s1.status': 'Notícias e notas de atualização · A um clique',
      'launcher.s2.title': 'Laboratório de inovação',
      'launcher.s2.sub': 'Testamos suas ideias, até uma moto num mundo medieval. Seu feedback é essencial.',
      'launcher.s2.status': 'Cliente {client} · Novidades em teste',
      'launcher.s3.title': 'O Market está aberto',
      'launcher.s3.sub': 'Compre e venda com todos os jogadores, direto no seu depot.',
      'launcher.s3.status': 'Cliente {client} · Negocie em qualquer depot',
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
      'news.1.title': 'O novo Market chegou',
      'news.1.text': 'O cliente v0.0.20 traz um Market totalmente novo: veja todos os itens, compre de outros jogadores, crie ordens de compra e venda os seus, direto do depot.',
      'news.2.title': 'Launcher v0.3.3: escolha seu idioma',
      'news.2.text': 'Um novo botão de idioma no topo do launcher troca o idioma do launcher e do jogo. Ele se atualiza sozinho da próxima vez que abrir.',
      'news.3.title': 'Comunidade ativa',
      'news.3.text': 'Chame seus amigos para fazer quests e matar bosses juntos.',
      'news.readCommunity': 'Ver as capturas',
      'market.eyebrow': 'Negocie com todos os jogadores',
      'market.badge': 'Novo',
      'market.title': 'O Market',
      'market.lead': 'Compre e venda com o mundo inteiro sem sair do depot. Crie uma oferta, defina o seu preço e retire no inbox o que comprou ou ganhou.',
      'market.f1.title': 'Negocie com todo mundo',
      'market.f1.text': 'Venda e compre de todos os jogadores, direto no depot. Veja as ofertas de qualquer item e escolha o preço que quiser.',
      'market.f2.title': 'Sua oferta, seu preço',
      'market.f2.text': 'Crie ofertas de venda ou de compra, anônimas se preferir. Uma pequena taxa por oferta mantém o livro limpo.',
      'market.f3.title': 'Todo item, toda raridade',
      'market.f3.text': 'Dezenas de categorias, do Comum ao Lendário, com 30 dias de histórico de preços de cada item.',
      'market.f4.title': 'Seguro do início ao fim',
      'market.f4.text': 'Você paga com o gold do depot e retira no inbox. Um negócio acontece inteiro ou não acontece.',
      'market.note': 'No cliente v<span data-rel="clientVersion"></span>: fique em qualquer depot e aperte Market na barra de cima.',
      'market.alt': 'A janela do Market: a lista de itens por categoria, a Broadsword com suas ofertas e o painel de compra.',
      'market.caption': 'No jogo: a Broadsword na aba Browse, com três ofertas e o painel de compra.',
      'media.eyebrow': 'Comunidade e laboratório',
      'media.title': 'Mídia',
      'media.hint': 'Clique em uma imagem para ver em tamanho real',
      'media.filters': 'Filtrar a galeria',
      'media.f.all': 'Tudo',
      'media.f.community': 'Comunidade',
      'media.f.lab': '🧪 Laboratório de inovação',
      'media.desc.all': 'Momentos reais dos jogadores do Opengea e os experimentos do nosso laboratório. Todas as imagens foram capturadas no jogo.',
      'media.desc.community': 'Grupos, bosses e encontros com o Game Master, capturados no jogo pela comunidade. Sua aventura pode ser a próxima aqui.',
      'media.desc.lab': 'O Laboratório de inovação é onde testamos novidades, como montarias. Tudo aqui ainda está em teste e pode mudar, ou nunca sair do laboratório.',
      'media.cat.community': 'Comunidade',
      'media.cat.lab': 'Lab · em teste',
      'media.open': 'Abrir {title} em tamanho real',
      'media.gathering': 'Encontro da comunidade',
      'media.gathering.sub': 'Jogadores reunidos com o Game Master.',
      'media.active': 'Comunidade ativa',
      'media.active.sub': 'Chame seus amigos para fazer quests e matar bosses.',
      'media.boss': 'Pestilence Knight',
      'media.boss.sub': 'Enfrente os bosses mais temidos do jogo.',
      'media.title-screen': 'A tela inicial do Opengea',
      'media.title-screen.sub': 'Entre ou crie sua conta direto no cliente.',
      'media.horse': 'Montaria cavalo',
      'media.horse.sub': 'Totalmente por diversão, e ainda no laboratório de testes.',
      'media.motorcycle': 'Uma moto? Por que não!',
      'media.motorcycle.sub': 'Ouvimos suas sugestões e implementamos, mesmo as engraçadas e totalmente fora de época (por que uma moto num jogo medieval?). Implementamos e testamos suas ideias: seu feedback é essencial.',
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
      'req.base': 'Cliente do jogo',
      'req.baseValue': 'Opengea 3.2.6',
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
      'footer.about': 'Um cliente e servidor de jogo feitos pela comunidade, com um launcher próprio que instala, atualiza e verifica o jogo.',
      'footer.game': 'Jogo',
      'footer.releases': 'Versões',
      'footer.disclaimer': 'Opengea é um projeto da comunidade sem fins lucrativos: 100% gratuito, sem doações. É um projeto não oficial, feito por fãs, sem afiliação ou endosso de nenhum estúdio ou distribuidora de jogos.',
      'lightbox.close': 'Fechar',
      'lightbox.prev': 'Imagem anterior',
      'lightbox.next': 'Próxima imagem',
      'lightbox.hint': 'Use as teclas ← / → ou as setas'
    }
  };

  // cat: 'community' (in-game screenshots) or 'lab' (features in testing); each is a gallery filter.
  // Strings: media.<key> and media.<key>.sub (the comment shown under each picture). Screenshots are made with scripts/add_screenshot.py.
  const MEDIA = [
    { key: 'gathering', img: 'shot-gathering', w: 'full', cat: 'community' },
    { key: 'active', img: 'shot-active', w: 'full', cat: 'community' },
    { key: 'boss', img: 'shot-boss', w: 'full', cat: 'community' },
    { key: 'title-screen', img: 'shot-title', w: 'full', cat: 'community' },
    { key: 'motorcycle', img: 'shot-motorcycle', w: 'full', cat: 'lab' },
    { key: 'horse', img: 'shot-horse', w: 'full', cat: 'lab' }
  ];

  // The launcher's Home carousel (opengea-launcher/content/carousel), plus the Market; w = width of the -full file,
  // pos = where the stage crops it (object-position; default centre).
  const LAUNCHER_SLIDES = [
    { img: 'shot-gathering', w: 1057 },
    { img: 'shot-boss', w: 1536 },
    { img: 'shot-motorcycle', w: 1110 },
    { img: 'shot-market', w: 1054, pos: 'center 20%' }
  ];

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
    document.title = t(document.body.dataset.title || 'meta.title');
    // Blocks written per language: show the current one; its sections own the plain #anchors.
    $$('[data-lang]').forEach((block) => {
      const shown = block.getAttribute('data-lang') === lang;
      block.hidden = !shown;
      $$('[data-anchor]', block).forEach((sec) => {
        const anchor = sec.getAttribute('data-anchor');
        sec.id = shown ? anchor : `${anchor}-${block.getAttribute('data-lang')}`;
      });
    });
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
    const { img: name, w, pos } = LAUNCHER_SLIDES[idx];
    const img = $('#vg-img');
    if (!img.src.includes(`${name}-800`)) {
      const fresh = img.cloneNode();
      fresh.src = `assets/img/${name}-800.webp`;
      fresh.srcset = `assets/img/${name}-800.webp 800w, assets/img/${name}-full.webp ${w}w`;
      fresh.style.objectPosition = pos || '';
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
  const CAT_STYLE = { community: 'text-success', lab: 'text-warning' };
  let mediaFilter = 'all';
  const shownMedia = () => MEDIA.filter((m) => mediaFilter === 'all' || m.cat === mediaFilter);

  function renderMedia() {
    $$('[data-media-filter]').forEach((btn) => {
      btn.setAttribute('aria-pressed', String(btn.getAttribute('data-media-filter') === mediaFilter));
    });
    const desc = $('#media-desc');
    desc.textContent = t(`media.desc.${mediaFilter}`);
    desc.classList.toggle('lab', mediaFilter === 'lab');
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
          <span class="block px-4 py-3 bg-panel border-t border-border text-xs text-txt-secondary">
            <span class="flex items-center justify-between gap-3">
              <span class="text-txt-primary font-medium">${t(`media.${m.key}`)}</span>
              <span class="font-mono shrink-0 ${CAT_STYLE[m.cat]}">${t(`media.cat.${m.cat}`)}</span>
            </span>
            <span class="block mt-1.5 leading-relaxed line-clamp-3">${t(`media.${m.key}.sub`)}</span>
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
    img.alt = t(`media.${m.key}`);
    $('#lightbox-title').textContent = t(`media.${m.key}`);
    $('#lightbox-caption').textContent = `${t(`media.cat.${m.cat}`)} · ${t(`media.${m.key}.sub`)}`;
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
    $$('[data-media-filter]').forEach((btn) => btn.addEventListener('click', () => {
      mediaFilter = btn.getAttribute('data-media-filter');
      renderMedia();
    }));
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
  const isHome = Boolean($('#vg-stage'));

  function render() {
    applyStrings();
    applyRelease();
    if (!isHome) return;
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
    if (!isHome) return;
    renderCTAs();
    setLauncherTab(currentTab);
  }

  /* Boot ------------------------------------------------------------- */
  if (isHome) {
    initLauncherTabs();
    initLightbox();
    initScrollSpy();
    initCopy();
  }
  initDrawer();
  initLang();
  render();
  if (location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView();
  if (isHome) refreshRelease().catch(() => { /* keep the baked-in values */ });
})();
