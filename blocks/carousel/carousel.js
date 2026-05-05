function goToSlide(block, index) {
  const slides = block.querySelectorAll('.carousel-slide');
  const dots = block.querySelectorAll('.carousel-dot');
  const total = slides.length;
  const i = (index + total) % total;
  slides.forEach((s, idx) => {
    s.classList.toggle('active', idx === i);
  });
  dots.forEach((d, idx) => d.classList.toggle('active', idx === i));
  block.dataset.current = i;
}

export default function decorate(block) {
  // Each direct child div is a slide
  const rows = [...block.children];

  // Build slide elements
  const slides = rows.map((row, i) => {
    const slide = document.createElement('div');
    slide.className = 'carousel-slide' + (i === 0 ? ' active' : '');

    const imgDiv = row.children[0];
    const textDiv = row.children[1];

    // Image layer
    if (imgDiv) {
      const imgWrapper = document.createElement('div');
      imgWrapper.className = 'carousel-image';
      imgWrapper.append(...imgDiv.childNodes);
      slide.append(imgWrapper);
    }

    // Text layer
    if (textDiv) {
      const textWrapper = document.createElement('div');
      textWrapper.className = 'carousel-text';
      textWrapper.append(...textDiv.childNodes);
      slide.append(textWrapper);
    }

    return slide;
  });

  // Slides container
  const slidesContainer = document.createElement('div');
  slidesContainer.className = 'carousel-slides-container';
  slidesContainer.append(...slides);

  // Prev button
  const prev = document.createElement('button');
  prev.className = 'carousel-btn carousel-prev';
  prev.setAttribute('aria-label', 'Previous slide');
  prev.innerHTML = '&#8249;';
  prev.addEventListener('click', () => {
    goToSlide(block, parseInt(block.dataset.current, 10) - 1);
  });

  // Next button
  const next = document.createElement('button');
  next.className = 'carousel-btn carousel-next';
  next.setAttribute('aria-label', 'Next slide');
  next.innerHTML = '&#8250;';
  next.addEventListener('click', () => {
    goToSlide(block, parseInt(block.dataset.current, 10) + 1);
  });

  // Dots
  const dotsContainer = document.createElement('div');
  dotsContainer.className = 'carousel-dots';
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    dot.addEventListener('click', () => goToSlide(block, i));
    dotsContainer.append(dot);
  });

  // Assemble
  block.innerHTML = '';
  block.dataset.current = 0;
  block.append(prev, slidesContainer, next, dotsContainer);

  // Auto-advance
  let timer = setInterval(() => {
    goToSlide(block, parseInt(block.dataset.current, 10) + 1);
  }, 5000);

  // Pause on hover
  block.addEventListener('mouseenter', () => clearInterval(timer));
  block.addEventListener('mouseleave', () => {
    timer = setInterval(() => {
      goToSlide(block, parseInt(block.dataset.current, 10) + 1);
    }, 5000);
  });
}
