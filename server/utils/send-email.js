"use strict";
const nodemailer = require("nodemailer");

exports.sendEmail = async function (emails, subject, content) {
  return new Promise(async (resolve, reject) => {
    try {

      let host = "sandbox.smtp.mailtrap.io";
      let port = "587";
      if (typeof emails == "object") emails = emails.join(", ");
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host,
        port,
        secure: port == 465 ? true : false, // true for 465, false for other ports
        auth: {
          user: "f750dba817e3e0",
          pass: "9180c28c47a7f6",
        },
      });

      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Zen" <support@hrzen.in>', // sender address
        to: emails, // list of receivers
        subject: subject, // Subject line
        html: content, // html body
      });

      console.log("Email sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      resolve(true);
    } catch (error) {
      console.log(error);
      reject(false);
    }
  });
};
