import { initTheme } from "./theme.js";
import { mountMenuToggle, initMobileUtils, initScrollSpy, initReveal } from "./ui.js";

// Keep the base stylesheet for backward compatibility and layer the V2 case-study system on top.
if (!document.querySelector('link[href="v2.css"]')) {
  const v2 = document.createElement("link");
  v2.rel = "stylesheet";
  v2.href = "v2.css";
  document.head.appendChild(v2);
}

initTheme();
mountMenuToggle();
initMobileUtils();
initScrollSpy();

// Progressive reveal enhancement. The V2 markup is static, but the legacy
// stylesheet still expects .reveal elements to be observed before they become
// visible. Without this, the hero occupies space while remaining transparent.
const revealObserver = initReveal();
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// Keep the hero focused on one primary action. Resume download remains in the
// header and contact links remain in the dedicated contact section.
document
  .querySelectorAll('.hero-actions a[href="resume.html"], .hero-actions a[href="#contact"]')
  .forEach((el) => el.remove());

// Surface Fidelity's app entry point next to the public marketplace link.
const fidelityTopline = document.querySelector("#fidelity .project-topline");
const fidelitySiteLink = fidelityTopline?.querySelector('a[href="https://fidelity-market.com"]');
if (fidelityTopline && fidelitySiteLink) {
  const links = document.createElement("div");
  links.className = "project-links";
  Object.assign(links.style, {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    flexWrap: "wrap",
    gap: ".85rem",
  });

  fidelitySiteLink.replaceWith(links);
  links.appendChild(fidelitySiteLink);

  const appLink = document.createElement("a");
  appLink.className = "text-link";
  appLink.href = "https://fidelity-market.com/app";
  appLink.target = "_blank";
  appLink.rel = "noopener";
  appLink.dataset.en = "Open app ↗";
  appLink.dataset.fr = "Ouvrir l’app ↗";
  appLink.textContent = "Open app ↗";
  links.appendChild(appLink);
}

const LANG_KEY = "gd_lang";
let lang = localStorage.getItem(LANG_KEY) || (navigator.language?.startsWith("fr") ? "fr" : "en");

const translations = {
  en: {
    title: "Gaoussou Diarra — Full-Stack Product Engineer",
    description: "Gaoussou Diarra is a full-stack product engineer building reliable backend, mobile and web products with Java/Spring Boot, Flutter and TypeScript, with experience in fintech, marketplaces and applied automation.",
    cv: "assets/Gaoussou_Diarra_FullStack_Product_Engineer_CV.pdf",
    copied: "Copied!",
  },
  fr: {
    title: "Gaoussou Diarra — Ingénieur Produit Full-Stack",
    description: "Gaoussou Diarra est ingénieur produit full-stack et construit des produits fiables sur le backend, le mobile et le web avec Java/Spring Boot, Flutter et TypeScript, avec une expérience en fintech, marketplaces et automatisation appliquée.",
    cv: "assets/Gaoussou_Diarra_Ingenieur_Produit_FullStack_CV.pdf",
    copied: "Copié !",
  },
};

function applyLanguage() {
  document.documentElement.lang = lang;
  document.title = translations[lang].title;
  document.querySelector('meta[name="description"]')?.setAttribute("content", translations[lang].description);

  document.querySelectorAll("[data-en][data-fr]").forEach((el) => {
    el.textContent = el.dataset[lang];
  });

  const toggle = document.getElementById("langToggle");
  if (toggle) {
    toggle.textContent = lang === "en" ? "FR" : "EN";
    toggle.setAttribute("aria-label", lang === "en" ? "Switch to French" : "Passer en anglais");
  }

  const cv = document.getElementById("cvDownload");
  if (cv) {
    const href = translations[lang].cv;
    cv.href = href;
    cv.hidden = true;
    fetch(href, { method: "HEAD", cache: "no-store" })
      .then((res) => { cv.hidden = !res.ok; })
      .catch(() => { cv.hidden = true; });
  }
}

document.getElementById("langToggle")?.addEventListener("click", () => {
  lang = lang === "en" ? "fr" : "en";
  localStorage.setItem(LANG_KEY, lang);
  applyLanguage();
});

applyLanguage();

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
