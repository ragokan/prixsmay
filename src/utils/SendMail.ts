import nodemailer from "nodemailer";

export async function SendEmail(
  targetMail: string,
  mailUrl: string,
  subject: string = "Email Validation ✔",
  message: string = "Please click here to validate your email."
) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.mailerEmail,
        pass: process.env.mailerPassword,
      },
    });

    await transporter.sendMail({
      from: `"${process.env.mailerTitle} 👻" <${process.env.mailerEmail}>`,
      to: targetMail,
      subject,
      text: `${process.env.mailerTitle} 👻`,
      html: `<a href="${mailUrl}">${message}</a>`,
    });
  } catch (error) {
    console.log(error);
  }
}
