(function () {
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const product = PRODUCTS.find(p => p.id === id) || PRODUCTS[0];

  const SIZES = [7, 8, 9, 10, 11, 12];
  const WIDTHS = ['Narrow (B)', 'Regular (D)', 'Wide (E)'];

  // Build gallery images (use main + slight variations for demo)
  const galleryImages = [
    product.image,
    product.image.replace('?w=800', '?w=800&q=80'),
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
    'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&q=80',
  ];

  const layout = document.getElementById('productLayout');
  if (!layout) return;

  const stickyCtaHtml = `
    <div class="product-sticky-cta" id="productStickyCta">
      <div style="display:flex;align-items:center;justify-content:space-between;gap:var(--space-md);">
        <div>
          <strong>${product.name}</strong><br>
          <span class="small text-tertiary">$${product.price}</span>
        </div>
        <button type="button" class="btn btn-primary" id="stickyAddToCart" style="min-width:140px;">Add to Cart</button>
      </div>
    </div>
  `;

  layout.innerHTML = `
    <div class="product-gallery">
      <div class="product-gallery__main" id="galleryMain">
        <img src="${galleryImages[0]}" alt="${product.name}" id="galleryMainImg">
      </div>
      <div class="product-gallery__thumbnails" id="galleryThumbs">
        ${galleryImages.map((img, i) => `
          <button class="product-gallery__thumb ${i === 0 ? 'active' : ''}" data-index="${i}" type="button">
            <img src="${img}" alt="">
          </button>
        `).join('')}
      </div>
    </div>
    <div class="product-info">
      <h1>${product.name}</h1>
      <div class="product-info__price">
        ${product.comparePrice ? `<span class="product-info__price-old">$${product.comparePrice}</span>` : ''}
        <span>$${product.price}</span>
      </div>
      <form class="product-info__form" id="productForm">
        <div class="form-group">
          <label>Size <a class="size-guide-link" id="sizeGuideLink">Size guide</a></label>
          <div class="size-selector" id="sizeSelector"></div>
        </div>
        <div class="form-group">
          <label>Width</label>
          <select class="input" name="width" style="max-width: 200px;">
            ${WIDTHS.map(w => `<option value="${w}">${w}</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label>Quantity</label>
          <input type="number" class="input" name="quantity" value="1" min="1" max="5" style="max-width: 100px;">
        </div>
        <div class="product-info__actions">
          <button type="submit" class="btn btn-primary">Add to Cart</button>
          <a href="collections.html?c=${product.category}" class="product-info__secondary-cta btn btn-secondary">Shop the Collection</a>
        </div>
      </form>
      <div class="product-trust">
        <div class="product-trust__list">
          <span class="product-trust__item">🛡️ 30-day Fit Guarantee</span>
          <span class="product-trust__item">🚚 Free shipping over $150</span>
          <span class="product-trust__item">♻️ Sustainable materials</span>
        </div>
      </div>
    </div>
  `;

  // Size selector
  const sizeSelector = document.getElementById('sizeSelector');
  sizeSelector.innerHTML = SIZES.map(s => `
    <button type="button" class="size-option" data-size="${s}">${s}</button>
  `).join('');

  let selectedSize = null;
  sizeSelector.querySelectorAll('.size-option').forEach(btn => {
    btn.addEventListener('click', () => {
      sizeSelector.querySelectorAll('.size-option').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedSize = btn.dataset.size;
    });
  });

  // Gallery
  const mainImg = document.getElementById('galleryMainImg');
  const thumbs = document.querySelectorAll('.product-gallery__thumb');
  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      thumbs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      mainImg.src = thumb.querySelector('img').src;
    });
  });

  // Zoom on hover (desktop)
  const galleryMain = document.getElementById('galleryMain');
  galleryMain.addEventListener('mousemove', (e) => {
    if (window.innerWidth < 768) return;
    const rect = galleryMain.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mainImg.style.transform = `scale(1.5)`;
    mainImg.style.transformOrigin = `${x * 100}% ${y * 100}%`;
  });
  galleryMain.addEventListener('mouseleave', () => {
    mainImg.style.transform = 'scale(1)';
  });

  // Size guide modal
  const sizeGuideModal = document.getElementById('sizeGuideModal');
  const sizeGuideLink = document.getElementById('sizeGuideLink');
  const sizeGuideClose = document.getElementById('sizeGuideClose');
  sizeGuideLink?.addEventListener('click', (e) => {
    e.preventDefault();
    sizeGuideModal?.classList.add('is-open');
  });
  sizeGuideClose?.addEventListener('click', () => sizeGuideModal?.classList.remove('is-open'));
  sizeGuideModal?.addEventListener('click', (e) => {
    if (e.target === sizeGuideModal) sizeGuideModal.classList.remove('is-open');
  });

  // Add to cart
  const form = document.getElementById('productForm');
  document.body.insertAdjacentHTML('beforeend', stickyCtaHtml);
  document.getElementById('stickyAddToCart')?.addEventListener('click', () => {
    document.getElementById('productForm')?.requestSubmit();
  });

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!selectedSize) {
      alert('Please select a size.');
      return;
    }
    const formData = new FormData(form);
    const cart = JSON.parse(localStorage.getItem('kay_cart') || '[]');
    const item = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      width: formData.get('width'),
      quantity: parseInt(formData.get('quantity') || 1),
    };
    const existing = cart.find(i => i.id === item.id && i.size === item.size);
    if (existing) existing.quantity += item.quantity;
    else cart.push(item);
    localStorage.setItem('kay_cart', JSON.stringify(cart));

    // Toast
    let toast = document.querySelector('.added-to-cart-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'added-to-cart-toast';
      toast.innerHTML = '<span>✓ Added to cart</span><a href="cart.html" class="btn btn-secondary" style="padding: 8px 16px;">View Cart</a>';
      document.body.appendChild(toast);
    }
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);

    window.KayUpdateCartCount?.();
  });

  // Reviews summary
  const reviewsText = document.getElementById('reviewsSummaryText');
  if (reviewsText && product.reviewCount) {
    reviewsText.textContent = `${product.rating} based on ${product.reviewCount} reviews`;
  }

  window.KayUpdateCartCount?.();

  // Mobile menu
  document.getElementById('menuToggle')?.addEventListener('click', () => {
    document.getElementById('mobileNav').classList.toggle('is-open');
  });
})();
