const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
admin.initializeApp();
/* gmail  credentials */
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "YourGmailAddress@gmail.com",
    pass: "YourGoogleAccountAppPassword",
  },
});
exports.sendMailOverHTTP = functions.https.onRequest((req, res) => {
  const mailOptions = {
    // eslint-disable-next-line indent
        from: `YourGmailEmailAddress@YouWant.com`,
    to: `YourGmailEmailAddress@gmail.com`,
    subject: "Email From Me to MySelf | Contact Form Message",
    html: `<h1>Contact Form Message</h1>
                            <p>
                               <b>Email: </b>${req.body.email}<br>
                               <b>Name: </b>${req.body.name}<br>
                                <b>Mobile: </b>${req.body.name}<br>
                               <b>Message: </b>${req.body.message}<br>
                            </p>`,
  };
  return transporter.sendMail(mailOptions, (error, data) => {
    if (error) {
      return res.send(error.toString());
    }
    // sourcery skip: avoid-using-var
    // eslint-disable-next-line no-var, no-redeclare
    var data = JSON.stringify(data);
    return res.send(`Sent! ${data}`);
  });
});
