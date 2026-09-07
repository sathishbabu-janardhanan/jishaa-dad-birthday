const reveals = document.querySelectorAll('.reveal');
const progressBar = document.querySelector('#progress-bar');
const chapterLinks = document.querySelectorAll('.chapter-timeline a');
const chapters = document.querySelectorAll('.new-chapter[data-year], .dad-message[data-year]');

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    observer.unobserve(entry.target);
  });
}, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' });

reveals.forEach((element) => revealObserver.observe(element));

const progressObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const year = entry.target.dataset.year;
    chapterLinks.forEach((link) => link.classList.toggle('is-current', link.dataset.year === year));
  });
}, { threshold: 0.55 });

chapters.forEach((chapter) => progressObserver.observe(chapter));

const updateProgress = () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const amount = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  if (progressBar) progressBar.style.width = `${Math.min(100, amount)}%`;
};

window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

const archiveImages = {
  2016: [['assets/8A691CDA-2CD7-4BF6-A843-15FEBD794D8B_1_105_c 2.jpeg', 'Baby Jishaa']],
  2017: [['assets/71EE08DA-46D1-4B65-A377-E92B7F4A1136_1_105_c.jpeg', 'Little explorer']],
  2018: [['assets/CFD838CF-367A-4644-9933-82A0D7249D98_1_105_c.jpeg', 'A funny family moment']],
  2019: [['assets/7E3CC3D7-1BAD-4408-8C01-6026AFCAB7F0_1_105_c.jpeg', 'Big dreams']],
  2020: [['assets/IMG_9881.JPG.jpeg', 'An outdoor adventure']],
  2021: [['assets/A1441D82-EA74-48EF-8BA0-AE46C2EFC959_1_105_c.jpeg', 'The little things']],
  2022: [['assets/443E2CDD-9409-47D0-BC8D-0B9E1C48EA36_1_105_c.jpeg', 'Superhero energy']],
  2023: [['assets/95E81F34-0BA3-40B4-B0C3-9A0C664B5E44_1_105_c.jpeg', 'Growing up']],
  2024: [['assets/9AFC6DFF-710C-4988-9B2D-B71C4C70D595_1_105_c.jpeg', 'Level 10']],
  2025: [['assets/8CA67173-4D11-4029-B88D-08BCA58646D5_1_105_c.jpeg', 'Always my little girl']],
  2026: []
};

const archiveResult = document.querySelector('.archive-result');
const archiveOpen = document.querySelector('.archive-open');
const archiveContent = document.querySelector('.archive-content');

archiveOpen?.addEventListener('click', () => {
  const isOpen = archiveOpen.getAttribute('aria-expanded') === 'true';
  archiveOpen.setAttribute('aria-expanded', String(!isOpen));
  archiveOpen.textContent = isOpen ? 'Open the final page' : 'Close the archive';
  archiveContent.hidden = isOpen;
  if (!isOpen) archiveContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

document.querySelectorAll('[data-archive-year]').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-archive-year]').forEach((item) => item.classList.remove('is-selected'));
    button.classList.add('is-selected');
    const memories = archiveImages[button.dataset.archiveYear] || [];
    archiveResult.innerHTML = memories.length
      ? memories.map(([src, alt]) => `<figure><img src="${src}" alt="${alt}" loading="lazy"><figcaption>${button.dataset.archiveYear} · ${alt}</figcaption></figure>`).join('')
      : '<p>More memories coming soon...</p>';
  });
});

const audio = document.querySelector('#dad-audio');
const audioToggle = document.querySelector('.audio-toggle');
const audioNote = document.querySelector('#audio-note');
const audioProgress = document.querySelector('.audio-progress span');
const currentTime = document.querySelector('[data-audio-current]');
const duration = document.querySelector('[data-audio-duration]');

const formatTime = (seconds) => {
  if (!Number.isFinite(seconds)) return '--:--';
  return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;
};

if (audio) {
  audio.addEventListener('loadedmetadata', () => {
    audioToggle.disabled = false;
    audioNote.hidden = true;
    duration.textContent = formatTime(audio.duration);
  });
  audio.addEventListener('timeupdate', () => {
    currentTime.textContent = formatTime(audio.currentTime);
    audioProgress.style.width = `${audio.duration ? (audio.currentTime / audio.duration) * 100 : 0}%`;
  });
  audio.addEventListener('play', () => { audioToggle.querySelector('span').textContent = '❚❚'; });
  audio.addEventListener('pause', () => { audioToggle.querySelector('span').textContent = '▶'; });
  audio.addEventListener('error', () => { audioToggle.disabled = true; audioNote.hidden = false; });
  audioToggle?.addEventListener('click', () => (audio.paused ? audio.play() : audio.pause()));
}

const montageCards = [...document.querySelectorAll('.montage-card')];
const montageStatus = document.querySelector('#montage-status');
const montageToggle = document.querySelector('#montage-toggle');
let montageIndex = 0;
let montageTimer;
let montagePaused = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const showMontageCard = (index) => {
  montageCards.forEach((card, cardIndex) => card.classList.toggle('is-active', cardIndex === index));
  if (montageStatus) montageStatus.textContent = `${index + 1} / ${montageCards.length}`;
};

const startMontage = () => {
  clearInterval(montageTimer);
  if (montagePaused) return;
  montageTimer = setInterval(() => {
    montageIndex = (montageIndex + 1) % montageCards.length;
    showMontageCard(montageIndex);
  }, 4200);
};

montageToggle?.addEventListener('click', () => {
  montagePaused = !montagePaused;
  montageToggle.textContent = montagePaused ? 'Play montage' : 'Pause montage';
  montageToggle.setAttribute('aria-pressed', String(montagePaused));
  startMontage();
});

showMontageCard(0);
startMontage();
