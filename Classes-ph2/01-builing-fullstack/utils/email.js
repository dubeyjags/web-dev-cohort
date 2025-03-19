import nodemailer from 'nodemailer'
export const registerEmail = async function(to, token){
    // send token as email to user
            const transportOptions = {
                host: process.env.MAILTRAP_HOST,
                port: process.env.MAILTRAP_PORT,
                secure: false, // true for port 465, false for other ports
                auth: {
                    user: process.env.MAILTRAP_USERNAME,
                    pass: process.env.MAILTRAP_PASSWORD,
                },
            }
            const transporter = nodemailer.createTransport(transportOptions);
    
            const mailOptions = {
                from: process.env.FROM, // sender address
                to: to, // list of receivers
                subject: "Email for Authentications", // Subject line
                text: "First project for authentication", // plain text body
                html: `please click on link ${process.env.BASE_URL}/api/v1/users/verify/${token}`
            }
    
            await transporter.sendMail(mailOptions)
}

export const forgotEmail = async function(to, token){
    // send token as email to user
            const transportOptions = {
                host: process.env.MAILTRAP_HOST,
                port: process.env.MAILTRAP_PORT,
                secure: false, // true for port 465, false for other ports
                auth: {
                    user: process.env.MAILTRAP_USERNAME,
                    pass: process.env.MAILTRAP_PASSWORD,
                },
            }
            const transporter = nodemailer.createTransport(transportOptions);
    
            const mailOptions = {
                from: process.env.FROM, // sender address
                to: to, // list of receivers
                subject: "Reset for password", // Subject line
                text: "reset your password", // plain text body
                html: `reset your password ${process.env.BASE_URL}/api/v1/users/reset/${token}`
            }
    
            await transporter.sendMail(mailOptions)
}