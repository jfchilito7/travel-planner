// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: import.meta.env.VITE_GOOGLE_FIREBASE_API_KEY,
    authDomain: "ai-travel-planner-add10.firebaseapp.com",
    projectId: "ai-travel-planner-add10",
    storageBucket: "ai-travel-planner-add10.firebasestorage.app",
    messagingSenderId: "783932785809",
    appId: "1:783932785809:web:f5850662df11d735ad6b30",
    measurementId: "G-2BVHKXKRS0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
//const analytics = getAnalytics(app);