const track = document.querySelector(".testimonials-carousel__track");
const slides = Array.from(track.children);
const buttonPrev = document.querySelector(".testimonials-carousel__btn--prev");
const buttonNext = document.querySelector(".testimonials-carousel__btn--next");

let currentIndex = 1;
updateSlide(currentIndex);

function getSlideWidth() {
  return slides[0].getBoundingClientRect().width;
}

function updateSlide(position) {
  const slideWidth = slides[0].getBoundingClientRect().width;
  track.style.transform = `translateX(-${position * slideWidth}px)`;
}

buttonNext.addEventListener("click", () => {
  if (currentIndex >= slides.length - 1) return;
  currentIndex++;
  track.style.transition = "transform 0.5s ease";
  updateSlide(currentIndex);
});

buttonPrev.addEventListener("click", () => {
  if (currentIndex <= 0) return;
  currentIndex--;
  track.style.transition = "transform 0.5s ease";
  updateSlide(currentIndex);
});

track.addEventListener("transitionend", () => {
  if (currentIndex === slides.length - 1) {
    track.style.transition = "none";
    currentIndex = 1;
    updateSlide(currentIndex);
  }
  if (currentIndex === 0) {
    track.style.transition = "none";
    currentIndex = slides.length - 2;
    updateSlide(currentIndex);
  }
});

window.addEventListener("resize", () => {
  track.style.transition = "none";
  updateSlide(currentIndex);
});

// ==== DRAG / SWIPE  ====
let isDragging = false;
let isScrolling = false;
let startX = 0;
let startY = 0;
let currentTranslate = 0;
let prevTranslate = 0;

function start(e) {
  isDragging = true;
  isScrolling = false;
  track.style.transition = "none";

  const point = e.type.includes("mouse") ? e : e.touches[0];
  startX = point.clientX || point.pageX;
  startY = point.clientY || point.pageY;

  const slideWidth = getSlideWidth();
  prevTranslate = -currentIndex * slideWidth;
  currentTranslate = prevTranslate;

  track.style.cursor = "grabbing";
}

function drag(e) {
  if (!isDragging) return;

  const point = e.type.includes("mouse") ? e : e.touches[0];
  const currentX = point.clientX || point.pageX;
  const currentY = point.clientY || point.pageY;

  const deltaX = currentX - startX;
  const deltaY = currentY - startY;

  if (!isScrolling && Math.abs(deltaY) > Math.abs(deltaX)) {
    isScrolling = true;
    isDragging = false;
    track.style.cursor = "grab";
    return;
  }

  if (isScrolling) return;

  currentTranslate = prevTranslate + deltaX;
  track.style.transform = `translateX(${currentTranslate}px)`;

  if (e.cancelable) e.preventDefault();
}

function end() {
  if (!isDragging) return;
  isDragging = false;

  const slideWidth = getSlideWidth();
  const movedBy = currentTranslate - prevTranslate;

  const threshold = 100;

  if (movedBy < -threshold && currentIndex < slides.length - 1) {
    currentIndex += 1;
  }

  if (movedBy > threshold && currentIndex > 0) {
    currentIndex -= 1;
  }

  track.style.transition = "transform 0.5s ease";
  updateSlide(currentIndex);
  track.style.cursor = "grab";
}

track.addEventListener("mousedown", start);
window.addEventListener("mousemove", drag);
window.addEventListener("mouseup", end);
window.addEventListener("mouseleave", end);

track.addEventListener("touchstart", start, { passive: false });
window.addEventListener("touchmove", drag, { passive: false });
window.addEventListener("touchend", end, { passive: false });
window.addEventListener("touchcancel", end, { passive: false });