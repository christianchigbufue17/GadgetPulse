let cartCount = 0;

// Add product to cart
function addToCart() {

    cartCount++;

    document.getElementById("cart-count").textContent = cartCount;

    showCartMessage();
}


// Show successful cart message
function showCartMessage() {

    const message = document.createElement("div");

    message.className = "cart-success";

    message.innerHTML = "✓ Successfully added to cart!";

    document.body.appendChild(message);

    setTimeout(function() {
        message.classList.add("show");
    }, 10);

    setTimeout(function() {
        message.classList.remove("show");

        setTimeout(function() {
            message.remove();
        }, 300);

    }, 2500);
}


// SHOP NOW button
function shopNow() {

    document.getElementById("shop").scrollIntoView({
        behavior: "smooth"
    });

}