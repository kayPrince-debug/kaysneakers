// KaySneakers App
(function () {
  'use strict';

  // State
  let cart = JSON.parse(localStorage.getItem('kay_cart') || '[]');

  // DOM
  const cartCountEl = document.getElementById('cartCount');
  const searchTrigger = document.getElementById('searchTrigger');
  const searchOverlay = document.getElementById('searchOverlay');
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');
  const chatTrigger = document.getElementById('chatTrigger');

  // Render product card
  function renderProductCard(product, showQuickAdd = true) {
    const sale = product.comparePrice ? `<span class="product-card__price-old">$${product.comparePrice}</span>` : '';
    const badge = product.badge ? `<span class="product-card__badge">${product.badge}</span>` : '';
    const quickAdd = showQuickAdd
      ? `<a href="product.html?id=${product.id}" class="btn btn-primary product-card__quick-add">Quick View</a>`
      : '';
    return `
      <article class="product-card animate-on-scroll">
        <a href="product.html?id=${product.id}" class="product-card__image">
          ${badge}
          <img src="${product.image}" alt="${product.name}" loading="lazy">
          ${quickAdd}
        </a>
        <div class="product-card__content">
          <h3 class="product-card__title"><a href="product.html?id=${product.id}">${product.name}</a></h3>
          <div class="product-card__price">
            ${sale}
            <span>$${product.price}</span>
          </div>
          ${product.rating ? `<div class="stars"><span class="stars__filled">★</span><span>${product.rating}</span> (${product.reviewCount})</div>` : ''}
        </div>
      </article>
    `;
  }

  // Populate product grids on homepage
  function initHomepage() {
    const bestSellers = document.getElementById('bestSellers');
    const newArrivals = document.getElementById('newArrivals');
    if (bestSellers) {
      const best = PRODUCTS.filter(p => p.badge === 'Best Seller' || p.category === 'sneakers').slice(0, 4);
      bestSellers.innerHTML = best.map(p => renderProductCard(p)).join('');
    }
    if (newArrivals) {
      const newP = PRODUCTS.filter(p => p.badge === 'New' || p.category === 'boots').slice(0, 4);
      newArrivals.innerHTML = newP.map(p => renderProductCard(p)).join('');
    }
  }

  // Update cart count
  function updateCartCount() {
    if (cartCountEl) {
      const count = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
      cartCountEl.dataset.count = count;
      cartCountEl.textContent = count > 0 ? count : '';
    }
  }

  // Search
  function search(query) {
    if (!query || query.length < 2) return [];
    const q = query.toLowerCase();
    return SEARCH_INDEX.filter(item => {
      const title = (item.name || item.title || '').toLowerCase();
      return title.includes(q);
    });
  }

  function renderSearchResults(results) {
    if (!results.length) {
      return '<p class="text-tertiary small">No results found. Try "sneakers" or "boots".</p>';
    }
    const products = results.filter(r => r.type === 'product');
    const other = results.filter(r => r.type !== 'product');
    let html = '';
    if (products.length) {
      html += '<div class="search-results__section"><h4>Products</h4>';
      html += products.slice(0, 4).map(p => `
        <a href="product.html?id=${p.id}" class="search-result-item">
          <img src="${p.image}" alt="" class="search-result-item__image" width="56" height="56">
          <div class="search-result-item__info">
            <div class="search-result-item__title">${p.name}</div>
            <div class="search-result-item__price">$${p.price}</div>
          </div>
        </a>
      `).join('');
      html += '</div>';
    }
    if (other.length) {
      html += '<div class="search-results__section"><h4>Quick Links</h4>';
      html += other.map(o => `
        <a href="${o.url}" class="search-result-item">
          <div class="search-result-item__info">
            <div class="search-result-item__title">${o.title}</div>
          </div>
        </a>
      `).join('');
      html += '</div>';
    }
    return html;
  }

  // Mega menu hover
  function initMegaMenu() {
    const navLinks = document.querySelectorAll('.nav__link[aria-haspopup]');
    navLinks.forEach(link => {
      link.addEventListener('mouseenter', () => {
        document.querySelectorAll('.nav__link[aria-haspopup]').forEach(l => l.setAttribute('aria-expanded', 'false'));
        link.setAttribute('aria-expanded', 'true');
      });
    });
    const header = document.querySelector('.header');
    if (header) {
      header.addEventListener('mouseleave', () => {
        document.querySelectorAll('.nav__link[aria-haspopup]').forEach(l => l.setAttribute('aria-expanded', 'false'));
      });
    }
  }

  // Search overlay
  function initSearch() {
    if (!searchTrigger || !searchOverlay) return;
    searchTrigger.addEventListener('click', () => {
      searchOverlay.classList.add('is-open');
      searchInput.focus();
    });
    searchOverlay.addEventListener('click', (e) => {
      if (e.target === searchOverlay) searchOverlay.classList.remove('is-open');
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') searchOverlay.classList.remove('is-open');
    });
    searchInput.addEventListener('input', () => {
      const results = search(searchInput.value);
      searchResults.innerHTML = renderSearchResults(results);
    });
  }

  // Mobile menu
  function initMobileMenu() {
    if (!menuToggle || !mobileNav) return;
    menuToggle.addEventListener('click', () => {
      mobileNav.classList.toggle('is-open');
      document.body.style.overflow = mobileNav.classList.contains('is-open') ? 'hidden' : '';
    });
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileNav.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
  }

  // Newsletter
  function initNewsletter() {
    const form = document.getElementById('newsletterForm');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thanks for subscribing! You\'ll hear from us soon.');
        form.reset();
      });
    }
  }

  // Chat widget
  if (chatTrigger) {
    chatTrigger.addEventListener('click', () => {
      alert('AI Sizing Assistant coming soon! In the meantime, visit our Size Guide or contact support.');
    });
  }

  // Init
  initHomepage();
  updateCartCount();
  initMegaMenu();
  initSearch();
  initMobileMenu();
  initNewsletter();

  // Expose for other pages
  window.KayApp = {
    cart,
    addToCart: (item) => {
      const existing = cart.find(i => i.id === item.id && i.size === item.size);
      if (existing) existing.quantity = (existing.quantity || 1) + (item.quantity || 1);
      else cart.push({ ...item, quantity: item.quantity || 1 });
      localStorage.setItem('kay_cart', JSON.stringify(cart));
      updateCartCount();
      return cart;
    },
    getProduct: (id) => PRODUCTS.find(p => p.id === id),
    PRODUCTS,
  };
})();
