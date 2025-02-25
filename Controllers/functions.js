const nodemailer = require("nodemailer");
require('dotenv').config();


const { myemail, myapppassword } = process.env;

 
console.log("DEBUG: Email ->", myemail ? "Loaded" : "Not Loaded");
console.log("DEBUG: App Password ->", myapppassword ? "Loaded" : "Not Loaded");

function genrateotp() {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp;
}


async function sendmail(email, otp) {
    console.log("point 0 okay");
    console.log("DEBUG: Email ->", myemail);
console.log("DEBUG: App Password ->", myapppassword);

    try {
        console.log("point 1 okay");

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user:myemail,
                clientId: 'your clint id',
                clientSecret: 'clint secret',
                refreshToken: 'Your-Refresh-Token-Here',
                // Optional, if you already have an access token:
                // accessToken: 'Your-Access-Token-Here',
            }
        });

        console.log("DEBUG: Transporter created successfully");
        console.log("point 2 okay");


        const mailOptions = {
            from: email, 
            to: myemail, 
            subject: 'WATCH-WEATHER Confirmation OTP', 
            html: `<p style="background-color:tomato;color:white;border-radius:10px;padding:10px">
                <strong>WELCOME TO THE WATCH-WEATHER APP!</strong><br>
                You are one step behind your registration.<br>
                Complete this by entering this OTP: <strong>${otp}</strong></p>`, 
        };

        console.log("DEBUG: Mail options set successfully");
        console.log("point 3 okay");

        
        const info = await transporter.sendMail(mailOptions);

        console.log("DEBUG: Email sent successfully with ID:", info.messageId);
        console.log("point 4 okay");

        return true;
    } catch (error) {
    
        console.error("DEBUG: Error sending email:", error);
        return false;
    }
}


module.exports = {
genrateotp,
sendmail,
};
