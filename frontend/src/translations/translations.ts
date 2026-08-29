

export type Language = "fr" | "mg" | "en";

// ===========================================================
// TRADUCTIONS
// ===========================================================

export const translations = {
  // =========================================================
  // FRANÇAIS
  // =========================================================

  fr: {
    // =======================================================
    // NAVIGATION
    // =======================================================
    technologies: {
      eyebrow: "Notre stack technologique",
      title: "Les technologies au service de vos projets",
      description:
        "Nous sélectionnons les technologies en fonction de vos objectifs, de vos contraintes et de la capacité de votre solution à évoluer dans le temps.",

      categories: {
        frontend: "Frontend",
        mobile: "Mobile",
        backend: "Backend",
        engineering: "Ingénierie",
        database: "Base de données",
        web: "Web",
        infrastructure: "Infrastructure",
        optimization: "Optimisation",
      },

      items: {
        react:
          "Interfaces web modernes, rapides et maintenables avec une architecture basée sur les composants.",
        reactNative:
          "Applications mobiles Android et iOS avec une expérience utilisateur cohérente.",
        nodejs:
          "APIs et services backend performants pour connecter efficacement vos applications.",
        typescript:
          "Code plus robuste, typé et évolutif pour réduire les erreurs et faciliter la maintenance.",
        postgresql:
          "Gestion fiable des données avec une base relationnelle conçue pour les applications modernes.",
        webTechnologies:
          "HTML, CSS, JavaScript et outils modernes pour construire des expériences web performantes.",
        security:
          "Bonnes pratiques de sécurité intégrées dès la conception des applications et APIs.",
        performance:
          "Optimisation du chargement, du rendu et des performances pour une meilleure expérience utilisateur.",
      },

      mastered: "Technologie maîtrisée",

      architecture: {
        eyebrow: "Architecture moderne",
        title: "Une stack pensée pour durer",
        description:
          "Notre approche ne consiste pas à empiler des technologies. Chaque choix technique répond à un besoin concret : performance, sécurité, maintenabilité, évolutivité et expérience utilisateur.",

        web: "Applications",
        mobile: "Android & iOS",
        api: "Services backend",
        data: "Données structurées",
      },

      closing:
        "La technologie reste un moyen. Notre objectif est de construire une solution utile, fiable et adaptée à votre activité.",
    },
    nav: {
      home: "Accueil",
      services: "Services",
      solutions: "Solutions",
      projects: "Réalisations",
      about: "À propos",
      contact: "Nous contacter",
      quote: "Demander un devis",
    },

    // =======================================================
    // COMMUN
    // =======================================================

    common: {
      language: "Langue",
      changeLanguage: "Changer de langue",
      appearance: "Apparence",
      close: "Fermer",
    },

    // =======================================================
    // HERO
    // =======================================================

    hero: {
      badge: "Solutions digitales sur mesure",
      title: "Transformez votre activité avec le digital.",
      description:
        "Digital Work conçoit des sites web, applications et solutions digitales modernes pour aider les entreprises à gagner en visibilité, automatiser leurs activités et développer leur présence en ligne.",
      primary: "Démarrer un projet",
      secondary: "Voir nos réalisations",
      discover: "Découvrir",
    },

    // =======================================================
    // PILIERS
    // =======================================================
    pillars: {
      eyebrow: "Notre expertise",
      title: "Une expertise pensée pour",
      highlight: "vos projets digitaux",
      description:
        "Nous combinons expertise technique, compréhension métier et approche produit pour concevoir des solutions digitales fiables, performantes et évolutives.",

      items: [
        {
          number: "01",
          title: "Expertise technique",
          description:
            "Des solutions développées avec des technologies modernes, une architecture propre et un code pensé pour évoluer.",
          highlights: [
            "React & React Native",
            "Node.js & API",
            "Architecture moderne",
          ],
        },
        {
          number: "02",
          title: "Solutions sur mesure",
          description:
            "Chaque projet est conçu autour de vos objectifs métier, de vos utilisateurs et de vos contraintes réelles.",
          highlights: [
            "Analyse du besoin",
            "UX/UI adaptée",
            "Fonctionnalités personnalisées",
          ],
        },
        {
          number: "03",
          title: "Performance & évolution",
          description:
            "Nous construisons des produits rapides, maintenables et capables d'accompagner la croissance de votre activité.",
          highlights: [
            "Performance optimisée",
            "Scalabilité",
            "Évolutions facilitées",
          ],
        },
        {
          number: "04",
          title: "Fiabilité & accompagnement",
          description:
            "Un accompagnement structuré de la conception jusqu'à la mise en production et aux évolutions futures.",
          highlights: [
            "Suivi du projet",
            "Qualité & sécurité",
            "Support technique",
          ],
        },
      ],
    },

    // =======================================================
    // PROBLÈMES
    // =======================================================

    problems: {
      eyebrow: "Vos défis",
      title: "Les défis qui ralentissent",
      highlight: "votre activité",
      description:
        "Nous identifions les difficultés qui freinent votre entreprise afin de construire des solutions digitales réellement adaptées.",

      items: {
        time: {
          title: "Perte de temps",
          description:
            "Les tâches répétitives prennent du temps et limitent la productivité de vos équipes.",
        },

        technology: {
          title: "Outils inadaptés",
          description:
            "Des outils vieillissants ou mal adaptés rendent vos opérations plus complexes.",
        },

        visibility: {
          title: "Manque de visibilité",
          description:
            "Votre entreprise mérite une présence digitale claire, moderne et accessible.",
        },

        systems: {
          title: "Processus dispersés",
          description:
            "Des informations réparties entre plusieurs outils compliquent le suivi de votre activité.",
        },

        profitability: {
          title: "Rentabilité limitée",
          description:
            "Les processus manuels et les inefficacités peuvent réduire la rentabilité de votre activité.",
        },

        scalability: {
          title: "Difficulté à évoluer",
          description:
            "Une solution mal conçue peut rapidement devenir un frein à la croissance.",
        },
      },

      closing: {
        before: "Le digital ne doit pas",
        strong: "compliquer",
        middle: "votre activité.",
        value: "Il doit créer de la valeur.",
      },
    },

    // =======================================================
    // SERVICES
    // =======================================================

    services: {
      eyebrow: "Nos expertises",
      title: "Des solutions digitales pensées pour votre activité.",
      description:
        "Du site vitrine à l'application métier, nous construisons des solutions qui répondent à de vrais objectifs business.",

      web: {
        title: "Création web",
        description:
          "Des sites professionnels rapides, modernes et optimisés pour convertir vos visiteurs en clients.",
      },

      application: {
        title: "Applications web",
        description:
          "Des plateformes métier et applications web sur mesure adaptées à vos processus.",
      },

      mobile: {
        title: "Applications mobiles",
        description:
          "Des applications mobiles modernes pour Android et iOS avec une expérience utilisateur fluide.",
      },

      digital: {
        title: "Digitalisation",
        description:
          "Nous transformons vos processus manuels en solutions digitales simples et efficaces.",
      },
    },

    // =======================================================
    // POSITIONNEMENT
    // =======================================================

    positioning: {
      badge: "Plus qu'un site web",
      title: "Nous construisons des outils qui font avancer votre entreprise.",
      description:
        "Votre présence digitale doit être un véritable levier commercial. Digital Work combine design, développement et compréhension métier pour créer des solutions utiles, performantes et évolutives.",
      button: "Découvrir nos solutions",

      visibility: {
        title: "Visibilité",
        text: "Soyez trouvé plus facilement par vos clients.",
      },

      performance: {
        title: "Performance",
        text: "Des outils rapides et conçus pour vos objectifs.",
      },

      automation: {
        title: "Automatisation",
        text: "Réduisez les tâches répétitives et gagnez du temps.",
      },

      evolution: {
        title: "Évolution",
        text: "Des solutions capables d'accompagner votre croissance.",
      },
    },

    // =======================================================
    // RÉSULTATS
    // =======================================================

    results: {
      eyebrow: "Des résultats concrets",
      title: "La technologie au service de",
      titleHighlight: "vos résultats",
      description:
        "Nous ne créons pas simplement des sites et des applications. Nous concevons des solutions digitales capables de générer un véritable impact sur votre activité.",

      performance: {
        value: "+40%",
        label: "Performance",
        description:
          "Des interfaces et applications optimisées pour améliorer les performances et l'expérience utilisateur.",
      },

      productivity: {
        value: "2×",
        label: "Productivité",
        description:
          "Des outils digitaux pensés pour automatiser les tâches et accélérer les opérations quotidiennes.",
      },

      engagement: {
        value: "+60%",
        label: "Engagement",
        description:
          "Des expériences utilisateur modernes conçues pour renforcer l'engagement et la conversion.",
      },

      custom: {
        value: "100%",
        label: "Sur mesure",
        description:
          "Chaque solution est développée selon les objectifs, contraintes et besoins spécifiques du projet.",
      },

      impact: {
        title: "Une approche orientée impact",
        description:
          "Chaque décision technique doit servir un objectif métier. Notre approche combine design, développement et stratégie pour construire des produits digitaux utiles, performants et durables.",
      },

      benefits: [
        "Une architecture technique évolutive",
        "Une expérience utilisateur cohérente",
        "Des performances optimisées",
        "Un accompagnement de la conception au déploiement",
      ],

      visual: {
        performance: "Performance digitale",
        before: "Avant",
        after: "Après",
        optimized: "Projet optimisé",
        goals: "Objectifs atteints",
      },
    },

    // =======================================================
    // MÉTHODE
    // =======================================================
    method: {
      eyebrow: "Notre méthode",
      title: "Une méthode simple.",
      titleHighlight: "Des solutions concrètes.",
      description:
        "Nous avançons étape par étape pour transformer les besoins de votre entreprise en solutions digitales réellement utiles.",

      button: "Parlons de votre projet",

      steps: {
        analysis: {
          title: "Analyse",
          description:
            "Nous comprenons votre activité, vos objectifs, vos utilisateurs et vos contraintes.",
        },

        design: {
          title: "Conception",
          description:
            "Nous définissons l'expérience utilisateur, l'architecture et les fonctionnalités nécessaires.",
        },

        development: {
          title: "Développement",
          description:
            "Nous construisons la solution avec des technologies modernes, fiables et évolutives.",
        },

        deployment: {
          title: "Déploiement",
          description:
            "Nous mettons la solution en production et vous accompagnons dans sa prise en main.",
        },
      },

      reassurance: {
        title: "Aucune solution standard imposée",
        description:
          "Chaque projet est conçu selon votre activité, vos objectifs et les contraintes réelles de votre entreprise.",
      },

      cta: "Parlons de votre projet",
    },

    // =======================================================
    // RÉALISATIONS
    // =======================================================

    realisations: { 
      //pour page accueil
      eyebrow: "Nos réalisations",
       title: "Des solutions conçues pour créer de la", 
       titleHighlight: "valeur",
        description: "Découvrez une sélection de projets et de solutions numériques développés par Digital Work, avec une approche centrée sur les besoins métier, la performance et l'évolutivité.", featured: "Projet phare", 
        viewProject: "Voir le projet", 
        inDevelopment: "En développement", 

           // pour page realisation 
       
    "hero": {
      "badge": "Nos réalisations",
      "title": "Des projets conçus",
      "titleHighlight": "pour produire des résultats.",
      "description": "Découvrez une sélection de projets web, mobiles, métiers et réseaux réalisés avec des technologies modernes et adaptées aux besoins de chaque entreprise."
    },
    "categories": {
      "all": "Tous",
      "developpement_web": "Développement Web",
      "application_web": "Application Web",
      "application_mobile": "Application Mobile",
      "solution_metier": "Solution métier",
      "reseaux": "Réseaux",
      "automatisation": "Automatisation",
      "solution_digitale": "Solution digitale"
    },
    "states": {
      "loading": "Chargement des réalisations...",
      "loadError": "Impossible de charger les réalisations.",
      "empty": "Aucun projet dans cette catégorie."
    },
    "process": {
      "badge": "Notre approche projet",
      "title": "Nous ne développons pas",
      "titleSecondLine": "juste des fonctionnalités.",
      "description": "Chaque projet commence par la compréhension du besoin. L'objectif est de construire un outil réellement utile à l'entreprise et à ses utilisateurs.",
      "cta": "Parler de mon projet",
      "steps": {
        "analysis": {
          "title": "Analyse",
          "text": "Compréhension du besoin, des utilisateurs et des objectifs."
        },
        "design": {
          "title": "Conception",
          "text": "Architecture, expérience utilisateur et définition des fonctionnalités."
        },
        "development": {
          "title": "Développement",
          "text": "Construction de la solution avec une architecture maintenable."
        },
        "production": {
          "title": "Mise en production",
          "text": "Déploiement, tests et accompagnement après livraison."
        }
      }
    },
    "project": {
      "keyPoints": "Points clés",
      "view": "Voir le projet",
      "unavailable": "Projet indisponible",
      "viewProduction": "Voir {{title}} en production"
    },
    "cta": {
      "title": "Votre projet pourrait être",
      "titleHighlight": "notre prochaine réalisation.",
      "description": "Présentez-nous votre idée et construisons ensemble une solution adaptée à votre activité.",
      "button": "Démarrer un projet"
    }
  
  },

    // =======================================================
    // CTA
    // =======================================================

    cta: {
      badge: "Construisons votre projet",
      title: "Un projet digital en tête ?",
      highlight: "Donnons-lui vie.",
      description:
        "Présentez-nous votre besoin. Nous vous aiderons à définir une solution digitale adaptée à votre activité et à vos objectifs.",
      primaryCta: "Parlons de votre projet",
      button: "Parlons de votre projet",
      secondaryCta: "Voir nos réalisations",

      benefits: [
        "Solution adaptée à vos besoins",
        "Accompagnement de la conception au déploiement",
        "Technologies modernes et évolutives",
      ],

      response: "Une réponse claire à votre projet",
      responseDescription:
        "Nous analysons votre besoin, concevons la solution et développons un produit pensé pour votre activité.",

      process: {
        analysis: "Analyse du besoin",
        design: "Conception & design",
        development: "Développement",
      },

      footerText:
        "Chaque projet commence par une discussion. Expliquez-nous votre idée et construisons la suite ensemble.",
    },

    // =======================================================
    // FOOTER
    // =======================================================

    footer: {
      language: "Langue",
      legal: "Mentions légales",
      privacy: "Confidentialité",

      modal: {
        close: "Fermer",
      },

  legalContent: {
    introduction:
      "Les présentes mentions légales définissent les conditions d'utilisation du site Digital Work.",

    editorTitle: "Éditeur du site",
    editor:
      "Digital Work est une structure spécialisée dans la conception de solutions numériques, sites web, applications et services digitaux.",

    hostingTitle: "Hébergement",
    hosting:
      "Les informations relatives à l'hébergement du site sont disponibles sur demande auprès de Digital Work.",

    intellectualTitle: "Propriété intellectuelle",
    intellectual:
      "L'ensemble des contenus, éléments graphiques, textes, logos et composants présents sur ce site sont protégés par les dispositions applicables en matière de propriété intellectuelle.",
  },

  privacyContent: {
    introduction:
      "Digital Work accorde une importance particulière à la protection de vos données personnelles.",

    dataTitle: "Données collectées",
    data:
      "Les données transmises via les formulaires de contact sont utilisées uniquement pour répondre aux demandes et assurer le suivi des échanges.",

    usageTitle: "Utilisation des données",
    usage:
      "Les données collectées ne sont pas utilisées à des fins incompatibles avec la demande initiale et ne sont pas vendues à des tiers.",

    rightsTitle: "Vos droits",
    rights:
      "Vous pouvez demander l'accès, la modification ou la suppression de vos données personnelles en contactant Digital Work.",

    contactTitle: "Contact",
    contact:
      "Pour toute question concernant la confidentialité de vos données, contactez-nous à l'adresse rrzafindrafita@gmail.com.",
  },


  tagline: "Digital Work",
  description:
    "Des solutions digitales modernes pour les entreprises ambitieuses.",

  services: {
    title: "Services",
    websites: "Création de sites web",
    webApplications: "Applications web",
    mobileApplications: "Applications mobiles",
    businessSolutions: "Solutions métier",
    automation: "Automatisation",
    digitalSolutions: "Solutions digitales",
  },

  navigation: {
    title: "Navigation",
    home: "Accueil",
    services: "Services",
    solutions: "Solutions",
    projects: "Réalisations",
    about: "À propos",
    contact: "Contact",
  },

  contact: {
    title: "Contact",
    email: "rrzafindrafita@gmail.com",
    phone: "+261 34 84 286 52",
  },

  followUs: "Suivez-nous",


  copyright: "Tous droits réservés.",
  madagascar: "Madagascar",

  startProject: "Démarrer un projet",
},
  },

  // =========================================================
  // MALAGASY
  // =========================================================

  mg: {
    technologies: {
      eyebrow: "Ny teknolojia ampiasainay",
      title: "Teknolojia manampy amin'ny fanatanterahana ny tetikasanao",
      description:
        "Misafidy ny teknolojia izahay araka ny tanjonao, ny fepetra misy ary ny fahafahan'ny vahaolana hivoatra miaraka amin'ny orinasanao.",

      categories: {
        frontend: "Frontend",
        mobile: "Mobile",
        backend: "Backend",
        engineering: "Injeniera",
        database: "Tahiry angona",
        web: "Web",
        infrastructure: "Fotodrafitrasa",
        optimization: "Fanatsarana",
      },

      items: {
        react:
          "Interface web maoderina, haingana ary mora tazomina, mifototra amin'ny architecture mampiasa composants.",
        reactNative:
          "Application mobile Android sy iOS manome traikefa mirindra sy mora ampiasaina.",
        nodejs:
          "API sy services backend mahomby hampifandraisana tsara ny application-nao.",
        typescript:
          "Code matanjaka kokoa, misy typage ary mora ampitomboina mba hampihenana ny fahadisoana sy hanamora ny maintenance.",
        postgresql:
          "Fitantanana angona azo antoka miaraka amin'ny base de données relationnelle natao ho an'ny application maoderina.",
        webTechnologies:
          "HTML, CSS, JavaScript ary fitaovana maoderina hananganana traikefa web haingana sy mahomby.",
        security:
          "Fomba fanao tsara momba ny fiarovana ampidirina hatrany am-piandohan'ny famolavolana ny application sy API.",
        performance:
          "Fanatsarana ny fotoana famahanana, ny affichage ary ny performance mba hanomezana traikefa tsara kokoa ho an'ny mpampiasa.",
      },

      mastered: "Teknolojia voafehy",

      architecture: {
        eyebrow: "Architecture maoderina",
        title: "Stack natao haharitra",
        description:
          "Tsy ny fanangonana teknolojia maro no tanjonay. Ny safidy ara-teknika tsirairay dia mifototra amin'ny filàna mazava : performance, fiarovana, maintenance, fahafahana mivoatra ary traikefan'ny mpampiasa.",

        web: "Application",
        mobile: "Android & iOS",
        api: "Services backend",
        data: "Angona voalamina",
      },

      closing:
        "Fitaovana ihany ny teknolojia. Ny tanjonay dia ny mamorona vahaolana mahasoa, azo itokisana ary mifanaraka amin'ny asanao.",
    },

    nav: {
      home: "Fandraisana",
      services: "Tolotra",
      solutions: "Vahaolana",
      projects: "Tetikasa",
      about: "Mombamomba",
      contact: "Fifandraisana",
      quote: "Mangataka devis",
    },

    common: {
      language: "Fiteny",
      changeLanguage: "Hanova fiteny",
      appearance: "Endrika",
      close: "Hidio",
    },

    hero: {
      badge: "Vahaolana nomerika mifanaraka amin'ny filàna",
      title: "Ampitomboy ny asanao amin'ny alalan'ny digital.",
      description:
        "Digital Work dia mamorona tranonkala, application ary vahaolana nomerika maoderina hanampiana ny orinasa hampitombo ny fahitana azy, hanamora ny asa ary hampivelatra ny fisiany amin'ny Internet.",
      primary: "Hanomboka tetikasa",
      secondary: "Hijery ny tetikasanay",
      discover: "Hijery bebe kokoa",
    },

   pillars: {
  eyebrow: "Ny fahaiza-manaonay",
  title: "Fahaiza-manao natao ho an'ny",
  highlight: "tetikasa nomerikao",
  description:
    "Ampifandraisinay ny fahaiza-manao ara-teknika, ny fahatakarana ny filàn'ny orinasa ary ny fomba fiasa mifantoka amin'ny vokatra mba hamoronana vahaolana nomerika azo itokisana, haingana ary mora ampivoarina.",

  items: [
    {
      number: "01",
      title: "Fahaiza-manao ara-teknika",
      description:
        "Vahaolana novolavolaina amin'ny teknolojia maoderina, rafitra madio ary kaody natao mba hahafahana mampivoatra azy hatrany.",
      highlights: [
        "React & React Native",
        "Node.js & API",
        "Architecture maoderina",
      ],
    },
    {
      number: "02",
      title: "Vahaolana mifanaraka amin'ny filàna",
      description:
        "Ny tetikasa tsirairay dia amboarina araka ny tanjon'ny orinasa, ny mpampiasa ary ny fepetra tena misy.",
      highlights: [
        "Famakafakana ny filàna",
        "UX/UI mifanaraka",
        "Fonctionnalités manokana",
      ],
    },
    {
      number: "03",
      title: "Performance & fampivoarana",
      description:
        "Manangana vokatra haingana, mora karakaraina ary afaka manaraka ny fitomboan'ny asan'ny orinasa izahay.",
      highlights: [
        "Performance nohatsaraina",
        "Scalabilité",
        "Mora ampivoarina",
      ],
    },
    {
      number: "04",
      title: "Azo itokisana & fanohanana",
      description:
        "Fanohanana voalamina manomboka amin'ny famolavolana ka hatramin'ny famoahana ny tetikasa ary ny fampivoarana manaraka.",
      highlights: [
        "Fanaraha-maso ny tetikasa",
        "Kalitao & fiarovana",
        "Fanohanana ara-teknika",
      ],
    },
  ],
},
    problems: {
      eyebrow: "Ireo olana sedrainao",
      title: "Ireo olana manakana",
      highlight: "ny fivoaran'ny asanao",
      description:
        "Fantatray ireo olana mety hampiadana ny orinasanao mba hamoronana vahaolana nomerika tena mifanaraka amin'ny filànao.",

      items: {
        time: {
          title: "Fandaniana fotoana",
          description:
            "Mandany fotoana ny asa miverimberina ary mampihena ny vokatra azon'ny ekipanao.",
        },

        technology: {
          title: "Fitaovana tsy mifanaraka",
          description:
            "Ny fitaovana tranainy na tsy mifanaraka dia mampitombo ny fahasarotan'ny asa.",
        },

        visibility: {
          title: "Tsy ampy fahitana",
          description:
            "Mendrika fisiana nomerika mazava, maoderina ary mora idirana ny orinasanao.",
        },

        systems: {
          title: "Processus miparitaka",
          description:
            "Ny fampahalalana miparitaka amin'ny fitaovana maro dia manasarotra ny fanaraha-maso.",
        },

        profitability: {
          title: "Tombombarotra voafetra",
          description:
            "Ny asa atao tanana sy ny tsy fahombiazan'ny processus dia mety hampihena ny tombombarotra.",
        },

        scalability: {
          title: "Sarotra ny mivelatra",
          description:
            "Ny vahaolana tsy voaomana tsara dia mety hanakana ny fitomboan'ny orinasa.",
        },
      },

      closing: {
        before: "Ny digital dia tsy tokony",
        strong: "hanasarotra",
        middle: "ny asanao.",
        value: "Tokony hamorona tombontsoa izy.",
      },
    },

    services: {
      eyebrow: "Ny fahaiza-manaonay",
      title: "Vahaolana nomerika natao ho an'ny orinasanao.",
      description:
        "Manomboka amin'ny tranonkala ka hatramin'ny application métier, mamorona vahaolana mifanaraka amin'ny tanjonao izahay.",

      web: {
        title: "Famoronana tranonkala",
        description:
          "Tranonkala matihanina, haingana, maoderina ary natao hahazoana mpanjifa.",
      },

      application: {
        title: "Application web",
        description:
          "Application web sy plateforme métier mifanaraka amin'ny fomba fiasan'ny orinasanao.",
      },

      mobile: {
        title: "Application mobile",
        description:
          "Application Android sy iOS maoderina miaraka amin'ny expérience utilisateur tsara.",
      },

      digital: {
        title: "Digitalisation",
        description:
          "Ovay ho vahaolana nomerika tsotra sy mahomby ny asa tanana sy ny processus.",
      },
    },

    positioning: {
      badge: "Mihoatra noho ny tranonkala",
      title: "Mamorona fitaovana mampandroso ny orinasanao izahay.",
      description:
        "Ny fisianao nomerika dia tokony ho fitaovana manampy amin'ny fandrosoan'ny orinasanao. Digital Work dia mampifandray ny design, développement ary fahatakarana ny filan'ny orinasa.",
      button: "Hijery ny vahaolana",

      visibility: {
        title: "Fahitana",
        text: "Ataovy mora kokoa amin'ny mpanjifa ny mahita anao.",
      },

      performance: {
        title: "Fahombiazana",
        text: "Fitaovana haingana natao ho an'ny tanjonao.",
      },

      automation: {
        title: "Automatisation",
        text: "Ahenao ny asa miverimberina ary mitsitsia fotoana.",
      },

      evolution: {
        title: "Fivoarana",
        text: "Vahaolana afaka mitombo miaraka amin'ny orinasanao.",
      },
    },

    results: {
      eyebrow: "Vokatra azo tsapain-tanana",
      title: "Ny teknolojia ho fanatsarana",
      titleHighlight: "ny vokatrao",
      description:
        "Tsy mamorona tranonkala sy application fotsiny izahay. Mamolavola vahaolana nomerika afaka mitondra vokatra tena misy ho an'ny asanao izahay.",

      performance: {
        value: "+40%",
        label: "Fahombiazan'ny rafitra",
        description:
          "Interface sy application nohatsaraina mba hampitombo ny fahombiazan'ny rafitra sy ny traikefan'ny mpampiasa.",
      },

      productivity: {
        value: "2×",
        label: "Famokarana",
        description:
          "Fitaovana nomerika natao hanamorana ny asa miverimberina sy hanafaingana ny asa andavanandro.",
      },

      engagement: {
        value: "+60%",
        label: "Fandraisan'anjaran'ny mpampiasa",
        description:
          "Traikefa nomerika maoderina natao hampitomboana ny fandraisan'anjaran'ny mpampiasa sy ny fiovam-po.",
      },

      custom: {
        value: "100%",
        label: "Mifanaraka amin'ny filàna",
        description:
          "Ny vahaolana tsirairay dia amboarina araka ny tanjona sy ny filàna manokana amin'ny tetikasa.",
      },

      impact: {
        title: "Fomba fiasa mifantoka amin'ny vokatra",
        description:
          "Ny fanapahan-kevitra ara-teknika tsirairay dia tokony hanampy amin'ny fanatrarana tanjona ara-barotra. Atambatray ny design, développement ary paikady mba hamoronana vokatra nomerika mahasoa sy maharitra.",
      },

      benefits: [
        "Architecture teknika afaka mivoatra",
        "Traikefan'ny mpampiasa mirindra",
        "Fahombiazan'ny rafitra nohatsaraina",
        "Fanohanana manomboka amin'ny conception ka hatramin'ny déploiement",
      ],

      visual: {
        performance: "Fahombiazan'ny nomerika",
        before: "Talohan'ny",
        after: "Taorian'ny",
        optimized: "Tetikasa nohatsaraina",
        goals: "Tanjona tratra",
      },
    },
    method: {
      eyebrow: "Ny fomba fiasanay",
      title: "Fomba fiasa tsotra.",
      titleHighlight: "Vahaolana azo ampiharina.",
      description:
        "Mandroso tsikelikely izahay mba hanovana ny filàn'ny orinasa ho vahaolana nomerika tena ilaina.",

      button: "Andao hiresaka momba ny tetikasanao",

      steps: {
        analysis: {
          title: "Famakafakana",
          description:
            "Fantatray ny asanao, ny tanjonao, ny mpampiasa ary ny fepetra misy.",
        },

        design: {
          title: "Famolavolana",
          description:
            "Faritanay ny expérience utilisateur, ny architecture ary ny fonctionnalités ilaina.",
        },

        development: {
          title: "Développement",
          description:
            "Amboarinay amin'ny teknolojia maoderina, azo antoka ary afaka mivoatra ny vahaolana.",
        },

        deployment: {
          title: "Déploiement",
          description:
            "Apetraho amin'ny production ny vahaolana ary manampy anao amin'ny fampiasana azy izahay.",
        },
      },

      reassurance: {
        title: "Tsy misy vahaolana standard terena",
        description:
          "Ny tetikasa tsirairay dia amboarina araka ny asanao, ny tanjonao ary ny fepetra tena misy ao amin'ny orinasanao.",
      },

      cta: "Andao hiresaka momba ny tetikasanao",
    },

    realisations: {
      eyebrow: "Ireo tetikasanay",

      title: "Tetikasa natao",

      titleHighlight: "hamorona tombontsoa",

      description:
        "Jereo ireo ohatra vitsivitsy amin'ny vahaolana nomerika novolavolainay, mifantoka amin'ny fahombiazana, fahatsorana ary fahafahana mivoatra.",

      featured: "Tetikasa lehibe",

      viewProject: "Hijery ny tetikasa",

      inDevelopment: "Eo am-pamolavolana",

      cta: { 
      "title": "Mety ho",
      "titleHighlight": "tetikasa manaraka vitanay ny tetikasanao.",
      "description": "Lazao anay ny hevitrao ary hiara-hanangana vahaolana mifanaraka amin'ny asanao isika.",
        button: "Andao hiresaka momba ny tetikasanao",
      },

      //pour la page realisation 
      
    "hero": {
      "badge": "Asa vitanay",
      "title": "Tetikasa natao",
      "titleHighlight": "hamokatra vokatra.",
      "description": "Jereo ireo tetikasa web, mobile, fitantanana ary tambajotra novolavolaina tamin'ny teknolojia maoderina mifanaraka amin'ny filan'ny orinasa tsirairay."
    },
    "categories": {
      "all": "Rehetra",
      "developpement_web": "Fampivoarana Web",
      "application_web": "Application Web",
      "application_mobile": "Application Mobile",
      "solution_metier": "Vahaolana ho an'ny orinasa",
      "reseaux": "Tambajotra",
      "automatisation": "Automatisation",
      "solution_digitale": "Vahaolana nomerika"
    },
    "states": {
      "loading": "Ampidirina ny tetikasa...",
      "loadError": "Tsy afaka nampiditra ireo tetikasa.",
      "empty": "Tsy misy tetikasa amin'ity sokajy ity."
    },
    "process": {
      "badge": "Fomba fiasanay",
      "title": "Tsy manorina fonction",
      "titleSecondLine": "fotsiny izahay.",
      "description": "Ny tetikasa tsirairay dia manomboka amin'ny fahatakarana ny filàna. Ny tanjona dia ny hanangana fitaovana tena ilaina ho an'ny orinasa sy ny mpampiasa azy.",
      "cta": "Hiresaka momba ny tetikasako",
      "steps": {
        "analysis": {
          "title": "Famakafakana",
          "text": "Fahatakarana ny filàna, ny mpampiasa ary ny tanjona."
        },
        "design": {
          "title": "Famolavolana",
          "text": "Architecture, traikefan'ny mpampiasa ary famaritana ny fonctionnalités."
        },
        "development": {
          "title": "Fampandrosoana",
          "text": "Fananganana vahaolana manana architecture mora tazonina."
        },
        "production": {
          "title": "Fametrahana",
          "text": "Déploiement, fitsapana ary fanohanana aorian'ny fandefasana."
        }
      }
    },
    "project": {
      "keyPoints": "Hevi-dehibe",
      "view": "Jereo ny tetikasa",
      "unavailable": "Tetikasa tsy misy",
      "viewProduction": "Jereo {{title}} amin'ny production"
    },
    },

    cta: {
      badge: "Andao hanangana ny tetikasanao",
      title: "Manana tetikasa digital ve ianao?",
      highlight: "Andao hampivoatra azy.",
      button: "Andao hiresaka momba ny tetikasanao",
      description:
        "Lazao aminay ny zavatra ilainao. Hanampy anao hamaritra vahaolana digital mifanaraka amin'ny orinasanao sy ny tanjonao izahay.",
      primaryCta: "Andao hiresaka momba ny tetikasanao",
      secondaryCta: "Jereo ny tetikasanay",

      benefits: [
        "Vahaolana mifanaraka amin'ny filanao",
        "Fanohanana manomboka amin'ny famolavolana ka hatramin'ny famoahana",
        "Teknolojia maoderina sy azo havaozina",
      ],

      response: "Valiny mazava ho an'ny tetikasanao",
      responseDescription:
        "Hodinihinay ny zavatra ilainao, hamolavola ny vahaolana ary hamolavola vokatra mifanaraka amin'ny asanao izahay.",

      process: {
        analysis: "Famakafakana ny filàna",
        design: "Famolavolana & design",
        development: "Fampandrosoana",
      },

      footerText:
        "Ny tetikasa tsirairay dia manomboka amin'ny fifampiresahana. Lazao aminay ny hevitrao ary andao hiara-hanangana ny dingana manaraka.",
    },

    footer: {
      language: "Fiteny",
      legal: "Fampahafantarana ara-dalàna",
      privacy: "Fiainana manokana",

      modal: {
        close: "Hidio",
      },

      legalContent: {
        introduction:
          "Ireo fampahafantarana ara-dalàna ireo dia mamaritra ny fepetra sy fitsipika ampiharina amin'ny fampiasana ny tranokalan'ny Digital Work.",

        editorTitle: "Mpitantana ny tranokala",
        editor:
          "Digital Work dia miasa amin'ny famolavolana sy fampandrosoana vahaolana nomerika, tranokala, rindranasa ary tolotra nomerika.",

        hostingTitle: "Fampiantranoana",
        hosting:
          "Ny fampahalalana momba ny fampiantranoana ity tranokala ity dia azo alaina amin'ny fangatahana atao amin'ny Digital Work.",

        intellectualTitle: "Zo ara-tsaina",
        intellectual:
          "Ny votoaty, sary, lahatsoratra, logo ary singa rehetra hita amin'ity tranokala ity dia voaaro araka ny lalàna momba ny fananana ara-tsaina.",
      },

      privacyContent: {
        introduction:
          "Digital Work dia manome lanja lehibe ny fiarovana ny angon-drakitra manokan'ny mpampiasa.",

        dataTitle: "Angon-drakitra angonina",
        data:
          "Ny vaovao alefa amin'ny alalan'ny formulaire fifandraisana dia ampiasaina ihany mba hamaliana ny fangatahana sy hitantanana ny fifandraisana.",

        usageTitle: "Fampiasana ny angon-drakitra",
        usage:
          "Ny angon-drakitra angonina dia tsy ampiasaina amin'ny tanjona tsy mifanaraka amin'ny fangatahana voalohany ary tsy amidy amin'ny antoko fahatelo.",

        rightsTitle: "Ny zonao",
        rights:
          "Azonao atao ny mangataka ny hahazo, hanova na hamafa ny angon-drakitra manokana momba anao amin'ny alalan'ny fifandraisana amin'ny Digital Work.",

        contactTitle: "Fifandraisana",
        contact:
          "Raha manana fanontaniana momba ny fiarovana ny angon-drakitrao ianao dia afaka mifandray aminay amin'ny rrzafindrafita@gmail.com.",
      },


      tagline: "Digital Work",
      description:
        "Vahaolana nomerika maoderina ho an'ny orinasa mikendry ny handroso.",

      services: {
        title: "Tolotra",
        websites: "Famoronana tranonkala",
        webApplications: "Application web",
        mobileApplications: "Application mobile",
        businessSolutions: "Vahaolana ho an'ny orinasa",
        automation: "Automatisation",
        digitalSolutions: "Vahaolana nomerika",
      },

      navigation: {
        title: "Fikarohana",
        home: "Fandraisana",
        services: "Tolotra",
        solutions: "Vahaolana",
        projects: "Tetikasa",
        about: "Momba anay",
        contact: "Fifandraisana",
      },

      contact: {
        title: "Fifandraisana",
        email: "rrzafindrafita@gmail.com",
        phone: "+261 34 84 286 52",
      },

      followUs: "Araho izahay",

      copyright: "Zo rehetra voatokana.",
      madagascar: "Madagasikara",

      startProject: "Hanomboka tetikasa",
    },
  },

  // =========================================================
  // ENGLISH
  // =========================================================

  en: {
  technologies: {
  eyebrow: "Our technology stack",

  title: "Technology powering your projects",

  description:
    "We select technologies based on your objectives, constraints, and your solution's ability to evolve over time.",

  categories: {
    frontend: "Frontend",
    mobile: "Mobile",
    backend: "Backend",
    engineering: "Engineering",
    database: "Database",
    web: "Web",
    infrastructure: "Infrastructure",
    optimization: "Optimization",
  },

  items: {
    react:
      "Modern, fast and maintainable web interfaces built with a component-based architecture.",

    reactNative:
      "Android and iOS mobile applications providing a consistent and seamless user experience.",

    nodejs:
      "High-performance APIs and backend services designed to efficiently connect your applications.",

    typescript:
      "More robust, strongly typed and scalable code that reduces errors and simplifies maintenance.",

    postgresql:
      "Reliable data management with a relational database designed for modern applications.",

    webTechnologies:
      "HTML, CSS, JavaScript and modern tools for building high-performance web experiences.",

    security:
      "Security best practices integrated from the initial design of applications and APIs.",

    performance:
      "Optimization of loading times, rendering and overall performance for a better user experience.",
  },

  mastered: "Technology mastered",

  architecture: {
    eyebrow: "Modern architecture",

    title: "A stack built to last",

    description:
      "Our approach is not about stacking technologies. Every technical choice addresses a concrete need: performance, security, maintainability, scalability, and user experience.",

    web: "Applications",

    mobile: "Android & iOS",

    api: "Backend services",

    data: "Structured data",
  },

  closing:
    "Technology is only a means. Our goal is to build a useful, reliable solution adapted to your business.",
},
    nav: {
      home: "Home",
      services: "Services",
      solutions: "Solutions",
      projects: "Projects",
      about: "About",
      contact: "Contact us",
      quote: "Request a quote",
    },

    common: {
      language: "Language",
      changeLanguage: "Change language",
      appearance: "Appearance",
      close: "Close",
    },

    hero: {
      badge: "Custom digital solutions",
      title: "Transform your business with digital.",
      description:
        "Digital Work creates modern websites, applications and digital solutions that help businesses increase visibility, automate operations and grow their online presence.",
      primary: "Start a project",
      secondary: "View our projects",
      discover: "Discover",
    },
    pillars: {
      eyebrow: "Our expertise",
      title: "Expertise designed for",
      highlight: "your digital projects",
      description:
        "We combine technical expertise, business understanding and a product-oriented approach to build reliable, high-performance and scalable digital solutions.",

      items: [
        {
          number: "01",
          title: "Technical expertise",
          description:
            "Solutions built with modern technologies, clean architecture and maintainable code designed to evolve.",
          highlights: [
            "React & React Native",
            "Node.js & APIs",
            "Modern architecture",
          ],
        },
        {
          number: "02",
          title: "Custom solutions",
          description:
            "Every project is designed around your business objectives, your users and your real-world constraints.",
          highlights: [
            "Needs analysis",
            "Tailored UX/UI",
            "Custom features",
          ],
        },
        {
          number: "03",
          title: "Performance & scalability",
          description:
            "We build fast, maintainable products capable of supporting the growth of your business.",
          highlights: [
            "Optimized performance",
            "Scalability",
            "Easy future improvements",
          ],
        },
        {
          number: "04",
          title: "Reliability & support",
          description:
            "Structured support from initial design through production deployment and future improvements.",
          highlights: [
            "Project monitoring",
            "Quality & security",
            "Technical support",
          ],
        },
      ],
    },
    problems: {
      eyebrow: "Your challenges",
      title: "Challenges that slow",
      highlight: "your business down",
      description:
        "We identify the issues holding your business back and build digital solutions that address your real needs.",

      items: {
        time: {
          title: "Time loss",
          description:
            "Repetitive tasks consume time and reduce your team's productivity.",
        },

        technology: {
          title: "Outdated tools",
          description:
            "Old or unsuitable tools make your operations more complicated.",
        },

        visibility: {
          title: "Low visibility",
          description:
            "Your business deserves a clear, modern and accessible digital presence.",
        },

        systems: {
          title: "Scattered processes",
          description:
            "Information spread across multiple tools makes business monitoring harder.",
        },

        profitability: {
          title: "Limited profitability",
          description:
            "Manual processes and inefficiencies can reduce your business profitability.",
        },

        scalability: {
          title: "Growth limitations",
          description:
            "A poorly designed solution can quickly become a barrier to growth.",
        },
      },

      closing: {
        before: "Digital should not",
        strong: "complicate",
        middle: "your business.",
        value: "It should create value.",
      },
    },

    services: {
      eyebrow: "Our expertise",
      title: "Digital solutions designed for your business.",
      description:
        "From showcase websites to business applications, we build solutions around real business objectives.",

      web: {
        title: "Web development",
        description:
          "Professional, fast and modern websites designed to convert visitors into customers.",
      },

      application: {
        title: "Web applications",
        description:
          "Custom business platforms and web applications adapted to your processes.",
      },

      mobile: {
        title: "Mobile applications",
        description:
          "Modern Android and iOS applications with a smooth user experience.",
      },

      digital: {
        title: "Digital transformation",
        description:
          "We transform manual processes into simple and efficient digital solutions.",
      },
    },

    positioning: {
      badge: "More than a website",
      title: "We build tools that move your business forward.",
      description:
        "Your digital presence should be a real business growth lever. Digital Work combines design, development and business understanding to create useful, high-performance and scalable solutions.",
      button: "Discover our solutions",

      visibility: {
        title: "Visibility",
        text: "Make it easier for your customers to find you.",
      },

      performance: {
        title: "Performance",
        text: "Fast tools designed around your objectives.",
      },

      automation: {
        title: "Automation",
        text: "Reduce repetitive tasks and save time.",
      },

      evolution: {
        title: "Scalability",
        text: "Solutions that can grow with your business.",
      },
    },

    results: {
      eyebrow: "Measurable results",
      title: "Technology focused on",
      titleHighlight: "your results",
      description:
        "We don't simply build websites and applications. We design digital solutions capable of creating a real impact on your business.",

      performance: {
        value: "+40%",
        label: "Performance",
        description:
          "Optimized interfaces and applications designed to improve performance and user experience.",
      },

      productivity: {
        value: "2×",
        label: "Productivity",
        description:
          "Digital tools designed to automate tasks and accelerate daily operations.",
      },

      engagement: {
        value: "+60%",
        label: "Engagement",
        description:
          "Modern user experiences designed to strengthen engagement and conversion.",
      },

      custom: {
        value: "100%",
        label: "Tailored",
        description:
          "Every solution is developed according to the project's objectives, constraints and specific requirements.",
      },

      impact: {
        title: "An impact-driven approach",
        description:
          "Every technical decision should serve a business objective. Our approach combines design, development and strategy to build useful, high-performing and sustainable digital products.",
      },

      benefits: [
        "Scalable technical architecture",
        "Consistent user experience",
        "Optimized performance",
        "Support from conception to deployment",
      ],

      visual: {
        performance: "Digital performance",
        before: "Before",
        after: "After",
        optimized: "Project optimized",
        goals: "Goals achieved",
      },
    },

    method: {
      eyebrow: "Our approach",
      title: "A simple approach.",
      titleHighlight: "Practical solutions.",
      description:
        "We move step by step to turn your business needs into digital solutions that deliver real value.",

      button: "Let's discuss your project",

      steps: {
        analysis: {
          title: "Analysis",
          description:
            "We understand your business, objectives, users, and constraints.",
        },

        design: {
          title: "Design",
          description:
            "We define the user experience, architecture, and features your solution needs.",
        },

        development: {
          title: "Development",
          description:
            "We build the solution with modern, reliable, and scalable technologies.",
        },

        deployment: {
          title: "Deployment",
          description:
            "We deploy the solution to production and support you during its implementation.",
        },
      },

      reassurance: {
        title: "No one-size-fits-all solution",
        description:
          "Every project is designed around your business, objectives, and actual constraints.",
      },

      cta: "Let's discuss your project",
    },
    realisations: {
    hero: {
      badge: "Our work",
      title: "Projects designed",
      titleHighlight: "to deliver results.",
      description: "Discover a selection of web, mobile, business and network projects built with modern technologies tailored to each company's needs."
    },
      featured: "Featured project",

      viewProject: "View project",

      inDevelopment: "Project in development",

      //for the page of realisation 
   
    categories: {
      "all": "All",
      developpement_web: "Web Development",
      application_web: "Web Application",
      application_mobile: "Mobile Application",
      solution_metier: "Business Solution",
      reseaux: "Networks",
      automatisation: "Automation",
      solution_digitale: "Digital Solution"
    },
    "states": {
      "loading": "Loading projects...",
      "loadError": "Unable to load projects.",
      "empty": "No project in this category."
    },
    "process": {
      "badge": "Our project approach",
      "title": "We don't just develop",
      "titleSecondLine": "features.",
      "description": "Every project starts with understanding the need. Our goal is to build a tool that is genuinely useful to the company and its users.",
      "cta": "Discuss my project",
      "steps": {
        "analysis": {
          "title": "Analysis",
          "text": "Understanding the needs, users and business objectives."
        },
        "design": {
          "title": "Design",
          "text": "Architecture, user experience and feature definition."
        },
        "development": {
          "title": "Development",
          "text": "Building the solution with a maintainable architecture."
        },
        "production": {
          "title": "Production",
          "text": "Deployment, testing and post-launch support."
        }
      }
    },
    "project": {
      "keyPoints": "Key points",
      "view": "View project",
      "unavailable": "Project unavailable",
      "viewProduction": "View {{title}} in production"
    },
    cta: {
      title: "Your project could be",
      "titleHighlight": "our next success story.",
      "description": "Tell us about your idea and let's build a solution tailored to your business.",
      button: "Start a project"
    }
  
    },
    cta: {
      badge: "Let's build your project",
      title: "Have a digital project in mind?",
      highlight: "Let's bring it to life.",
      description:
        "Tell us about your needs. We will help you define a digital solution adapted to your business and goals.",
      primaryCta: "Let's discuss your project",
      secondaryCta: "View our projects",

      benefits: [
        "A solution tailored to your needs",
        "Support from design to deployment",
        "Modern and scalable technologies",
      ],
      button: "Let's discuss your project",
      response: "A clear response to your project",
      responseDescription:
        "We analyze your needs, design the solution and develop a product built around your business.",

      process: {
        analysis: "Needs analysis",
        design: "Design & conception",
        development: "Development",
      },

      footerText:
        "Every project starts with a conversation. Tell us your idea and let's build the next step together.",
    },

    footer: {

  language: "Language",
  legal: "Legal notice",
  privacy: "Privacy",

  modal: {
    close: "Close",
  },

  legalContent: {
    introduction:
      "This legal notice defines the terms and conditions applicable to the use of the Digital Work website.",

    editorTitle: "Website operator",
    editor:
      "Digital Work specializes in the design and development of digital solutions, websites, applications and digital services.",

    hostingTitle: "Hosting",
    hosting:
      "Information regarding the hosting of this website is available upon request from Digital Work.",

    intellectualTitle: "Intellectual property",
    intellectual:
      "All content, graphic elements, texts, logos and components available on this website are protected by applicable intellectual property laws.",
  },

  privacyContent: {
    introduction:
      "Digital Work places particular importance on protecting your personal data.",

    dataTitle: "Data collected",
    data:
      "Information submitted through contact forms is used only to respond to requests and manage communications.",

    usageTitle: "Use of data",
    usage:
      "Collected data is not used for purposes incompatible with the original request and is not sold to third parties.",

    rightsTitle: "Your rights",
    rights:
      "You may request access to, modification or deletion of your personal data by contacting Digital Work.",

    contactTitle: "Contact",
    contact:
      "For any questions regarding the privacy of your data, contact us at rrzafindrafita@gmail.com.",
  },



  tagline: "Digital Work",
  description:
    "Modern digital solutions for ambitious businesses.",

  services: {
    title: "Services",
    websites: "Websites",
    webApplications: "Web applications",
    mobileApplications: "Mobile applications",
    businessSolutions: "Business solutions",
    automation: "Automation",
    digitalSolutions: "Digital solutions",
  },

  navigation: {
    title: "Navigation",
    home: "Home",
    services: "Services",
    solutions: "Solutions",
    projects: "Projects",
    about: "About",
    contact: "Contact",
  },

  contact: {
    title: "Contact",
    email: "rrzafindrafita@gmail.com",
    phone: "+261 34 84 286 52",
  },

  followUs: "Follow us",

  copyright: "All rights reserved.",
  madagascar: "Madagascar",

  startProject: "Start a project",
},
  },
} as const;

// ===========================================================
// TYPE GLOBAL DES TRADUCTIONS
// ===========================================================

export type Translations = typeof translations[Language];

// ===========================================================
// GET TRANSLATIONS
// ===========================================================

export function getTranslations(language: Language): Translations {
  return translations[language];
}