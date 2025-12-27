let cart = JSON.parse(localStorage.getItem('boba_cart')) || [];

document.addEventListener('DOMContentLoaded', updateUI);

function toggleCart() {
    document.getElementById('cartDrawer').classList.toggle('active');
    document.getElementById('cartOverlay').classList.toggle('active');
}

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        const name = e.target.getAttribute('data-name');
        const price = parseFloat(e.target.getAttribute('data-price'));
        const img = e.target.getAttribute('data-img');

        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name, price, img, quantity: 1 });
        }

        updateUI();
        if (!document.getElementById('cartDrawer').classList.contains('active')) {
            toggleCart();
        }
    });
});

function updateQuantity(name, delta) {
    const item = cart.find(item => item.name === name);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.name !== name);
        }
        updateUI();
    }
}

function removeItem(name) {
    cart = cart.filter(item => item.name !== name);
    updateUI();
}

function updateUI() {
    const cartList = document.getElementById('cart-items-list');
    const cartCount = document.getElementById('cart-count');
    const drawerCount = document.getElementById('cart-drawer-count');
    const cartTotal = document.getElementById('cart-total');

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.innerText = totalItems;
    drawerCount.innerText = totalItems;

    if (cart.length === 0) {
        cartList.innerHTML = '<p class="text-center text-muted py-5">Your cart is empty.</p>';
    } else {
        cartList.innerHTML = cart.map(item => `
            <div class="cart-item mb-3">
                <img src="${item.img}" class="cart-item-img" alt="${item.name}">
                <div class="flex-grow-1">
                    <div class="d-flex justify-content-between align-items-start">
                        <h6 class="mb-0 fw-bold">${item.name}</h6>
                        <button class="btn btn-sm text-danger p-0 ms-2" onclick="removeItem('${item.name}')">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <p class="text-purple fw-bold mb-2 small">$${item.price.toFixed(2)}</p>
                    <div class="d-flex align-items-center">
                        <button class="qty-btn" onclick="updateQuantity('${item.name}', -1)">-</button>
                        <span class="mx-3 small fw-bold">${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity('${item.name}', 1)">+</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.innerText = `$${total.toFixed(2)}`;
}