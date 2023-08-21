const functions = require("firebase-functions");
const {https} = functions; // Destructuring here
const {createTransport} = require("nodemailer");


const emailConfig = functions.config().yourservice;

const transporter = createTransport({
  service: "gmail",
  auth: {
    user: emailConfig.email,
    pass: emailConfig.password,
  },
});

// rest of your code


exports.sendEmail = https.onRequest((request, response) => {
  const mailOptions = {
    from: "email", // Use email variable
    to: "recipient@example.com",
    subject: "New Contact Form Submission",
    // eslint-disable-next-line max-len
    text: `Name: ${request.body.name}\nEmail: ${request.body.email}\nMessage: ${request.body.message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      response.status(500).send(error);
    } else {
      console.log("Email sent: " + info.response);
      response.status(200).send("Email sent");
    }
  });
});
