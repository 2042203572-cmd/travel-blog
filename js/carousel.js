import { carouselData } from './config.js';

export function initCarousel() {
  const inner = document.getElementById('carousel-inner');
  const indicators = document.getElementById('carousel-indicators');
  let idx = 0;

  carouselData.forEach((item, i) => {
    const slide = document.createElement('div');
    slide.className = 'carousel-item';
    slide.innerHTML = `
      <img src="${item.image}" alt="">
      <div class="carousel-caption">
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      </div>
    `;
    inner.appendChild(slide);

    const dot = document.createElement('div');
    dot.className = i === 0 ? 'indicator active' : 'indicator';
    dot.addEventListener('click', () => go(i));
    indicators.appendChild(dot);
  });

  function go(i) {
    idx = i;
    inner.style.transform = `translateX(-${idx * 100}%)`;
    document.querySelectorAll('.indicator').forEach((d, j) =>
      d.classList.toggle('active', j === idx)
    );
  }
  function next() {
    go((idx + 1) % carouselData.length);
  }
  function prev() {
    go((idx - 1 + carouselData.length) % carouselData.length);
  }
  document.getElementById('next-btn').addEventListener('click', next);
  document.getElementById('prev-btn').addEventListener('click', prev);
  setInterval(next, 5000);
}