const steps = document.querySelectorAll('.work-steps__item');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
});

steps.forEach(step => observer.observe(step));

document.querySelectorAll('.work-steps__item').forEach(item => {
  item.addEventListener('mouseenter', () => item.classList.add('active'));
  item.addEventListener('mouseleave', () => item.classList.remove('active'));
});
