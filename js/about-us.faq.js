function initAboutUsFaqAccordion() {
  const items = document.querySelectorAll(".about-faq__item");

  items.forEach(item => {
    const btn = item.querySelector(".about-faq__question");
    const answer = item.querySelector(".about-faq__answer");

    btn.addEventListener("click", () => {
      const isOpen = item.classList.contains("active");

      // Close everything (instantly trigger the close animation)
      items.forEach(i => {
        i.classList.remove("active");
        i.querySelector(".about-faq__question").setAttribute("aria-expanded", "false");
        const ans = i.querySelector(".about-faq__answer");
        ans.style.maxHeight = "0px";
      });

      // If this one wasn't open, we'll open it.
      if (!isOpen) {
        item.classList.add("active");
        btn.setAttribute("aria-expanded", "true");

        // Auto-height — for smooth animation
        requestAnimationFrame(() => {
          answer.style.maxHeight = answer.scrollHeight + "px";
        });
      }
    });
  });
}

initAboutUsFaqAccordion();
