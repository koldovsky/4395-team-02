function initTeamCarousel() {
  const track = document.querySelector('.team__cards');
  const stage = document.querySelector('.team__stage');
  const btnNext = document.querySelector('.team__carousel-next');
  const btnPrev = document.querySelector('.team__carousel-prev');
  
  if (!track || !stage || !btnNext || !btnPrev) return;

  const originalSlides = Array.from(track.querySelectorAll('.team__card'));
  const totalSlides = originalSlides.length;
  
  if (totalSlides === 0) return;

  const clonesBefore = originalSlides.map(slide => slide.cloneNode(true));
  const clonesAfter = originalSlides.map(slide => slide.cloneNode(true));
  
  clonesAfter.forEach(clone => track.appendChild(clone));
  clonesBefore.reverse().forEach(clone => {
    track.insertBefore(clone, track.firstChild);
  });

  let currentIndex = totalSlides;
  let isTransitioning = false;
  let isResizing = false;

  function getSlidesToShow() {
    return window.matchMedia('(min-width: 768px)').matches ? 2 : 1;
  }

  function getSlideWidth() {
    const allSlides = track.querySelectorAll('.team__card');
    const card = allSlides[0];
    const gap = parseInt(getComputedStyle(track).gap) || 30;
    return card.offsetWidth + gap;
  }

  function updatePosition(withTransition = true) {
    const slideWidth = getSlideWidth();
    const slidesToShow = getSlidesToShow();
    let offset = currentIndex * slideWidth;
    
    if (slidesToShow === 1) {
      const stageWidth = stage.offsetWidth;
      const cardWidth = track.querySelector('.team__card').offsetWidth;
      const centerOffset = (stageWidth - cardWidth) / 2;
      offset = offset - centerOffset;
    }
    
    track.style.transition = withTransition ? 'transform 0.5s ease' : 'none';
    
    if (!withTransition) {
      void track.offsetWidth;
    }
    
    track.style.transform = `translateX(-${offset}px)`;
  }

  function normalizeIndex() {
    while (currentIndex < totalSlides) {
      currentIndex += totalSlides;
    }
    while (currentIndex >= totalSlides * 2) {
      currentIndex -= totalSlides;
    }
  }

  function handleTransitionEnd(e) {
    if (e.propertyName !== 'transform') return;
    
    if (currentIndex >= totalSlides * 2) {
      currentIndex = totalSlides;
      updatePosition(false);
    }
    else if (currentIndex < totalSlides) {
      currentIndex = totalSlides * 2 - 1;
      updatePosition(false);
    }
    
    isTransitioning = false;
  }

  function showNext() {
    if (isTransitioning || isResizing) return;
    isTransitioning = true;
    currentIndex++;
    updatePosition(true);
  }

  function showPrev() {
    if (isTransitioning || isResizing) return;
    isTransitioning = true;
    currentIndex--;
    updatePosition(true);
  }

  track.addEventListener('transitionend', handleTransitionEnd);

  btnNext.addEventListener('click', showNext);
  btnPrev.addEventListener('click', showPrev);

  let resizeTimer;
  let lastWidth = window.innerWidth;

  window.addEventListener('resize', () => {
    const currentWidth = window.innerWidth;
    
    if (Math.abs(currentWidth - lastWidth) < 10) return;
    
    lastWidth = currentWidth;
    isResizing = true;
    
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      normalizeIndex();
      updatePosition(false);
      isResizing = false;
    }, 250);
  });

  updatePosition(false);
}

initTeamCarousel();