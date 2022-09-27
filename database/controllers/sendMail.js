//created own authentication and access/refresh tokens so there is no need for a google, microsoft, or apple oauth. These tokens expire at a certain amount of time and you're able to 
//create a system without any of the big tech giants 
const fs = require('fs');
const nodemailer = require('nodemailer')
require("dotenv").config();
//const {google} = require('googleapis')
//const {OAuth2} = google.auth;
//const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground'

//const {
  //  MAILING_SERVICE_CLIENT_ID,
   // MAILING_SERVICE_CLIENT_SECRET,
  //  MAILING_SERVICE_REFRESH_TOKEN,
  //  SENDER_EMAIL_ADDRESS
//} = process.env

//const oauth2Client = new OAuth2(
  //  MAILING_SERVICE_CLIENT_ID,
   // MAILING_SERVICE_CLIENT_SECRET,
  //  MAILING_SERVICE_REFRESH_TOKEN,
  //  OAUTH_PLAYGROUND
//)

// send mail
const sendEmail = (to, url, txt) => {
   //oauth2Client.setCredentials({
     //   refresh_token: MAILING_SERVICE_REFRESH_TOKEN
    //const accessToken = oauth2Client.getAccessToken()
    var smtpTransport = nodemailer.createTransport({
        host: "smtp-mail.outlook.com", // hostname
        secureConnection: false, // TLS requires secureConnection to be false
        port: 587, // port for secure SMTP
        tls: {
           ciphers:'SSLv3'
        },
        auth: {
            user: process.env.EMAILUSER,
            pass: process.env.EMAILPASS,
        }
    });


    const mailOptions = {
        from: '"UNGUARDED" <contact@unguarded.com>',
        to: to,
        subject: "UNGUARDED",
        html: 
        ` <div style="max-width: 700px; margin:auto; border: 1px solid rgb(249, 133, 0); padding: 50px 20px; font-size: 110%;">
        <img class="logo" src="https://i.ibb.co/MVngzpL/ug.png" alt="ug" width="100" height="100">
        <h2 style="text-align: center; text-transform: uppercase;color: rgb(249, 133, 0);"> ACTIVATION EMAIL</h2>
        <p style="text-align:center;">Congratulations! You're almost ready to use your UNGUARDED Account. Please click the button to activate your email.</p>
        <a href=${url}  text-align:center; style="background: rgb(249, 133, 0); text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display:inline-block;">${txt}</a>       
        <p style="text-align:center; color: rgb(249,133,0);">@2022 UNGUARDED ALL RIGHTS RESERVED</p>
        </div> 
        <div>${url}</div>
        `,
    }
    smtpTransport.sendMail(mailOptions, (err, infor) => {
      if(err) return err;
      return infor
  })
}

module.exports = sendEmail