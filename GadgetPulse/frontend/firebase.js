// ========================================
// GADGETPULSE FIREBASE AUTHENTICATION
// ========================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";

import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";


// Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyCQE3fCUVJ8wF8oAyYAPderN6B_y1hfcHs",
    authDomain: "gadgetpulse-642ed.firebaseapp.com",
    projectId: "gadgetpulse-642ed",
    storageBucket: "gadgetpulse-642ed.firebasestorage.app",
    messagingSenderId: "979940798434",
    appId: "1:979940798434:web:33d27256c795c5c2f813bb"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();


// Google Sign-In button
const googleButton = document.querySelector(".google-button");

if (googleButton) {
    googleButton.addEventListener("click", async function () {

        try {
            const result = await signInWithPopup(auth, googleProvider);

            alert(
                "Welcome to GadgetPulse, " +
                (result.user.displayName || "Customer") +
                "!"
            );

        } catch (error) {
            console.error("Google Sign-In error:", error);

            alert(
                "Google Sign-In failed: " +
                error.message
            );
        }

    });
}


// Listen for sign-in status
onAuthStateChanged(auth, function (user) {

    if (user) {
        console.log("Signed in:", user.displayName, user.email);
    } else {
        console.log("No customer is signed in.");
    }

});
