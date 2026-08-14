"use strict";

const body = document.body;
const preloader = document.querySelector(".preloader");

const dismissPreloader = () => {
  window.setTimeout(() => {
    body.classList.remove("is-loading");
    body.classList.add("is-ready");
    preloader?.setAttribute("aria-hidden", "true");
  }, 2000);
};

if (document.readyState === "complete") {
  dismissPreloader();
} else {
  window.addEventListener("load", dismissPreloader, { once: true });
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));

    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", link.getAttribute("href"));
  });
});

const contactForm = document.querySelector(".contact-form");
const formStatus = document.querySelector(".form-status");

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!contactForm.checkValidity()) {
    formStatus.textContent = "Kérjük, töltse ki az összes mezőt.";
    contactForm.reportValidity();
    return;
  }

  formStatus.textContent = "Köszönjük az üzenetét!";
  contactForm.reset();
});
