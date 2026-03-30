(function () {
  'use strict';

  if (!window.AdminAuth) return;
  if (!window.AdminAuth.requireAuth()) return;

  const STATUS_OPTIONS = window.AdminAuth.STATUS_OPTIONS;
  const ordersKey = 'kays_orders';

  const ordersBody = document.getElementById('ordersBody');
  const ordersMobile = document.getElementById('ordersMobile');
  const emptyState = document.getElementById('emptyState');
  const searchInput = document.getElementById('searchInput');

  const logoutBtn = document.getElementById('logoutBtn');
  logoutBtn?.addEventListener('click', () => window.AdminAuth.logout());

  const modalOverlay = document.getElementById('detailsModal');
  const detailsClose = document.getElementById('detailsClose');
  const detailsTitle = document.getElementById('detailsTitle');
  const detailsSubtitle = document.getElementById('detailsSubtitle');
  const detailsItems = document.getElementById('detailsItems');
  const detailsShipping = document.getElementById('detailsShipping');
  const detailsPayment = document.getElementById('detailsPayment');

  let lastOrders = [];

  function currency(n) {
    const num = Number(n || 0);
    return `$${num.toFixed(2)}`;
  }

  function safeText(v) {
    return v === undefined || v === null ? '' : String(v);
  }

  function renderDetails(order) {
    detailsTitle.textContent = `Order ${order.id}`;
    detailsSubtitle.textContent = `${new Date(order.createdAt).toLocaleString()} · ${order.customer?.email || ''}`;

    detailsItems.innerHTML = (order.items || []).map(item => `
      <div class="items-row">
        <img src="${item.image || ''}" alt="">
        <div>
          <strong>${safeText(item.name)}</strong>
          <div class="small">Size ${safeText(item.size)} · ${safeText(item.width)} · Qty ${safeText(item.quantity || 1)}</div>
        </div>
        <div style="font-weight: var(--fw-semibold);">$${Number(item.price || 0).toFixed(2)}</div>
      </div>
    `).join('');

    detailsShipping.innerHTML = `
      <div>${safeText(order.shipping?.address)}</div>
      <div>${safeText(order.shipping?.city)}, ${safeText(order.shipping?.state)} ${safeText(order.shipping?.zip)}</div>
    `;

    detailsPayment.textContent = safeText(order.payment?.method);

    modalOverlay.style.display = 'flex';
  }

  detailsClose?.addEventListener('click', () => {
    modalOverlay.style.display = 'none';
  });
  modalOverlay?.addEventListener('click', (e) => {
    if (e.target === modalOverlay) modalOverlay.style.display = 'none';
  });

  function createSampleOrder() {
    const sampleProduct = (window.PRODUCTS && window.PRODUCTS[0]) ? window.PRODUCTS[0] : {
      id: 'sample',
      name: 'Sample Kay Sneaker',
      price: 199,
      image: '',
      category: 'sneakers',
      badge: 'New',
    };

    const now = Date.now();
    const orderId = `KS-${now}`;

    const sampleItems = [
      {
        id: sampleProduct.id,
        name: sampleProduct.name,
        price: sampleProduct.price,
        image: sampleProduct.image,
        size: 10,
        width: 'Regular (D)',
        quantity: 1,
      }
    ];

    const subtotal = sampleItems.reduce((s, it) => s + it.price * (it.quantity || 1), 0);
    const shippingCost = subtotal >= 150 ? 0 : 12;
    const total = subtotal + shippingCost;

    const orders = window.AdminAuth.getOrders();
    orders.unshift({
      id: orderId,
      createdAt: new Date(now).toISOString(),
      status: 'Paid',
      customer: { email: 'demo@kaysneakers.com', firstName: 'Demo', lastName: 'Customer' },
      shipping: { address: '123 Work St', city: 'New York', state: 'NY', zip: '10001' },
      totals: { subtotal, shipping: shippingCost, total },
      items: sampleItems,
      payment: { method: 'Demo payment' },
    });
    window.AdminAuth.setOrders(orders);
  }

  function updateOrder(orderId, newStatus) {
    const orders = window.AdminAuth.getOrders();
    const idx = orders.findIndex(o => o.id === orderId);
    if (idx === -1) return;
    orders[idx].status = newStatus;
    window.AdminAuth.setOrders(orders);
    loadAndRender();
  }

  function loadAndRender() {
    lastOrders = window.AdminAuth.getOrders();

    const q = (searchInput?.value || '').trim().toLowerCase();
    const filtered = !q
      ? lastOrders
      : lastOrders.filter(o => {
          const id = safeText(o.id).toLowerCase();
          const email = safeText(o.customer?.email).toLowerCase();
          return id.includes(q) || email.includes(q);
        });

    if (ordersBody) {
      if (!filtered.length) {
        ordersBody.innerHTML = '';
      } else {
        ordersBody.innerHTML = filtered.map(order => {
          const options = STATUS_OPTIONS.map(s => `<option value="${s}" ${order.status === s ? 'selected' : ''}>${s}</option>`).join('');
          return `
            <tr>
              <td style="font-weight: var(--fw-semibold);">${safeText(order.id)}</td>
              <td class="muted">${new Date(order.createdAt).toLocaleDateString()}</td>
              <td>${safeText(order.customer?.email)}</td>
              <td style="font-weight: var(--fw-semibold);">${currency(order.totals?.total)}</td>
              <td>
                <select class="status-select" data-order-id="${safeText(order.id)}">
                  ${options}
                </select>
              </td>
              <td style="text-align:right;">
                <a class="details-link" data-action="details" data-order-id="${safeText(order.id)}">Details</a>
                <button type="button" class="btn btn-primary btn-admin" style="margin-left: var(--space-sm); min-height:44px;"
                  data-action="save" data-order-id="${safeText(order.id)}">Save</button>
              </td>
            </tr>
          `;
        }).join('');
      }
    }

    if (ordersMobile) {
      ordersMobile.innerHTML = filtered.map(order => `
        <div class="mobile-order-card">
          <h3>${safeText(order.id)}</h3>
          <div class="meta">${new Date(order.createdAt).toLocaleString()} · ${safeText(order.customer?.email)}</div>
          <div style="margin-bottom: var(--space-md);"><span class="status-chip">${safeText(order.status)}</span></div>
          <div class="mobile-order-actions">
            <select class="status-select" data-order-id="${safeText(order.id)}">
              ${STATUS_OPTIONS.map(s => `<option value="${s}" ${order.status === s ? 'selected' : ''}>${s}</option>`).join('')}
            </select>
            <div style="display:flex; gap: var(--space-md);">
              <button type="button" class="btn btn-primary btn-admin" style="flex:1; min-height:44px;" data-action="save" data-order-id="${safeText(order.id)}">Save</button>
              <button type="button" class="btn btn-secondary btn-admin-secondary" style="flex:1; min-height:44px;" data-action="details" data-order-id="${safeText(order.id)}">Details</button>
            </div>
          </div>
        </div>
      `).join('');
    }

    if (emptyState) {
      emptyState.style.display = filtered.length ? 'none' : 'block';
    }

    // Bind save/details
    document.querySelectorAll('[data-action=\"save\"]').forEach(btn => {
      btn.onclick = () => {
        const orderId = btn.getAttribute('data-order-id');
        const select = document.querySelector(`select.status-select[data-order-id=\"${orderId}\"]`);
        const status = select ? select.value : 'Paid';
        updateOrder(orderId, status);
      };
    });

    document.querySelectorAll('[data-action=\"details\"]').forEach(link => {
      link.onclick = () => {
        const orderId = link.getAttribute('data-order-id');
        const order = lastOrders.find(o => o.id === orderId);
        if (order) renderDetails(order);
      };
    });
  }

  searchInput?.addEventListener('input', () => loadAndRender());

  const sampleBtn = document.getElementById('sampleBtn') || document.getElementById('createSampleBtn');
  sampleBtn?.addEventListener('click', () => {
    createSampleOrder();
    loadAndRender();
  });

  // Initial render
  loadAndRender();
})();

