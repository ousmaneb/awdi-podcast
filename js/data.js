// ===== AWDI PODCAST — Content Data Layer =====
// All dynamic content lives here. To add episodes, articles, or testimonials,
// update the arrays below. The site renders all sections from this source.

window.AWDI_DATA = {

  // ── Episodes ────────────────────────────────────────────────────────────
  // Add new episodes at the top (descending order).
  // youtubeId: the part after ?v= in the YouTube URL.
  episodes: [
    {
      id: 52,
      title: "La colère : cette émotion qu'on n'ose pas exprimer",
      excerpt: "Pourquoi avons-nous si peur de notre propre colère ? Tid Barry explore cette émotion universelle souvent mal comprise, ses origines et la manière de la canaliser sainement.",
      tag: "Émotions",
      duration: "38 min",
      date: "15 Avr 2025",
      youtubeId: "OyLgZpoeJFM",
      youtubeUrl: "https://www.youtube.com/watch?v=OyLgZpoeJFM",
      spotifyUrl: "https://open.spotify.com/show/4qpYXLneuemPRcuMJTWDAq",
      featured: true
    },
    {
      id: 51,
      title: "Parler du deuil sans tabou",
      excerpt: "Le deuil est une expérience universelle souvent silencieuse. Comment en parler avec justesse et bienveillance pour ceux qui restent ?",
      tag: "Deuil",
      duration: "44 min",
      date: "1 Avr 2025",
      youtubeId: "PWM1SpS78WE",
      youtubeUrl: "https://www.youtube.com/watch?v=PWM1SpS78WE",
      spotifyUrl: "https://open.spotify.com/show/4qpYXLneuemPRcuMJTWDAq",
      featured: false
    },
    {
      id: 50,
      title: "L'image de soi et les réseaux sociaux",
      excerpt: "Comment les algorithmes façonnent notre rapport à nous-mêmes, et comment reprendre le contrôle de son image intérieure.",
      tag: "Identité",
      duration: "41 min",
      date: "18 Mar 2025",
      youtubeId: "OyLgZpoeJFM",
      youtubeUrl: "https://www.youtube.com/watch?v=OyLgZpoeJFM",
      spotifyUrl: "https://open.spotify.com/show/4qpYXLneuemPRcuMJTWDAq",
      featured: false
    },
    {
      id: 49,
      title: "Burn-out : reconnaître les signaux",
      excerpt: "Le burn-out ne prévient pas. Mais ses signaux sont là, bien avant l'épuisement total. Comment les repérer — et s'arrêter à temps ?",
      tag: "Bien-être",
      duration: "36 min",
      date: "4 Mar 2025",
      youtubeId: "PWM1SpS78WE",
      youtubeUrl: "https://www.youtube.com/watch?v=PWM1SpS78WE",
      spotifyUrl: "https://open.spotify.com/show/4qpYXLneuemPRcuMJTWDAq",
      featured: false
    },
    {
      id: 48,
      title: "La relation avec ses parents",
      excerpt: "Amour, blessures, distance ou proximité — la relation parentale est l'une des plus déterminantes de notre vie. Comment la nommer ?",
      tag: "Relations",
      duration: "52 min",
      date: "18 Fév 2025",
      youtubeId: "OyLgZpoeJFM",
      youtubeUrl: "https://www.youtube.com/watch?v=OyLgZpoeJFM",
      spotifyUrl: "https://open.spotify.com/show/4qpYXLneuemPRcuMJTWDAq",
      featured: false
    },
    {
      id: 47,
      title: "Solitude vs Isolement, comprendre la différence",
      excerpt: "Deux réalités proches mais profondément différentes. Comprendre la différence pour mieux habiter sa solitude sans en souffrir.",
      tag: "Lien social",
      duration: "33 min",
      date: "4 Fév 2025",
      youtubeId: "PWM1SpS78WE",
      youtubeUrl: "https://www.youtube.com/watch?v=PWM1SpS78WE",
      spotifyUrl: "https://open.spotify.com/show/4qpYXLneuemPRcuMJTWDAq",
      featured: false
    },
    {
      id: 46,
      title: "Dire non sans culpabilité",
      excerpt: "Pourquoi sommes-nous si nombreux à ne pas savoir dire non ? Et comment poser des limites saines sans se sentir égoïste ?",
      tag: "Relations",
      duration: "39 min",
      date: "21 Jan 2025",
      youtubeId: "OyLgZpoeJFM",
      youtubeUrl: "https://www.youtube.com/watch?v=OyLgZpoeJFM",
      spotifyUrl: "https://open.spotify.com/show/4qpYXLneuemPRcuMJTWDAq",
      featured: false
    },
    {
      id: 45,
      title: "L'estime de soi au quotidien",
      excerpt: "L'estime de soi ne se décrète pas. Elle se construit, se nourrit, et se répare. Un épisode concret sur les habitudes qui changent tout.",
      tag: "Confiance",
      duration: "35 min",
      date: "7 Jan 2025",
      youtubeId: "PWM1SpS78WE",
      youtubeUrl: "https://www.youtube.com/watch?v=PWM1SpS78WE",
      spotifyUrl: "https://open.spotify.com/show/4qpYXLneuemPRcuMJTWDAq",
      featured: false
    },
  ],

  // ── Blog Articles ────────────────────────────────────────────────────────
  articles: [
    {
      id: 1,
      title: "Pourquoi est-ce si difficile de parler de soi ?",
      excerpt: "On nous a souvent appris à taire nos ressentis. Cet article explore les blocages qui nous empêchent d'exprimer notre vécu.",
      tag: "Émotions",
      date: "Avr 2025",
      readTime: "5 min",
      image: "https://picsum.photos/seed/emotions1/800/500",
      url: "article.html"
    },
    {
      id: 2,
      title: "L'anxiété au quotidien : reconnaître, comprendre, apprivoiser",
      excerpt: "L'anxiété n'est pas une faiblesse. C'est un signal. Voici comment apprendre à l'écouter sans qu'elle nous envahisse.",
      tag: "Anxiété",
      date: "Mar 2025",
      readTime: "7 min",
      image: "https://picsum.photos/seed/anxiety2/800/500",
      url: "article.html"
    },
    {
      id: 3,
      title: "Parler du corps : briser le silence autour des tabous",
      excerpt: "Pourquoi certains sujets liés au corps restent-ils si difficiles à aborder ? Un regard bienveillant sur des silences qui pèsent.",
      tag: "Corps & Tabous",
      date: "Fév 2025",
      readTime: "6 min",
      image: "https://picsum.photos/seed/corps3/800/500",
      url: "article.html"
    },
  ],

  // ── Testimonials ─────────────────────────────────────────────────────────
  testimonials: [
    {
      text: "Ce podcast m'a aidée à mettre des mots sur ce que je ressentais depuis des années. Je ne me sens plus seule dans ma lutte quotidienne.",
      name: "Fatou",
      role: "Auditrice fidèle",
      initial: "F"
    },
    {
      text: "Enfin un podcast qui parle de santé mentale avec des mots simples et sans jugement. J'en parle à toute ma famille !",
      name: "Karim",
      role: "Auditeur depuis le début",
      initial: "K"
    },
    {
      text: "La bienveillance du ton, la profondeur des sujets… Awdi Podcast est devenu une bouffée d'air frais dans mon quotidien.",
      name: "Amina",
      role: "Professionnelle de santé",
      initial: "A"
    },
    {
      text: "J'ai partagé l'épisode sur le deuil à toute ma famille. Enfin des mots qui décrivent exactement ce qu'on ressent mais qu'on n'ose pas dire.",
      name: "Mariama",
      role: "Étudiante en psychologie",
      initial: "M"
    },
    {
      text: "Tid Barry réussit à aborder les sujets difficiles avec une douceur rare. Ce podcast devrait être recommandé par tous les professionnels de santé.",
      name: "Ibrahim",
      role: "Auditeur, Paris",
      initial: "I"
    },
    {
      text: "Grâce à Awdi, j'ai compris que parler de ce que je vis n'était pas une honte. Ce podcast a vraiment changé ma façon de voir les choses.",
      name: "Sira",
      role: "Auditrice, Montréal",
      initial: "S"
    }
  ],

  // ── Stats ────────────────────────────────────────────────────────────────
  stats: [
    { count: 52,    suffix: "+",  label: "Épisodes publiés" },
    { count: 10000, display: "10K+", label: "Auditeurs touchés" },
    { count: 5,     suffix: "",   label: "Plateformes" },
    { count: 2,     suffix: " ans", label: "Au micro" },
  ],

  // ── FAQ ──────────────────────────────────────────────────────────────────
  faq: [
    {
      q: "Awdi Podcast, c'est pour qui ?",
      a: "Awdi Podcast s'adresse à toute personne souhaitant mieux comprendre sa santé mentale, ses émotions et son bien-être. Que vous soyez en questionnement, en accompagnement ou simplement curieux·se, vous êtes les bienvenu·e·s. Le podcast est particulièrement conçu pour les communautés francophones et Peulh / Fulani."
    },
    {
      q: "Comment écouter le podcast ?",
      a: "Awdi Podcast est disponible sur toutes les grandes plateformes : <strong>Spotify</strong>, <strong>YouTube</strong>, <strong>Amazon Music</strong>, <strong>TikTok</strong> et <strong>Instagram</strong>. Il vous suffit de chercher « Awdi Podcast » sur votre application préférée, ou de cliquer sur les liens en haut de cette page."
    },
    {
      q: "Est-ce que le podcast est gratuit ?",
      a: "Oui, 100% gratuit. Awdi Podcast est et restera accessible à tous, sans abonnement ni frais cachés. Parce que l'accès à des ressources sur la santé mentale ne devrait pas être un luxe."
    },
    {
      q: "Comment prendre rendez-vous avec Tid Barry ?",
      a: "Vous pouvez prendre rendez-vous directement via notre <a href=\"rendez-vous.html\">page dédiée</a>. Tid Barry propose des <strong>consultations personnalisées</strong> pour vous accompagner dans votre démarche de bien-être."
    },
    {
      q: "Puis-je suggérer un sujet d'épisode ?",
      a: "Absolument. Si un sujet vous tient à cœur, envoyez votre suggestion via la <a href=\"contact.html\">page Contact</a> ou directement sur les réseaux sociaux. Vos suggestions nourrissent le podcast."
    },
    {
      q: "Que signifie « Awdi » ?",
      a: "« Awdi » est un mot issu de la langue <strong>Peulh / Fulani / Poulo</strong> qui signifie <em>comprendre</em>. Ce nom reflète l'essence même du podcast : créer un espace pour mieux se comprendre soi-même et comprendre les autres, avec bienveillance et profondeur."
    },
  ],

  // ── Topics / Themes ──────────────────────────────────────────────────────
  topics: [
    {
      label: "Santé mentale",
      desc: "Anxiété, dépression, burn-out — en parler ouvertement, sans jugement, avec les mots de tous les jours.",
      icon: "🧠"
    },
    {
      label: "Parole libérée",
      desc: "Des témoignages sincères, des expériences partagées. Vous n'êtes pas seul·e dans ce que vous vivez.",
      icon: "💬"
    },
    {
      label: "Bien-être quotidien",
      desc: "Outils concrets, habitudes saines et petits pas vers un mieux-être accessible à toutes et à tous.",
      icon: "🌱"
    },
    {
      label: "Éducation & émotions",
      desc: "Comment on nous a — ou pas — appris à gérer nos émotions, et comment on peut apprendre autrement.",
      icon: "📖"
    },
    {
      label: "Corps & identité",
      desc: "Les règles, le corps, l'image de soi — des sujets trop souvent tabous, abordés avec douceur et respect.",
      icon: "🌸"
    },
    {
      label: "Relations & lien social",
      desc: "Famille, amour, amitié, solitude — comment construire des relations qui nous font grandir.",
      icon: "🤝"
    },
  ],
};
