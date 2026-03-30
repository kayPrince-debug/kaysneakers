(function () {
  'use strict';

  const ADMIN_PASSWORD_HASH_KEY = 'kays_admin_password_hash';
  const ADMIN_SESSION_KEY = 'kays_admin_session';
  const ORDERS_KEY = 'kays_orders';

  const STATUS_OPTIONS = ['Paid', 'Processing', 'Shipped', 'Delivered', 'Returned'];

  async function sha256Hex(message) {
    const msg = String(message);
    if (window.crypto && window.crypto.subtle && window.TextEncoder) {
      const data = new TextEncoder().encode(msg);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const bytes = new Uint8Array(hashBuffer);
      return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
    }

    // Fallback (demo only)
    let hash = 0;
    for (let i = 0; i < msg.length; i++) hash = ((hash << 5) - hash) + msg.charCodeAt(i);
    return String(hash);
  }

  function getOrders() {
    return JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
  }

  function setOrders(orders) {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }

  function isLoggedIn() {
    return Boolean(localStorage.getItem(ADMIN_SESSION_KEY));
  }

  function requireAuth() {
    if (!isLoggedIn()) {
      window.location.replace('login.html');
      return false;
    }
    return true;
  }

  function logout() {
    localStorage.removeItem(ADMIN_SESSION_KEY);
    window.location.replace('login.html');
  }

  async function attemptLogin(password) {
    const passwordHash = await sha256Hex(password);
    const stored = localStorage.getItem(ADMIN_PASSWORD_HASH_KEY);

    // First run: set password if none exists.
    if (!stored) {
      localStorage.setItem(ADMIN_PASSWORD_HASH_KEY, passwordHash);
    } else if (stored !== passwordHash) {
      return { ok: false, reason: 'wrong_password' };
    }

    localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify({ loggedInAt: Date.now() }));
    return { ok: true };
  }

  window.AdminAuth = {
    STATUS_OPTIONS,
    requireAuth,
    logout,
    getOrders,
    setOrders,
    sha256Hex,
    attemptLogin,
  };
})();

