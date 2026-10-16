// ========================================
// GADGETPULSE FIREBASE AUTHENTICATION
// ========================================

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";

import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";


// ========================================
// FIREBASE CONFIGURATION
// ========================================

const firebaseConfig = {
    apiKey: "AIzaSyCQE3fCUVJ8wF8oAyYAPderN6B_y1hfcHs",
    authDomain: "gadgetpulse-642ed.firebaseapp.com",
    projectId: "gadgetpulse-642ed",
    storageBucket: "gadgetpulse-642ed.firebasestorage.app",
    messagingSenderId: "979940798434",
    appId: "1:979940798434:web:33d27256c795c5c2f813bb"
};


// ========================================
// INITIALIZE FIREBASE
// ========================================

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();


// ========================================
// DASHBOARD ELEMENTS
// ========================================

const signedOutView = document.getElementById("signed-out-view");
const signedInView = document.getElementById("signed-in-view");

const customerName = document.getElementById("customer-name");
const customerEmail = document.getElementById("customer-email");


// ========================================
// GOOGLE SIGN-IN FUNCTION
// ========================================

async function signInWithGoogle() {
    try {
        await signInWithPopup(auth, googleProvider);
    } catch (error) {
        console.error("Google Sign-In error:", error);

        alert("Google Sign-In failed. Please try again.");
    }
}


// ========================================
// GOOGLE SIGN-IN BUTTON
// ========================================

const googleButton = document.querySelector(
    "#signed-out-view .google-button"
);

if (googleButton) {
    googleButton.addEventListener("click", signInWithGoogle);
}


// ========================================
// CREATE ACCOUNT BUTTON
// ========================================

const createAccountButton = document.getElementById(
    "create-account-button"
);

if (createAccountButton) {
    createAccountButton.addEventListener(
        "click",
        signInWithGoogle
    );
}


// ========================================
// SIGN-IN LINK
// ========================================

const signInLink = document.getElementById("signin-link");

if (signInLink) {
    signInLink.addEventListener("click", function (event) {
        event.preventDefault();
        signInWithGoogle();
    });
}


// ========================================
// UPDATE CUSTOMER DASHBOARD
// ========================================

onAuthStateChanged(auth, function (user) {

    if (user) {

        // Show the customer's dashboard
        if (signedOutView) {
            signedOutView.hidden = true;
        }

        if (signedInView) {
            signedInView.hidden = false;
        }

        // Display the customer's name
       if (customerName) {
    const name = user.displayName || user.providerData[0]?.displayName || "Customer";

    customerName.textContent = "Welcome, " + name + "!";
}

        // Display the customer's email
        if (customerEmail) {
            customerEmail.textContent = user.email || "";
        }

        console.log("Customer signed in:", user.email);

    } else {

        // Show the sign-in screen
        if (signedOutView) {
            signedOutView.hidden = false;
        }

        if (signedInView) {
            signedInView.hidden = true;
        }

        console.log("No customer is signed in.");
    }

});


// ========================================
// SIGN-OUT BUTTON
// ========================================

const signOutButton = document.getElementById("signout-button");

if (signOutButton) {

    signOutButton.addEventListener("click", async function () {

        try {
            await signOut(auth);

            alert("You have signed out successfully.");

        } catch (error) {
            console.error("Sign-Out error:", error);

            alert("Unable to sign out. Please try again.");
        }

    });

}


// ========================================
// DASHBOARD SHOP BUTTON
// ========================================

const dashboardShopButton = document.getElementById(
    "dashboard-shop-button"
);

if (dashboardShopButton) {

    dashboardShopButton.addEventListener("click", function () {

        const shopSection = document.getElementById("shop");

        if (shopSection) {
            shopSection.scrollIntoView({
                behavior: "smooth"
            });
        }

    });

}


// ========================================
// DASHBOARD CART BUTTON
// ========================================

const dashboardCartButton = document.getElementById(
    "dashboard-cart-button"
);

if (dashboardCartButton) {

    dashboardCartButton.addEventListener("click", function () {

        const cartSection = document.getElementById("cart");

        if (cartSection) {
            cartSection.scrollIntoView({
                behavior: "smooth"
            });
        }

    });

}
