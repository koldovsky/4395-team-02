function showSuccessModal() {
  const existingModal = document.querySelector(".contact-success-modal");
  if (existingModal) {
    existingModal.remove();
  }

  const modal = document.createElement("div");
  modal.className = "contact-success-modal";
  
  const modalContent = document.createElement("div");
  modalContent.className = "contact-success-modal__content";
  
  const checkmark = document.createElement("div");
  checkmark.className = "contact-success-modal__checkmark";
  checkmark.innerHTML = `
    <svg viewBox="0 0 52 52" class="checkmark-svg">
      <circle class="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
      <path class="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
    </svg>
  `;
  
  const message = document.createElement("p");
  message.className = "contact-success-modal__message";
  message.textContent = "Thank you for subscribing, we will contact you soon";
  
  modalContent.appendChild(checkmark);
  modalContent.appendChild(message);
  modal.appendChild(modalContent);
  
  document.body.appendChild(modal);
  
  setTimeout(() => {
    modal.classList.add("contact-success-modal--show");
  }, 10);
  
  setTimeout(() => {
    modal.classList.remove("contact-success-modal--show");
    setTimeout(() => {
      modal.remove();
    }, 300);
  }, 3000);
}

function setupContactForm() {
    const contactForm = document.querySelector(".contact__form");
    if (!contactForm) return;
  
    if (contactForm.dataset.listenerAdded === "true") return;
    contactForm.dataset.listenerAdded = "true";
  
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const form = e.target;
      const formData = new FormData(form);
  
      try {
        const response = await fetch(form.action, {
          method: form.method,
          body: formData,
          headers: {
            Accept: "application/json",
          },
        });
  
        if (response.ok) {
          showSuccessModal();
          form.reset();
        } else {
          const data = await response.json();
          const errorMessage = data.error || "Oops! There was a problem sending your message";
          alert(errorMessage);
        }
      } catch (error) {
        console.error("Error submitting contact form:", error);
        alert("Oops! There was a problem sending your message");
      }
    });
  }
  
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupContactForm);
  } else {
    setupContactForm();
  }
  
  if (typeof htmx !== "undefined") {
    document.body.addEventListener("htmx:afterSwap", () => {
      setTimeout(setupContactForm, 100);
    });
  }