import Mailgen from "mailgen";
import nodemailer from "nodemailer"

const sendMail = async (options) => {
    const mailGenrator = new Mailgen({
        theme: 'default',
        product: {
            name: 'Task Manager',
            link: 'https://mailgen.js/'
        }
    });
    var emailBody = mailGenerator.generate(options.mailGenContent);
    var emailText = mailGenerator.generatePlaintext(options.mailGenContent);

    const emailVerificationMailGenContent = (username, verificationUrl) => {
        return {
            body: {
                name: username,
                intro: "Welcome to app!",
                action: {
                    instruction: " Start to click here",
                    button: {
                        color: "#ff0",
                        text: "Verify your Email",
                        link: verificationUrl
                    }
                },
                outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
            }
        }
    }

    const forgotPasswordMailGenContent = (username, passwordResetUrl) => {
        return {
            body: {
                name: username,
                intro: "Welcome to app!",
                action: {
                    instruction: "rest to Change you Password",
                    button: {
                        color: "#ff0",
                        text: "Reset Password",
                        link: passwordResetUrl
                    }
                },
                outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
            }
        }
    }


    const transporter = nodemailer.createTransport({
        host: process.env.MAILTRAP_SMTP_HOST,
        port: process.env.MAILTRAP_SMTP_PORT,
        secure: false, // true for port 465, false for other ports
        auth: {
            user: process.env.MAILTRAP_SMTP_USER,
            pass: process.env.MAILTRAP_SMTP_PASS,
        },
    });

    const mail = {
        from: '"<mail@taskmanager.com>', // sender address
        to: options.email, // list of receivers
        subject: options.subject, // Subject line
        text: emailText, // plain text body
        html: emailBody, // html body
    }

    try {
        await transporter.sendMail(mail)
    } catch (error) {
        console.log("Email Err", error);

    }
}

// sendMail({
//     email:user.email,
//     subject:"AAA",
//     mailGenContent:emailVerificationMailGenContent(username,``)
// })