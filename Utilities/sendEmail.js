import nodemailer from "nodemailer";

export const sendEmail = async (option) => {
  console.log("Attempting to send email to:", option.email);
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,       
      port: 587,                           
      secure: false,                        
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

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent! Message ID:", info.messageId);
  } catch (error) {
    console.error("❌ Nodemailer Error:", error.message);
    throw error; 
  }
};