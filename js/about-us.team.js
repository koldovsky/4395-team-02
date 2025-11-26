function initTeamCarousel() {
  const track = document.querySelector('.team__cards');
  const btnNext = document.querySelector('.team__carousel-next');
  const btnPrev = document.querySelector('.team__carousel-prev');

  if (!track || !btnNext || !btnPrev) return;

  const originalSlides = Array.from(
    track.querySelectorAll('.team__card')
  ).map((slide) => slide.outerHTML);

  const totalSlides = originalSlides.length;
  if (totalSlides === 0) return;

  let currentIndex = 0;

  function getSlidesToShow() {
    if (window.matchMedia('(min-width: 768px)').matches) return 2; 
    return 1; 
  }

  function render() {
    const slidesToShow = getSlidesToShow();
    const htmlSlides = [];

    for (let i = 0; i < slidesToShow; i++) {
      const idx = (currentIndex + i + totalSlides) % totalSlides;
      htmlSlides.push(originalSlides[idx]);
    }

    track.innerHTML = htmlSlides.join('');
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % totalSlides;
    render();
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    render();
  }

  render();

  btnNext.addEventListener('click', showNext);
  btnPrev.addEventListener('click', showPrev);
  window.addEventListener('resize', render);
}

initTeamCarousel();