const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'your_email@gmail.com',
    pass: 'your_email_password'
  }
});

module.exports = function sendEmail(to, subject, text) {
  const mailOptions = { from: 'your_email@gmail.com', to, subject, text };
  transporter.sendMail(mailOptions);
};