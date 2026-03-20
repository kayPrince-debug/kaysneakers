// Shared across all pages: cart count, search overlay, mobile menu
(function () {
  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('kay_cart') || '[]');
    const count = cart.reduce((a, i) => a + (i.quantity || 1), 0);
    document.querySelectorAll('.cart-trigger__count, #cartCount').forEach(el => {
      if (el) {
        el.dataset.count = count;
        el.textContent = count > 0 ? count : '';
      }
    });
  }

  function initSearchOverlay() {
    const trigger = document.querySelector('.search-trigger');
    const overlay = document.getElementById('searchOverlay');
    const input = document.getElementById('searchInput');
    const results = document.getElementById('searchResults');
    if (!overlay || !trigger) return;

    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      overlay.classList.add('is-open');
      setTimeout(() => input?.focus(), 100);
    });
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.classList.remove('is-open');
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') overlay.classList.remove('is-open');
    });
    if (input && typeof SEARCH_INDEX !== 'undefined') {
      input.addEventListener('input', () => {
        const q = input.value.trim().toLowerCase();
        if (q.length < 2) { results.innerHTML = ''; return; }
        const matches = SEARCH_INDEX.filter(i => {
          const t = (i.name || i.title || '').toLowerCase();
          return t.includes(q);
        });
        let html = '';
        const products = matches.filter(m => m.type === 'product').slice(0, 4);
        const other = matches.filter(m => m.type !== 'product');
        if (products.length) {
          html += '<div class="search-results__section"><h4>Products</h4>';
          products.forEach(p => {
            html += `<a href="product.html?id=${p.id}" class="search-result-item"><img src="${p.image}" alt="" class="search-result-item__image" width="56" height="56"><div class="search-result-item__info"><div class="search-result-item__title">${p.name}</div><div class="search-result-item__price">$${p.price}</div></div></a>`;
          });
          html += '</div>';
        }
        if (other.length) {
          html += '<div class="search-results__section"><h4>Links</h4>';
          other.forEach(o => {
            html += `<a href="${o.url}" class="search-result-item"><div class="search-result-item__info"><div class="search-result-item__title">${o.title}</div></div></a>`;
          });
          html += '</div>';
        }
        results.innerHTML = html || '<p class="text-tertiary small">No results. Try "sneakers" or "boots".</p>';
      });
    }
  }

  function initMobileMenu() {
    document.getElementById('menuToggle')?.addEventListener('click', () => {
      document.getElementById('mobileNav')?.classList.toggle('is-open');
      document.body.style.overflow = document.getElementById('mobileNav')?.classList.contains('is-open') ? 'hidden' : '';
    });
    document.querySelectorAll('.mobile-nav a').forEach(a => {
      a.addEventListener('click', () => {
        document.getElementById('mobileNav')?.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
  }

  function initChatWidget() {
    document.querySelector('.chat-widget__trigger')?.addEventListener('click', () => {
      alert('AI Sizing Assistant coming soon! Visit our Size Guide or contact support@kaysneakers.com.');
    });
  }

  updateCartCount();
  initMobileMenu();
  initChatWidget();
  if (document.getElementById('searchOverlay')) initSearchOverlay();
  window.KayUpdateCartCount = updateCartCount;
})();
