function init() {
  
  import("./index.testimonials.js");
  import("./index.faq.partial.js");
  import("./index.work-steps.js");
  import("./index.sale.js");
}

const totalPartials = document.querySelectorAll(
  '[hx-trigger="load"], [data-hx-trigger="load"]'
).length;
let loadedPartialsCount = 0;

document.body.addEventListener("htmx:afterOnLoad", () => {
  loadedPartialsCount++;
  if (loadedPartialsCount === totalPartials) init();
});