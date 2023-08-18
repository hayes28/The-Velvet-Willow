// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1Q-03aFHaqi7NHINyvCi59huh58_e9JE",
  authDomain: "the-velvet-willow.firebaseapp.com",
  databaseURL: "https://the-velvet-willow-default-rtdb.firebaseio.com",
  projectId: "the-velvet-willow",
  storageBucket: "the-velvet-willow.appspot.com",
  messagingSenderId: "167195773265",
  appId: "1:167195773265:web:675d989e828b0001bb2b70",
  measurementId: "G-833EM2M0ZP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
