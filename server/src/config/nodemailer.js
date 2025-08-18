import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
   host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user:process.env.SMTP_EMAIL,
    pass:process.env.SMTP_PASS
  }
})

export default transporter