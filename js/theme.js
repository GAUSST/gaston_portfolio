/* =========================================================
   Theme toggle (dark / light)
========================================================= */
const STORAGE_KEY = "gd_theme";

export function setTheme(mode) {
  const themeToggle = document.getElementById("themeToggle");
  document.documentElement.dataset.theme = mode;
  document.documentElement.style.colorScheme = mode;
  themeToggle?.setAttribute("aria-pressed", String(mode === "dark"));
}

export function initTheme() {
  const themeToggle = document.getElementById("themeToggle");
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
}
