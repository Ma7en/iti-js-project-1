document.addEventListener("DOMContentLoaded", function () {
    displayCart();
});

function displayCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartContainer = document.getElementById("cart-items");
    cartContainer.innerHTML = "";

    cart.forEach((product) => {
        cartContainer.innerHTML += `
            <div class="cart-item">
                <img src="${product.images[0]}" alt="${product.title}">
                <h2>${product.title}</h2>
                <p>$${product.price}</p>
                <button onclick="removeFromCart(${product.id})">Remove</button>
            </div>
        `;
    });

    calculateTotal();
}

function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter((product) => product.id !== productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

function calculateTotal() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = cart.reduce((acc, product) => acc + product.price, 0);
    document.getElementById("total").textContent = `Total: $${total}`;
}
