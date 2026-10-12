 import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

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

const firebaseConfig = {
  apiKey: "AIzaSyCQE3fCUVJ8wF8oAyYAPderN6B_y1hfcHs",
  authDomain: "gadgetpulse-642ed.firebaseapp.com",
  projectId: "gadgetpulse-642ed",
  storageBucket: "gadgetpulse-642ed.firebasestorage.app",
  messagingSenderId: "979940798434",
  appId: "1:979940798434:web:33d27256c795c5c2f813bb"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

const googleButton = document.querySelector(".google-button");

if (googleButton) {
  googleButton.addEventListener("click", async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      alert("Welcome to GadgetPulse, " + result.user.displayName + "!");
    } catch (error) {
      alert("Google sign-in failed: " + error.message);
    }
  });
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Signed in:", user.displayName, user.email);
  }
});

}
