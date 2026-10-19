import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";

import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

// 1. Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCQE3fCUVJ8wF8oAyYAPderN6B_y1hfcHs",
    authDomain: "gadgetpulse-642ed.firebaseapp.com",
    projectId: "gadgetpulse-642ed",
    storageBucket: "gadgetpulse-642ed.firebasestorage.app",
    messagingSenderId: "979940798434",
    appId: "1:979940798434:web:33d27256c795c5c2f813bb"
};

// 2. Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account"
});

// 3. Find dashboard elements
const signedOutView = document.getElementById("signed-out-view");
const signedInView = document.getElementById("signed-in-view");
const customerName = document.getElementById("customer-name");
const customerEmail = document.getElementById("customer-email");
const customerPhoto = document.getElementById("customer-photo");

console.log("GadgetPulse Firebase loaded.");

// 4. Google sign-in function
async function signInWithGoogle() {
    console.log("Continue with Google clicked.");

    try {
        await signInWithPopup(auth, googleProvider);
        // The dashboard is updated by onAuthStateChanged.
    } catch (error) {
        console.error("Google sign-in error:", error.code, error.message);

        alert(
            "Google sign-in failed.\n\n" +
            error.code + "\n" +
            error.message
        );
    }
}

// 5. Connect the Continue with Google button
const googleButton = document.querySelector(
    "#signed-out-view .google-button"
);

if (googleButton) {
    googleButton.addEventListener("click", signInWithGoogle);
    console.log("Google button connected.");
} else {
    console.error("Google button not found. Check its HTML and ID.");
}

// 6. Create Account and Sign In use Google for now
const createAccountButton = document.getElementById(
    "create-account-button"
);

if (createAccountButton) {
    createAccountButton.addEventListener("click", signInWithGoogle);
}

const signInLink = document.getElementById("signin-link");

if (signInLink) {
    signInLink.addEventListener("click", function (event) {
        event.preventDefault();
        signInWithGoogle();
    });
}

// 7. Update dashboard whenever authentication changes
onAuthStateChanged(auth, function (user) {
    console.log(
        "Authentication state:",
        user ? user.email : "Signed out"
    );

    if (user) {
        if (signedOutView) signedOutView.hidden = true;
        if (signedInView) signedInView.hidden = false;

        if (customerName) {
            customerName.textContent =
                "Welcome, " + (user.displayName || "Customer") + "!";
        }

        if (customerEmail) {
            customerEmail.textContent = user.email || "";
        }

        if (customerPhoto) {
            customerPhoto.onerror = function () {
                this.onerror = null;
                this.src = "./images/GadgetPulse.jpeg";
            };

            customerPhoto.src =
                user.photoURL || "./images/GadgetPulse.jpeg";

            customerPhoto.style.display = "block";
        }
    } else {
        if (signedOutView) signedOutView.hidden = false;
        if (signedInView) signedInView.hidden = true;
    }
});

// 8. Sign out
const signOutButton = document.getElementById("signout-button");

if (signOutButton) {
    signOutButton.addEventListener("click", async function () {
        try {
            await signOut(auth);
            alert("You have signed out successfully.");
        } catch (error) {
            console.error("Sign-out error:", error);
            alert("Unable to sign out: " + error.message);
        }
    });
}

// 9. Dashboard Shop button
const dashboardShopButton = document.getElementById(
    "dashboard-shop-button"
);

if (dashboardShopButton) {
    dashboardShopButton.addEventListener("click", function () {
        document.getElementById("shop")?.scrollIntoView({
            behavior: "smooth"
        });
    });
}

// 10. Dashboard Cart button
const dashboardCartButton = document.getElementById(
    "dashboard-cart-button"
);

if (dashboardCartButton) {
    dashboardCartButton.addEventListener("click", function () {
        document.getElementById("cart")?.scrollIntoView({
            behavior: "smooth"
        });
    });
}
