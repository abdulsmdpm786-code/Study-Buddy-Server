import nodemailer from "nodemailer";

export const sendEmail = async (option) => {
  console.log("this is option", option);
  
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: `Institute Admin <${process.env.EMAIL_USER}>`,
    to: option.email,
    subject: option.subject,
    text: option.message,
  };

  await transporter.sendMail(mailOptions);
};
