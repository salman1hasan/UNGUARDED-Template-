UNGUARDED [User Authentication w/ Content Route(Custom Video Player)]


https://www.youtube.com/watch?v=ItIWyZoxlQA

Not uploaded on Heroku due to other upgrades needed in the app for my satisfcation. Moving forward, i'll be uploading templates and short youtube videos of my progress as a programmer.

Things in this project
Custom User Authentication[Sign in and Sign out] - Made by me
Custom Navigation bar- Designed by me 
Custom Video and logo designs- Designed by me (Using adobe premire and canva and outsourcing logo designs [Star design, designed by me, typefont outsourced]
Custom Footer-Designed by me 
Custom Home page and layout design- Designed by me
Custom content route- Designed by me
Custom content player- Created by me and designed by me
Custom CSS- Designed by me


UNGUARDED [User Authentication w/ Content Route and custom video player from scratch] [Full Stack Development w/MERN Stack] (Downloading files won't work as some files are classified and I haven't uploaded that can be used for start-ups). I will only be uploading templates on github. 

I created a project from scratch! I made my own customized user authentication and I made my own content player. After 1 year of a bootcamp and my own research, I was able to make my own authentication user MongoDB,Express,React and Node. I am currently in the process of working on data algorithms, so i have full extensive notes on how I made this project. Long story short, I was able to create this backend user authentication using a User Model, user schema, user ctrl. In addition, this user authentication is made without google, microsoft, or one of the big tech giants. The only thing missing is a 2fa from the user authentication, other than that it works just like most of the conglomorates. I tried using twilio and adding that, but it wouldn't work, maybe as i get more advanced, i'll be able to figure it out, hence why this isn't uploaded on a heroku or app where someone can view it.

Below I have attached a brief overview of my notes.I won't upload all my notes as this was made with extensive research. I am only 1 year in my programming journey and have started NEXTJS and am making a store. I was not able to find a store where my user authentication and store would work, so now i'm working on a nextjs and working on my data algorithm skillset.

Here is a sneak peak of my notes
12. The Node.js file system module allows you to work with the file system on your computer. The fs file lets you work with nodemailer.js . Then you require nodemailer, dotenv.config() . Then you create mailing_service_client_id, secret, refresh token and sender email address. That is specifically added to the Node.js. The send mail you can find in nodemailer which is easy to copy and paste but basically you just import the email you want to use and then you go from there. 

 

 

//created own authentication and access/refresh tokens so there is no need for a google, microsoft, or apple oauth. These tokens expire at a certain amount of time and you're able to  

//create a system without any of the big tech giants  

const fs = require('fs'); 

const nodemailer = require('nodemailer') 

require("dotenv").config(); 

//const {google} = require('googleapis') 

//const {OAuth2} = google.auth; 

//const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground' 

 
 

//const { 

// MAILING_SERVICE_CLIENT_ID, 

// MAILING_SERVICE_CLIENT_SECRET, 

// MAILING_SERVICE_REFRESH_TOKEN, 

// SENDER_EMAIL_ADDRESS 

//} = process.env 

 
 

//const oauth2Client = new OAuth2( 

// MAILING_SERVICE_CLIENT_ID, 

// MAILING_SERVICE_CLIENT_SECRET, 

// MAILING_SERVICE_REFRESH_TOKEN, 

// OAUTH_PLAYGROUND 

//) 

 
 

// send mail 

const sendEmail = (to, url, txt) => { 

//oauth2Client.setCredentials({ 

// refresh_token: MAILING_SERVICE_REFRESH_TOKEN 

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

<a href=${url} text-align:center; style="background: rgb(249, 133, 0); text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display:inline-block;">${txt}</a>  

<p style="text-align:center; color: rgb(249,133,0);">@2022 UNGUARDED ALL RIGHTS RESERVED</p> 

</div>  

`, 

} 

smtpTransport.sendMail(mailOptions, (err, infor) => { 

if(err) return err; 

return infor 

}) 

} 

 
 

module.exports = sendEmail 

12. Go to activationtoken of userctrl and add async (req,res). Activate email needs to have an activate token which is created using a random password generator to create. Then you have to process the user with the jwt activation token. The process.env global variable is injected by the Node at runtime for your application to use and it represents the state of the system environment your application is in when it starts. After that then you console.log(user) 

 

13.Then go to your user router and create a specific route to activate your email. When registration is complete, where I added a lot of if else statements to make the data the most clean as possible as an independent who codes himself, I get an email and it says confirm your email address. The url includes the localhost activate email  

 

14.Include the const{name,email, password) and then add the const check = await Users.find({email}) 

Basically Im setting a const check to = await users.find email. If an email is found this email already exists and const user = new user name email password. This specifically sends all the data to the mongodb database. The await expression causes async function execution to pause until a promise is settled. Account has been activated.  

 

15. Add a login functionality which includes const email and password. Const user = await Users.findOne({email}). If (!user) return this email doesn’t exist. User gets the value that was sotred in the mongodb database.  



Notes available only based on reachout. s.hasan@unguarded.com 
