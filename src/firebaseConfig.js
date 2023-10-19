// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyAsLnl3uFpP0A2NupSIXcfUT6plBSBUvdY",
	authDomain: "ezmoney-15cf4.firebaseapp.com",
	databaseURL: "https://ezmoney-15cf4-default-rtdb.firebaseio.com",
	projectId: "ezmoney-15cf4",
	storageBucket: "ezmoney-15cf4.appspot.com",
	messagingSenderId: "665450869493",
	appId: "1:665450869493:web:7014b32adfaea6fc2b4bbc",
	measurementId: "G-KG0P8YDZM6"
};

/**
 * The Firebase app instance that is initialized with the provided configuration.
 *
 * @type {import("firebase/app").App}
 */
const app = initializeApp(firebaseConfig);

/**
 * Firebase analytics instance for tracking user interactions.
 *
 * @type {import("firebase/analytics").Analytics}
 */
export const analytics = getAnalytics(app);

/**
 * Firebase authentication instance for user authentication.
 *
 * @type {import("firebase/auth").Auth}
 */
export const auth = getAuth(app);

/**
 * Firebase Firestore instance for accessing the Firestore database.
 *
 * @type {import("firebase/firestore").Firestore}
 */
export const db = getFirestore(app);

/**
 * Firebase Storage instance for accessing the Firestore storage.
 *
 * @type {import("firebase/storage").Firestore}
 */
export const storage = getStorage(app);