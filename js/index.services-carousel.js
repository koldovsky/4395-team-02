document.addEventListener("DOMContentLoaded", initServicesCarousel);
document.body.addEventListener("htmx:afterSwap", initServicesCarousel);

function initServicesCarousel() {
    const track = document.querySelector("#servicesTrack");
    if (!track || track.dataset.initialized) return;

    new ServicesCarousel(track);
    track.dataset.initialized = "true";
}

class ServicesCarousel {
    constructor(track) {
        this.track = track;
        this.prevBtn = document.querySelector("#servicesPrev");
        this.nextBtn = document.querySelector("#servicesNext");

        this.prevBtn.onclick = () => this.moveLeft();
        this.nextBtn.onclick = () => this.moveRight();

        window.addEventListener("resize", () => this.reset());
        this.reset();
    }

    slideWidth() {
        const first = this.track.children[0];
        const gap = parseInt(getComputedStyle(this.track).gap);
        return first.offsetWidth + gap;
    }

    reset() {
        this.track.style.transition = "none";
        this.track.style.transform = "translateX(0)";
        requestAnimationFrame(() => {
            this.track.style.transition = "transform .45s ease";
        });
    }

    moveLeft() {
        const w = this.slideWidth();
        this.track.prepend(this.track.lastElementChild);
        this.track.style.transition = "none";
        this.track.style.transform = `translateX(-${w}px)`;
        requestAnimationFrame(() => {
            this.track.style.transition = "transform .45s ease";
            this.track.style.transform = "translateX(0)";
        });
    }

    moveRight() {
        const w = this.slideWidth();
        this.track.append(this.track.firstElementChild);
        this.track.style.transition = "none";
        this.track.style.transform = `translateX(${w}px)`;
        requestAnimationFrame(() => {
            this.track.style.transition = "transform .45s ease";
            this.track.style.transform = "translateX(0)";
        });
    }
}
