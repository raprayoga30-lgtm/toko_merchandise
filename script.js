const products = [
  {
    id: 1,
    name: 'Kaos Logo Premium',
    category: 'Kaos',
    price: 125000,
    stock: 24,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 2,
    name: 'Hoodie Oversized',
    category: 'Hoodie',
    price: 285000,
    stock: 12,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 3,
    name: 'Tote Bag Canvas',
    category: 'Aksesoris',
    price: 89000,
    stock: 38,
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 4,
    name: 'Topi Dad Hat',
    category: 'Topi',
    price: 99000,
    stock: 18,
    image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 5,
    name: 'Stiker Pack',
    category: 'Aksesoris',
    price: 35000,
    stock: 60,
    image: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 6,
    name: 'Lanyard Custom',
    category: 'Aksesoris',
    price: 45000,
    stock: 44,
    image: 'https://images.unsplash.com/photo-1563906267088-b029e7101114?auto=format&fit=crop&w=900&q=80'
  }
];

let cart = [];

function rupiah(number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(number);
}

function renderProducts() {
  const searchInput = document.getElementById('searchInput');
  const categoryFilter = document.getElementById('categoryFilter');
  const productList = document.getElementById('productList');

  const search = searchInput.value.toLowerCase();
  const category = categoryFilter.value;

  const filteredProducts = products.filter(product => {
    const matchSearch = product.name.toLowerCase().includes(search);
    const matchCategory = category === 'Semua' || product.category === category;
    return matchSearch && matchCategory;
  });

  if (filteredProducts.length === 0) {
    productList.innerHTML = '<p>Produk tidak ditemukan.</p>';
    return;
  }

  productList.innerHTML = filteredProducts.map(product => `
    <div class="card">
      <img src="${product.image}" alt="${product.name}">

      <div class="card-content">
        <span class="badge">${product.category}</span>

        <h3>${product.name}</h3>

        <div class="price">${rupiah(product.price)}</div>

        <div class="stock">Stok tersedia: ${product.stock}</div>

        <button onclick="addToCart(${product.id})">
          Tambah ke Keranjang
        </button>
      </div>
    </div>
  `).join('');
}

function addToCart(id) {
  const product = products.find(item => item.id === id);
  const existingProduct = cart.find(item => item.id === id);

  if (existingProduct) {
    existingProduct.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  renderCart();
}

function changeQty(id, value) {
  const item = cart.find(item => item.id === id);

  if (!item) return;

  item.qty += value;

  if (item.qty <= 0) {
    cart = cart.filter(cartItem => cartItem.id !== id);
  }

  renderCart();
}

function removeItem(id) {
  cart = cart.filter(item => item.id !== id);
  renderCart();
}

function renderCart() {
  const cartList = document.getElementById('cartList');
  const subtotalElement = document.getElementById('subtotal');
  const shippingElement = document.getElementById('shipping');
  const totalElement = document.getElementById('total');

  if (cart.length === 0) {
    cartList.innerHTML = '<p>Keranjang masih kosong.</p>';
  } else {
    cartList.innerHTML = cart.map(item => `
      <div class="cart-item">
        <h4>${item.name}</h4>

        <div>${rupiah(item.price)} x ${item.qty}</div>

        <div class="qty">
          <button onclick="changeQty(${item.id}, -1)">-</button>
          <strong>${item.qty}</strong>
          <button onclick="changeQty(${item.id}, 1)">+</button>
          <button onclick="removeItem(${item.id})">Hapus</button>
        </div>
      </div>
    `).join('');
  }

  const subtotal = cart.reduce((sum, item) => {
    return sum + item.price * item.qty;
  }, 0);

  const shipping = subtotal > 250000 || subtotal === 0 ? 0 : 18000;
  const total = subtotal + shipping;

  subtotalElement.innerText = rupiah(subtotal);
  shippingElement.innerText = shipping === 0 ? 'Gratis' : rupiah(shipping);
  totalElement.innerText = rupiah(total);
}

function checkout() {
  if (cart.length === 0) {
    alert('Keranjang masih kosong.');
    return;
  }

  alert('Pesanan berhasil dibuat.');
  cart = [];
  renderCart();
}

renderProducts();
renderCart();
