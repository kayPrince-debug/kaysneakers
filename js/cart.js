(function () {
  let cart = JSON.parse(localStorage.getItem('kay_cart') || '[]');
  const layout = document.getElementById('cartLayout');
  const empty = document.getElementById('cartEmpty');

  function getProduct(id) {
    return PRODUCTS.find(p => p.id === id) || { name: 'Product', price: 0, image: '' };
  }

  function render() {
    if (cart.length === 0) {
      layout.style.display = 'none';
      empty.style.display = 'block';
      return;
    }
    layout.style.display = 'grid';
    empty.style.display = 'none';

    const subtotal = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
    const shipping = subtotal >= 150 ? 0 : 12;
    const total = subtotal + shipping;

    layout.innerHTML = `
      <div class="cart-items">
        ${cart.map((item, i) => {
          const p = getProduct(item.id);
          return `
            <div class="cart-item" data-index="${i}">
              <div class="cart-item__image">
                <img src="${item.image || p.image}" alt="${item.name}">
              </div>
              <div class="cart-item__info">
                <h3><a href="product.html?id=${item.id}">${item.name}</a></h3>
                <p class="cart-item__meta">Size ${item.size}${item.width ? ' · ' + item.width : ''}</p>
                <div class="cart-item__actions">
                  <div class="cart-item__quantity">
                    <button type="button" data-action="minus" data-index="${i}">−</button>
                    <input type="number" value="${item.quantity || 1}" min="1" max="5" readonly>
                    <button type="button" data-action="plus" data-index="${i}">+</button>
                  </div>
                  <button type="button" class="cart-item__remove" data-action="remove" data-index="${i}">Remove</button>
                </div>
              </div>
              <div class="cart-item__price">$${(item.price * (item.quantity || 1)).toFixed(2)}</div>
            </div>
          `;
        }).join('')}
      </div>
      <div class="cart-summary">
        <h3>Order Summary</h3>
        <div class="cart-summary__row">
          <span>Subtotal</span>
          <span>$${subtotal.toFixed(2)}</span>
        </div>
        <div class="cart-summary__row">
          <span>Shipping</span>
          <span>${shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
        </div>
        <div class="cart-summary__row cart-summary__total">
          <span>Total</span>
          <span>$${total.toFixed(2)}</span>
        </div>
        <a href="checkout.html" class="btn btn-primary cart-summary__cta">Proceed to Checkout</a>
        <div class="cart-summary__secure">🔒 Secure checkout</div>
      </div>
    `;

    // Event listeners
    layout.querySelectorAll('[data-action="plus"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const i = parseInt(btn.dataset.index);
        cart[i].quantity = (cart[i].quantity || 1) + 1;
        if (cart[i].quantity > 5) cart[i].quantity = 5;
        localStorage.setItem('kay_cart', JSON.stringify(cart));
        render();
      });
    });
    layout.querySelectorAll('[data-action="minus"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const i = parseInt(btn.dataset.index);
        cart[i].quantity = (cart[i].quantity || 1) - 1;
        if (cart[i].quantity < 1) cart.splice(i, 1);
        localStorage.setItem('kay_cart', JSON.stringify(cart));
        cart = JSON.parse(localStorage.getItem('kay_cart') || '[]');
        render();
      });
    });
    layout.querySelectorAll('[data-action="remove"]').forEach(btn => {
      btn.addEventListener('click', () => {
        cart.splice(parseInt(btn.dataset.index), 1);
        localStorage.setItem('kay_cart', JSON.stringify(cart));
        cart = JSON.parse(localStorage.getItem('kay_cart') || '[]');
        render();
      });
    });
  }

  render();

  window.KayUpdateCartCount?.();

  document.getElementById('menuToggle')?.addEventListener('click', () => {
    document.querySelector('.mobile-nav')?.classList.toggle('is-open');
  });
})();
