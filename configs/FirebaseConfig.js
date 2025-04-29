// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBM4cpxBugcYRCgj0P8hPjhjqzh0ZKMgbQ",
  authDomain: "ai-trip-bfa7e.firebaseapp.com",
  projectId: "ai-trip-bfa7e",
  storageBucket: "ai-trip-bfa7e.firebasestorage.app",
  messagingSenderId: "170175086505",
  appId: "1:170175086505:web:dbfc10d9b702b9137dceb8",
  measurementId: "G-PG1ZKKJK2G",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
