import { initTheme } from "./theme.js";
import { mountMenuToggle, initMobileUtils, initScrollSpy, initReveal } from "./ui.js";

// Keep the base stylesheet for backward compatibility and layer the V2/V3 case-study system on top.
if (!document.querySelector('link[href="v2.css"]')) {
  const v2 = document.createElement("link");
  v2.rel = "stylesheet";
  v2.href = "v2.css";
  document.head.appendChild(v2);
}
if (!document.querySelector('link[href="v3-fixes.css"]')) {
  const v3Fixes = document.createElement("link");
  v3Fixes.rel = "stylesheet";
  v3Fixes.href = "v3-fixes.css";
  document.head.appendChild(v3Fixes);
}
if (!document.querySelector('link[href="v3-top-media.css"]')) {
  const topMedia = document.createElement("link");
  topMedia.rel = "stylesheet";
  topMedia.href = "v3-top-media.css";
  document.head.appendChild(topMedia);
}

initTheme();
mountMenuToggle();
initMobileUtils();
initScrollSpy();

// Progressive reveal enhancement.
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

// Add the live GeoTrac product link to the earlier-work card.
const geoTracCard = [...document.querySelectorAll(".earlier-card")]
  .find((card) => card.querySelector("h3")?.textContent.trim() === "GeoTrac Platform");
if (geoTracCard) {
  const heading = geoTracCard.querySelector("h3");
  if (heading && !geoTracCard.querySelector('a[href^="https://site.geotrac.io"]')) {
    const link = document.createElement("a");
    link.href = "https://site.geotrac.io/#/authentication/login";
    link.target = "_blank";
    link.rel = "noopener";
    link.className = "text-link";
    link.dataset.en = "Open platform ↗";
    link.dataset.fr = "Ouvrir la plateforme ↗";
    link.textContent = "Open platform ↗";
    link.style.display = "inline-block";
    link.style.marginTop = ".65rem";
    heading.insertAdjacentElement("afterend", link);
  }
}

// Make the experience chronology explicit so the recent degree is not read as
// the beginning of the engineering journey.
const experienceHeading = document.querySelector("#experience .section-heading");
if (experienceHeading && !experienceHeading.querySelector(".experience-context")) {
  const context = document.createElement("p");
  context.className = "experience-context";
  context.dataset.en = "Building software professionally and independently since 2022.";
  context.dataset.fr = "Je développe des logiciels professionnellement et de manière indépendante depuis 2022.";
  context.textContent = context.dataset.en;
  experienceHeading.appendChild(context);
}

// Keep education visible as a supporting credential rather than the dominant
// signal. The exact month remains available in the CV; the portfolio only needs
// the year.
const educationCard = document.querySelector(".credentials-section .credential-card:first-child");
if (educationCard) {
  const educationTitle = educationCard.querySelector("h3");
  if (educationTitle) {
    educationTitle.dataset.en = "Professional University Degree · Web Application Development & Mobile Technologies";
    educationTitle.dataset.fr = "Licence Professionnelle · Développement des Applications Web et Technologies Mobiles";
    educationTitle.textContent = educationTitle.dataset.en;
  }

  const educationMeta = educationCard.querySelector(":scope > p:last-child");
  if (educationMeta) {
    educationMeta.textContent = "École Supérieure de Technologie de Casablanca, Université Hassan II · 2026";
  }
}

// Broaden availability so the portfolio does not imply remote-only interest.
const contactHeading = document.querySelector("#contact h2");
if (contactHeading) {
  contactHeading.dataset.en = "Open to engineering roles and contracts.";
  contactHeading.dataset.fr = "Ouvert aux postes d’ingénierie et aux contrats.";
  contactHeading.textContent = "Open to engineering roles and contracts.";
}

const contactIntro = document.querySelector("#contact .contact-copy > p:last-child");
if (contactIntro) {
  contactIntro.dataset.en = "Based in Casablanca. Remote is preferred, while strong on-site opportunities remain open. Best fit: product engineering, Java/Spring Boot, Flutter/mobile, marketplaces, fintech/payments and practical automation.";
  contactIntro.dataset.fr = "Basé à Casablanca. Le remote est privilégié, tout en restant ouvert aux bonnes opportunités sur site. Meilleur fit : product engineering, Java/Spring Boot, Flutter/mobile, marketplaces, fintech/paiements et automatisation pratique.";
}

// Keep the current verified TOEFL credential concise on the public portfolio.
const toeflLine = document.querySelector(".credentials-section .credential-card:last-child > p:last-child");
if (toeflLine) {
  toeflLine.dataset.en = "TOEFL iBT · CEFR B2 · June 2026";
  toeflLine.dataset.fr = "TOEFL iBT · CECR B2 · Juin 2026";
  toeflLine.textContent = "TOEFL iBT · CEFR B2 · June 2026";
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
