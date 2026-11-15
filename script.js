const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.querySelector('.theme-icon');
const savedTheme = localStorage.getItem('vivek-portfolio-theme');
if (savedTheme) root.dataset.theme = savedTheme;
function updateThemeIcon(){ themeIcon.textContent = root.dataset.theme === 'dark' ? '☀' : '☾'; }
updateThemeIcon();
themeToggle.addEventListener('click', () => {
  root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('vivek-portfolio-theme', root.dataset.theme);
  updateThemeIcon();
});

document.getElementById('year').textContent = new Date().getFullYear();
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
menuToggle.addEventListener('click', () => nav.classList.toggle('open'));
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => nav.classList.remove('open')));

// Pointer-driven 3D cube: reduced-motion and touch users retain the gentle CSS animation.
const heroVisual = document.getElementById('heroVisual');
const cube = document.querySelector('.cube');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (heroVisual && cube && !reduceMotion && window.matchMedia('(pointer:fine)').matches) {
  heroVisual.addEventListener('pointermove', (event) => {
    const rect = heroVisual.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    cube.style.animation = 'none';
    cube.style.transform = `rotateX(${-24 - y * 28}deg) rotateY(${-34 + x * 48}deg) translateY(-8px)`;
  });
  heroVisual.addEventListener('pointerleave', () => {
    cube.style.animation = '';
    cube.style.transform = '';
  });
}

// Subtle tilt on cards; disabled on coarse pointers to avoid interfering with touch.
if (!reduceMotion && window.matchMedia('(pointer:fine)').matches) {
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('pointermove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      card.style.transform = `perspective(900px) rotateX(${-y * 3.5}deg) rotateY(${x * 3.5}deg) translateY(-2px)`;
    });
    card.addEventListener('pointerleave', () => card.style.transform = '');
  });
}

// Reveal content progressively while keeping everything visible if JS/IntersectionObserver is unavailable.
if ('IntersectionObserver' in window && !reduceMotion) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: .12});
  document.querySelectorAll('.section-heading, .skill-card, .project-card, .cert-card, .journey-item').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });
}
