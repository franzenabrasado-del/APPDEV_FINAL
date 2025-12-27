document.addEventListener('DOMContentLoaded', () => {
    loadCheckoutSummary();

    const checkoutForm = document.getElementById('checkoutForm');
    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Show success modal
        const modal = new bootstrap.Modal(document.getElementById('orderSuccessModal'));
        modal.show();

        // Clear cart
        localStorage.removeItem('boba_cart');
    });
});

function loadCheckoutSummary() {
    const itemsContainer = document.getElementById('checkout-items');
    const subtotalEl = document.getElementById('subtotal');
    const totalEl = document.getElementById('total');

    const cart = JSON.parse(localStorage.getItem('boba_cart')) || [];

    if (cart.length === 0) {
        itemsContainer.innerHTML = '<p class="text-muted">Your cart is empty.</p>';
        return;
    }

    itemsContainer.innerHTML = cart.map(item => `
        <div class="d-flex align-items-center mb-3">
            <img src="${item.img}" class="rounded-3 me-3" style="width: 50px; height: 50px; object-fit: cover;">
            <div class="flex-grow-1">
                <h6 class="mb-0 fw-bold small">${item.name}</h6>
                <small class="text-muted">${item.quantity} x $${item.price.toFixed(2)}</small>
            </div>
            <span class="fw-bold small">$${(item.quantity * item.price).toFixed(2)}</span>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    subtotalEl.innerText = `$${total.toFixed(2)}`;
    totalEl.innerText = `$${total.toFixed(2)}`;
}
