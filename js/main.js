import { initTheme } from "./theme.js";
import { mountMenuToggle, initMobileUtils, initScrollSpy } from "./ui.js";

initTheme();
mountMenuToggle();
initMobileUtils();
initScrollSpy();

const LANG_KEY = "gd_lang";
let lang = localStorage.getItem(LANG_KEY) || (navigator.language?.startsWith("fr") ? "fr" : "en");

const translations = {
  en: {
    title: "Gaoussou Diarra — Full-Stack Product Engineer",
    description: "Gaoussou Diarra is a full-stack product engineer focused on Java/Spring Boot, Flutter, TypeScript, fintech, marketplaces, payments, KYC, APIs and applied AI automation.",
    cv: "assets/Gaoussou_Diarra_FullStack_Product_Engineer_CV.pdf",
    copied: "Copied!",
  },
  fr: {
    title: "Gaoussou Diarra — Ingénieur Produit Full-Stack",
    description: "Gaoussou Diarra est ingénieur produit full-stack, avec une expérience en Java/Spring Boot, Flutter, TypeScript, fintech, marketplaces, paiements, KYC, APIs et automatisation IA appliquée.",
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

document.getElementById("copyEmail")?.addEventListener("click", async () => {
  const btn = document.getElementById("copyEmail");
  try {
    await navigator.clipboard.writeText("gdiarrag@gmail.com");
    if (btn) btn.textContent = translations[lang].copied;
  } finally {
    setTimeout(() => {
      if (btn) btn.textContent = lang === "en" ? "Copy email" : "Copier l’email";
    }, 1800);
  }
});

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
