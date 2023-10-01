// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;