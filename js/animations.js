/**
 * KaySneakers Animations
 * - Scroll-triggered reveal
 * - Parallax
 * - Stagger children
 */
(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    // Ensure all scroll-reveal elements are visible immediately.
    document.querySelectorAll('.animate-on-scroll').forEach(el => el.classList.add('is-visible'));
    // Ensure parallax doesn't move content.
    document.querySelectorAll('[data-parallax]').forEach(el => { el.style.transform = 'none'; });

    // Set count-up numbers to their final values.
    document.querySelectorAll('.count-up').forEach(el => {
      const decimals = parseInt(el.dataset.decimals || '0', 10);
      const to = parseFloat(el.dataset.to || '0');
      const suffix = el.dataset.suffix || '';
      const prefix = el.dataset.prefix || '';
      const formatter = new Intl.NumberFormat('en-US', {
        useGrouping: true,
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });
      const formatted = formatter.format(to);
      el.textContent = `${prefix}${formatted}${suffix}`;
    });
    return;
  }

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

  // ========== Count-up ==========
  function formatCount(el, value) {
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const formatter = new Intl.NumberFormat('en-US', {
      useGrouping: true,
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
    return `${prefix}${formatter.format(value)}${suffix}`;
  }

  function animateCountUp(el) {
    const from = parseFloat(el.dataset.from || '0');
    const to = parseFloat(el.dataset.to || '0');
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const duration = parseInt(el.dataset.duration || '900', 10);

    // Trigger a subtle pop.
    el.classList.add('is-animating');

    let startTs = null;
    function step(ts) {
      if (!startTs) startTs = ts;
      const progress = Math.min(1, (ts - startTs) / duration);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      const current = from + (to - from) * eased;

      // Avoid weird float artifacts by rounding to the configured decimals.
      const rounded = decimals > 0 ? Number(current.toFixed(decimals)) : Math.round(current);
      el.textContent = formatCount(el, rounded);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.classList.remove('is-animating');
        el.textContent = formatCount(el, to);
      }
    }
    requestAnimationFrame(step);
  }

  const countEls = document.querySelectorAll('.count-up');
  if (countEls.length) {
    const countObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        animateCountUp(entry.target);
        obs.unobserve(entry.target);
      });
    }, { root: null, threshold: 0.2 });

    countEls.forEach(el => countObserver.observe(el));
  }

  // ========== Parallax (scroll-based) ==========
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  let ticking = false;

  function updateParallax() {
    const viewportCenter = window.innerHeight / 2;
    parallaxElements.forEach((el) => {
      const speed = parseFloat(el.dataset.parallax) || 0.25;
      const rect = el.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;

      // Move opposite direction to the scroll so the subject stays visible.
      // Clamped to prevent aggressive cropping on small screens.
      const rawOffset = (viewportCenter - centerY) * speed * 0.3;
      const offset = Math.max(-40, Math.min(40, rawOffset));

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
