// ===============================
// Projects data
// ===============================
export const PROJECTS = [
  {
    title: "GeoTrac Platform",
    subtitle: "Lost & Found reporting — Mali",
    subtitle_fr: "Signalement d’objets perdus — Mali",
    description:
      "A public-service web platform that helps people report, verify, and recover lost items faster through structured reporting, search, and owner contact flows.",
    description_fr:
      "Plateforme web d’utilité publique qui aide à signaler, vérifier et retrouver plus rapidement des objets perdus grâce à des parcours de déclaration, recherche et contact propriétaire.",
    value:
      "Value delivered: clearer reporting flows, faster item recovery, and a practical service for local communities.",
    value_fr:
      "Valeur apportée : parcours de signalement plus clairs, récupération plus rapide et service utile pour les communautés locales.",
    tags: [
      "Full-stack",
      "SpringBoot",
      "MySQL",
      "Html",
      "Css",
      "Sass",
      "Bootstrap",
      "JavaScript",
      "Angular",
      "Git",
    ],
    image: "./assets/geotrac.png",
    link: "https://site.geotrac.io",
  },
  {
    title: "Kora App",
    subtitle: "Payments & money transfers — Africa to the world",
    subtitle_fr: "Paiements & transferts — l’Afrique vers le monde",
    description:
      "A fintech mobile app designed to make payments, transfers, and cross-border money movement simpler for users across African markets.",
    description_fr:
      "Application mobile fintech conçue pour simplifier les paiements, transferts et transactions transfrontalières pour les utilisateurs sur les marchés africains.",
    value:
      "Value delivered: smoother mobile transaction flows, clearer fintech UX, and support for cross-border product delivery.",
    value_fr:
      "Valeur apportée : parcours transactionnels mobiles plus fluides, UX fintech plus claire et contribution à un produit transfrontalier.",
    tags: [
      "Full-stack",
      "SpringBoot",
      "MySQL",
      "Mobile",
      "Dart",
      "Flutter",
      "Git",
    ],
    image: "./assets/kora.png",
  },
  {
    title: "GeoTrac Showcase Site",
    subtitle: "Marketing site UX refresh",
    subtitle_fr: "Refonte UX du site vitrine",
    description:
      "A UX and visual refresh to clearly explain GeoTrac’s benefits, features and how it works, with better IA and mobile-first layout.",
    description_fr:
      "Refonte UX/UI pour clarifier les bénéfices, fonctionnalités et le fonctionnement de GeoTrac, avec une IA d’information améliorée et un design mobile-first.",
    tags: ["Front-end", "Html", "Css", "Bootstrap", "Git"],
    image: "./assets/site-geotrac.png",
    link: "https://geotrac.io",
  },
  {
    id: "fidelity-showcase",
    title: "Fidelity Showcase Site",
    subtitle: "Modern UI improvements",
    subtitle_fr: "Améliorations d’interface modernes",
    description:
      "A marketing website for Fidelity with a cleaner, more modern interface, consistent components, and improved performance.",
    description_fr:
      "Site marketing avec interface moderne et épurée, composants unifiés et meilleures performances.",
    tags: ["Front-end", "Html", "Css", "Git"],
    image: "./assets/fidelity-site.png",
  },
  {
    title: "GeoPoint Mobile",
    subtitle: "Field team management app",
    subtitle_fr: "Application de gestion d’équipes terrain",
    description:
      "All-in-one management app for field teams: QR check-ins, tasks, and coordination to boost productivity.",
    description_fr:
      "Application tout-en-un pour les équipes terrain : pointages QR, tâches et coordination pour gagner en productivité.",
    tags: ["Front-end", "Flutter", "Dart", "Git"],
    image: "./assets/geopoint.png",
  },
  {
    title: "Fidelity Web & Mobile",
    subtitle: "Marketplace experiences",
    subtitle_fr: "Expériences marketplace",
    description:
      "Marketplace platform connecting sellers and customers, with improved onboarding, product discovery, and ordering flows across web and mobile.",
    description_fr:
      "Plateforme marketplace reliant vendeurs et clients, avec onboarding, découverte produit et parcours de commande optimisés sur web et mobile.",
    value:
      "Value delivered: marketplace UX, seller/customer flows, and web/mobile product implementation.",
    value_fr:
      "Valeur apportée : UX marketplace, parcours vendeur/client et implémentation produit web/mobile.",
    tags: [
      "Full-stack",
      "Sass",
      "Html",
      "Css",
      "Bootstrap",
      "SpringBoot",
      "MySQL",
      "Dart",
      "Angular",
      "Flutter",
      "Git",
    ],
    image: "./assets/fidelity.png",
    link: "https://fidelity-market.com",
  },
  {
    title: "Netflix Clone",
    subtitle: "Movie browsing app",
    subtitle_fr: "Application de navigation de films",
    description:
      "A Netflix-style single-page app made with ReactJS, using the TMDB API to pull in movie data and a Laravel backend. It has a responsive design, loads content dynamically, and lets you search for movies, showing the top five results based on your search.",
    description_fr:
      "Application monopage de type Netflix faite avec ReactJS, utilisant l’API TMDB pour récupérer les données de films et un backend Laravel. Design responsive, chargement dynamique du contenu, et possibilité de rechercher des films, affichant les cinq meilleurs résultats selon votre recherche.",
    tags: ["Full-stack", "Html", "Css", "TailwindCss", "Laravel", "MySQL"],
    image: "./assets/netflix.png",
  },
  {
    title: "Image Retouching API",
    subtitle: "Background removal and replacement API",
    subtitle_fr: "API de suppression et remplacement d’arrière-plan",
    description:
      "A reusable image processing API that removes or replaces backgrounds at scale so teams can prepare cleaner visuals faster for catalogs, listings, and marketing assets.",
    description_fr:
      "API de traitement d’image réutilisable qui supprime ou remplace les arrière-plans à grande échelle afin d’aider les équipes à préparer plus vite des visuels propres pour catalogues, fiches produit et contenus marketing.",
    value:
      "Value delivered: reusable media API, faster merchandising prep, and batch-ready image operations.",
    value_fr:
      "Valeur apportée : API média réutilisable, préparation merchandising accélérée et traitement image en lot.",
    tags: ["Backend", "Python", "Flask", "TensorFlow", "OpenCV", "ESRGAN"],
    image: "./assets/retouching.png",
  },
  {
    title: "AI Product Image Pipeline",
    subtitle: "Automated product image and catalog workflow",
    subtitle_fr: "Workflow automatisé d’images produits et catalogue",
    description:
      "An AI-powered image pipeline for e-commerce teams. It processes product photos from Google Drive, classifies items, groups variants, checks image quality, and prepares clean hero images, lifestyle use-cases, and catalog-ready outputs.",
    description_fr:
      "Pipeline d’images piloté par l’IA pour les équipes e-commerce. Il traite les photos produits depuis Google Drive, classifie les articles, regroupe les variantes, contrôle la qualité et prépare des visuels hero, lifestyle et des sorties prêtes pour catalogue.",
    value:
      "Value delivered: reduced manual image prep, automated catalog QA, variant handling, scheduled batch processing, and faster product publishing.",
    value_fr:
      "Valeur apportée : réduction du travail manuel, contrôle qualité catalogue automatisé, gestion des variantes, traitement en lot planifié et mise en ligne produit plus rapide.",
    tags: ["Backend", "Python", "FastAPI", "Google Drive API", "Gemini API", "Pillow"],
    image: "./assets/image-pipeline.png",
  },
  {
    title: "Shop Management/Inventory Page",
    subtitle: "Store admin & customer flows",
    subtitle_fr: "Gestion boutique & parcours clients",
    description:
      "A shop operations web app combining catalog management, inventory visibility, orders, and customer purchase flows in one interface for day-to-day retail operations.",
    description_fr:
      "Application web de gestion boutique réunissant catalogue, visibilité stock, commandes et parcours d’achat client dans une seule interface pour les opérations quotidiennes.",
    value:
      "Value delivered: simpler store operations, better order visibility, and smoother customer purchasing flows.",
    value_fr:
      "Valeur apportée : opérations boutique simplifiées, meilleure visibilité sur les commandes et parcours d’achat plus fluide.",
    tags: [
      "Full-stack",
      "Html",
      "Css",
      "Bootstrap",
      "JavaScript",
      "PHP",
      "Laravel",
      "MySQL",
    ],
    image: "./assets/shop.png",
  },
];
