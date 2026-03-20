/**
 * KaySneakers Animations
 * - Scroll-triggered reveal
 * - Parallax
 * - Stagger children
 */
(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  // ========== Scroll Reveal ==========
  const scrollElements = document.querySelectorAll('.animate-on-scroll');
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1
  };

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, observerOptions);

  scrollElements.forEach((el) => scrollObserver.observe(el));

  // ========== Parallax (scroll-based) ==========
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  let ticking = false;

  function updateParallax() {
    const scrollY = window.scrollY;
    parallaxElements.forEach((el) => {
      const speed = parseFloat(el.dataset.parallax) || 0.25;
      const offset = scrollY * speed;
      el.style.transform = `translate3d(0, ${offset}px, 0)`;
    });
    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }

  if (parallaxElements.length > 0) {
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateParallax);
  }
})();
