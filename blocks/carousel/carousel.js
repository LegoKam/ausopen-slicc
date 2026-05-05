function updateSlide(block, index) {
  const slides = block.querySelectorAll('.carousel-slide');
  const dots = block.querySelectorAll('.carousel-dot');
  slides.forEach((s, i) => s.classList.toggle('active', i === index));
  dots.forEach((d, i) => d.classList.toggle('active', i === index));
  block.dataset.current = index;
}

export default function decorate(block) {
  const rows = [...block.children];
  block.innerHTML = '';

  // Slides wrapper
  const slidesWrapper = document.createElement('div');
  slidesWrapper.className = 'carousel-slides';

  rows.forEach((row, i) => {
    const slide = document.createElement('div');
    slide.className = 'carousel-slide';
    if (i === 0) slide.classList.add('active');
    slide.append(...row.children);
    slidesWrapper.append(slide);
  });

  // Prev/Next buttons
  const prev = document.createElement('button');
  prev.className = 'carousel-prev';
  prev.setAttribute('aria-label', 'Previous');
  prev.innerHTML = '&#8249;';

  const next = document.createElement('button');
  next.className = 'carousel-next';
  next.setAttribute('aria-label', 'Next');
  next.innerHTML = '&#8250;';

  // Dots
  const dotsWrapper = document.createElement('div');
  dotsWrapper.className = 'carousel-dots';
  rows.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Slide ${i + 1}`);
    dot.addEventListener('click', () => updateSlide(block, i));
    dotsWrapper.append(dot);
  });

  block.dataset.current = 0;

  prev.addEventListener('click', () => {
    const current = parseInt(block.dataset.current, 10);
    const total = rows.length;
    updateSlide(block, (current - 1 + total) % total);
  });

  next.addEventListener('click', () => {
    const current = parseInt(block.dataset.current, 10);
    updateSlide(block, (current + 1) % rows.length);
  });

  block.append(prev, slidesWrapper, next, dotsWrapper);

  // Auto-advance every 5s
  setInterval(() => {
    const current = parseInt(block.dataset.current, 10);
    updateSlide(block, (current + 1) % rows.length);
  }, 5000);
}
