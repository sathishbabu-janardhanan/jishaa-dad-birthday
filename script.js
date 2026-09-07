const reveals = document.querySelectorAll('.reveal');
const progressBar = document.querySelector('#progress-bar');
const chapterLinks = document.querySelectorAll('.chapter-timeline a');
const chapters = document.querySelectorAll('.new-chapter[data-chapter], .dad-message[data-chapter]');
const opening = document.querySelector('.storybook-opening');
const openingSkip = document.querySelector('.opening-skip');
const replayStory = document.querySelector('#replay-story');

const imageInventory = [
  {
    file: 'assets/8A691CDA-2CD7-4BF6-A843-15FEBD794D8B_1_105_c 2.jpeg',
    usedIn: ['opening', 'chapter-01', 'chapter-08', 'montage'],
    chapter: 'Chapter 01 / Chapter 08',
    currentYearLabel: '2016',
    alt: 'Baby Jishaa resting on a colorful blanket',
    yearExplicitlyKnown: true
  },
  {
    file: 'assets/852BC40E-C2A4-404F-9317-304C58494FBE_1_105_c 2.jpeg',
    usedIn: ['chapter-01'],
    chapter: 'Chapter 01',
    currentYearLabel: null,
    alt: 'Dad holding and smiling with baby Jishaa',
    yearExplicitlyKnown: false
  },
  {
    file: 'assets/F75C6482-3452-4AE1-BF57-35CE42D8E7C2 2.jpeg',
    usedIn: ['chapter-01'],
    chapter: 'Chapter 01',
    currentYearLabel: null,
    alt: 'Dad and baby Jishaa sharing a close moment',
    yearExplicitlyKnown: false
  },
  {
    file: 'assets/71EE08DA-46D1-4B65-A377-E92B7F4A1136_1_105_c.jpeg',
    usedIn: ['chapter-02'],
    chapter: 'Chapter 02',
    currentYearLabel: null,
    alt: 'Jishaa learning to skate',
    yearExplicitlyKnown: false
  },
  {
    file: 'assets/11BB57B6-09C9-4758-A8AE-E01522E7E20E_1_105_c.jpeg',
    usedIn: ['chapter-02'],
    chapter: 'Chapter 02',
    currentYearLabel: null,
    alt: 'Jishaa climbing an indoor wall',
    yearExplicitlyKnown: false
  },
  {
    file: 'assets/32D3E3A3-0EDA-48BE-B614-C01B724E0D70_1_105_c.jpeg',
    usedIn: ['chapter-02'],
    chapter: 'Chapter 02',
    currentYearLabel: null,
    alt: 'Jishaa exploring a colorful play train',
    yearExplicitlyKnown: false
  }
];

const memoryArchive = {
  // Only add a year here when the photograph has been confirmed to belong to that year.
  2016: [{
    image: 'assets/last page/2016.jpeg',
    caption: '2016 memory',
    year: '2016',
    verified: true,
    label: '2016'
  }],
  2017: [{
    image: 'assets/last page/2017.JPG',
    caption: '2017 memory',
    year: '2017',
    verified: true,
    label: '2017'
  }],
  2018: [{
    image: 'assets/last page/2018.JPG',
    caption: '2018 memory',
    year: '2018',
    verified: true,
    label: '2018'
  }],
  2019: [],
  2020: [],
  2021: [{
    image: 'assets/last page/2021.jpeg',
    caption: '2021 memory',
    year: '2021',
    verified: true,
    label: '2021'
  }],
  2022: [{
    image: 'assets/last page/2022.jpeg',
    caption: '2022 memory',
    year: '2022',
    verified: true,
    label: '2022'
  }],
  2023: [{
    image: 'assets/last page/2023.jpeg',
    caption: '2023 memory',
    year: '2023',
    verified: true,
    label: '2023'
  }],
  2024: [{
    image: 'assets/last page/2024.jpeg',
    caption: '2024 memory',
    year: '2024',
    verified: true,
    label: '2024'
  }],
  2025: [{
    image: 'assets/last page/2025.jpeg',
    caption: '2025 memory',
    year: '2025',
    verified: true,
    label: '2025'
  }],
  2026: [{
    image: 'assets/last page/2026.jpeg',
    caption: '2026 memory',
    year: '2026',
    verified: true,
    label: '2026'
  }]
};

const chapterComparisonMemory = {
  leftYear: '2016',
  leftImage: 'assets/8A691CDA-2CD7-4BF6-A843-15FEBD794D8B_1_105_c 2.jpeg',
  leftCaption: 'Baby Jishaa resting on a colorful blanket',
  rightLabel: 'Age 10',
  rightImage: null,
  rightCaption: 'Age-10 photo to be confirmed',
  rightVerified: false,
  rightPlaceholder: 'Photo to be confirmed'
};

const closeOpening = () => {
  opening?.classList.add('is-complete');
  document.body.classList.remove('opening-active');
  opening?.setAttribute('aria-hidden', 'true');
};

if (opening) {
  document.body.classList.add('opening-active');
  openingSkip?.addEventListener('click', closeOpening);
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    closeOpening();
  } else {
    window.setTimeout(closeOpening, 6500);
  }
}

replayStory?.addEventListener('click', () => {
  if (!opening) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  opening.classList.remove('is-complete');
  opening.setAttribute('aria-hidden', 'false');
  document.body.classList.add('opening-active');
  window.scrollTo({ top: 0, behavior: 'instant' });
  window.setTimeout(closeOpening, 6500);
});

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
    const targetId = `#${entry.target.id}`;
    chapterLinks.forEach((link) => {
      link.classList.toggle('is-current', link.getAttribute('href') === targetId);
    });
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
    const year = button.dataset.archiveYear;
    const memories = memoryArchive[year] || [];

    archiveResult.innerHTML = memories.length
      ? memories.map((memory) => `
        <figure>
          <img src="${memory.image}" alt="${memory.caption}" loading="lazy">
          <figcaption>${year} · ${memory.label || memory.caption}</figcaption>
        </figure>
      `).join('')
      : `<p>More memories from ${year} are waiting to be added.</p>`;
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

const comparisonCard = document.querySelector('.comparison-card');
if (comparisonCard) {
  const leftSide = comparisonCard.querySelector('[data-comparison-side="left"]');
  const rightSide = comparisonCard.querySelector('[data-comparison-side="right"]');
  const leftYear = leftSide?.querySelector('span');
  const rightYear = rightSide?.querySelector('span');
  const leftImage = leftSide?.querySelector('img');
  const rightImage = rightSide?.querySelector('img');
  const rightPlaceholder = rightSide?.querySelector('.comparison-placeholder');

  if (leftYear) leftYear.textContent = chapterComparisonMemory.leftYear;
  if (leftImage) {
    leftImage.src = chapterComparisonMemory.leftImage;
    leftImage.alt = chapterComparisonMemory.leftCaption;
  }

  if (rightYear) rightYear.textContent = chapterComparisonMemory.rightLabel;
  if (chapterComparisonMemory.rightImage && rightImage) {
    rightImage.src = chapterComparisonMemory.rightImage;
    rightImage.alt = chapterComparisonMemory.rightCaption;
    rightImage.hidden = false;
    rightPlaceholder?.remove();
  } else if (rightPlaceholder) {
    rightPlaceholder.innerHTML = `<span>Age 10 memory</span><strong>${chapterComparisonMemory.rightPlaceholder}</strong>`;
  }
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
