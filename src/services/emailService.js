const nodemailer = require('nodemailer');

const { emailConfig } = require('../config');

class EmailService {
  async sendConfirmationMail(emailToSend, link) {

    const transporter = nodemailer.createTransport({
      host: emailConfig.HOST,
      port: emailConfig.PORT,
      secure: true,
      auth: {
        user: process.env.EMAIL_LOGIN,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_LOGIN,
      to: emailToSend,
      subject:'Confirmation email message',
      html:
        `<div>
          <h1>To confirm your email follow this link</h1>
          <a href="${link}">${link}</a>
         </div>`,
    });


  }
}

module.exports = {
  emailService: new EmailService(),
};
