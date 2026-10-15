// ========================================
// GADGETPULSE WEBSITE JAVASCRIPT
// ========================================

// Store cart items
let cart = JSON.parse(localStorage.getItem("gadgetPulseCart")) || [];


// ========================================
// SHOP NOW BUTTON
// ========================================

function shopNow() {
    const shopSection = document.getElementById("shop");

    if (shopSection) {
        shopSection.scrollIntoView({
            behavior: "smooth"
        });
    } else {
        alert("Sorry, the Shop section could not be found.");
    }
}


// ========================================
// UPDATE CART COUNT
// ========================================

function updateCartCount() {
    const cartCount = document.getElementById("cart-count");

    if (cartCount) {
        const totalItems = cart.reduce(
            (total, item) => total + item.quantity,
            0
        );

        cartCount.textContent = totalItems;
    }
}


// ========================================
// SUCCESS MESSAGE
// ========================================

function showCartMessage(messageText) {
    let message = document.getElementById("cart-message");

    if (!message) {
        message = document.createElement("div");
        message.id = "cart-message";

        message.style.position = "fixed";
        message.style.top = "20px";
        message.style.right = "20px";
        message.style.padding = "15px 20px";
        message.style.background = "#198754";
        message.style.color = "#ffffff";
        message.style.borderRadius = "8px";
        message.style.zIndex = "99999";
        message.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";

        document.body.appendChild(message);
    }

    message.textContent = messageText;
    message.style.display = "block";

    clearTimeout(window.cartMessageTimer);

    window.cartMessageTimer = setTimeout(function () {
        message.style.display = "none";
    }, 2500);
}


// ========================================
// ADD PRODUCT TO CART
// ========================================

function addToCart(productName, productPrice, productImage) {

    if (!productName || productPrice === undefined) {
        showCartMessage("Sorry, product information is missing.");
        return;
    }

    const price = Number(productPrice);

    if (!Number.isFinite(price) || price < 0) {
        showCartMessage("Sorry, this product has an invalid price.");
        return;
    }

    const existingProduct = cart.find(function (item) {
        return item.name === productName;
    });

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            name: productName,
            price: price,
            image: productImage || "",
            quantity: 1
        });
    }

    saveCart();

    updateCartCount();

    showCartMessage(productName + " added to cart successfully!");
}


// ========================================
// SAVE CART
// ========================================

function saveCart() {
    localStorage.setItem("gadgetPulseCart", JSON.stringify(cart));
}


// ========================================
// DISPLAY CART ITEMS
// ========================================

function displayCart() {
    const cartContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    if (!cartContainer) {
        return;
    }

    cartContainer.innerHTML = "";

    if (cart.length === 0) {
        cartContainer.textContent = "Your cart is empty.";

        if (cartTotal) {
            cartTotal.textContent = "₦0";
        }

        return;
    }

    let total = 0;

    cart.forEach(function (item, index) {
        total += item.price * item.quantity;

        const itemElement = document.createElement("div");
        itemElement.className = "cart-item";

        const name = document.createElement("span");
        name.textContent = item.name + " × " + item.quantity;

        const price = document.createElement("span");
        price.textContent =
            "₦" + (item.price * item.quantity).toLocaleString("en-NG");

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.type = "button";

        removeButton.addEventListener("click", function () {
            cart.splice(index, 1);

            saveCart();
            updateCartCount();
            displayCart();
        });

        itemElement.appendChild(name);
        itemElement.appendChild(price);
        itemElement.appendChild(removeButton);

        cartContainer.appendChild(itemElement);
    });

    if (cartTotal) {
        cartTotal.textContent = "₦" + total.toLocaleString("en-NG");
    }
}


// ========================================
// CLEAR CART
// ========================================

function clearCart() {
    cart = [];

    saveCart();
    updateCartCount();
    displayCart();

    showCartMessage("Your cart has been cleared.");
}


// ========================================
// OPEN CART SECTION
// ========================================

function openCart() {
    const cartSection = document.getElementById("cart");

    if (cartSection) {
        cartSection.scrollIntoView({
            behavior: "smooth"
        });

        displayCart();
    } else {
        showCartMessage("Your cart section is not available yet.");
    }
}


// ========================================
// INITIALIZE WEBSITE
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    updateCartCount();
    displayCart();

    // Support Shop Now buttons
    document.querySelectorAll(".shop-now-button").forEach(function (button) {
        button.addEventListener("click", shopNow);
    });

    // Support Add to Cart buttons
    document.querySelectorAll(".add-to-cart-button").forEach(function (button) {

        button.addEventListener("click", function () {
            const name = button.dataset.name;
            const price = button.dataset.price;
            const image = button.dataset.image || "";

            addToCart(name, price, image);
        });

    });

    // Support Cart buttons
    document.querySelectorAll(".cart-button").forEach(function (button) {
        button.addEventListener("click", openCart);
    });

});

