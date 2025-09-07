// ===============================
// Projects data
// ===============================
export const PROJECTS = [
  {
    title: "GeoTrac Platform",
    subtitle: "Lost & Found reporting — Mali",
    subtitle_fr: "Signalement d’objets perdus — Mali",
    description:
      "A web app enabling people in Mali to report and recover lost items. Includes item posting, search, verification, and owner contact flows.",
    description_fr:
      "Application web permettant de déclarer et retrouver des objets perdus au Mali : publication, recherche, vérification et contact du propriétaire.",
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
      "A user-friendly mobile app for payments, money transfers, and cross-border transactions in Africa. Powered by crypto and blockchain.",
    description_fr:
      "Application mobile simple pour paiements, transferts et transactions transfrontalières en Afrique, propulsée par la blockchain.",
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
      "A digital sales platform linking sellers with customers, focusing on smooth onboarding, product discovery and order flows.",
    description_fr:
      "Plateforme de vente reliant vendeurs et clients avec onboarding fluide, découverte produit et parcours de commande optimisés.",
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
    title: "Image retouching API",
    subtitle: "Image background Removal/Replacement",
    subtitle_fr: "Suppression/Remplacement d’arrière-plan",
    description:
      "An API that removes image backgrounds using deep learning. It’s fast, easy to integrate, works with single or batch images, and supports both automatic and manual background replacements.",
    description_fr:
      "API qui supprime les arrière-plans d’images avec deep learning. Rapide, facile à intégrer, fonctionne avec images uniques ou en lot, et supporte remplacements automatiques et manuels.",
    tags: ["Backend", "Python", "Flask", "TensorFlow", "OpenCV"],
    image: "./assets/retouching.png",
  },
  {
    title: "E-commerce Image AI Agent",
    subtitle: "Classifying product images",
    subtitle_fr: "Agent IA pour images e-commerce",
    description:
      "A cloud-native AI agent for sorting e-commerce product image quality. It uses Google Drive API, GPT-5 Vision, and Google Cloud Run/Scheduler to classify images as READY, NEEDS_EDIT, or RETAKE, and auto-sorts them into the right Drive folders.",
    description_fr:
      "Agent IA cloud-native pour trier la qualité des images produits e-commerce. Utilise Google Drive API, GPT-5 Vision et Google Cloud Run/Scheduler pour classer les images en PRÊTE, À_MODIFIER ou À_REPRENDRE, et les trier automatiquement dans les bons dossiers Drive.",
    tags: ["Backend", "Python", "Uvicorn", "GoogleCloud", "GPT-5"],
    image: "./assets/classification.png",
  },
  {
    title: "Shop Management/Inventory Page",
    subtitle: "Store admin & customer flows",
    subtitle_fr: "Gestion boutique & parcours clients",
    description:
      "A fully customizable web application for shop management. Store owners can personalize the app’s title, logo, and theme colors, manage products and categories (used in the nav tab), track orders, and communicate with customers. All admin updates are reflected in real time. Customers can create accounts, browse products, manage their cart, and place orders seamlessly.",
    description_fr:
      "Application web entièrement personnalisable pour la gestion de boutique. Les propriétaires peuvent personnaliser le titre, le logo et les couleurs du thème de l’application, gérer les produits et catégories (utilisés dans l’onglet de navigation), suivre les commandes et communiquer avec les clients. Toutes les mises à jour de l’administrateur sont reflétées en temps réel. Les clients peuvent créer des comptes, parcourir les produits, gérer leur panier et passer des commandes en toute simplicité.",
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