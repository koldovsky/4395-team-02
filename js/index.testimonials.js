const track = document.querySelector(".testimonials-carousel__track");
if (!track) return;
const slides = Array.from(track.children);
const buttonPrev = document.querySelector(".testimonials-carousel__btn--prev");
const buttonNext = document.querySelector(".testimonials-carousel__btn--next");

let currentIndex = 1;
updateSlide(currentIndex);

function updateSlide(position) {
    const slideWidth = slides[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${position * slideWidth }px)`;
}

buttonNext.addEventListener("click", ()=>{
    if(currentIndex >= slides.length - 1)return
    currentIndex++;
    track.style.transition = 'transform 0.5s ease'; 
    updateSlide(currentIndex);
});

buttonPrev.addEventListener("click", ()=>{
    if (currentIndex <= 0) return;
    currentIndex--;
    track.style.transition = 'transform 0.5s ease'; 
    updateSlide(currentIndex);
});

track.addEventListener("transitionend", () => {
    if(currentIndex === slides.length - 1){
        track.style.transition = "none";
        currentIndex = 1;
        updateSlide(currentIndex);
    }
    if(currentIndex === 0){
        track.style.transition = "none";
        currentIndex = slides.length - 2;
        updateSlide(currentIndex);
    }
});

window.addEventListener('resize', ()=>{
    track.style.transition = 'none';
    updateSlide(currentIndex);
});