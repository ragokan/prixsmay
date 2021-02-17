import nodemailer from "nodemailer"

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
        user: process.env.MAILER_EMAIL,
        pass: process.env.MAILER_PASSWORD,
      },
    })

    await transporter.sendMail({
      from: `"${process.env.MAILER_TITLE} 👻" <${process.env.MAILER_EMAIL}>`,
      to: targetMail,
      subject,
      text: `${process.env.MAILER_TITLE} 👻`,
      html: `<a href="${mailUrl}">${message}</a>`,
    })
  } catch (error) {
    console.log(error)
  }
}
