import nodemailer from "nodemailer";
import dotenv from "dotenv";


const mailSender = async (email, title, body) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
    

    let info = await transporter.sendMail({
      from: "KGP_KRONOS",
      to: `${email}`,
      subject: `${title}`,
      html: `${body}`,
    });
   
    return info;
  } catch (error) {
    console.error("error in mailSending", error.message);
  }
};

export default mailSender;
