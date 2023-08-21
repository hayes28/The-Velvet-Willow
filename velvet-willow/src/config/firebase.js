
const firebaseConfig = {
  apiKey: "AIzaSyABqHximBaL6M1sBnHENryip1QyC6qgaV4",
  authDomain: "velvet-willow.firebaseapp.com",
  databaseURL: "https://velvet-willow-default-rtdb.firebaseio.com/",
  projectId: "velvet-willow",
  storageBucket: "velvet-willow.appspot.com",
  messagingSenderId: "256830007264",
  appId: "1:256830007264:web:2b7af5b9f6cb6f1474ed85",
  measurementId: "G-74GN5QMSZW"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Refernece contactInfo collections
let contactInfo = firebase.database().ref("infos");


// Listen for a submit
document.querySelector(".contact-form").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  //   Get input Values
  let name = document.querySelector(".name").value;
  let email = document.querySelector(".email").value;
  let message = document.querySelector(".message").value;
  console.log(name, email, message);

  saveContactInfo(name, email, message);

  document.querySelector(".contact-form").reset();
}

// Save infos to Firebase
function saveContactInfo(name, email, message) {
  let newContactInfo = contactInfo.push();

  newContactInfo.set({
    name: name,
    email: email,
    message: message,
  });
}