// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDmSShr0rJar1DH6qiCnDn7LIBoqxYGJQY",
  authDomain: "social-app-d1a29.firebaseapp.com",
  projectId: "social-app-d1a29",
  storageBucket: "social-app-d1a29.appspot.com",
  messagingSenderId: "8835807505",
  appId: "1:8835807505:web:2506b8825c137bd4a9f4b0",
  measurementId: "G-78PB73JSVX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
