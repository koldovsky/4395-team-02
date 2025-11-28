function init() {
  
  import("./index.testimonials.js");
  import("./index.work-steps.js");
<<<<<<< HEAD
  import("./index.sale.js");
=======
  import("./about-us.faq.js");
>>>>>>> 4134ed9320820e32e92d8bd02291ef9ef063d11a
}

const totalPartials = document.querySelectorAll(
  '[hx-trigger="load"], [data-hx-trigger="load"]'
).length;
let loadedPartialsCount = 0;

document.body.addEventListener("htmx:afterOnLoad", () => {
  loadedPartialsCount++;
  if (loadedPartialsCount === totalPartials) init();
});