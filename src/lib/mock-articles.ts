import type { CategorySlug } from "./constants";

export type MockArticle = {
  id: string;
  title: string;
  slug: string;
  url: string;
  sourceName: string;
  category: CategorySlug;
  publishedAt: string;
  readingTimeMin: number;
  bullets: [string, string, string];
  excerpt: string;
  contentHtml: string;
};

export const MOCK_ARTICLES: MockArticle[] = [
  {
    id: "art-001",
    title: "GPT-5 Turbo dépasse Claude Opus 4.7 sur les benchmarks de raisonnement multi-étapes",
    slug: "gpt5-turbo-depasse-claude-opus-benchmarks-raisonnement",
    url: "https://example.com/gpt5-turbo-benchmarks",
    sourceName: "MIT Technology Review",
    category: "ia",
    publishedAt: "2026-04-21T08:14:00.000Z",
    readingTimeMin: 6,
    bullets: [
      "OpenAI annonce GPT-5 Turbo avec un score de 94 % sur GSM-Hard, contre 91 % pour Claude Opus 4.7.",
      "Le modèle introduit un mode de raisonnement à fenêtre adaptative qui réduit la latence de 38 %.",
      "Anthropic réplique en publiant Claude Sonnet 4.6 optimisé pour les tâches d'agent autonome.",
    ],
    excerpt:
      "OpenAI a publié hier soir GPT-5 Turbo, qui revendique la première place sur trois des cinq benchmarks de raisonnement les plus suivis de l'industrie.",
    contentHtml: `
      <p>OpenAI a publié hier soir GPT-5 Turbo, qui revendique la première place sur trois des cinq benchmarks de raisonnement les plus suivis de l'industrie. Le modèle obtient notamment 94 % sur GSM-Hard contre 91 % pour Claude Opus 4.7, et 89 % sur ARC-AGI-2 où Claude restait largement leader depuis fin 2025.</p>
      <p>Au-delà des scores, GPT-5 Turbo introduit un mécanisme de "raisonnement à fenêtre adaptative" qui ajuste dynamiquement la profondeur de réflexion selon la complexité estimée de la requête. Sur des prompts simples, la latence chute de 38 % par rapport à GPT-5 standard tout en conservant une qualité de réponse équivalente.</p>
      <h2>La réponse d'Anthropic</h2>
      <p>Quelques heures après l'annonce, Anthropic a publié Claude Sonnet 4.6, présenté comme "le modèle le plus capable pour les tâches d'agent autonome de longue durée". Sonnet 4.6 conserve un déficit de performance sur les benchmarks purs de raisonnement mais surpasse GPT-5 Turbo de 12 points sur SWE-bench Verified, le standard de l'industrie pour les tâches d'ingénierie logicielle réelles.</p>
      <p>Cette divergence stratégique se confirme : OpenAI mise sur le raisonnement pur tandis qu'Anthropic se positionne fermement sur les agents et l'usage en production.</p>
    `,
  },
  {
    id: "art-002",
    title: "Une faille critique dans systemd permet l'escalade de privilèges sur 90 % des distributions Linux",
    slug: "faille-critique-systemd-escalade-privileges-linux",
    url: "https://example.com/systemd-cve-2026-1142",
    sourceName: "Krebs on Security",
    category: "cyber",
    publishedAt: "2026-04-21T05:32:00.000Z",
    readingTimeMin: 4,
    bullets: [
      "La CVE-2026-1142 affecte systemd 245 à 257 et permet à un utilisateur local d'obtenir les droits root.",
      "Red Hat, Debian et Ubuntu ont publié des correctifs en moins de 24 heures.",
      "Aucune exploitation active n'a été détectée mais un PoC circule déjà sur GitHub.",
    ],
    excerpt:
      "Qualys a divulgué hier une faille critique dans systemd qui touche la quasi-totalité des distributions Linux modernes en production.",
    contentHtml: `
      <p>Qualys a divulgué hier une faille critique dans systemd, identifiée comme CVE-2026-1142 et baptisée "PIDDoor", qui touche la quasi-totalité des distributions Linux modernes en production. La vulnérabilité affecte les versions de systemd 245 à 257, soit l'écrasante majorité des serveurs déployés ces cinq dernières années.</p>
      <p>L'exploitation requiert un accès local non privilégié et permet, via une race condition dans le gestionnaire de PID, d'obtenir les droits root en moins d'une seconde sur un système non patché. Les chercheurs estiment que plus de 90 % des distributions Linux étaient vulnérables au moment de la divulgation.</p>
      <h2>Une réponse coordonnée express</h2>
      <p>Red Hat, Debian, Ubuntu et SUSE ont publié des correctifs en moins de 24 heures grâce à une fenêtre de divulgation embargo de 60 jours. Aucune exploitation active n'a été détectée à ce stade, mais un proof-of-concept fonctionnel a été publié sur GitHub dans les heures qui ont suivi l'annonce.</p>
      <p>Les administrateurs systèmes sont invités à appliquer les mises à jour sans délai, en particulier sur les machines multi-utilisateurs et les bastions SSH.</p>
    `,
  },
  {
    id: "art-003",
    title: "Apple présente Vision Pro 2 : 40 % plus léger, 1 800 € de moins, sortie en septembre",
    slug: "apple-vision-pro-2-plus-leger-moins-cher",
    url: "https://example.com/vision-pro-2-launch",
    sourceName: "The Verge",
    category: "tech",
    publishedAt: "2026-04-20T19:05:00.000Z",
    readingTimeMin: 5,
    bullets: [
      "Le nouveau casque pèse 380 g grâce à un châssis carbone et de nouvelles optiques pancake.",
      "Le prix de lancement est fixé à 1 999 $, contre 3 499 $ pour la première génération.",
      "Apple revoit complètement visionOS 3 avec un focus sur les apps de productivité spatiale.",
    ],
    excerpt:
      "Apple a dévoilé hier soir le Vision Pro 2 lors d'un événement spécial à Cupertino, deux ans après le lancement contesté de la première génération.",
    contentHtml: `
      <p>Apple a dévoilé hier soir le Vision Pro 2 lors d'un événement spécial à Cupertino, deux ans après le lancement contesté de la première génération. Le nouveau casque pèse 380 grammes — soit 40 % de moins que son prédécesseur — grâce à un châssis en fibre de carbone et un nouveau système optique pancake co-développé avec Sony.</p>
      <p>Surtout, le prix de lancement chute drastiquement : 1 999 dollars, contre 3 499 dollars pour le modèle original. Tim Cook a justifié cette baisse par "une meilleure compréhension du marché de la réalité spatiale grand public" et par les économies d'échelle réalisées sur les chaînes de production de Foxconn à Zhengzhou.</p>
      <h2>visionOS 3, le vrai pari</h2>
      <p>Au-delà du matériel, Apple mise sur visionOS 3, entièrement repensé autour de la productivité spatiale. Le système intègre nativement Final Cut Pro Spatial, Logic Pro Spatial et un nouveau Freeform 3D pour la collaboration. La compatibilité avec les apps iPad existantes est conservée mais Apple insiste sur le fait que "l'avenir du Vision Pro se jouera sur des apps natives spatiales".</p>
      <p>La sortie est prévue pour le 12 septembre 2026 aux États-Unis, octobre pour la France.</p>
    `,
  },
  {
    id: "art-004",
    title: "Mistral Large 3 : le français rattrape GPT-4o sur les benchmarks multilingues européens",
    slug: "mistral-large-3-rattrape-gpt-4o-multilingue",
    url: "https://example.com/mistral-large-3-launch",
    sourceName: "Le Monde Informatique",
    category: "ia",
    publishedAt: "2026-04-20T14:48:00.000Z",
    readingTimeMin: 4,
    bullets: [
      "Mistral Large 3 obtient 87 % sur MMLU-FR contre 88 % pour GPT-4o, à un coût trois fois inférieur.",
      "Le modèle est disponible en self-hosting sous licence Apache 2.0 pour les versions jusqu'à 22 milliards de paramètres.",
      "BNP Paribas, Carrefour et la SNCF figurent parmi les premiers grands clients annoncés.",
    ],
    excerpt:
      "Mistral AI a présenté ce matin Mistral Large 3, son nouveau modèle phare qui rivalise avec GPT-4o sur l'ensemble des benchmarks multilingues européens.",
    contentHtml: `
      <p>Mistral AI a présenté ce matin Mistral Large 3, son nouveau modèle phare qui rivalise avec GPT-4o sur l'ensemble des benchmarks multilingues européens. Le modèle obtient 87 % sur MMLU-FR contre 88 % pour GPT-4o, et le dépasse sur MMLU-DE et MMLU-IT.</p>
      <p>Surtout, Mistral Large 3 est facturé 3 € par million de tokens en entrée, soit un coût trois fois inférieur à celui de GPT-4o pour des performances comparables sur les langues européennes. Pour la première fois, un acteur européen propose un rapport qualité-prix décisivement meilleur que les leaders américains.</p>
      <h2>Une stratégie open-source maintenue</h2>
      <p>Les versions jusqu'à 22 milliards de paramètres restent disponibles en self-hosting sous licence Apache 2.0. Seule la version 124B reste exclusive à l'API et aux partenariats entreprise. BNP Paribas, Carrefour et la SNCF figurent parmi les premiers grands clients annoncés, confirmant la traction de Mistral auprès du CAC 40.</p>
    `,
  },
  {
    id: "art-005",
    title: "Le ransomware BlackCat 4.0 cible spécifiquement les hyperviseurs ESXi et Proxmox",
    slug: "ransomware-blackcat-4-cible-hyperviseurs-esxi-proxmox",
    url: "https://example.com/blackcat-4-esxi-proxmox",
    sourceName: "Bleeping Computer",
    category: "cyber",
    publishedAt: "2026-04-20T11:22:00.000Z",
    readingTimeMin: 5,
    bullets: [
      "Une nouvelle variante de BlackCat chiffre les machines virtuelles directement au niveau de l'hyperviseur.",
      "Au moins 40 entreprises européennes ont été touchées en quatre semaines, principalement dans la santé.",
      "Mandiant attribue la campagne au groupe ALPHV opérant depuis l'Europe de l'Est.",
    ],
    excerpt:
      "Une nouvelle variante du ransomware BlackCat, baptisée 4.0 par Mandiant, cible spécifiquement les hyperviseurs ESXi et Proxmox des entreprises européennes.",
    contentHtml: `
      <p>Une nouvelle variante du ransomware BlackCat, baptisée 4.0 par Mandiant, cible spécifiquement les hyperviseurs ESXi et Proxmox des entreprises européennes. Contrairement aux versions précédentes, cette mouture chiffre les machines virtuelles directement au niveau de l'hyperviseur, rendant inopérantes les solutions de sauvegarde traditionnelles basées sur les snapshots.</p>
      <p>Au moins 40 entreprises européennes ont été touchées en quatre semaines, principalement dans le secteur de la santé. Trois CHU français figurent parmi les victimes confirmées, dont l'un a vu l'intégralité de son système d'information immobilisé pendant 11 jours.</p>
      <h2>Une attribution claire</h2>
      <p>Mandiant attribue la campagne au groupe ALPHV opérant depuis l'Europe de l'Est, déjà responsable des grandes vagues d'attaques contre les infrastructures de santé en 2024 et 2025. L'ANSSI a publié un bulletin d'alerte recommandant le durcissement immédiat des consoles ESXi et Proxmox, notamment via la désactivation de SLP et la segmentation réseau des consoles d'administration.</p>
    `,
  },
  {
    id: "art-006",
    title: "Bun 2.0 rattrape Node.js sur la compatibilité npm et devient officiellement production-ready",
    slug: "bun-2-rattrape-node-compatibilite-npm-production",
    url: "https://example.com/bun-2-production-ready",
    sourceName: "Hacker News",
    category: "tech",
    publishedAt: "2026-04-19T22:11:00.000Z",
    readingTimeMin: 7,
    bullets: [
      "Bun 2.0 atteint 99,2 % de compatibilité avec les modules npm les plus utilisés selon les tests Vercel.",
      "Les performances de Bun sont en moyenne 2,8 fois supérieures à Node.js 24 sur les workloads HTTP.",
      "Vercel et Cloudflare annoncent un support natif de Bun comme runtime alternatif à Node.js.",
    ],
    excerpt:
      "Oven a publié hier la version 2.0 de Bun, qui marque officiellement la sortie du statut 'beta production' adopté en 2024.",
    contentHtml: `
      <p>Oven a publié hier la version 2.0 de Bun, qui marque officiellement la sortie du statut "beta production" adopté en 2024. Le runtime atteint désormais 99,2 % de compatibilité avec les 1 000 modules npm les plus utilisés selon les tests indépendants menés par l'équipe Vercel.</p>
      <p>Les benchmarks confirment l'avantage de performance : Bun 2.0 est en moyenne 2,8 fois plus rapide que Node.js 24 sur les workloads HTTP, et 4,1 fois plus rapide sur les opérations de fichiers. Le démarrage à froid descend sous les 12 millisecondes pour une application Hono complète.</p>
      <h2>Vercel et Cloudflare s'alignent</h2>
      <p>Plus important encore, Vercel et Cloudflare ont simultanément annoncé un support natif de Bun comme runtime alternatif à Node.js sur leurs plateformes serverless. Pour la première fois, déployer une application Bun en production ne nécessite plus de configuration custom ou de Docker. Cloudflare Workers gagne notamment l'accès aux APIs Node.js historiquement absentes via Bun.</p>
      <p>Cette annonce marque potentiellement un tournant pour l'écosystème JavaScript serveur, dominé par Node.js depuis 2009.</p>
    `,
  },
  {
    id: "art-007",
    title: "Les grands modèles de langage chinois rattrapent l'Occident, tirés par DeepSeek-R3 et Qwen 4",
    slug: "llm-chinois-rattrapent-occident-deepseek-qwen",
    url: "https://example.com/llm-chinois-rattrapent",
    sourceName: "MIT Technology Review",
    category: "ia",
    publishedAt: "2026-04-19T16:34:00.000Z",
    readingTimeMin: 8,
    bullets: [
      "DeepSeek-R3 atteint 91 % sur MMLU et 87 % sur HumanEval, à parité avec Claude Opus 4.7.",
      "Alibaba publie Qwen 4 en open-weights sous licence permissive et revendique le leadership multilingue.",
      "Le coût d'entraînement de DeepSeek-R3 serait inférieur à 8 millions de dollars selon l'équipe.",
    ],
    excerpt:
      "Six mois après le choc DeepSeek-R1, l'écart entre les laboratoires d'IA chinois et leurs homologues occidentaux s'est réduit à presque rien.",
    contentHtml: `
      <p>Six mois après le choc DeepSeek-R1, l'écart entre les laboratoires d'IA chinois et leurs homologues occidentaux s'est réduit à presque rien. DeepSeek-R3, publié la semaine dernière, atteint 91 % sur MMLU et 87 % sur HumanEval, soit la parité avec Claude Opus 4.7 sur la plupart des benchmarks publics.</p>
      <p>L'équipe DeepSeek revendique un coût d'entraînement total inférieur à 8 millions de dollars — un ordre de grandeur en dessous des chiffres communément cités pour GPT-4 ou Claude Opus 4.7. Si ce chiffre était confirmé, il remettrait sérieusement en cause les hypothèses économiques du secteur.</p>
      <h2>Alibaba revendique le multilingue</h2>
      <p>De son côté, Alibaba a publié Qwen 4 en open-weights sous licence permissive et revendique le leadership sur les benchmarks multilingues couvrant 119 langues. Pour les entreprises européennes cherchant à éviter la dépendance américaine sans pour autant renoncer à la qualité, Qwen 4 commence à émerger comme une alternative crédible aux côtés de Mistral.</p>
    `,
  },
  {
    id: "art-008",
    title: "Microsoft injecte 2 milliards dans Mistral et prend une minorité de blocage chez l'européen",
    slug: "microsoft-investit-mistral-minorite-blocage",
    url: "https://example.com/microsoft-mistral-investissement",
    sourceName: "01net",
    category: "tech",
    publishedAt: "2026-04-19T09:48:00.000Z",
    readingTimeMin: 5,
    bullets: [
      "Microsoft investit 2 milliards d'euros dans Mistral pour une participation de 18 %.",
      "L'opération valorise le français à 11 milliards d'euros, soit le triple d'il y a 18 mois.",
      "La Commission européenne ouvre une enquête de routine sur les implications concurrentielles.",
    ],
    excerpt:
      "Microsoft injecte 2 milliards d'euros dans Mistral AI pour une participation de 18 %, valorisant le champion français de l'IA à 11 milliards d'euros.",
    contentHtml: `
      <p>Microsoft injecte 2 milliards d'euros dans Mistral AI pour une participation de 18 %, valorisant le champion français de l'IA à 11 milliards d'euros — soit le triple de la valorisation d'il y a 18 mois. L'opération s'accompagne d'un accord stratégique de cinq ans pour distribuer les modèles Mistral sur Azure.</p>
      <p>La structure du deal a été soigneusement calibrée : Microsoft obtient une minorité de blocage sur les décisions stratégiques majeures sans toutefois prendre le contrôle, ce qui aurait exposé l'opération à une enquête approfondie de la Commission européenne. La même mécanique avait été utilisée pour l'investissement de Microsoft dans OpenAI.</p>
      <h2>Bercy salue, Bruxelles ouvre une enquête</h2>
      <p>Bercy a salué "un investissement stratégique majeur pour la souveraineté technologique européenne", tandis que la Commission européenne a ouvert une enquête de routine sur les implications concurrentielles de l'opération. Les fondateurs Arthur Mensch et Guillaume Lample restent au capital et conservent leurs mandats opérationnels.</p>
    `,
  },
  {
    id: "art-009",
    title: "Le projet OpenSSF lance un programme de bug bounty pour les 200 paquets npm les plus critiques",
    slug: "openssf-bug-bounty-200-paquets-npm-critiques",
    url: "https://example.com/openssf-bug-bounty-npm",
    sourceName: "The Hacker News",
    category: "cyber",
    publishedAt: "2026-04-18T17:09:00.000Z",
    readingTimeMin: 4,
    bullets: [
      "L'OpenSSF dote un programme de bug bounty de 4 millions de dollars sur deux ans pour npm.",
      "Les récompenses vont de 500 à 50 000 dollars selon la criticité de la vulnérabilité.",
      "Le programme cible express, react, lodash, axios et 196 autres paquets identifiés comme systémiques.",
    ],
    excerpt:
      "L'Open Source Security Foundation lance un programme de bug bounty doté de 4 millions de dollars sur deux ans, ciblant les 200 paquets npm jugés systémiques.",
    contentHtml: `
      <p>L'Open Source Security Foundation a lancé hier un programme de bug bounty doté de 4 millions de dollars sur deux ans, ciblant les 200 paquets npm jugés systémiques pour l'écosystème JavaScript. Les récompenses vont de 500 dollars pour une vulnérabilité de faible impact à 50 000 dollars pour une faille critique exploitable à grande échelle.</p>
      <p>Le programme couvre notamment express, react, lodash, axios, vite et 196 autres paquets identifiés via une analyse de dépendances transitive sur le top 10 000 npm. Le financement provient d'un consortium incluant Google, Microsoft, Amazon, Sony et la Fondation Linux.</p>
      <h2>Une réponse aux supply chain attacks</h2>
      <p>Cette initiative répond à la multiplication des attaques de supply chain de ces dernières années — l'incident XZ Utils de 2024, les compromissions répétées de paquets npm via account takeover, et plus récemment l'attaque sur Polyfill.io en 2024. Pour Brian Behlendorf, directeur de l'OpenSSF, "la sécurité de l'open source ne peut plus reposer uniquement sur le bénévolat des mainteneurs".</p>
    `,
  },
  {
    id: "art-010",
    title: "Cloudflare lance un service edge entièrement basé sur WebAssembly et promet une latence sub-milliseconde",
    slug: "cloudflare-edge-webassembly-latence-sub-milliseconde",
    url: "https://example.com/cloudflare-edge-wasm",
    sourceName: "Wired",
    category: "tech",
    publishedAt: "2026-04-18T13:25:00.000Z",
    readingTimeMin: 6,
    bullets: [
      "Le nouveau service Cloudflare Sparks exécute les workers en WebAssembly pur sans isolat V8.",
      "Le démarrage à froid descend à 0,4 ms contre 5 ms pour les Workers V8 actuels.",
      "Cloudflare cible explicitement les usages d'inférence IA en bordure et le streaming temps réel.",
    ],
    excerpt:
      "Cloudflare a annoncé Sparks, un nouveau service edge entièrement basé sur WebAssembly qui promet une latence de démarrage à froid sub-milliseconde.",
    contentHtml: `
      <p>Cloudflare a annoncé Sparks, un nouveau service edge entièrement basé sur WebAssembly qui promet une latence de démarrage à froid sub-milliseconde. Contrairement aux Workers actuels qui s'appuient sur des isolats V8, Sparks exécute directement le bytecode WebAssembly via un runtime custom écrit en Rust et optimisé pour les workloads ultra-courts.</p>
      <p>Le démarrage à froid mesuré descend à 0,4 milliseconde contre 5 millisecondes pour les Workers V8 actuels, soit un facteur 12 d'amélioration. Pour les usages où la latence est critique — A/B testing, géolocalisation, authentification edge — cela rapproche significativement les workers serverless du temps de réponse d'un cache local.</p>
      <h2>L'inférence IA en ligne de mire</h2>
      <p>Cloudflare cible explicitement les usages d'inférence IA en bordure et le streaming temps réel. Sparks supporte nativement l'exécution de modèles ONNX compilés en WebAssembly via wasi-nn, permettant de servir des petits modèles (jusqu'à 3 milliards de paramètres) avec une latence inférieure à 50 millisecondes au 99e percentile.</p>
      <p>Le service entre en bêta publique aujourd'hui dans 50 datacenters Cloudflare, avec une disponibilité globale promise pour septembre 2026.</p>
    `,
  },
];

export function getMockArticleBySlug(slug: string): MockArticle | undefined {
  return MOCK_ARTICLES.find((a) => a.slug === slug);
}

export function getMockArticlesByCategory(category: CategorySlug): MockArticle[] {
  return MOCK_ARTICLES.filter((a) => a.category === category);
}

export function getMockArticlesSorted(): MockArticle[] {
  return [...MOCK_ARTICLES].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}
