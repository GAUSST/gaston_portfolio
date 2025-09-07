import { I18N } from "./il8n.js";
import { PROJECTS } from "./projects-data.js";

/* =========================================================
   Setup: buttons, constants
========================================================= */

// Create View more/less toggle button under projects
let toggleBtn = document.getElementById("toggleProjects");
if (!toggleBtn) {
  toggleBtn = document.createElement("button");
  toggleBtn.id = "toggleProjects";
  toggleBtn.className = "btn secondary";
  toggleBtn.style.marginTop = ".75rem";
  document.getElementById("projects")?.appendChild(toggleBtn);
}

const SHOW_DEFAULT = 6;
let showAll = false;

/* =========================================================
   Reveal on scroll (LAZY INIT placed early)
========================================================= */
let reveal; // declared early

function initReveal() {
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

/* =========================================================
   Theme toggle (dark / light)
========================================================= */
const themeToggle = document.getElementById("themeToggle");
const STORAGE_KEY = "gd_theme";

function setTheme(mode) {
  document.documentElement.dataset.theme = mode;
  document.documentElement.style.colorScheme = mode;
  themeToggle?.setAttribute("aria-pressed", String(mode === "dark"));
}
const savedTheme = localStorage.getItem(STORAGE_KEY);
if (savedTheme) {
  setTheme(savedTheme);
} else {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  setTheme(prefersDark ? "dark" : "light");
}
themeToggle?.addEventListener("click", () => {
  const next =
    document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  setTheme(next);
  localStorage.setItem(STORAGE_KEY, next);
});

/* =========================================================
   i18n (English / French)
========================================================= */
const LANG_KEY = "gd_lang";
let lang =
  localStorage.getItem(LANG_KEY) ||
  (navigator.language?.startsWith("fr") ? "fr" : "en");

const cv_btn = document.querySelector(".actions .btn.cv");

cv_btn.href =
  lang === "fr" ? "assets/Dev_CV_French.pdf" : "assets/Dev_CV_English.pdf";

/* ---------- MENU TOGGLE (inject) ---------- */
function mountMenuToggle() {
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
mountMenuToggle();

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

function relocateNavUtilities() {
  const actions = document.querySelector("header.nav .actions");
  const nav = document.querySelector(".nav-links");
  if (!actions || !nav) return;

  const utils = ensureNavUtilitiesContainer();
  if (!utils) return;

  // Grab current elements (they might already be in utils or actions)
  const theme = document.getElementById("themeToggle");
  const lang = document.getElementById("langToggle");
  // CV might be inside actions or already moved
  const cv =
    document.querySelector(".actions .btn.cv") ||
    document.querySelector(".nav-utilities .btn.cv");

  const widgets = [lang, theme, cv].filter(Boolean);

  if (MOBILE_MQ.matches) {
    // Move into the drawer
    widgets.forEach((el) => utils.appendChild(el));
  } else {
    // Move back to header action bar
    widgets.forEach((el) => actions.appendChild(el));
  }
}

// Run once and on viewport changes
relocateNavUtilities();
MOBILE_MQ.addEventListener?.("change", relocateNavUtilities);

/* ---------- language toggle ---------- */
(function mountLangToggle() {
  const actions = document.querySelector("header.nav .actions");
  if (!actions) return;
  let btn = document.getElementById("langToggle");
  if (!btn) {
    btn = document.createElement("button");
    btn.id = "langToggle";
    btn.className = "btn secondary icon-btn";
    btn.type = "button";
    btn.title = "Toggle language";
    btn.setAttribute("aria-label", "Toggle language");
    btn.textContent = I18N[lang].toggles.langBtn;
    actions.insertBefore(btn, actions.firstChild);
  }
  btn.onclick = () => {
    lang = lang === "en" ? "fr" : "en";
    localStorage.setItem(LANG_KEY, lang);
    applyI18n();
    refreshList(); // re-render projects localized
    cv_btn.href =
      lang === "fr" ? "assets/Dev_CV_French.pdf" : "assets/Dev_CV_English.pdf";
  };
})();

function getByPath(obj, path) {
  return path
    .split(".")
    .reduce((o, k) => (o && k in o ? o[k] : undefined), obj);
}

/* =========================================================
   Static sections (Experience, Education, Languages)
========================================================= */
function renderExperience() {
  const box = document.querySelector("#experience .timeline");
  if (!box) return;
  box.innerHTML = (I18N[lang].experience || [])
    .map(
      (item) => `
      <div class="tl-item">
        <h3>${item.title}</h3>
        <p class="small">${item.period}</p>
        <p>${item.desc || ""}</p>
      </div>
    `
    )
    .join("");
}

function renderEducation() {
  const box = document.querySelector("#education .timeline");
  if (!box) return;
  box.innerHTML = (I18N[lang].education || [])
    .map(
      (item) => `
      <div class="tl-item">
        <h3>${item.title}</h3>
        <p class="small">${item.period}</p>
      </div>
    `
    )
    .join("");
}

function renderLanguages() {
  const grid = document.querySelector("#languages .grid");
  if (!grid) return;
  grid.innerHTML = (I18N[lang].languages || [])
    .map(
      (l) => `
      <div class="card reveal">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <strong>${l.name}</strong><span class="small">${l.level}</span>
        </div>
        <div class="lang-bar" aria-hidden="true"><span style="width: ${l.percent}%"></span></div>
      </div>
    `
    )
    .join("");
}

function renderStaticSections() {
  renderExperience();
  renderEducation();
  renderLanguages();
  const obs = initReveal();
  document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
}

/* =========================================================
   applyI18n — translate UI + render static sections
========================================================= */
function applyI18n() {
  // Meta
  document.title = I18N[lang].meta.title;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute("content", I18N[lang].meta.desc);

  // Data-bound text nodes
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const val = getByPath(I18N[lang], key);
    if (val != null) {
      if (el.hasAttribute("data-i18n-html")) el.innerHTML = val;
      else el.textContent = val;
    }
  });

  // Attribute translations
  document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
    const pairs = el.getAttribute("data-i18n-attr").split("|");
    pairs.forEach((pair) => {
      const [attr, key] = pair.split(":");
      const val = getByPath(I18N[lang], key);
      if (attr && val != null) el.setAttribute(attr.trim(), val);
    });
  });

  // Theme toggle label
  const themeBtn = document.getElementById("themeToggle");
  if (themeBtn) themeBtn.setAttribute("aria-label", I18N[lang].toggles.theme);

  // Lang toggle label text
  const langBtn = document.getElementById("langToggle");
  if (langBtn) langBtn.textContent = I18N[lang].toggles.langBtn;

  // Menu toggle aria-label
  const menuBtn = document.getElementById("menuToggle");
  if (menuBtn) {
    const expanded = menuBtn.getAttribute("aria-expanded") === "true";
    menuBtn.setAttribute(
      "aria-label",
      expanded
        ? I18N[lang]?.toggles?.menuClose || "Close menu"
        : I18N[lang]?.toggles?.menuOpen || "Open menu"
    );
  }

  // Search + empty state + view toggle
  const searchEl = document.getElementById("projectSearch");
  if (searchEl) searchEl.placeholder = I18N[lang].projects.searchPH;
  const emptyEl = document.getElementById("emptyState");
  if (emptyEl) emptyEl.textContent = I18N[lang].projects.empty;

  updateToggleText(); // set View more/less label
  renderStaticSections(); // (re)build Experience/Education/Languages
}

/* =========================================================
   Projects
========================================================= */
function L(p, field) {
  if (lang === "fr" && p[`${field}_fr`]) return p[`${field}_fr`];
  return p[field] || "";
}

const aliasMap = {
  html: ["html", "css"],
  css: ["css", "html"],
  sass: ["sass", "css"],
  react: ["react", "javascript", "typescript"],
  angular: ["angular", "javascript", "typescript"],
  php: ["php"],
  laravel: ["laravel", "php"],
  mysql: ["mysql", "php"],
  flutter: ["flutter", "dart"],
  dart: ["dart", "flutter"],
  springboot: ["springboot", "java"],
  git: ["git", "github", "gitlab"],
  backend: ["backend"],
  "full-stack": ["fullstack", "frontend", "backend"],
};
const norm = (s) => (s || "").toLowerCase().replace(/[^a-z0-9]+/g, "");
const expandTag = (raw) => {
  const n = norm(raw);
  for (const [key, alts] of Object.entries(aliasMap)) {
    if (key === n || alts.includes(n)) return key;
  }
  return n;
};

const PROJECTS_NORM = PROJECTS.map((p) => {
  const base = (p.tags || []).map((t) => expandTag(t));
  const withAliases = base.flatMap((b) =>
    b === "git" ? ["git", "github", "gitlab"] : [b]
  );
  return { ...p, _tagsNorm: Array.from(new Set(withAliases)) };
});

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const listEl = document.getElementById("projectList");
const emptyEl = document.getElementById("emptyState");
const searchEl = document.getElementById("projectSearch");
const skillTags = [...document.querySelectorAll(".skills .tag")];

function renderProjects(items) {
  listEl.innerHTML = items
    .map(
      (p) => `
      <article class="card project project-vertical reveal" data-tags="${(
        p.tags || []
      ).join(" ")}">
        <img class="project-media" alt="${p.title} preview" src="${
        p.image
      }" loading="lazy" width="800" height="450" />
        <div class="meta below">
          <h3>${p.title}</h3>
          <p class="small">${L(p, "subtitle")}</p>
          <p class="desc">${L(p, "description")}</p>
          <div class="tags">${(p.tags || [])
            .map((t) => `<span class="chip">${t}</span>`)
            .join("")}</div>
          ${
            p.link
              ? `<div style="margin-top:.5rem"><a class="btn secondary" href="${p.link}" target="_blank" rel="noopener">${I18N[lang].projects.view}</a></div>`
              : ""
          }
        </div>
      </article>`
    )
    .join("");
  const obs = initReveal();
  document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
}

let activeSkill = null;

function updateToggleText(_items = null, isAll = showAll) {
  toggleBtn.textContent = isAll
    ? I18N[lang].projects.less
    : I18N[lang].projects.more;
}

function getFilteredItems() {
  const q = (searchEl.value || "").toLowerCase();
  let items = PROJECTS_NORM;

  if (activeSkill) {
    items = items.filter((p) => p._tagsNorm.includes(activeSkill));
  }
  if (q) {
    items = items.filter((p) =>
      [p.title, L(p, "subtitle"), L(p, "description"), (p.tags || []).join(" ")]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }
  return shuffle(items.slice());
}

function refreshList() {
  const items = getFilteredItems();
  const visible = showAll ? items : items.slice(0, SHOW_DEFAULT);
  renderProjects(visible);
  emptyEl.hidden = visible.length > 0;
  toggleBtn.hidden = items.length <= SHOW_DEFAULT;
  updateToggleText(items, showAll);
}

/* =========================================================
   Scroll spy
========================================================= */
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

/* =========================================================
   Boot
========================================================= */
applyI18n(); // sets UI strings + renders static sections
refreshList(); // renders projects

// Search
searchEl.addEventListener("input", () => {
  showAll = false;
  refreshList();
});

// Skill chips
skillTags.forEach((tag) =>
  tag.addEventListener("click", () => {
    const firstWord = tag.textContent.split(/[\/,]/)[0];
    const key = expandTag(firstWord);
    if (activeSkill === key) {
      activeSkill = null;
      tag.classList.remove("active");
    } else {
      skillTags.forEach((t) => t.classList.remove("active"));
      tag.classList.add("active");
      activeSkill = key;
    }
    showAll = false;
    refreshList();
  })
);

// View more / View less
toggleBtn.addEventListener("click", () => {
  showAll = !showAll;
  refreshList();
});

/* =========================================================
   Contact
========================================================= */
document.getElementById("copyEmail")?.addEventListener("click", () => {
  navigator.clipboard.writeText("gdiarrag@gmail.com");
  const btn = document.getElementById("copyEmail");
  const label = btn.textContent;
  btn.textContent = "Copied!";
  setTimeout(() => (btn.textContent = label), 1800);
});

// Year
document.getElementById("year").textContent = new Date().getFullYear();
