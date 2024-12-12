import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your existing Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHfTla5TyZYqxIlXB_-4CSeXMWBiuiIBM",
  authDomain: "lockin-cs147l.firebaseapp.com",
  projectId: "lockin-cs147l",
  storageBucket: "lockin-cs147l.firebasestorage.app",
  messagingSenderId: "628124528325",
  appId: "1:628124528325:web:932cccf91f92ecc2354aac",
  measurementId: "G-6T670P6PZS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, analytics };
