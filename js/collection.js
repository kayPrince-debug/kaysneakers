(function () {
  const params = new URLSearchParams(location.search);
  const category = params.get('c') || 'all';
  const grid = document.getElementById('collectionGrid');
  const titleEl = document.getElementById('collectionTitle');
  const countEl = document.getElementById('collectionCount');
  const sortSelect = document.getElementById('sortSelect');

  const TITLES = {
    all: 'All Products',
    sneakers: 'Sneakers',
    boots: 'Boots',
    loafers: 'Loafers',
    accessories: 'Accessories',
    'new-arrivals': 'New Arrivals',
    bestsellers: 'Best Sellers',
  };

  function getProducts() {
    let list = PRODUCTS;
    if (category && category !== 'all') {
      if (category === 'new-arrivals') list = list.filter(p => p.badge === 'New');
      else if (category === 'bestsellers') list = list.filter(p => p.badge === 'Best Seller');
      else list = list.filter(p => p.category === category);
    }
    const sort = sortSelect?.value || 'featured';
    if (sort === 'newest') list = [...list].sort((a, b) => (b.badge ? 1 : 0) - (a.badge ? 1 : 0));
    if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }

  function render() {
    const products = getProducts();
    titleEl.textContent = TITLES[category] || category;
    countEl.textContent = `${products.length} product${products.length !== 1 ? 's' : ''}`;
    grid.innerHTML = products.map(p => `
      <article class="product-card animate-on-scroll">
        <a href="product.html?id=${p.id}" class="product-card__image">
          ${p.badge ? `<span class="product-card__badge">${p.badge}</span>` : ''}
          <img src="${p.image}" alt="${p.name}" loading="lazy">
          <span class="btn btn-primary product-card__quick-add">Quick View</span>
        </a>
        <div class="product-card__content">
          <h3 class="product-card__title"><a href="product.html?id=${p.id}">${p.name}</a></h3>
          <div class="product-card__price">
            ${p.comparePrice ? `<span class="product-card__price-old">$${p.comparePrice}</span>` : ''}
            <span>$${p.price}</span>
          </div>
          ${p.rating ? `<div class="stars small"><span class="stars__filled">★</span> ${p.rating} (${p.reviewCount})</div>` : ''}
        </div>
      </article>
    `).join('');
  }

  sortSelect?.addEventListener('change', render);
  render();

  window.KayUpdateCartCount?.();
})();
