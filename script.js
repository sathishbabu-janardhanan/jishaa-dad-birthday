const panels = document.querySelectorAll('.reveal');

const revealPanels = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    observer.unobserve(entry.target);
  });
}, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });

panels.forEach((panel) => revealPanels.observe(panel));

const surprise = document.querySelector('.surprise');
const surpriseTrigger = document.querySelector('.surprise-trigger');
const surpriseClose = document.querySelector('.surprise-close');

surpriseTrigger?.addEventListener('click', () => {
  surprise.classList.add('is-open');
  surprise.setAttribute('aria-hidden', 'false');
  surprise.scrollIntoView({ behavior: 'smooth' });
});

surpriseClose?.addEventListener('click', () => {
  surprise.classList.remove('is-open');
  surprise.setAttribute('aria-hidden', 'true');
  document.querySelector('.new-cover')?.scrollIntoView({ behavior: 'smooth' });
});
