// CONTACT FORM SECTION

document.addEventListener('DOMContentLoaded', function () {
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
const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            let fullName = document.querySelector('.form-control.fullName').value;
            let email = document.querySelector('.form-control.email').value;
            let phoneNumber = document.querySelector('.form-control.number').value;
            let eventDate = document.querySelector('.form-control.eventDate').value;
            let message = document.querySelector('.form-control.message').value;

            saveContactInfo(fullName, email, phoneNumber, eventDate, message);

            // Reset the form after submission
            contactForm.reset();
        });
    } else {
        console.warn('Contact form not found.');
    }
});