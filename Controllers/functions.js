const nodemailer = require("nodemailer");
require('dotenv').config(); // Ensure this is loaded at the top of your app

// Load environment variables
const { myemail, myapppassword } = process.env;

// Debugging: Log environment variables to check if they are loaded properly
console.log("DEBUG: Email ->", myemail ? "Loaded" : "Not Loaded");
console.log("DEBUG: App Password ->", myapppassword ? "Loaded" : "Not Loaded");

function genrateotp() {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp;
}

// Function to send an email
async function sendmail(email, otp) {
    console.log("point 0 okay");
    console.log("DEBUG: Email ->", myemail);
console.log("DEBUG: App Password ->", myapppassword);

    try {
        console.log("point 1 okay");
        // Step 4: Create a transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user:myemail,
                clientId: '1006123932112-dejndnv848c5tigidtk425q7hs2lbkhs.apps.googleusercontent.com',
                clientSecret: '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',
                refreshToken: 'Your-Refresh-Token-Here',
                // Optional, if you already have an access token:
                // accessToken: 'Your-Access-Token-Here',
            }
        });

        console.log("DEBUG: Transporter created successfully");
        console.log("point 2 okay");

        // Step 5: Set up email options
        const mailOptions = {
            from: email, // Sender address
            to: myemail, // Recipient (your email)
            subject: 'WATCH-WEATHER Confirmation OTP', // Subject line
            html: `<p style="background-color:tomato;color:white;border-radius:10px;padding:10px">
                <strong>WELCOME TO THE WATCH-WEATHER APP!</strong><br>
                You are one step behind your registration.<br>
                Complete this by entering this OTP: <strong>${otp}</strong></p>`, // HTML body
        };

        console.log("DEBUG: Mail options set successfully");
        console.log("point 3 okay");

        // Step 6: Send the email
        const info = await transporter.sendMail(mailOptions);

        console.log("DEBUG: Email sent successfully with ID:", info.messageId);
        console.log("point 4 okay");

        return true;
    } catch (error) {
        // Debugging: Log detailed error information
        console.error("DEBUG: Error sending email:", error);
        return false;
    }
}


module.exports = {
genrateotp,
sendmail,
};