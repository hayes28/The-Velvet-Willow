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

// Reference contactInfo collections
let contactInfo = firebase.database().ref("infos");

function saveContactInfo(fullName, email, phoneNumber, eventDate, message) {
    let newContactInfo = contactInfo.push();

    newContactInfo.set({
        fullName: fullName,
        email: email,
        phoneNumber: phoneNumber,
        eventDate: eventDate,
        message: message,
    });

    alert("Your message has been submitted!");
}
document.querySelector('.contact-form').addEventListener('submit', function (e) {
    e.preventDefault();

    let fullName = document.querySelector('.form-control.fullName').value;
    let email = document.querySelector('.form-control.email').value;
    let phoneNumber = document.querySelector('.form-control.number').value;
    let eventDate = document.querySelector('.form-control.eventDate').value;
    let message = document.querySelector('.form-control.message').value;

  saveContactInfo(fullName, email, phoneNumber, eventDate, message);

  // Reset the form after submission
  document.querySelector('.contact-form').reset();
});