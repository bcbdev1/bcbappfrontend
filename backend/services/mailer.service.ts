import nodemailer from 'nodemailer';
import { EMAIL_SERVICE, EMAIL_USER, EMAIL_PASS, EMAIL_FROM } from '../config/env';

const transporter = nodemailer.createTransport({
  service: EMAIL_SERVICE,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS
  }
});

export const sendVerificationEmail = async (email: string, otp: string) => {
  await transporter.sendMail({
    from: EMAIL_FROM,
    to: email,
    subject: 'Verify Your Email',
    html: `<h2>Your OTP is: <strong>${otp}</strong></h2>`
  });
};