const track = document.getElementById("servicesTrack");
const cards = track.querySelectorAll(".services__card");

const btnNext = document.getElementById("servicesNext");
const btnPrev = document.getElementById("servicesPrev");

btnNext.addEventListener("click", () => {
    const cardWidth = cards[0].offsetWidth + 30;
    track.scrollBy({ left: cardWidth, behavior: "smooth" });
});

btnPrev.addEventListener("click", () => {
    const cardWidth = cards[0].offsetWidth + 30;
    track.scrollBy({ left: -cardWidth, behavior: "smooth" });
});
