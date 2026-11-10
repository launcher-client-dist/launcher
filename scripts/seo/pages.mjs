// The guide pages, in English and Brazilian Portuguese. Each page answers one question about Apogea and points to
// playing on Opengea.
// Fields: slug (URL path), lang, alt (the other language's slug), nav (short name for links), eyebrow, title
// (<title>, ~60 chars), description (~155 chars), h1, intro (HTML), sections [[h2, HTML]], faq [[question, HTML]],
// related [slugs]. Keep facts about Opengea only (no versions: they change every release; the home page has them).

import { DOWNLOAD_URL, DISCORD_URL } from './template.mjs';
import { GROUPS, TERMS } from './terms.mjs';

const dl = (text) => `<a href="${DOWNLOAD_URL}">${text}</a>`;
const dc = (text) => `<a href="${DISCORD_URL}" target="_blank" rel="noopener">${text}</a>`;
const p = (slug, text) => `<a href="/${slug}/">${text}</a>`;

const STEPS_EN = `<ol>
  <li><strong>Download the launcher</strong> (${dl('ClientLauncher.exe')}, about 66 MB, Windows 10/11 64-bit).</li>
  <li><strong>Open it.</strong> It installs itself for your user (no admin rights, no .NET install), downloads the game client and checks every file.</li>
  <li><strong>Create your account</strong> right inside the game client and make your character.</li>
  <li><strong>Join the community ${dc('Discord')}.</strong> Every Opengea player is on it: it is where you ask questions, report bugs and hear about updates.</li>
</ol>`;

const STEPS_PT = `<ol>
  <li><strong>Baixe o launcher</strong> (${dl('ClientLauncher.exe')}, uns 66 MB, Windows 10/11 64 bits).</li>
  <li><strong>Abra o launcher.</strong> Ele se instala para o seu usuário (sem administrador, sem instalar .NET), baixa o cliente do jogo e confere cada arquivo.</li>
  <li><strong>Crie a sua conta</strong> dentro do próprio cliente do jogo e faça o seu personagem.</li>
  <li><strong>Entre no ${dc('Discord')} da comunidade.</strong> Todo jogador do Opengea está lá: é onde você tira dúvidas, reporta bugs e fica sabendo das atualizações.</li>
</ol>`;

const CLASS_TABLE_EN = `<table>
  <thead><tr><th>Class</th><th>Stronger</th><th>Weaker</th></tr></thead>
  <tbody>
    <tr><td><strong>Squire</strong></td><td colspan="2">The class every character starts as: every stat grows at the normal rate (x1).</td></tr>
    <tr><td><strong>Knight</strong></td><td>Health x2; Armor, Defense and Capacity x1.5; Ability and Health Regen x1.25</td><td>Mana, Magic and Mana Regen x0.5</td></tr>
    <tr><td><strong>Mage</strong></td><td>Magic, Mana and Mana Regen x2</td><td>Health, Ability, Armor, Defense, Capacity and Health Regen x0.75</td></tr>
    <tr><td><strong>Rogue</strong></td><td>Ability and Magic x1.5; Mana, Mana Regen and Attack Speed x1.25</td><td>Defense x0.75</td></tr>
  </tbody>
</table>`;

const CLASS_TABLE_PT = `<table>
  <thead><tr><th>Classe</th><th>Mais forte em</th><th>Mais fraca em</th></tr></thead>
  <tbody>
    <tr><td><strong>Squire</strong></td><td colspan="2">A classe com que todo personagem começa: todos os atributos crescem no ritmo normal (x1).</td></tr>
    <tr><td><strong>Knight</strong></td><td>Vida x2; Armadura, Defesa e Capacidade x1,5; Ability e Regeneração de Vida x1,25</td><td>Mana, Magic e Regeneração de Mana x0,5</td></tr>
    <tr><td><strong>Mage</strong></td><td>Magic, Mana e Regeneração de Mana x2</td><td>Vida, Ability, Armadura, Defesa, Capacidade e Regeneração de Vida x0,75</td></tr>
    <tr><td><strong>Rogue</strong></td><td>Ability e Magic x1,5; Mana, Regeneração de Mana e Velocidade de Ataque x1,25</td><td>Defesa x0,75</td></tr>
  </tbody>
</table>`;

const EN_RELATED = ['apogea-release-date', 'apogea-playtest', 'apogea-download', 'apogea-game', 'apogea-discord', 'apogea-classes', 'apogea-wiki', 'apogea-steam', 'apogea-private-server'];
const PT_RELATED = ['pt/apogea-lancamento', 'pt/apogea-playtest', 'pt/apogea-download', 'pt/apogea-jogo', 'pt/apogea-discord', 'pt/apogea-classes', 'pt/apogea-wiki', 'pt/apogea-servidor'];
const rel = (list, self, n = 4) => list.filter((s) => s !== self).slice(0, n);

export const PAGES = [
  // ---------------------------------------------------------------- English
  {
    slug: 'apogea', lang: 'en', alt: 'pt/apogea', nav: 'Apogea guides', eyebrow: 'Apogea FAQ',
    title: 'Apogea: how to play, download, classes and more | Opengea',
    description: 'Everything people search about Apogea: how to play it today, the download, classes, Discord, wiki and playtests. Play free on Opengea.',
    h1: 'Apogea: everything you are searching for',
    intro: `<p><strong>Apogea</strong> is a medieval fantasy MMORPG: a pixel-art 3D world seen from above, with quests, bosses and a player-driven economy. You can <strong>play it today, for free, on Opengea</strong>, a non-profit community server with its own launcher.</p>
<p>These short guides answer the questions people search for most.</p>`,
    sections: [
      ['Start here', `<ul>
  <li>${p('apogea-release-date', 'Apogea release date')}: when you can play (now).</li>
  <li>${p('apogea-download', 'Apogea download')}: get the launcher and install the game.</li>
  <li>${p('apogea-playtest', 'Apogea playtest')}: no waiting for a test window on Opengea.</li>
  <li>${p('apogea-game', 'Apogea game and MMORPG')}: what the game is and what you do in it.</li>
  <li>${p('apogea-classes', 'Apogea classes')}: Squire, Knight, Mage and Rogue.</li>
  <li>${p('apogea-discord', 'Apogea Discord')}: the community.</li>
  <li>${p('apogea-wiki', 'Apogea wiki')}: where to look things up.</li>
  <li>${p('apogea-steam', 'Apogea on Steam')} and ${p('apogea-private-server', 'Apogea private server')}.</li>
</ul>`],
      ['How to start playing in 4 steps', STEPS_EN],
    ],
    faq: [
      ['Can I play Apogea right now?', `<p>Yes. Opengea is online and open: ${dl('download the launcher')}, create your account in the game client and play.</p>`],
      ['Is it free?', '<p>Yes, 100% free. Opengea is non-profit and takes no donations.</p>'],
      ['Which platforms does it run on?', '<p>Windows 10 and 11 (64-bit).</p>'],
    ],
    related: EN_RELATED,
  },
  {
    slug: 'apogea-release-date', lang: 'en', alt: 'pt/apogea-lancamento', nav: 'Apogea release date', eyebrow: 'Release date',
    title: 'Apogea release date: play Apogea now on Opengea',
    description: 'Looking for the Apogea release date? You can play Apogea today, for free, on the Opengea community server. Download the launcher and start now.',
    h1: 'Apogea release date: you can play it now',
    intro: `<p>If you searched for the <strong>Apogea release date</strong>, here is the short answer: <strong>you do not have to wait</strong>. Apogea is playable today on <strong>Opengea</strong>, a free community server with its own launcher, open to everyone on Windows.</p>`,
    sections: [
      ['Is Apogea out?', `<p>Yes, you can play it right now on Opengea. The server is online every day, with regular updates: a player Market, mounts, a full Portuguese translation, community events and bug fixes, all delivered automatically by the launcher.</p>`],
      ['How to start playing today', STEPS_EN],
      ['Is it early access or a beta?', `<p>Opengea is a live, persistent server: your character, items and progress stay. It keeps evolving, so updates arrive often, and players help by reporting bugs on the ${dc('Discord')}.</p>`],
    ],
    faq: [
      ['When does Apogea release?', `<p>You can play it now on Opengea. ${dl('Download the launcher')} and create your account in the game.</p>`],
      ['Has Apogea launched?', '<p>On Opengea, yes: the server is open to everyone, free.</p>'],
      ['Does it cost anything?', '<p>No. Opengea is 100% free and non-profit, with no donations and no paid items.</p>'],
      ['Will my progress be wiped?', '<p>No wipe is planned. If one were ever needed, it would be announced well in advance on the Discord.</p>'],
    ],
    related: rel(EN_RELATED, 'apogea-release-date'),
  },
  {
    slug: 'apogea-playtest', lang: 'en', alt: 'pt/apogea-playtest', nav: 'Apogea playtest', eyebrow: 'Playtest',
    title: 'Apogea playtest: next test dates? Play now on Opengea',
    description: 'Waiting for the next Apogea playtest? No test window, no access request: play Apogea any day on the free Opengea community server.',
    h1: 'Apogea playtest: skip the wait',
    intro: `<p>People search for the <strong>next Apogea playtest</strong>, the playtest dates and how long a test lasts. On <strong>Opengea</strong> there is no test window: the server is <strong>open every day</strong>, and your character stays.</p>`,
    sections: [
      ['Playtest vs. Opengea', `<ul>
  <li><strong>No access request:</strong> download the launcher and create an account in the game.</li>
  <li><strong>No end date:</strong> it is a persistent server, not a timed test, so your progress is kept.</li>
  <li><strong>No account email code problems:</strong> the account is created inside the Opengea client.</li>
  <li><strong>Free:</strong> no purchase, no donations.</li>
</ul>`],
      ['How to join', STEPS_EN],
    ],
    faq: [
      ['When is the next Apogea playtest?', `<p>You do not need one: Opengea is open now. ${dl('Download the launcher')} and play.</p>`],
      ['How long does it last?', '<p>There is no end. Opengea is a persistent server.</p>'],
      ['Account creation is disabled / I never got the email code. What now?', `<p>On Opengea you create the account inside the game client, so you can start right away. If anything goes wrong, ask in the ${dc('Discord')}.</p>`],
    ],
    related: rel(EN_RELATED, 'apogea-playtest'),
  },
  {
    slug: 'apogea-steam', lang: 'en', nav: 'Apogea on Steam', eyebrow: 'Steam',
    title: 'Apogea on Steam: play Apogea now with the Opengea launcher',
    description: 'Searching Apogea on Steam? Opengea runs outside Steam: a free launcher for Windows installs and updates the game. Play Apogea today.',
    h1: 'Apogea on Steam? Play it with the Opengea launcher',
    intro: `<p>Many players look for <strong>Apogea on Steam</strong>. Opengea does not need Steam: it has its <strong>own free launcher</strong> that installs the game, keeps it up to date and verifies your files, so you can play Apogea today.</p>`,
    sections: [
      ['What you need', `<ul>
  <li>Windows 10 or 11, 64-bit.</li>
  <li>About 1.3 GB of free space during the install (the installed game takes less).</li>
  <li>No Steam account, no admin rights and no .NET install.</li>
</ul>`],
      ['How to start', STEPS_EN],
    ],
    faq: [
      ['Do I need Steam to play?', '<p>No. Opengea installs and updates through its own launcher.</p>'],
      ['Does it run on Mac or Steam Deck?', '<p>The launcher and the client are made for Windows 10/11 (64-bit). Other systems are not supported.</p>'],
      ['Is it free?', '<p>Yes, 100% free.</p>'],
    ],
    related: rel(EN_RELATED, 'apogea-steam'),
  },
  {
    slug: 'apogea-download', lang: 'en', alt: 'pt/apogea-download', nav: 'Apogea download', eyebrow: 'Download',
    title: 'Apogea download for Windows: free launcher | Opengea',
    description: 'Download Apogea for Windows 10/11 with the free Opengea launcher: it installs the game, keeps it updated and verifies your files.',
    h1: 'Apogea download: get the launcher',
    intro: `<p>The <strong>Apogea download</strong> on Opengea is a single small launcher. ${dl('Download ClientLauncher.exe')} (about 66 MB): it installs the game client, keeps it on the latest version and checks every file.</p>`,
    sections: [
      ['Install in 4 steps', STEPS_EN],
      ['System requirements', `<ul>
  <li><strong>OS:</strong> Windows 10 / 11 (64-bit).</li>
  <li><strong>Space:</strong> about 1.3 GB free during the install.</li>
  <li><strong>Permissions:</strong> per-user install, no admin rights.</li>
  <li><strong>Languages:</strong> English and Brazilian Portuguese.</li>
</ul>`],
      ['Updates', '<p>You never download patches by hand: when a new client is out, the launcher downloads it and verifies it before you play. It can also repair your files at any time.</p>'],
    ],
    faq: [
      ['Is the download safe?', '<p>The launcher checks every game file against its SHA-256 hash before you play, and it installs only for your user, with no admin rights.</p>'],
      ['Windows warned me about the file. Is that normal?', '<p>Windows can warn about new programs it has not seen often. If you are unsure, ask in the Discord before running it.</p>'],
      ['The game says "checking for updates" or will not start.', `<p>Let the launcher finish, or use its repair option. Still stuck? Ask in the ${dc('Discord')}.</p>`],
    ],
    related: rel(EN_RELATED, 'apogea-download'),
  },
  {
    slug: 'apogea-game', lang: 'en', alt: 'pt/apogea-jogo', nav: 'Apogea game (MMORPG)', eyebrow: 'The game',
    title: 'Apogea game: the medieval fantasy MMORPG you can play now',
    description: 'What is Apogea? A medieval fantasy MMORPG with classes, quests, bosses, crafting and a player Market. Play it free on Opengea.',
    h1: 'Apogea: the medieval fantasy MMORPG',
    intro: `<p><strong>Apogea</strong> is a medieval fantasy <strong>MMORPG</strong> with a pixel-art 3D world seen from above: you explore a large world, take on quests, hunt monsters and bosses with friends, and trade with other players. On <strong>Opengea</strong> you can play it now, free.</p>`,
    sections: [
      ['What you do in Apogea', `<ul>
  <li><strong>Quests</strong> across towns, caves, swamps, deserts and dungeons, many of them puzzles with levers, keys and hidden passages.</li>
  <li><strong>Hunts and bosses:</strong> group up to take on the hardest monsters for their loot.</li>
  <li><strong>Classes and traits:</strong> start as a Squire, become a ${p('apogea-classes', 'Knight, Mage or Rogue')}, spend stat points and build your trait tree.</li>
  <li><strong>Crafting and cooking:</strong> forge gear, upgrade items and cook food that gives buffs.</li>
  <li><strong>Market:</strong> buy and sell with every player right from your depot.</li>
  <li><strong>Mounts:</strong> earn the beast tamer's trust and ride.</li>
  <li><strong>Optional PvP</strong> for those who want it.</li>
</ul>`],
      ['Is Apogea like Tibia?', '<p>Players often compare it to classic MMORPGs like Tibia: a top-down world, careful hunts, quests to discover and a strong community. It has its own world, classes, traits and items.</p>'],
      ['Start playing', STEPS_EN],
    ],
    faq: [
      ['Is Apogea free to play?', '<p>On Opengea, yes: 100% free, non-profit, with no donations.</p>'],
      ['Is there a Portuguese version?', '<p>Yes. NPCs, books and the interface are available in Brazilian Portuguese; pick the language in the launcher.</p>'],
      ['Can I play solo?', '<p>Yes, though many bosses and hunts are easier with a group, and the community is active.</p>'],
    ],
    related: rel(EN_RELATED, 'apogea-game'),
  },
  {
    slug: 'apogea-classes', lang: 'en', alt: 'pt/apogea-classes', nav: 'Apogea classes', eyebrow: 'Classes',
    title: 'Apogea classes: Knight, Mage, Rogue and Squire explained',
    description: 'Apogea classes compared: what the Knight, Mage and Rogue are stronger and weaker at, how class multipliers work, and which class to pick.',
    h1: 'Apogea classes: Knight, Mage and Rogue',
    intro: '<p>Every character in <strong>Apogea</strong> starts as a <strong>Squire</strong> and later becomes a <strong>Knight</strong>, a <strong>Mage</strong> or a <strong>Rogue</strong>. The class changes <strong>how much each stat grows</strong> as you level.</p>',
    sections: [
      ['Class multipliers', `<p>Each level gives 3 stat points. Your class multiplies what every point is worth:</p>${CLASS_TABLE_EN}<p>On Opengea the multiplier also applies to the Health, Mana and regeneration on your gear: a ring with +35 Health gives a Knight +70.</p>`],
      ['Which class is best?', `<ul>
  <li><strong>Knight:</strong> the toughest. Huge health, armor and defense, and the most capacity to carry loot. A good first pick for melee and for tanking bosses.</li>
  <li><strong>Mage:</strong> the strongest spells and the most mana, but fragile. Great damage and healing from a distance.</li>
  <li><strong>Rogue:</strong> a hybrid: more Ability and Magic, faster attacks, and more mana than a Knight.</li>
</ul>
<p>There is no single best class: pick the play style you enjoy, then shape it with stat points and traits.</p>`],
      ['Can you respec?', '<p>Yes. Stat Reset and Trait Reset are sold in the game (by Newell), so you can rebuild your points and traits later.</p>'],
    ],
    faq: [
      ['What class do you start as?', '<p>Squire, with every stat at x1.</p>'],
      ['Which class has the most health?', '<p>The Knight: x2 Health from stat points and from gear.</p>'],
      ['Which class has the most mana?', '<p>The Mage: x2 Mana, Magic and Mana Regen.</p>'],
    ],
    related: rel(EN_RELATED, 'apogea-classes'),
  },
  {
    slug: 'apogea-discord', lang: 'en', alt: 'pt/apogea-discord', nav: 'Apogea Discord', eyebrow: 'Community',
    title: 'Apogea Discord: join the Opengea community server',
    description: 'Join the Opengea Discord, the community for playing Apogea: support tickets, bug reports, update news and players to hunt with.',
    h1: 'Apogea Discord: join the Opengea community',
    intro: `<p>The <strong>Opengea Discord</strong> is where the players of our Apogea server meet. <strong>${dc('Join it here')}</strong>: every Opengea player is a member.</p>`,
    sections: [
      ['What you find there', `<ul>
  <li><strong>Support tickets:</strong> stuck somewhere, a lost item or a question about a quest? Open a ticket and the team answers.</li>
  <li><strong>Bug reports</strong> that become fixes, often the same day.</li>
  <li><strong>Update news</strong> and community events.</li>
  <li><strong>Players to group with</strong>, in English and in Portuguese.</li>
</ul>`],
      ['How to get started', STEPS_EN],
    ],
    faq: [
      ['Do I need Discord to play?', '<p>Yes: every Opengea player is on the Discord. That is where support, updates and announcements happen.</p>'],
      ['Is there a Reddit?', `<p>The community lives on the ${dc('Discord')}.</p>`],
    ],
    related: rel(EN_RELATED, 'apogea-discord'),
  },
  {
    slug: 'apogea-wiki', lang: 'en', alt: 'pt/apogea-wiki', nav: 'Apogea wiki', eyebrow: 'Wiki',
    title: 'Apogea wiki: items, monsters, quests and maps',
    description: 'Where to look up Apogea items, monsters, NPCs, quests and maps, and where to ask when a wiki is not enough. Play Apogea free on Opengea.',
    h1: 'Apogea wiki: where to look things up',
    intro: '<p>Looking for an <strong>Apogea wiki</strong>? Players have built several databases of items, monsters, NPCs, quests and maps. Here is where to look, and where to ask when the wiki does not have the answer.</p>',
    sections: [
      ['Community wikis and databases', `<ul>
  <li><a href="https://apogeawiki.info/" target="_blank" rel="noopener">apogeawiki.info</a>: items, monsters, NPC shops and quest guides.</li>
  <li><a href="https://apogea.fandom.com/" target="_blank" rel="noopener">Apogea Fandom wiki</a>: spells, classes and general pages.</li>
  <li><a href="https://apogean.eu/" target="_blank" rel="noopener">apogean.eu</a>: monster stats, spells and an interactive map.</li>
</ul>
<p>These are made by players, not by Opengea. Some values can differ on our server, where fixes and balance changes are announced on the Discord.</p>`],
      ['When the wiki is not enough', `<p>Open a ticket on the ${dc('Opengea Discord')}: the team checks the game itself and answers with pictures of the place, the item or the NPC.</p>`],
    ],
    faq: [
      ['Is there an interactive Apogea map?', '<p>Yes, apogean.eu has one. In tickets on the Discord, the team also sends map pictures and in-game screenshots of the spot you ask about.</p>'],
      ['Where can I see who sells an item?', '<p>The wikis list NPC shops. On Opengea you can also check the Market at any depot for player offers and 30 days of price history.</p>'],
    ],
    related: rel(EN_RELATED, 'apogea-wiki'),
  },
  {
    slug: 'apogea-private-server', lang: 'en', alt: 'pt/apogea-servidor', nav: 'Apogea private server', eyebrow: 'Servers',
    title: 'Apogea private server: Opengea, free and online now',
    description: 'Opengea is a free, non-profit Apogea community server with its own launcher, English and Portuguese, a Market, mounts and regular updates.',
    h1: 'Apogea private server: Opengea',
    intro: '<p><strong>Opengea</strong> is a <strong>free, non-profit community server</strong> for Apogea, with its own client and launcher. It is online now, in English and Brazilian Portuguese.</p>',
    sections: [
      ['Why Opengea', `<ul>
  <li><strong>100% free:</strong> no donations, no paid items, no pay-to-win.</li>
  <li><strong>A real team:</strong> support tickets answered on the Discord, bugs fixed fast, updates delivered by the launcher.</li>
  <li><strong>New features:</strong> a player Market, mounts, a Portuguese translation and community events.</li>
  <li><strong>Fair play:</strong> one character in the game per person at a time, and clear rules.</li>
</ul>`],
      ['Join in 4 steps', STEPS_EN],
    ],
    faq: [
      ['How many players are online?', `<p>It changes through the day; the busiest hours are the Brazilian evening. Come say hi on the ${dc('Discord')}.</p>`],
      ['Is it safe to play?', '<p>The launcher verifies every file, installs without admin rights, and the site sets no cookies and does no tracking.</p>'],
    ],
    related: rel(EN_RELATED, 'apogea-private-server'),
  },

  // ---------------------------------------------------------------- Português (Brasil)
  {
    slug: 'pt/apogea', lang: 'pt-BR', alt: 'apogea', nav: 'Guias de Apogea', eyebrow: 'Perguntas sobre Apogea',
    title: 'Apogea: como jogar, baixar, classes e mais | Opengea',
    description: 'Tudo o que as pessoas procuram sobre Apogea: como jogar hoje, download, classes, Discord, wiki e playtests. Jogue de graça no Opengea.',
    h1: 'Apogea: tudo o que você está procurando',
    intro: `<p><strong>Apogea</strong> é um MMORPG de fantasia medieval num mundo 3D em pixel art visto de cima, com quests, chefes e uma economia feita pelos jogadores. Você pode <strong>jogar hoje, de graça, no Opengea</strong>, um servidor comunitário sem fins lucrativos com launcher próprio.</p>
<p>Estes guias curtos respondem o que mais se procura.</p>`,
    sections: [
      ['Comece por aqui', `<ul>
  <li>${p('pt/apogea-lancamento', 'Lançamento do Apogea')}: quando dá pra jogar (agora).</li>
  <li>${p('pt/apogea-download', 'Download do Apogea')}: baixe o launcher e instale.</li>
  <li>${p('pt/apogea-playtest', 'Playtest do Apogea')}: no Opengea não precisa esperar teste.</li>
  <li>${p('pt/apogea-jogo', 'O jogo Apogea (MMORPG)')}: o que é e o que se faz nele.</li>
  <li>${p('pt/apogea-classes', 'Classes do Apogea')}: Squire, Knight, Mage e Rogue.</li>
  <li>${p('pt/apogea-discord', 'Discord do Apogea')}: a comunidade.</li>
  <li>${p('pt/apogea-wiki', 'Wiki do Apogea')}: onde pesquisar.</li>
  <li>${p('pt/apogea-servidor', 'Servidor de Apogea')}: o Opengea.</li>
</ul>`],
      ['Como começar a jogar em 4 passos', STEPS_PT],
    ],
    faq: [
      ['Dá pra jogar Apogea agora?', `<p>Dá. O Opengea está no ar e aberto: ${dl('baixe o launcher')}, crie a conta no cliente do jogo e jogue.</p>`],
      ['É de graça?', '<p>Sim, 100% gratuito. O Opengea não tem fins lucrativos e não aceita doações.</p>'],
      ['Roda em quais sistemas?', '<p>Windows 10 e 11 (64 bits).</p>'],
    ],
    related: PT_RELATED,
  },
  {
    slug: 'pt/apogea-lancamento', lang: 'pt-BR', alt: 'apogea-release-date', nav: 'Lançamento do Apogea', eyebrow: 'Data de lançamento',
    title: 'Apogea data de lançamento: já dá pra jogar no Opengea',
    description: 'Procurando a data de lançamento do Apogea? Já dá pra jogar hoje, de graça, no servidor comunitário Opengea. Baixe o launcher e comece agora.',
    h1: 'Lançamento do Apogea: já dá pra jogar',
    intro: `<p>Se você procurou a <strong>data de lançamento do Apogea</strong> ou se o <strong>Apogea já lançou</strong>, a resposta curta é: <strong>não precisa esperar</strong>. Dá pra jogar Apogea hoje no <strong>Opengea</strong>, um servidor comunitário gratuito com launcher próprio, aberto pra todo mundo no Windows.</p>`,
    sections: [
      ['O Apogea já lançou?', '<p>Sim, dá pra jogar agora no Opengea. O servidor fica no ar todos os dias e recebe atualizações frequentes: Market entre jogadores, montarias, tradução completa pro português, eventos da comunidade e correções, tudo entregue automaticamente pelo launcher.</p>'],
      ['Como começar a jogar hoje', STEPS_PT],
      ['É acesso antecipado ou beta?', `<p>O Opengea é um servidor permanente: o seu personagem, os itens e o progresso ficam salvos. Ele continua evoluindo, então as atualizações saem com frequência, e os jogadores ajudam reportando bugs no ${dc('Discord')}.</p>`],
    ],
    faq: [
      ['Quando o Apogea lança?', `<p>Já dá pra jogar no Opengea. ${dl('Baixe o launcher')} e crie a sua conta no jogo.</p>`],
      ['O Apogea já lançou?', '<p>No Opengea, sim: o servidor está aberto pra todos, de graça.</p>'],
      ['Precisa pagar?', '<p>Não. O Opengea é 100% gratuito e sem fins lucrativos, sem doações e sem itens pagos.</p>'],
      ['Vai ter wipe?', '<p>Não há wipe planejado. Se um dia for preciso, será avisado com bastante antecedência no Discord.</p>'],
    ],
    related: rel(PT_RELATED, 'pt/apogea-lancamento'),
  },
  {
    slug: 'pt/apogea-playtest', lang: 'pt-BR', alt: 'apogea-playtest', nav: 'Playtest do Apogea', eyebrow: 'Playtest',
    title: 'Apogea playtest: próximo teste? Jogue agora no Opengea',
    description: 'Esperando o próximo playtest do Apogea? Sem janela de teste e sem pedir acesso: jogue Apogea qualquer dia no servidor comunitário gratuito Opengea.',
    h1: 'Playtest do Apogea: sem esperar',
    intro: '<p>Muita gente procura o <strong>próximo playtest do Apogea</strong>, as datas dos testes e quanto tempo dura cada um. No <strong>Opengea</strong> não existe janela de teste: o servidor fica <strong>aberto todos os dias</strong>, e o seu personagem continua salvo.</p>',
    sections: [
      ['Playtest x Opengea', `<ul>
  <li><strong>Sem pedir acesso:</strong> baixe o launcher e crie a conta dentro do jogo.</li>
  <li><strong>Sem data pra acabar:</strong> é um servidor permanente, não um teste com prazo, então o progresso fica.</li>
  <li><strong>Sem problema de código por email:</strong> a conta é criada dentro do cliente do Opengea.</li>
  <li><strong>De graça:</strong> sem compra e sem doações.</li>
</ul>`],
      ['Como entrar', STEPS_PT],
    ],
    faq: [
      ['Quando é o próximo playtest do Apogea?', `<p>Não precisa: o Opengea está aberto agora. ${dl('Baixe o launcher')} e jogue.</p>`],
      ['Quanto tempo dura?', '<p>Não tem fim. O Opengea é um servidor permanente.</p>'],
      ['A criação de conta está desativada / o código do email não chegou. E agora?', `<p>No Opengea você cria a conta dentro do cliente do jogo, então dá pra começar na hora. Se algo der errado, pergunte no ${dc('Discord')}.</p>`],
    ],
    related: rel(PT_RELATED, 'pt/apogea-playtest'),
  },
  {
    slug: 'pt/apogea-download', lang: 'pt-BR', alt: 'apogea-download', nav: 'Download do Apogea', eyebrow: 'Download',
    title: 'Apogea download para Windows: launcher grátis | Opengea',
    description: 'Baixe Apogea para Windows 10/11 com o launcher gratuito do Opengea: ele instala o jogo, mantém atualizado e confere os seus arquivos.',
    h1: 'Download do Apogea: baixe o launcher',
    intro: `<p>O <strong>download do Apogea</strong> no Opengea é um launcher pequeno. ${dl('Baixe o ClientLauncher.exe')} (uns 66 MB): ele instala o cliente do jogo, mantém tudo na versão mais nova e confere cada arquivo.</p>`,
    sections: [
      ['Instale em 4 passos', STEPS_PT],
      ['Requisitos', `<ul>
  <li><strong>Sistema:</strong> Windows 10 / 11 (64 bits).</li>
  <li><strong>Espaço:</strong> uns 1,3 GB livres durante a instalação.</li>
  <li><strong>Permissões:</strong> instala só pro seu usuário, sem administrador.</li>
  <li><strong>Idiomas:</strong> inglês e português do Brasil.</li>
</ul>`],
      ['Atualizações', '<p>Você nunca baixa patch na mão: quando sai um cliente novo, o launcher baixa e confere antes de você jogar. Ele também repara os seus arquivos quando você quiser.</p>'],
    ],
    faq: [
      ['O download é seguro?', '<p>O launcher confere cada arquivo do jogo pelo hash SHA-256 antes de você jogar, e instala só pro seu usuário, sem administrador.</p>'],
      ['O Windows avisou sobre o arquivo. É normal?', '<p>O Windows pode avisar sobre programas novos que ele ainda não viu muito. Se ficar na dúvida, pergunte no Discord antes de abrir.</p>'],
      ['O jogo fica em "checking for updates" ou não abre.', `<p>Deixe o launcher terminar, ou use a opção de reparar. Continuou? Pergunte no ${dc('Discord')}.</p>`],
    ],
    related: rel(PT_RELATED, 'pt/apogea-download'),
  },
  {
    slug: 'pt/apogea-jogo', lang: 'pt-BR', alt: 'apogea-game', nav: 'O jogo Apogea (MMORPG)', eyebrow: 'O jogo',
    title: 'Apogea jogo: o MMORPG de fantasia medieval pra jogar agora',
    description: 'O que é Apogea? Um MMORPG de fantasia medieval com classes, quests, chefes, crafting e Market entre jogadores. Jogue de graça no Opengea.',
    h1: 'Apogea: o MMORPG de fantasia medieval',
    intro: '<p><strong>Apogea</strong> é um <strong>MMORPG</strong> de fantasia medieval num mundo 3D em pixel art visto de cima: você explora um mundo grande, faz quests, caça monstros e chefes com os amigos e negocia com outros jogadores. No <strong>Opengea</strong> dá pra jogar agora, de graça e em português.</p>',
    sections: [
      ['O que se faz no Apogea', `<ul>
  <li><strong>Quests</strong> por cidades, cavernas, pântanos, desertos e masmorras, muitas com enigmas de alavancas, chaves e passagens escondidas.</li>
  <li><strong>Caçadas e chefes:</strong> junte um grupo pra enfrentar os monstros mais difíceis pelo loot.</li>
  <li><strong>Classes e traits:</strong> comece como Squire, vire ${p('pt/apogea-classes', 'Knight, Mage ou Rogue')}, distribua pontos de atributo e monte a sua árvore de traits.</li>
  <li><strong>Crafting e culinária:</strong> forje equipamentos, melhore itens e cozinhe comidas que dão bônus.</li>
  <li><strong>Market:</strong> compre e venda com todos os jogadores direto do depot.</li>
  <li><strong>Montarias:</strong> ganhe a confiança do domador de feras e monte.</li>
  <li><strong>PvP opcional</strong> pra quem quiser.</li>
</ul>`],
      ['Apogea é parecido com Tibia?', '<p>Muitos jogadores comparam com MMORPGs clássicos como Tibia: mundo visto de cima, caçadas cuidadosas, quests pra descobrir e uma comunidade forte. Ele tem o próprio mundo, classes, traits e itens.</p>'],
      ['Como jogar', STEPS_PT],
    ],
    faq: [
      ['Apogea é de graça?', '<p>No Opengea, sim: 100% gratuito, sem fins lucrativos e sem doações.</p>'],
      ['Tem em português?', '<p>Sim. NPCs, livros e a interface estão em português do Brasil; escolha o idioma no launcher.</p>'],
      ['Dá pra jogar sozinho?', '<p>Dá, mas muitos chefes e caçadas ficam mais fáceis em grupo, e a comunidade é ativa.</p>'],
      ['Apogea é online?', '<p>Sim, é um MMORPG online: todos jogam juntos no mesmo mundo.</p>'],
    ],
    related: rel(PT_RELATED, 'pt/apogea-jogo'),
  },
  {
    slug: 'pt/apogea-classes', lang: 'pt-BR', alt: 'apogea-classes', nav: 'Classes do Apogea', eyebrow: 'Classes',
    title: 'Classes do Apogea: Knight, Mage, Rogue e Squire',
    description: 'As classes do Apogea comparadas: em que Knight, Mage e Rogue são mais fortes e mais fracos, como funcionam os multiplicadores e qual escolher.',
    h1: 'Classes do Apogea: Knight, Mage e Rogue',
    intro: '<p>Todo personagem do <strong>Apogea</strong> começa como <strong>Squire</strong> e depois vira <strong>Knight</strong>, <strong>Mage</strong> ou <strong>Rogue</strong>. A classe muda <strong>quanto cada atributo cresce</strong> a cada nível.</p>',
    sections: [
      ['Multiplicadores de classe', `<p>Cada nível dá 3 pontos de atributo. A classe multiplica quanto cada ponto vale:</p>${CLASS_TABLE_PT}<p>No Opengea o multiplicador também vale pra Vida, Mana e regeneração dos equipamentos: um anel de +35 de Vida dá +70 num Knight.</p>`],
      ['Qual a melhor classe?', `<ul>
  <li><strong>Knight:</strong> o mais resistente. Muita vida, armadura e defesa, e a maior capacidade pra carregar loot. Boa primeira escolha pra corpo a corpo e pra segurar chefes.</li>
  <li><strong>Mage:</strong> as magias mais fortes e a maior mana, mas frágil. Ótimo dano e cura à distância.</li>
  <li><strong>Rogue:</strong> híbrido: mais Ability e Magic, ataques mais rápidos e mais mana que um Knight.</li>
</ul>
<p>Não existe uma classe melhor: escolha o estilo de que você gosta e ajuste com pontos e traits.</p>`],
      ['Dá pra refazer a build?', '<p>Dá. Stat Reset e Trait Reset são vendidos no jogo (pelo Newell), então você pode redistribuir pontos e traits depois.</p>'],
    ],
    faq: [
      ['Com que classe se começa?', '<p>Squire, com todos os atributos em x1.</p>'],
      ['Qual classe tem mais vida?', '<p>O Knight: Vida x2, dos pontos e dos equipamentos.</p>'],
      ['Qual classe tem mais mana?', '<p>O Mage: Mana, Magic e Regeneração de Mana x2.</p>'],
    ],
    related: rel(PT_RELATED, 'pt/apogea-classes'),
  },
  {
    slug: 'pt/apogea-discord', lang: 'pt-BR', alt: 'apogea-discord', nav: 'Discord do Apogea', eyebrow: 'Comunidade',
    title: 'Discord do Apogea: entre na comunidade do Opengea',
    description: 'Entre no Discord do Opengea, a comunidade de quem joga Apogea: tickets de suporte, reporte de bugs, novidades e gente pra caçar junto.',
    h1: 'Discord do Apogea: a comunidade do Opengea',
    intro: `<p>O <strong>Discord do Opengea</strong> é onde os jogadores do nosso servidor de Apogea se encontram. <strong>${dc('Entre aqui')}</strong>: todo jogador do Opengea faz parte.</p>`,
    sections: [
      ['O que tem lá', `<ul>
  <li><strong>Tickets de suporte:</strong> preso em algum lugar, item sumido ou dúvida de quest? Abra um ticket e a equipe responde.</li>
  <li><strong>Reporte de bugs</strong> que viram correção, muitas vezes no mesmo dia.</li>
  <li><strong>Novidades</strong> das atualizações e eventos da comunidade.</li>
  <li><strong>Gente pra jogar junto</strong>, em português e em inglês.</li>
</ul>`],
      ['Como começar', STEPS_PT],
    ],
    faq: [
      ['Precisa de Discord pra jogar?', '<p>Sim: todo jogador do Opengea está no Discord. É lá que ficam o suporte, as atualizações e os avisos.</p>'],
    ],
    related: rel(PT_RELATED, 'pt/apogea-discord'),
  },
  {
    slug: 'pt/apogea-wiki', lang: 'pt-BR', alt: 'apogea-wiki', nav: 'Wiki do Apogea', eyebrow: 'Wiki',
    title: 'Wiki do Apogea: itens, monstros, quests e mapas',
    description: 'Onde pesquisar itens, monstros, NPCs, quests e mapas do Apogea, e onde perguntar quando a wiki não basta. Jogue Apogea de graça no Opengea.',
    h1: 'Wiki do Apogea: onde pesquisar',
    intro: '<p>Procurando uma <strong>wiki do Apogea</strong>? Os jogadores montaram várias bases de itens, monstros, NPCs, quests e mapas. Aqui está onde olhar, e onde perguntar quando a wiki não tem a resposta.</p>',
    sections: [
      ['Wikis e bases da comunidade', `<ul>
  <li><a href="https://apogeawiki.info/" target="_blank" rel="noopener">apogeawiki.info</a>: itens, monstros, lojas de NPC e guias de quest.</li>
  <li><a href="https://apogea.fandom.com/" target="_blank" rel="noopener">Wiki Apogea no Fandom</a>: magias, classes e páginas gerais.</li>
  <li><a href="https://apogean.eu/" target="_blank" rel="noopener">apogean.eu</a>: atributos de monstros, magias e mapa interativo.</li>
</ul>
<p>Essas wikis são feitas por jogadores, não pelo Opengea. Alguns valores podem ser diferentes no nosso servidor, onde correções e mudanças de balanceamento são avisadas no Discord.</p>`],
      ['Quando a wiki não basta', `<p>Abra um ticket no ${dc('Discord do Opengea')}: a equipe confere no próprio jogo e responde com fotos do lugar, do item ou do NPC.</p>`],
    ],
    faq: [
      ['Tem mapa interativo do Apogea?', '<p>Tem, no apogean.eu. Nos tickets do Discord a equipe também manda fotos do mapa e do jogo mostrando o lugar que você perguntou.</p>'],
      ['Onde vejo quem vende um item?', '<p>As wikis listam as lojas de NPC. No Opengea você também pode olhar o Market em qualquer depot, com as ofertas dos jogadores e 30 dias de histórico de preço.</p>'],
    ],
    related: rel(PT_RELATED, 'pt/apogea-wiki'),
  },
  {
    slug: 'pt/apogea-servidor', lang: 'pt-BR', alt: 'apogea-private-server', nav: 'Servidor de Apogea', eyebrow: 'Servidores',
    title: 'Servidor de Apogea: Opengea, grátis e no ar agora',
    description: 'O Opengea é um servidor comunitário de Apogea gratuito e sem fins lucrativos, com launcher próprio, português, Market, montarias e atualizações.',
    h1: 'Servidor de Apogea: o Opengea',
    intro: '<p>O <strong>Opengea</strong> é um <strong>servidor comunitário de Apogea, gratuito e sem fins lucrativos</strong>, com cliente e launcher próprios. Está no ar agora, em português do Brasil e em inglês.</p>',
    sections: [
      ['Por que o Opengea', `<ul>
  <li><strong>100% grátis:</strong> sem doações, sem itens pagos, sem pay-to-win.</li>
  <li><strong>Uma equipe de verdade:</strong> tickets respondidos no Discord, bugs corrigidos rápido, atualizações entregues pelo launcher.</li>
  <li><strong>Novidades:</strong> Market entre jogadores, montarias, tradução pro português e eventos da comunidade.</li>
  <li><strong>Jogo justo:</strong> um personagem no jogo por pessoa de cada vez, e regras claras.</li>
</ul>`],
      ['Entre em 4 passos', STEPS_PT],
    ],
    faq: [
      ['Quantos jogadores ficam online?', `<p>Varia ao longo do dia; o horário mais cheio é a noite no Brasil. Venha dar um oi no ${dc('Discord')}.</p>`],
      ['É seguro jogar?', '<p>O launcher confere cada arquivo, instala sem administrador, e o site não usa cookies nem rastreamento.</p>'],
    ],
    related: rel(PT_RELATED, 'pt/apogea-servidor'),
  },
];

// ---------------------------------------------------------------- the long tail (terms.mjs)
const plain = (html) => html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const clip = (s, n) => (s.length <= n ? s : `${s.slice(0, s.lastIndexOf(' ', n - 1)).replace(/[.,:;!?]+$/, '')}…`);
const titleOf = (h1) => (h1.length <= 48 ? `${h1} | Opengea` : h1);

const termPages = TERMS.map(([slug, nav, h1, intro, group], i) => {
  const siblings = TERMS.filter((t) => t[4] === group && t[0] !== slug).map((t) => t[0]);
  const at = Math.max(0, TERMS.filter((t) => t[4] === group).findIndex((t) => t[0] === slug));
  const near = [...siblings.slice(at), ...siblings.slice(0, at)].slice(0, 3);
  return {
    slug, lang: 'en', nav, eyebrow: GROUPS[group].nav, title: titleOf(h1),
    description: clip(`${plain(intro)} Play Apogea free on Opengea.`, 155), h1, intro, sections: [], faq: [],
    related: [GROUPS[group].slug, ...near], group,
  };
});

const groupHubs = Object.entries(GROUPS).filter(([, g]) => g.h1).map(([key, g]) => {
  const members = termPages.filter((t) => t.group === key);
  return {
    slug: g.slug, lang: 'en', nav: g.nav, eyebrow: 'Apogea guides', title: titleOf(g.h1),
    description: clip(`${plain(g.intro)} Play Apogea free on Opengea.`, 155), h1: g.h1, intro: g.intro,
    sections: [[g.nav, `<ul>${members.map((m) => `<li>${p(m.slug, m.nav)}</li>`).join('')}</ul>`]], faq: [],
    related: ['apogea', ...Object.values(GROUPS).map((x) => x.slug).filter((s) => s !== g.slug)].slice(0, 4),
  };
});

// The classes page is the classes group's hub; the main hub links every group hub.
const classesPage = PAGES.find((x) => x.slug === 'apogea-classes');
classesPage.sections.push(['Class guides', `<ul>${termPages.filter((t) => t.group === 'classes').map((m) => `<li>${p(m.slug, m.nav)}</li>`).join('')}</ul>`]);
const hubPage = PAGES.find((x) => x.slug === 'apogea');
hubPage.sections.splice(1, 0, ['Guides by topic', `<ul>${Object.values(GROUPS).map((g) => `<li>${p(g.slug, g.nav)}</li>`).join('')}</ul>`]);

PAGES.push(...groupHubs, ...termPages);
