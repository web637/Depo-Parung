/* ===== TU DISTRIBUTOR - SCRIPT.JS ===== */

// ===== CONSTANTS =====
const WA_NUMBER = '628988995637';

// ===== DEFAULT PRODUCTS =====
const DEFAULT_PRODUCTS = [
  { id: 'p1', name: 'AQUA 200ml Cup', category: 'AQUA', desc: 'Air mineral murni AQUA ukuran cup 200ml, cocok untuk acara dan meeting. Tersedia satuan & karton.', status: 'ready', image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=300&q=80' },
  { id: 'p2', name: 'AQUA 330ml Mini', category: 'AQUA', desc: 'Botol mini AQUA 330ml, praktis dibawa kemana saja. Air mineral alami pegunungan terbaik.', status: 'ready', image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=300&q=80' },
  { id: 'p3', name: 'AQUA 600ml', category: 'AQUA', desc: 'AQUA botol 600ml ukuran standar paling populer. Kesegaran terjamin setiap tegukan.', status: 'ready', image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=300&q=80' },
  { id: 'p4', name: 'AQUA 1500ml', category: 'AQUA', desc: 'AQUA botol besar 1500ml, ideal untuk keluarga dan kegiatan outdoor. Tersedia satuan & karton.', status: 'warning', image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=300&q=80' },
  { id: 'p5', name: 'VIT 200ml Cup', category: 'VIT', desc: 'Air minum VIT ukuran cup 200ml, segar dan higienis. Cocok untuk distribusi massal.', status: 'ready', image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=300&q=80' },
  { id: 'p6', name: 'VIT 220ml Moksa', category: 'VIT', desc: 'VIT Moksa 220ml dengan kandungan mineral alami pilihan. Praktis dan menyehatkan.', status: 'ready', image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=300&q=80' },
  { id: 'p7', name: 'VIT 330ml Mini', category: 'VIT', desc: 'Botol VIT 330ml ukuran mini yang sempurna untuk berbagai kebutuhan harian Anda.', status: 'ready', image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=300&q=80' },
  { id: 'p8', name: 'VIT 550ml', category: 'VIT', desc: 'VIT botol 550ml ukuran tengah, pas untuk aktivitas harian dan olahraga ringan.', status: 'warning', image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=300&q=80' },
  { id: 'p9', name: 'VIT 1500ml', category: 'VIT', desc: 'VIT botol jumbo 1500ml, hemat dan ekonomis untuk konsumsi keluarga sehari-hari.', status: 'empty', image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=300&q=80' },
  { id: 'p10', name: 'Mizone Original', category: 'Mizone', desc: 'Mizone minuman isotonik rasa Original, membantu rehidrasi tubuh setelah aktivitas fisik.', status: 'ready', image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=300&q=80' },
  { id: 'p11', name: 'Mizone Apple Guava', category: 'Mizone', desc: 'Mizone rasa Apple Guava segar dan menyehatkan, kaya vitamin C untuk imunitas tubuh.', status: 'ready', image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=300&q=80' },
  { id: 'p12', name: 'Mizone Passion Fruit', category: 'Mizone', desc: 'Mizone rasa Passion Fruit yang eksotis, kesegaran tropis dalam setiap tegukan.', status: 'ready', image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=300&q=80' },
];

// ===== STATE =====
let products = [];
let cart = [];
let transactions = [];
let logoTapCount = 0;
let logoTapTimer = null;
let isAdmin = false;
let currentFilter = 'all';
let currentSearch = '';
let editingProductId = null;

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  loadData();
  initSplash();
  initTheme();
  initNavbar();
  initHero();
  initScrollReveal();
  initAdminTap();
  initPinInputs();
  renderProducts();
  renderAdminProducts();
  renderTransactions();
  renderCart();
});

// ===== LOCAL STORAGE =====
function loadData() {
  const storedProducts = localStorage.getItem('tu_products');
  products = storedProducts ? JSON.parse(storedProducts) : [...DEFAULT_PRODUCTS];
  cart = JSON.parse(localStorage.getItem('tu_cart') || '[]');
  transactions = JSON.parse(localStorage.getItem('tu_transactions') || '[]');
}

function saveProducts() { localStorage.setItem('tu_products', JSON.stringify(products)); }
function saveCart() { localStorage.setItem('tu_cart', JSON.stringify(cart)); }
function saveTransactions() { localStorage.setItem('tu_transactions', JSON.stringify(transactions)); }

// ===== SPLASH =====
function initSplash() {
  setTimeout(() => {
    const splash = document.getElementById('splash');
    splash.classList.add('hide');
    setTimeout(() => { splash.style.display = 'none'; }, 700);
  }, 2200);
}

// ===== THEME =====
function initTheme() {
  const saved = localStorage.getItem('tu_theme') || 'dark';
  setTheme(saved);
  document.getElementById('themeToggle').addEventListener('click', toggleTheme);
}
function setTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  document.getElementById('themeToggle').querySelector('.theme-icon').textContent = t === 'dark' ? '🌙' : '☀️';
  localStorage.setItem('tu_theme', t);
}
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  setTheme(current === 'dark' ? 'light' : 'dark');
}

// ===== NAVBAR =====
function initNavbar() {
  const nav = document.getElementById('navbar');
  const links = document.getElementById('navLinks');
  const hamburger = document.getElementById('hamburger');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
    updateActiveNav();
  });

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    links.classList.toggle('open');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      links.classList.remove('open');
    });
  });
}

function updateActiveNav() {
  const sections = ['hero', 'about', 'vision', 'catalog', 'how-to-order', 'contact'];
  const scrollY = window.scrollY + 100;
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.offsetTop, bottom = top + el.offsetHeight;
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) link.classList.toggle('active', scrollY >= top && scrollY < bottom);
  });
}

// ===== HERO BUBBLES =====
function initHero() {
  const container = document.getElementById('bubbles');
  for (let i = 0; i < 18; i++) createBubble(container);
}
function createBubble(container) {
  const b = document.createElement('div');
  b.className = 'bubble';
  const size = Math.random() * 60 + 10;
  b.style.cssText = `
    width:${size}px; height:${size}px;
    left:${Math.random() * 100}%;
    animation-duration:${Math.random() * 12 + 8}s;
    animation-delay:${Math.random() * 8}s;
  `;
  container.appendChild(b);
  b.addEventListener('animationend', () => {
    b.remove();
    createBubble(container);
  });
}

// ===== SCROLL REVEAL =====
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ===== PRODUCTS =====
function renderProducts() {
  const grid = document.getElementById('productsGrid');
  const filtered = products.filter(p => {
    const matchCat = currentFilter === 'all' || p.category === currentFilter;
    const matchSearch = p.name.toLowerCase().includes(currentSearch.toLowerCase()) ||
                        p.category.toLowerCase().includes(currentSearch.toLowerCase());
    return matchCat && matchSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--text-secondary);">
      <div style="font-size:48px;margin-bottom:16px;">🔍</div>
      <p>Tidak ada produk ditemukan</p>
    </div>`;
    return;
  }

  grid.innerHTML = filtered.map(p => productCardHTML(p)).join('');

  // Re-observe new cards
  grid.querySelectorAll('.reveal').forEach(el => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
    }, { threshold: 0.05 });
    observer.observe(el);
  });
}

function productCardHTML(p) {
  const statusMap = { ready: ['status-ready', 'READY'], warning: ['status-warning', 'SEGERA HABIS'], empty: ['status-empty', 'HABIS'] };
  const [cls, label] = statusMap[p.status] || statusMap.ready;
  const inCart = cart.find(c => c.id === p.id);
  return `
  <div class="product-card reveal" id="card-${p.id}">
    <div class="product-img-wrap">
      <img class="product-img" src="${p.image || 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=300&q=80'}" alt="${p.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=300&q=80'" />
      <span class="product-status ${cls}">${label}</span>
    </div>
    <div class="product-body">
      <div class="product-category">${p.category}</div>
      <div class="product-name">${p.name}</div>
      <div class="product-desc">${p.desc || ''}</div>
    </div>
    <div class="product-actions">
      <button class="btn btn-secondary btn-sm" onclick="showProductDetail('${p.id}')">Detail</button>
      <button class="btn btn-primary btn-sm ripple" onclick="addToCart('${p.id}')" ${p.status === 'empty' ? 'disabled style="opacity:0.5;cursor:not-allowed"' : ''}>
        ${inCart ? '✓ Ditambahkan' : '+ Keranjang'}
      </button>
    </div>
  </div>`;
}

// Filter & Search
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('filterBtns').addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.cat;
    renderProducts();
  });

  document.getElementById('searchInput').addEventListener('input', e => {
    currentSearch = e.target.value;
    renderProducts();
  });
});

// ===== CART =====
function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (!product || product.status === 'empty') return;
  const existing = cart.find(c => c.id === id);
  if (existing) { existing.qty++; }
  else { cart.push({ id, name: product.name, category: product.category, image: product.image, qty: 1 }); }
  saveCart();
  updateCartCount();
  renderProducts();
  // Bump animation
  const countEl = document.getElementById('cartCount');
  countEl.classList.remove('bump');
  void countEl.offsetWidth;
  countEl.classList.add('bump');
  setTimeout(() => countEl.classList.remove('bump'), 300);
  showToast(`${product.name} ditambahkan ke keranjang 🛒`);
}

function updateCartCount() {
  const total = cart.reduce((s, i) => s + i.qty, 0);
  document.getElementById('cartCount').textContent = total;
}

function renderCart() {
  const container = document.getElementById('cartItems');
  updateCartCount();
  if (cart.length === 0) {
    container.innerHTML = `<div class="cart-empty">🛒<br/>Keranjang masih kosong.<br/>Yuk tambahkan produk!</div>`;
    document.getElementById('cartTotal').textContent = '0';
    return;
  }
  container.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img class="cart-item-img" src="${item.image || ''}" alt="${item.name}" onerror="this.src='https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=100&q=60'" />
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-cat">${item.category}</div>
      </div>
      <div class="cart-item-qty">
        <button class="qty-btn" onclick="changeQty('${item.id}', -1)">−</button>
        <span class="qty-num">${item.qty}</span>
        <button class="qty-btn" onclick="changeQty('${item.id}', 1)">+</button>
      </div>
      <span class="cart-item-remove" onclick="removeFromCart('${item.id}')">🗑</span>
    </div>
  `).join('');
  document.getElementById('cartTotal').textContent = cart.reduce((s, i) => s + i.qty, 0);
}

function changeQty(id, delta) {
  const item = cart.find(c => c.id === id);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  saveCart();
  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  saveCart();
  renderCart();
  renderProducts();
  updateCartCount();
}

document.getElementById('cartBtn').addEventListener('click', () => {
  renderCart();
  openModal('cartModal');
});

// ===== CHECKOUT =====
function checkout() {
  if (cart.length === 0) { showToast('Keranjang kosong!'); return; }
  closeModal('cartModal');
  openModal('checkoutModal');
}

function processCheckout() {
  const name = document.getElementById('buyerName').value.trim();
  const phone = document.getElementById('buyerPhone').value.trim();
  const address = document.getElementById('buyerAddress').value.trim();
  const note = document.getElementById('cartNote').value.trim();

  if (!name || !phone || !address) {
    showToast('Lengkapi semua data pemesanan!', 'error');
    return;
  }

  const invoice = generateInvoice();
  const now = new Date();
  const dateStr = now.toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'short' });

  // Build message
  let msg = `╔══════════════════════╗\n`;
  msg += `║  🌊 TU DISTRIBUTOR  ║\n`;
  msg += `║   Air Minum Premium   ║\n`;
  msg += `╚══════════════════════╝\n\n`;
  msg += `📋 *PESANAN BARU*\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `🔖 Invoice  : ${invoice}\n`;
  msg += `📅 Waktu    : ${dateStr}\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `👤 *DATA PEMBELI*\n`;
  msg += `Nama       : ${name}\n`;
  msg += `WhatsApp   : ${phone}\n`;
  msg += `Alamat     :\n${address}\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `🛒 *DAFTAR PRODUK*\n`;
  cart.forEach((item, i) => {
    msg += `${i + 1}. ${item.name} (${item.category})\n   Qty: ${item.qty} unit\n`;
  });
  msg += `━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `📦 Total Item  : ${cart.reduce((s, i) => s + i.qty, 0)} item\n`;
  if (note) msg += `📝 Catatan     : ${note}\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `✅ Mohon konfirmasi pesanan ini.\nTerima kasih telah memesan di TU Distributor! 🙏`;

  // Save transaction
  const tx = {
    invoice,
    buyer: name,
    phone,
    address,
    products: [...cart],
    note,
    time: now.toISOString(),
    timeStr: dateStr
  };
  transactions.unshift(tx);
  saveTransactions();

  // Clear cart
  cart = [];
  saveCart();
  renderCart();
  renderProducts();
  updateCartCount();

  closeModal('checkoutModal');
  document.getElementById('buyerName').value = '';
  document.getElementById('buyerPhone').value = '';
  document.getElementById('buyerAddress').value = '';

  // Open WhatsApp
  openWhatsApp(msg);
  showToast(`Pesanan ${invoice} berhasil dikirim! ✅`);
}

function generateInvoice() {
  const d = new Date();
  const pad = n => String(n).padStart(2, '0');
  return `TU-${d.getFullYear()}${pad(d.getMonth()+1)}${pad(d.getDate())}-${Math.floor(Math.random()*9000)+1000}`;
}

// ===== PRODUCT DETAIL =====
function showProductDetail(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  const statusMap = { ready: ['status-ready', 'READY'], warning: ['status-warning', 'SEGERA HABIS'], empty: ['status-empty', 'HABIS'] };
  const [cls, label] = statusMap[p.status] || statusMap.ready;
  document.getElementById('detailContent').innerHTML = `
    <div class="modal-header">
      <h3>${p.name}</h3>
      <button class="modal-close" onclick="closeModal('detailModal')">✕</button>
    </div>
    <img src="${p.image || ''}" alt="${p.name}" style="width:100%;height:260px;object-fit:contain;border-radius:12px;background:var(--white-glass);margin-bottom:20px;" onerror="this.src='https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&q=80'" />
    <span class="product-status ${cls}" style="display:inline-block;margin-bottom:16px;">${label}</span>
    <div class="product-category" style="margin-bottom:8px;">${p.category}</div>
    <h4 style="font-family:var(--font-display);font-size:20px;margin-bottom:12px;color:var(--text-primary);">${p.name}</h4>
    <p style="color:var(--text-secondary);line-height:1.7;margin-bottom:24px;">${p.desc || 'Produk air minum premium berkualitas tinggi dari distributor resmi.'}</p>
    <div style="display:flex;gap:12px;">
      <button class="btn btn-primary ripple" style="flex:1;justify-content:center;" onclick="addToCart('${p.id}');closeModal('detailModal');" ${p.status === 'empty' ? 'disabled style="opacity:0.5"' : ''}>
        + Tambah Keranjang
      </button>
      <button class="btn btn-wa ripple" onclick="openWhatsApp('Halo, saya ingin bertanya tentang produk ${p.name}.')">
        💬 Tanya WA
      </button>
    </div>
  `;
  openModal('detailModal');
}

// ===== CONTACT WA =====
function sendContactWA() {
  const name = document.getElementById('msgName').value.trim();
  const phone = document.getElementById('msgPhone').value.trim();
  const text = document.getElementById('msgText').value.trim();
  if (!name || !text) { showToast('Isi nama dan pesan terlebih dahulu!', 'error'); return; }
  const msg = `Halo TU Distributor! 👋\n\nNama: ${name}\n${phone ? 'WA: ' + phone + '\n' : ''}\nPesan:\n${text}`;
  openWhatsApp(msg);
}

// ===== WHATSAPP =====
function openWhatsApp(message) {
  const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

// ===== CHAT TOGGLE =====
function toggleChatMenu() {
  document.getElementById('chatMenu').classList.toggle('open');
}
document.addEventListener('click', e => {
  if (!e.target.closest('.floating-chat')) {
    document.getElementById('chatMenu').classList.remove('open');
  }
});

// ===== MODALS =====
function openModal(id) {
  const el = document.getElementById(id);
  el.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal(id) {
  document.getElementById(id).classList.remove('open');
  document.body.style.overflow = '';
}
document.querySelectorAll('.modal-overlay').forEach(modal => {
  modal.addEventListener('click', e => {
    if (e.target === modal) {
      closeModal(modal.id);
    }
  });
});

// ===== ADMIN TAP =====
function initAdminTap() {
  document.getElementById('navLogo').addEventListener('click', () => {
    logoTapCount++;
    clearTimeout(logoTapTimer);
    if (logoTapCount >= 5) {
      logoTapCount = 0;
      openModal('adminPinModal');
      setTimeout(() => document.querySelector('.pin-digit').focus(), 100);
    }
    logoTapTimer = setTimeout(() => { logoTapCount = 0; }, 2000);
  });
}

// ===== PIN =====
function initPinInputs() {
  const inputs = document.querySelectorAll('.pin-digit');
  inputs.forEach((input, i) => {
    input.addEventListener('input', () => {
      if (input.value && i < inputs.length - 1) inputs[i + 1].focus();
    });
    input.addEventListener('keydown', e => {
      if (e.key === 'Backspace' && !input.value && i > 0) inputs[i - 1].focus();
      if (e.key === 'Enter') checkAdminPin();
    });
  });
}

function checkAdminPin() {
  const pin = Array.from(document.querySelectorAll('.pin-digit')).map(i => i.value).join('');
  const errEl = document.getElementById('pinError');
  if (pin === '12345') {
    errEl.textContent = '';
    closeModal('adminPinModal');
    isAdmin = true;
    document.getElementById('adminDashboard').classList.add('open');
    document.querySelectorAll('.pin-digit').forEach(i => i.value = '');
    renderAdminProducts();
    renderTransactions();
  } else {
    errEl.textContent = 'PIN salah! Coba lagi.';
    document.querySelectorAll('.pin-digit').forEach(i => i.value = '');
    document.querySelector('.pin-digit').focus();
  }
}

function logoutAdmin() {
  isAdmin = false;
  document.getElementById('adminDashboard').classList.remove('open');
}

function switchAdminTab(name) {
  document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.admin-nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById(`tab-${name}`).classList.add('active');
  document.querySelector(`[data-tab="${name}"]`).classList.add('active');
}

// ===== ADMIN PRODUCTS =====
function renderAdminProducts() {
  const grid = document.getElementById('productsAdminGrid');
  if (!grid) return;
  grid.innerHTML = products.map(p => {
    const statusMap = { ready: ['status-ready', 'READY'], warning: ['status-warning', 'SEGERA HABIS'], empty: ['status-empty', 'HABIS'] };
    const [cls, label] = statusMap[p.status] || statusMap.ready;
    return `
    <div class="product-admin-card">
      <img src="${p.image || 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=300&q=60'}" alt="${p.name}" onerror="this.src='https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=300&q=60'" />
      <div class="product-admin-info">
        <h4>${p.name}</h4>
        <div class="cat">${p.category}</div>
        <span class="product-status ${cls}" style="display:inline-block;margin-bottom:12px;">${label}</span>
        <div class="product-admin-actions">
          <button class="btn btn-secondary btn-sm" onclick="editProduct('${p.id}')">✏️ Edit</button>
          <button class="btn btn-danger btn-sm" onclick="deleteProduct('${p.id}')">🗑 Hapus</button>
        </div>
        <div style="margin-top:8px;">
          <select onchange="changeStatus('${p.id}', this.value)" style="width:100%;padding:6px 10px;background:var(--white-glass);border:1px solid var(--glass-border);border-radius:6px;color:var(--text-primary);">
            <option value="ready" ${p.status==='ready'?'selected':''}>READY</option>
            <option value="warning" ${p.status==='warning'?'selected':''}>SEGERA HABIS</option>
            <option value="empty" ${p.status==='empty'?'selected':''}>HABIS</option>
          </select>
        </div>
      </div>
    </div>`;
  }).join('');
}

function editProduct(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  switchAdminTab('add-product');
  document.getElementById('addProductTitle').textContent = 'Edit Produk';
  document.getElementById('editProductId').value = id;
  document.getElementById('prodName').value = p.name;
  document.getElementById('prodCategory').value = p.category;
  document.getElementById('prodDesc').value = p.desc || '';
  document.getElementById('prodStatus').value = p.status;
  document.getElementById('prodImage').value = p.image || '';
}

function deleteProduct(id) {
  if (!confirm('Hapus produk ini?')) return;
  products = products.filter(p => p.id !== id);
  saveProducts();
  renderAdminProducts();
  renderProducts();
  showToast('Produk dihapus!');
}

function changeStatus(id, status) {
  const p = products.find(x => x.id === id);
  if (p) {
    p.status = status;
    saveProducts();
    renderProducts();
    renderAdminProducts();
  }
}

function saveProduct() {
  const name = document.getElementById('prodName').value.trim();
  const category = document.getElementById('prodCategory').value;
  const desc = document.getElementById('prodDesc').value.trim();
  const status = document.getElementById('prodStatus').value;
  const image = document.getElementById('prodImage').value.trim();
  const editId = document.getElementById('editProductId').value;

  if (!name) { showToast('Nama produk wajib diisi!', 'error'); return; }

  if (editId) {
    const p = products.find(x => x.id === editId);
    if (p) { p.name = name; p.category = category; p.desc = desc; p.status = status; if (image) p.image = image; }
  } else {
    products.push({ id: 'p' + Date.now(), name, category, desc, status, image: image || 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=300&q=80' });
  }

  saveProducts();
  renderAdminProducts();
  renderProducts();
  resetProductForm();
  showToast(editId ? 'Produk berhasil diupdate!' : 'Produk baru berhasil ditambahkan!');
}

function resetProductForm() {
  document.getElementById('editProductId').value = '';
  document.getElementById('addProductTitle').textContent = 'Tambah Produk Baru';
  document.getElementById('prodName').value = '';
  document.getElementById('prodCategory').value = 'AQUA';
  document.getElementById('prodDesc').value = '';
  document.getElementById('prodStatus').value = 'ready';
  document.getElementById('prodImage').value = '';
}

function handleImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => { document.getElementById('prodImage').value = e.target.result; };
  reader.readAsDataURL(file);
}

// ===== TRANSACTIONS =====
function renderTransactions(filter = '') {
  const tbody = document.getElementById('txBody');
  if (!tbody) return;
  const date = document.getElementById('filterDate')?.value || '';
  let txs = transactions;
  if (filter) txs = txs.filter(t => t.buyer.toLowerCase().includes(filter.toLowerCase()) || t.invoice.toLowerCase().includes(filter.toLowerCase()));
  if (date) txs = txs.filter(t => t.time && t.time.startsWith(date));

  if (txs.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;padding:40px;color:var(--text-secondary);">Belum ada transaksi</td></tr>`;
    return;
  }

  tbody.innerHTML = txs.map(t => `
    <tr>
      <td><code style="font-size:12px;color:var(--cyan);">${t.invoice}</code></td>
      <td>
        <div style="font-weight:600;">${t.buyer}</div>
        <div style="font-size:12px;color:var(--text-secondary);">${t.phone}</div>
      </td>
      <td style="font-size:13px;">${t.products.map(p => `${p.name} ×${p.qty}`).join('<br/>')}</td>
      <td style="font-size:12px;color:var(--text-secondary);">${t.timeStr}</td>
      <td>
        <button class="btn btn-danger btn-sm" onclick="deleteTransaction('${t.invoice}')">🗑</button>
      </td>
    </tr>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  const searchTx = document.getElementById('searchTx');
  const filterDate = document.getElementById('filterDate');
  if (searchTx) searchTx.addEventListener('input', e => renderTransactions(e.target.value));
  if (filterDate) filterDate.addEventListener('change', () => renderTransactions(searchTx?.value || ''));
});

function deleteTransaction(invoice) {
  if (!confirm('Hapus transaksi ini?')) return;
  transactions = transactions.filter(t => t.invoice !== invoice);
  saveTransactions();
  renderTransactions();
}

function clearAllTransactions() {
  if (!confirm('Hapus SEMUA histori transaksi? Tindakan ini tidak bisa dibatalkan!')) return;
  transactions = [];
  saveTransactions();
  renderTransactions();
  showToast('Semua transaksi dihapus');
}

function exportTransactions() {
  if (transactions.length === 0) { showToast('Tidak ada transaksi untuk diekspor', 'error'); return; }
  const headers = ['Invoice', 'Nama', 'WhatsApp', 'Alamat', 'Produk', 'Waktu'];
  const rows = transactions.map(t => [
    t.invoice, t.buyer, t.phone, `"${t.address.replace(/"/g, "'")}"`,
    `"${t.products.map(p => `${p.name} x${p.qty}`).join(', ')}"`,
    t.timeStr
  ]);
  const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = `TU-Transaksi-${new Date().toISOString().slice(0,10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('Export berhasil! File CSV diunduh.');
}

// ===== TOAST =====
let toastEl;
function showToast(msg, type = 'success') {
  if (!toastEl) {
    toastEl = document.createElement('div');
    toastEl.style.cssText = `
      position:fixed; bottom:100px; left:50%; transform:translateX(-50%) translateY(20px);
      background:rgba(13,34,64,0.95); border:1px solid var(--glass-border);
      backdrop-filter:blur(20px); color:var(--text-primary);
      padding:12px 24px; border-radius:50px; font-size:14px; font-weight:500;
      z-index:9999; transition:all 0.3s ease; opacity:0; white-space:nowrap;
      box-shadow:0 8px 32px rgba(0,153,255,0.2);
    `;
    document.body.appendChild(toastEl);
  }
  toastEl.textContent = msg;
  toastEl.style.borderColor = type === 'error' ? 'rgba(255,82,82,0.4)' : 'rgba(0,212,255,0.3)';
  toastEl.style.opacity = '1';
  toastEl.style.transform = 'translateX(-50%) translateY(0)';
  clearTimeout(toastEl._timer);
  toastEl._timer = setTimeout(() => {
    toastEl.style.opacity = '0';
    toastEl.style.transform = 'translateX(-50%) translateY(10px)';
  }, 2800);
}

// ===== ESC KEY =====
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    ['cartModal', 'checkoutModal', 'detailModal', 'adminPinModal'].forEach(closeModal);
    document.getElementById('chatMenu').classList.remove('open');
  }
});
