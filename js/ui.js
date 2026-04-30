/* =========================================================
   Reveal on scroll (LAZY INIT placed early)
========================================================= */
import { I18N, lang } from "./i18n.js";

let reveal; 

export function initReveal() {
  if (!reveal) {
    reveal = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("in-view");
        });
      },
      { threshold: 0.2 }
    );
  }
  return reveal;
}

/* ---------- MENU TOGGLE (inject) ---------- */
export function mountMenuToggle() {
  const header = document.querySelector("header.nav");
  const nav = document.querySelector(".nav-links");
  const actions = document.querySelector(".actions");
  if (!header || !actions) return;

  let menuBtn = document.getElementById("menuToggle");
  if (!menuBtn) {
    menuBtn = document.createElement("button");
    menuBtn.id = "menuToggle";
    menuBtn.className = "btn secondary icon-btn";
    menuBtn.type = "button";
    menuBtn.setAttribute("aria-controls", "primaryNav");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.setAttribute(
      "aria-label",
      I18N[lang]?.toggles?.menuOpen || "Open menu"
    );
    menuBtn.innerHTML = "☰"; // simple hamburger
    // place it before the nav (left of links) for layout stability
    nav.id = "primaryNav";
    actions.appendChild(menuBtn);
  }

  // Handlers
  function openMenu() {
    document.documentElement.classList.add("nav-open");
    menuBtn.setAttribute("aria-expanded", "true");
    menuBtn.setAttribute(
      "aria-label",
      I18N[lang]?.toggles?.menuClose || "Close menu"
    );
  }
  function closeMenu() {
    document.documentElement.classList.remove("nav-open");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.setAttribute(
      "aria-label",
      I18N[lang]?.toggles?.menuOpen || "Open menu"
    );
  }
  function toggleMenu() {
    if (document.documentElement.classList.contains("nav-open")) closeMenu();
    else openMenu();
  }

  // Click to toggle
  menuBtn.onclick = toggleMenu;

  // Close on link click (for mobile)
  nav
    .querySelectorAll("a")
    .forEach((a) => a.addEventListener("click", closeMenu));

  // Close on ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // Close if resizing beyond breakpoint (keeps header stable)
  const MQ = window.matchMedia("(min-width: 900px)");
  MQ.addEventListener?.("change", (ev) => {
    if (ev.matches) closeMenu();
  });

  // expose for i18n updates
  window.__menuToggleAPI = { openMenu, closeMenu, toggleMenu, button: menuBtn };
}

/* ---------- Move toggles & CV into menu on mobile ---------- */
const MOBILE_MQ = window.matchMedia("(max-width: 900px)");

function ensureNavUtilitiesContainer() {
  const nav = document.querySelector(".nav-links");
  if (!nav) return null;
  let utils = nav.querySelector(".nav-utilities");
  if (!utils) {
    utils = document.createElement("div");
    utils.className = "nav-utilities";
    nav.appendChild(utils);
  }
  return utils;
}

export function relocateNavUtilities() {
  const actions = document.querySelector("header.nav .actions");
  const nav = document.querySelector(".nav-links");
  if (!actions || !nav) return;

  const utils = ensureNavUtilitiesContainer();
  if (!utils) return;

  // Grab current elements (they might already be in utils or actions)
  const theme = document.getElementById("themeToggle");
  const langBtn = document.getElementById("langToggle");
  // CV might be inside actions or already moved
  const cv =
    document.querySelector(".actions .btn.cv") ||
    document.querySelector(".nav-utilities .btn.cv");

  const widgets = [langBtn, theme, cv].filter(Boolean);

  if (MOBILE_MQ.matches) {
    // Move into the drawer
    widgets.forEach((el) => utils.appendChild(el));
  } else {
    // Move back to header action bar
    widgets.forEach((el) => actions.appendChild(el));
  }
}

export function initMobileUtils() {
    relocateNavUtilities();
    MOBILE_MQ.addEventListener?.("change", relocateNavUtilities);
}

/* =========================================================
   Scroll spy
========================================================= */
export function initScrollSpy() {
    const navLinks = [...document.querySelectorAll('.nav-links a[href^="#"]')];
    const sections = navLinks
      .map((a) => document.querySelector(a.getAttribute("href")))
      .filter(Boolean);
    const navHeight = document.querySelector("header.nav")?.offsetHeight || 0;
    
    const vis = new Map();
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          vis.set(entry.target, entry.isIntersecting ? entry.intersectionRatio : 0);
        });
        let best = null,
          bestRatio = 0;
        vis.forEach((ratio, el) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = el;
          }
        });
        if (!best) return;
        const id = best.id;
        navLinks.forEach((a) =>
          a.classList.toggle("active", a.getAttribute("href") === `#${id}`)
        );
      },
      {
        root: null,
        rootMargin: `-${navHeight + 8}px 0px -15% 0px`,
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );
    sections.forEach((s) => spy.observe(s));
}
