const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.EMAIL_SERVICE,
            port: 587,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            },
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: subject,
            text: text,
        });

        console.log("email sent succesfully");
    } catch (err) {
        console.log(err, "email not sent");
    }
};

module.exports = sendEmail;