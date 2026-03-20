(function () {
  const cart = JSON.parse(localStorage.getItem('kay_cart') || '[]');
  const orderEl = document.getElementById('checkoutOrder');
  const form = document.getElementById('checkoutForm');

  if (cart.length === 0 && orderEl) {
    orderEl.innerHTML = '<p>Your cart is empty. <a href="collections.html">Continue shopping</a></p>';
    return;
  }

  const subtotal = cart.reduce((sum, i) => sum + i.price * (i.quantity || 1), 0);
  const shipping = subtotal >= 150 ? 0 : 12;
  const total = subtotal + shipping;

  orderEl.innerHTML = `
    <h3 style="margin-bottom: var(--space-lg);">Order Summary</h3>
    ${cart.map(item => `
      <div class="checkout-order__item">
        <img src="${item.image}" alt="">
        <div>
          <strong>${item.name}</strong><br>
          <span class="small text-tertiary">Size ${item.size} · Qty ${item.quantity || 1}</span><br>
          $${(item.price * (item.quantity || 1)).toFixed(2)}
        </div>
      </div>
    `).join('')}
    <div class="checkout-order__total">
      Subtotal: $${subtotal.toFixed(2)}<br>
      Shipping: ${shipping === 0 ? 'Free' : '$' + shipping.toFixed(2)}<br>
      <strong>Total: $${total.toFixed(2)}</strong>
    </div>
  `;

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    localStorage.removeItem('kay_cart');
    alert('Thank you for your order! This is a demo — no charge was made.');
    window.location.href = 'index.html';
  });
})();
