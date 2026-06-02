import nodemailer from "nodemailer";

export const sendEmail = async (option) => {
  console.log("Attempting to send email to:", option.email);

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: `Institute Admin <${process.env.EMAIL_USER}>`,
      to: option.email,
      subject: option.subject,
      text: option.message,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully! Message ID:", info.messageId);
  } catch (error) {
    console.error("❌ Nodemailer Error:", error.message);
  }
};
