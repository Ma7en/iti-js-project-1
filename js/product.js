document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");

    fetch(`https://dummyjson.com/products/${productId}`)
        .then((response) => response.json())
        .then((product) => {
            let productContainer = document.getElementById("product");
            productContainer.innerHTML = `
                <div class="product-detail">
                    <img src="${product.images[0]}" alt="${product.title}">
                    <h2>${product.title}</h2>
                    <p>${product.description}</p>
                    <p>$${product.price}</p>
                    <button onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            `;
        });
});

// function addToCart(productId) {
//     fetch(`https://dummyjson.com/products/${productId}`)
//         .then((response) => response.json())
//         .then((product) => {
//             let cart = JSON.parse(localStorage.getItem("cart")) || [];
//             cart.push(product);
//             localStorage.setItem("cart", JSON.stringify(cart));
//             alert("Product added to cart");
//         });
// }

// You can reuse the addToCart function from your existing script.js file
let cart = [];

function addToCart(productId) {
    fetch(`https://dummyjson.com/products/${productId}`)
        .then((response) => response.json())
        .then((product) => {
            let cartItem = cart.find((item) => item.id === productId);
            if (cartItem) {
                cartItem.quantity++;
            } else {
                product.quantity = 1;
                cart.push(product);
            }
            displayCart();
        });
}

function displayCart() {
    let cartContainer = document.getElementById("cart");
    cartContainer.innerHTML = "";
    cart.forEach((product) => {
        cartContainer.innerHTML += `
            <div class="cart-item">
                <img src="${product.images[0]}" alt="${product.title}">
                <h2>${product.title}</h2>
                <p>$${product.price}</p>
                <p>quantity:${product.quantity}</p>
                <button onclick="removeFromCart(${product.id})">Remove</button>
            </div>
        `;
    });
    calculateTotal();
}

function removeFromCart(productId) {
    let cartItem = cart.find((item) => item.id === productId);
    if (cartItem.quantity > 1) {
        cartItem.quantity--;
    } else {
        cart = cart.filter((item) => item.id !== productId);
    }
    displayCart();
}

function calculateTotal() {
    let total = cart.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0
    );
    document.getElementById("total").textContent = `Total: $${total.toFixed(
        2
    )}`;
}
