import { initTheme } from "./theme.js";
import { I18N, initLanguage, lang } from "./i18n.js";
import { mountMenuToggle, initMobileUtils, initScrollSpy, relocateNavUtilities } from "./ui.js";
import { initProjects, refreshList } from "./projects.js";

/* =========================================================
   Boot
========================================================= */
initTheme();
mountMenuToggle();
initMobileUtils();
initScrollSpy();

// Initialize Language with callbacks for refreshing projects and relocating utilities
initLanguage(
    () => refreshList(), // Refresh projects when language changes
    () => relocateNavUtilities() // Relocate utilities when language changes (if needed)
);

initProjects();

/* =========================================================
   Contact
========================================================= */
document.getElementById("copyEmail")?.addEventListener("click", async () => {
  const btn = document.getElementById("copyEmail");

  try {
    await navigator.clipboard.writeText("gdiarrag@gmail.com");
    btn.textContent = I18N[lang].contact.copied;
    setTimeout(() => {
      btn.textContent = I18N[lang].contact.copyEmail;
    }, 1800);
  } catch {
    btn.textContent = I18N[lang].contact.copyEmail;
  }
});

const form = document.getElementById("form");
form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const status = document.getElementById("form-status");
  const submitBtn = document.getElementById("form-button");
  const data = new FormData(form);

  if (submitBtn) submitBtn.disabled = true;
  if (status) status.textContent = "";

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: data,
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      throw new Error("Form submission failed");
    }

    if (status) status.textContent = I18N[lang].contact.success;
    form.reset();
  } catch {
    if (status) status.textContent = I18N[lang].contact.error;
  } finally {
    if (submitBtn) submitBtn.disabled = false;
  }
});

// Year
document.getElementById("year").textContent = new Date().getFullYear();
