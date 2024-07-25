// =========================================
// =========================================
// 3- categories
document.addEventListener("DOMContentLoaded", function () {
    // Fetch and display all products initially
    fetchAllProducts();

    // Fetch categories and display them
    fetch("https://dummyjson.com/products/categories")
        .then(function (response) {
            return response.json();
        })
        .then((categories) => {
            console.log(`Categories: `, categories);
            let categoriesContainer = document.getElementById("categories");
            for (let i = 0; i < categories.length; i++) {
                let listItem = document.createElement("li");
                listItem.textContent = categories[i].name;
                listItem.addEventListener("click", function () {
                    fetchCategoryProducts(categories[i].slug);
                });
                categoriesContainer.appendChild(listItem);
            }

            // Add "All Products" option
            let allProductsItem = document.createElement("li");
            allProductsItem.textContent = "All Products";
            allProductsItem.addEventListener("click", fetchAllProducts);
            categoriesContainer.insertBefore(
                allProductsItem,
                categoriesContainer.firstChild
            );
        });

    // Function to fetch and display all products
    function fetchAllProducts() {
        fetch("https://dummyjson.com/products")
            .then(function (response) {
                return response.json();
            })
            .then((data) => {
                console.log(`All products: `, data);
                displayProducts(data.products);
            });
    }

    // Function to fetch products for a given category and display them
    function fetchCategoryProducts(category) {
        fetch(`https://dummyjson.com/products/category/${category}`)
            .then(function (response) {
                return response.json();
            })
            .then((data) => {
                console.log(`Products in category ${category}: `, data);
                displayProducts(data.products);
            });
    }

    // Function to display products
    function displayProducts(products) {
        let productContainer = document.getElementById("products");
        productContainer.innerHTML = ""; // Clear previous products
        products.forEach((product) => {
            productContainer.innerHTML += `
                <div class="product">
                    <img src="${product.images[0]}" alt="${product.title}">
                    <h2>${product.title}</h2>
                    <p>${product.description}</p>
                    <p>$${product.price}</p>
                    <button onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            `;
        });
    }
});

// =========================================
// =========================================
// // 3. Search Functionality
let searchDiv = document.querySelector("#searchDiv");
document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.createElement("input");
    searchInput.setAttribute("type", "text");
    searchInput.setAttribute("id", "search");
    searchInput.setAttribute("placeholder", "Search products...");

    searchDiv.appendChild(searchInput);

    searchInput.addEventListener("keyup", function () {
        const searchQuery = searchInput.value.toLowerCase();
        const products = document.querySelectorAll(".product");
        products.forEach((product) => {
            const title = product.querySelector("h2").textContent.toLowerCase();
            if (title.includes(searchQuery)) {
                product.style.display = "";
            } else {
                product.style.display = "none";
            }
        });
    });

    fetch("https://dummyjson.com/products")
        .then((response) => response.json())
        .then((data) => {
            const products = data.products;
            let productContainer = document.getElementById("products");
            products.forEach((product) => {
                productContainer.innerHTML += `
                    <div class="product">
                        <img src="${product.images[0]}" alt="${product.title}">
                        <h2>${product.title}</h2>
                        <p>${product.description}</p>
                        <p>${product.price}</p>
                        <button onclick="addToCart(${product.id})">Add to Cart</button>
                    </div>
                `;
            });
        });
});

// =========================================
// =========================================
// 4. Shopping Cart
let cart = [];

function addToCart(productId) {
    fetch(`https://dummyjson.com/products/${productId}`)
        .then((response) => response.json())
        .then((product) => {
            // Check if the product is already in the cart
            let cartItem = cart.find((item) => item.id === productId);
            if (cartItem) {
                // If the product is already in the cart, increase its quantity
                cartItem.quantity++;
            } else {
                // If the product is not in the cart, add it with quantity 1
                product.quantity = 1;
                cart.push(product);
            }
            console.log(cart);
            displayCart();
        });
}

function displayCart() {
    let cartContainer = document.getElementById("cart");
    cartContainer.innerHTML = "";
    cart.forEach((product) => {
        console.log(`156-->`, product);
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
        // If there's more than one item, decrease the quantity
        cartItem.quantity--;
    } else {
        // If there's only one item, remove it from the cart
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

let shops = document.querySelector("#shops");
document.addEventListener("DOMContentLoaded", function () {
    let cartButton = document.createElement("button");
    cartButton.textContent = "View Cart";
    cartButton.addEventListener("click", displayCart);
    shops.appendChild(cartButton);

    let cartContainer = document.createElement("div");
    cartContainer.setAttribute("id", "cart");
    shops.appendChild(cartContainer);

    let totalContainer = document.createElement("div");
    totalContainer.setAttribute("id", "total");
    shops.appendChild(totalContainer);
});
