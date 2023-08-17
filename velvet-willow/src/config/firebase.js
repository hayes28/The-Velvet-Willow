// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDyg3v7uOt8qTK2hrm1t0F0yjpuOXm9TB8",
  authDomain: "velvet-willow-dc1ca.firebaseapp.com",
  projectId: "velvet-willow-dc1ca",
  storageBucket: "velvet-willow-dc1ca.appspot.com",
  messagingSenderId: "787293656063",
  appId: "1:787293656063:web:74fb7394661af1b5420dca",
  measurementId: "G-Y0WL16XQ6D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
