import { PROJECTS } from "./projects-data.js";
import { I18N, lang } from "./i18n.js";
import { initReveal } from "./ui.js";

/* =========================================================
   Projects
========================================================= */
const SHOW_DEFAULT = 6;
let showAll = false;
let activeSkill = null;

// Create View more/less toggle button under projects
let toggleBtn = document.getElementById("toggleProjects");
if (!toggleBtn) {
  toggleBtn = document.createElement("button");
  toggleBtn.id = "toggleProjects";
  toggleBtn.className = "btn secondary";
  toggleBtn.style.marginTop = ".75rem";
  document.getElementById("projects")?.appendChild(toggleBtn);
}

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
          ${
            L(p, "value")
              ? `<p class="project-value">${L(p, "value")}</p>`
              : ""
          }
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
      [
        p.title,
        L(p, "subtitle"),
        L(p, "description"),
        L(p, "value"),
        (p.tags || []).join(" "),
      ]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }
  return items.slice();
}

export function refreshList() {
  const items = getFilteredItems();
  const visible = showAll ? items : items.slice(0, SHOW_DEFAULT);
  renderProjects(visible);
  emptyEl.hidden = visible.length > 0;
  toggleBtn.hidden = items.length <= SHOW_DEFAULT;
  updateToggleText(items, showAll);
}

export function initProjects() {
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
    
    refreshList();
}
