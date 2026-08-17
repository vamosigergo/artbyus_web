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
const submitButton = document.querySelector(".submit-btn");
const submitText = submitButton?.querySelector("span");

contactForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Saját validáció
  if (!contactForm.checkValidity()) {
    formStatus.textContent = "Kérjük, töltse ki az összes mezőt.";
    contactForm.reportValidity();
    return;
  }

  // Küldés állapot
  if (submitText) {
    submitText.textContent = "KÜLDÉS...";
  }

  submitButton?.setAttribute("disabled", "true");
  formStatus.textContent = "";

  try {
    const formData = new FormData(contactForm);

    const response = await fetch(contactForm.action, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json"
      }
    });

    const result = await response.json();

    if (response.ok) {
      formStatus.textContent = "Köszönjük az üzenetét!";
      contactForm.reset();

      if (submitText) {
        submitText.textContent = "ELKÜLDVE";
      }

      // 3 másodperc után visszaáll a gomb
      setTimeout(() => {
        if (submitText) {
          submitText.textContent = "KÜLDÉS";
        }

        submitButton?.removeAttribute("disabled");
        formStatus.textContent = "";
      }, 3000);

    } else {
      throw new Error(result.message || "Hiba történt a küldés során.");
    }

  } catch (error) {
    console.error("Form submission error:", error);

    formStatus.textContent =
      "Hiba történt az üzenet küldése közben. Kérjük, próbálja újra.";

    if (submitText) {
      submitText.textContent = "KÜLDÉS";
    }

    submitButton?.removeAttribute("disabled");
  }
});
