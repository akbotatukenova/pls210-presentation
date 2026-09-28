(() => {
  const deck = document.getElementById('deck');
  const slides = Array.from(document.querySelectorAll('.slide'));
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const fullBtn = document.getElementById('fullBtn');
  const currentSlide = document.getElementById('currentSlide');
  const totalSlides = document.getElementById('totalSlides');
  const journeyFill = document.getElementById('journeyFill');
  const horse = document.getElementById('horseGuide');
  const range = document.getElementById('boundaryRange');
  const rangeNote = document.getElementById('boundaryNote');

  let index = 0;
  let touchStartX = null;
  let animationTimer = null;

  const restSlides = new Set([4, 10, 14, 17]); // zero-based: RQ, literature opening, positionality, conclusion

  deck.style.width = `${slides.length * 100}vw`;
  totalSlides.textContent = String(slides.length).padStart(2, '0');

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function goTo(nextIndex, options = {}) {
    const oldIndex = index;
    index = clamp(nextIndex, 0, slides.length - 1);
    const direction = index < oldIndex ? 'back' : 'forward';

    deck.style.transform = `translate3d(${-index * 100}vw, 0, 0)`;

    slides.forEach((slide, i) => {
      const active = i === index;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', active ? 'false' : 'true');
      if (active && !options.silent) {
        slide.focus?.({ preventScroll: true });
      }
    });

    currentSlide.textContent = String(index + 1).padStart(2, '0');
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === slides.length - 1;

    const progress = slides.length > 1 ? index / (slides.length - 1) : 0;
    journeyFill.style.width = `${progress * 100}%`;
    horse.style.left = `${progress * 100}%`;

    horse.classList.remove('is-travelling', 'is-reversing', 'is-resting');
    void horse.offsetWidth;

    if (direction === 'back') horse.classList.add('is-reversing');
    if (restSlides.has(index)) {
      horse.classList.add('is-resting');
    } else if (oldIndex !== index) {
      horse.classList.add('is-travelling');
      clearTimeout(animationTimer);
      animationTimer = window.setTimeout(() => horse.classList.remove('is-travelling'), 760);
    }

    const title = slides[index].dataset.title || `Slide ${index + 1}`;
    document.title = `${title} — Drawing the Line`;

    try {
      const hash = `#${index + 1}`;
      if (location.hash !== hash) history.replaceState(null, '', hash);
    } catch (_) {}
  }

  function next() { goTo(index + 1); }
  function prev() { goTo(index - 1); }

  prevBtn.addEventListener('click', prev);
  nextBtn.addEventListener('click', next);

  document.addEventListener('keydown', (event) => {
    const tag = event.target?.tagName?.toLowerCase();
    const editing = ['input', 'textarea', 'select', 'button'].includes(tag);

    if (event.key === 'ArrowRight' || event.key === 'PageDown' || (!editing && event.key === ' ')) {
      event.preventDefault();
      next();
    } else if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
      event.preventDefault();
      prev();
    } else if (event.key === 'Home') {
      event.preventDefault();
      goTo(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      goTo(slides.length - 1);
    }
  });

  deck.addEventListener('touchstart', (event) => {
    touchStartX = event.changedTouches[0]?.clientX ?? null;
  }, { passive: true });

  deck.addEventListener('touchend', (event) => {
    if (touchStartX == null) return;
    const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX;
    const delta = touchEndX - touchStartX;
    touchStartX = null;
    if (Math.abs(delta) < 55) return;
    delta < 0 ? next() : prev();
  }, { passive: true });

  fullBtn.addEventListener('click', async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        fullBtn.setAttribute('aria-label', 'Exit fullscreen');
        fullBtn.title = 'Exit fullscreen';
      } else {
        await document.exitFullscreen();
        fullBtn.setAttribute('aria-label', 'Enter fullscreen');
        fullBtn.title = 'Fullscreen';
      }
    } catch (_) {
      // Fullscreen is optional; the presentation remains usable if the browser blocks it.
    }
  });

  document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
      fullBtn.setAttribute('aria-label', 'Enter fullscreen');
      fullBtn.title = 'Fullscreen';
    }
  });

  if (range && rangeNote) {
    range.addEventListener('input', () => {
      const v = Number(range.value);
      if (v < 34) {
        rangeNote.textContent = 'A line placed here treats more of the practice as ordinary sporting demand. What makes that judgment persuasive?';
      } else if (v > 66) {
        rangeNote.textContent = 'A line placed here treats more of the practice as unacceptable treatment. What makes that judgment persuasive?';
      } else {
        rangeNote.textContent = 'The line can move. My study asks how people justify where they place it.';
      }
    });
  }

  function initialIndexFromHash() {
    const raw = location.hash.replace('#', '');
    const parsed = Number.parseInt(raw, 10);
    if (Number.isFinite(parsed) && parsed >= 1 && parsed <= slides.length) return parsed - 1;
    return 0;
  }

  goTo(initialIndexFromHash(), { silent: true });
})();
