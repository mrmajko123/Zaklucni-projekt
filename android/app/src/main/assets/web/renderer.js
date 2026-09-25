const products = {
  foods: [
    { id: 1, name: 'Classic Burger', price: 5.99, color: '#8B4513', emoji: '\uD83C\uDF54' },
    { id: 2, name: 'Margherita Pizza', price: 5.99, color: '#C0392B', emoji: '\uD83C\uDF55' },
    { id: 3, name: 'Caesar Salad', price: 5.99, color: '#27AE60', emoji: '\uD83E\uDD57' },
    { id: 4, name: 'Double Cheeseburger', price: 6.99, color: '#A0522D', emoji: '\uD83C\uDF54' },
    { id: 5, name: 'Pepperoni Pizza', price: 6.99, color: '#E74C3C', emoji: '\uD83C\uDF55' },
    { id: 6, name: 'Veggie Pizza', price: 5.49, color: '#2ECC71', emoji: '\uD83C\uDF55' },
    { id: 7, name: 'Chicken Wings', price: 7.99, color: '#D35400', emoji: '\uD83C\uDF57' },
    { id: 8, name: 'French Fries', price: 3.99, color: '#F39C12', emoji: '\uD83C\uDF5F' },
    { id: 9, name: 'Onion Rings', price: 4.49, color: '#E67E22', emoji: '\uD83E\uDDC5' },
  ],
  drinks: [
    { id: 10, name: 'Cola', price: 2.49, color: '#8B0000', emoji: '\uD83E\uDD64' },
    { id: 11, name: 'Sprite', price: 2.49, color: '#2ECC71', emoji: '\uD83C\uDF7F' },
    { id: 12, name: 'Orange Juice', price: 3.49, color: '#E67E22', emoji: '\uD83E\uDDC3' },
    { id: 13, name: 'Water', price: 1.49, color: '#3498DB', emoji: '\uD83D\uDCA7' },
    { id: 14, name: 'Coffee', price: 2.99, color: '#6F4E37', emoji: '\u2615' },
    { id: 15, name: 'Milkshake', price: 4.49, color: '#E91E63', emoji: '\uD83E\uDD5B' },
    { id: 16, name: 'Lemonade', price: 2.99, color: '#F1C40F', emoji: '\uD83C\uDF4B' },
    { id: 17, name: 'Iced Tea', price: 2.79, color: '#D35400', emoji: '\uD83C\uDF75' },
    { id: 18, name: 'Smoothie', price: 4.99, color: '#9B59B6', emoji: '\uD83C\uDF53' },
  ],
  combos: [
    { id: 19, name: 'Burger Combo', price: 9.99, color: '#E6C619', emoji: '\uD83C\uDF54', items: 'Burger + Fries + Cola' },
    { id: 20, name: 'Pizza Combo', price: 10.99, color: '#E74C3C', emoji: '\uD83C\uDF55', items: 'Pizza + Salad + Juice' },
    { id: 21, name: 'Chicken Combo', price: 11.99, color: '#D35400', emoji: '\uD83C\uDF57', items: 'Wings + Fries + Sprite' },
    { id: 22, name: 'Family Combo', price: 24.99, color: '#8E44AD', emoji: '\uD83C\uDF7D\uFE0F', items: '2 Burgers + 2 Pizzas + 4 Drinks' },
    { id: 23, name: 'Veggie Combo', price: 8.99, color: '#27AE60', emoji: '\uD83E\uDD57', items: 'Salad + Fries + Lemonade' },
    { id: 24, name: 'Breakfast Combo', price: 7.99, color: '#F39C12', emoji: '\uD83E\uDD5E', items: 'Eggs + Fries + Coffee' },
  ],
};

let currentCategory = 'foods';
let cart = [];
let scrollIndex = 0;
const BATCH_SIZE = 9;

function getItemsForCategory(category) {
  if (category === 'all') {
    return [...products.combos, ...products.foods, ...products.drinks];
  }
  return products[category];
}

function createCard(item) {
  const card = document.createElement('div');
  card.className = 'product-card';
  const bgGrad = `linear-gradient(135deg, ${item.color}44, ${item.color}22)`;
  card.innerHTML = `
    <div class="card-name">${item.name}</div>
    <div class="card-image" style="background: ${bgGrad}; display:flex; align-items:center; justify-content:center; font-size: 5rem;">
      ${item.emoji}
    </div>
    <div class="card-footer">
      <div class="card-price">${item.price.toFixed(2)}</div>
      <button class="add-btn" data-id="${item.id}">Add to Cart</button>
    </div>
  `;
  return card;
}

function createSectionHeader(title) {
  const header = document.createElement('div');
  header.className = 'section-header';
  header.textContent = title;
  return header;
}

function appendBatch() {
  const container = document.getElementById('products');
  const allItems = getItemsForCategory(currentCategory);
  const total = allItems.length;
  let added = 0;

  while (added < BATCH_SIZE) {
    const item = allItems[scrollIndex % total];

    if (currentCategory === 'all') {
      if (scrollIndex % total === 0 && added > 0) break;
      if (scrollIndex % total === 0) {
        container.appendChild(createSectionHeader('Combos'));
      }
      if (scrollIndex % total === products.combos.length && added > 0 && scrollIndex % total === products.combos.length) {
        container.appendChild(createSectionHeader('Foods'));
      }
      if (scrollIndex % total === products.combos.length + products.foods.length && added > 0) {
        container.appendChild(createSectionHeader('Drinks'));
      }
    }

    container.appendChild(createCard(item));
    scrollIndex++;
    added++;

    if (scrollIndex % total === 0 && currentCategory !== 'all') break;
  }

  container.querySelectorAll('.add-btn').forEach(btn => {
    if (!btn.dataset.bound) {
      btn.dataset.bound = '1';
      btn.addEventListener('click', () => addToCart(parseInt(btn.dataset.id)));
    }
  });
}

function renderProducts(category) {
  const container = document.getElementById('products');
  container.innerHTML = '';
  scrollIndex = 0;
  appendBatch();
}

function addToCart(productId) {
  const all = [...products.foods, ...products.drinks, ...products.combos];
  const product = all.find(p => p.id === productId);
  if (!product) return;
  const existing = cart.find(c => c.id === productId);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  updateCartUI();
}

function updateCartUI() {
  const count = cart.reduce((sum, c) => sum + c.qty, 0);
  const countEl = document.getElementById('cart-count');
  if (count > 0) {
    countEl.textContent = count;
    countEl.classList.remove('hidden');
  } else {
    countEl.classList.add('hidden');
  }
  renderCartItems();
}

function renderCartItems() {
  const container = document.getElementById('cart-items');
  const totalEl = document.getElementById('cart-total-price');
  if (cart.length === 0) {
    container.innerHTML = '<div class="cart-empty">Your cart is empty</div>';
    totalEl.textContent = '\u20AC0.00';
    return;
  }
  container.innerHTML = '';
  cart.forEach(item => {
    const el = document.createElement('div');
    el.className = 'cart-item';
    const bgGrad = `linear-gradient(135deg, ${item.color}44, ${item.color}22)`;
    el.innerHTML = `
      <div class="cart-item-img" style="background: ${bgGrad}; display:flex; align-items:center; justify-content:center; font-size:1.5rem;">${item.emoji}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">\u20AC${(item.price * item.qty).toFixed(2)}</div>
      </div>
      <div class="cart-item-qty">
        <button class="qty-btn" data-action="dec" data-id="${item.id}">-</button>
        <span>${item.qty}</span>
        <button class="qty-btn" data-action="inc" data-id="${item.id}">+</button>
      </div>
    `;
    container.appendChild(el);
  });
  const total = cart.reduce((sum, c) => sum + c.price * c.qty, 0);
  totalEl.textContent = `\u20AC${total.toFixed(2)}`;
  container.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      const action = btn.dataset.action;
      const item = cart.find(c => c.id === id);
      if (!item) return;
      if (action === 'inc') item.qty++;
      if (action === 'dec') {
        item.qty--;
        if (item.qty <= 0) cart = cart.filter(c => c.id !== id);
      }
      updateCartUI();
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const productsEl = document.getElementById('products');

  renderProducts(currentCategory);

  productsEl.addEventListener('scroll', () => {
    if (productsEl.scrollTop + productsEl.clientHeight >= productsEl.scrollHeight - 300) {
      appendBatch();
    }
  });

  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.dataset.category;
      renderProducts(currentCategory);
    });
  });

  document.getElementById('cart-btn').addEventListener('click', () => {
    document.getElementById('cart-panel').classList.remove('hidden');
    renderCartItems();
  });

  document.getElementById('cart-close').addEventListener('click', () => {
    document.getElementById('cart-panel').classList.add('hidden');
  });

  document.getElementById('cart-order').addEventListener('click', () => {
    if (cart.length === 0) return;
    document.getElementById('order-modal').classList.remove('hidden');
  });

  document.getElementById('modal-close').addEventListener('click', () => {
    document.getElementById('order-modal').classList.add('hidden');
    cart = [];
    updateCartUI();
    document.getElementById('cart-panel').classList.add('hidden');
  });
});
