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

I was also trying to make an UNGUARDED Store, but the project ran into errors during development. This is where a lot of time got wasted but didn't get wasted, it came through in fruition to help me develop and find an alternate route which is why i went to a nextjs project to see if I can make this connect to a NEXT JS project. This isn't pushed to github due to the fact it's not complete.

Below I have attached a brief overview of my notes.I won't upload all my notes as this was made with extensive research. I am only 1 year in my programming journey and have started NEXTJS and am making a store. I was not able to find a store where my user authentication and store would work, so now i'm working on a nextjs and working on my data algorithm skillset.

UNGUARDED React User Authentication w/ Content route [There will be errors in the notes as on the way I went through with google reactjs]  

1.NPX create-react-app [This creates a reactjs application] 

2.NPM I express mongoose dotenv cors cookie-parser bcrypt jsonwebtoken cloudinary express-file upload googleapis node-fetch nodemailer 

Express. js is a framework based on Node. js for which is used for building web-application using 	approaches and principles of Node 

 

Mongoose is a mongodb object tool designed to work in an asynchrous environment  

 

Dotenv is a file where you can store all your password projects  

 

Cors is a cross origin resource sharing a mechanism that allows restricted resources on a web page 	to be requested from another domain  

 

Cookie-parser is used to store projects and is used to store passwords 

 

BcryptJS- bcrypt js is where you can hash a password  

 

Jsonwebtoken- Jason web token creates a hash option password  

 

Cloudinary-Is where you store images and files, an online program  

 

Express-file-a middleware to upload file 

 

Googleapi- is a login application with an oauth that adds a password to your application  

 

Node-fetch- A light-weight module that brings Fetch API to Node.js, The Fetch API provides an interface 	for fetching resources 

 

Nodemailer- a mailer used to add a mailer  

3.NPM -I nodemon is a tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected. 

4.Then you have to create your file into npm run dev to make sure that the reactjs application is working, that’s how you’re able to use it specifically for development 

5.These packages are specifically installed in the main folder of the file and the package.json file is created specifically in the main part of the server 

6.Then you have to install npm I axios react-router-dom redux and have to install react-redux 

Axios.js with React using tons of real-world examples featuring React hooks. 

React Router Dom is used specifically to route a website and create server side rending where 	things are created fast 

Redux implements the state in ReactJS and uses hooks specifically to unlock login logout. It 	connects the front end and the backend  

7.Create a server.js file and require(‘dotenv’) and make sure express is imported.  Express is imported, mongoose is imported, cors is imported and cookie parser is imported with fileupload being imported and const app being imported with app.use being imported. I import express mongoose cors cookie parser fileupload and const app express as dependencies. Then the app.use() method mounts or puts the specified middleware functions at the specified path.  Then a port is created where you hook up the server and implement it specifically with the console.log(‘Server is running’, PORT).  

 

8.Create .env file that implements mongodb_url and connects the database to the server. Then go to your server and go to mongodb url file to make sure that it is implemented 
 

Const express= require(‘express’).  

Const mongoose = require(‘mongoose’) 

Const cors = require(‘cors’) 

Const cookie-parser = require(‘Cookie-parser’) 

Const fileUpload = require(‘express-fileupload’) 

Const app = express(); 

App.use(express) 

 

Const URI=process.env.MongoDBUrl 

Mongoose.connect(URI,{ 

CreateIndex: true, 

useFindandModify: false, 

UseNewUrlParser: true, 

UseUnifiedTopology:true, 

} 

 

I remember that this throws errors specifically so it needed to be edited.  

 

9.Create a Usermodel.js file and set it =  

const mongoose = require(‘mongoose’). Specifically, this is created for the name, email  

 

Const userSchema = new mongoose.Schema({ 

Name: { 

type: String, 

required: [true: “Please enter your name”], 

trim: true 

}, 

email:{ 

Type:String, 

Required:[true, “Please enter your name!”] 

Trim: true 

},  

Password:{ 

Type:String, 

Required: [true,”Please enter your password”] 

}, 

Role:{ 

Type:Number, 

Default: 0 

}, 

avatar:{ 

Type:String,  

default: [true, “Please enter your password”] 

} 

 

Add a link to cloudinary to the avatar and timestamps 

 

Specifically, this works on name, email,password, role, and avatar it’s making sure that the file is required when you add it. Simple stuff 

 

10.Then you create a userctrl. Const Users = require(‘../models/userModel.js’). This is where you add your if else statements such as email username password. This stuff specifically works on making your user authentication with the most protection possible. The const name email phone and password is required body. If there is no name, email, phone and password return “Please fill in all fields”. If validate email isn’t valid then return invalid emails. Then you await to find a user email once it is entered. If it is entered then you return this email already exists. If phone.length, then return phone must be 10 characters else phone search 1-9 or return phone error. If the password length is less than 6 characters, password must be at least 6 characters and then you hash the password using a password hash await bcrypt password 12. If new user = name, email, password and password hash. If const activation = create activation token(newUser). Then create a sendmail that sends email, password and the res.json.  

 

 

Const userCtrl = { 

Register: async(req,res) => { 

try{ 

try { 

const {name, email,phone,password} = req.body  

if(!name || !email || !phone || !password ) //if there is no value for name email and password, please fill in all fields  

return res.status(400).json({msg: "Please fill in all fields."}) 

if(!validateEmail(email)) 

return res.status(400).json({msg: "Invalid emails."}) 

const user = await User.findOne({email}) 

if(user) return res.status(400).json({msg: "This email already exists."}) 

if(phone.length<10){ 

return res.status(400).json({msg: "Phone must be 10 characters."}) 

} else if(phone.search( /^(\+[1-9][0-9]*(\([0-9]*\)|-[0-9]*-))?[0]?[1-9][0-9\- ]*$/)){ 

return res.status(400).json({msg: "Phone error."}) 

}; 

 
 

if(password.length < 6) 

return res.status(400).json({msg: "Password must be at least 6 characters."}) 

const passwordHash = await bcrypt.hash(password, 12) 

 
 

const newUser = { 

name, email, password: passwordHash 

} 

const activation_token = createActivationToken(newUser) 

const url = `${CLIENT_URL}/user/activate/${activation_token}` //**/ 

sendMail(email, url, "Verify your email address") 

res.json({msg: "Register Success! Please activate your email to start."}) 

} catch (err) { 

return res.status(500).json({msg: err.message}) 

} 

}, 

} 

} 

} 

 

11. In addition, you have to create a user router to server.js and add a require user/router. Then from there you have to create activation secret tokens that are important. Activation_Token_Secret and have to add the activation token to the user profile and to the access token and to the refresh token  

 

 

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

 

16. Then add a const isMatch = await bcrypt.compare(password, user.password). This awaits the bcrypt hash password in the database and if it isn’t a match then say password is incorrect 

 

17.Then create a refresh token and set it = to createRefreshToken user._id and set it = to login success and console.log(user). These refresh tokens and activation tokens are created in the .env file, this way that the passwords can be hashed then you use jwt.sign 

const createRefreshToken = (payload) => { //I add a createactivation token 

return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '60m'}) 

}. These refresh 

18. const refresh_token = createRefreshToken({id: user._id}) 

res.cookie('refreshtoken', refresh_token, { 

httpOnly: true, 

path: '/user/refresh_token', 

maxAge: 7*24*60*60*1000 // 7 days 

}) 

The const refresh token = create refresh token is = user.id and then the res.cookie is = refresh token and http only, path user/refreshtoken, maxAge is = 7*24*60*1000 

19. Login User route is really important. Try is a const {email, password} = req.body and const user = await Users.findOne({email}), if(!user) 

Basically the email and password is what is required for the user to login. Then I create a user = await user.findone email.  

I created a  

const isMatch = await bcrypt.compare(password, user.password) 

If(!isMatch) return res.status(400).json (Password is incorrect) 
 

I also created a refresh token that helps user authentication.  This is what helps the login actually exist 

const createRefreshToken = (payload) => { //I add a createactivation token return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '60m'})} 

Specifically for this authentication, I tried to use const refresh_token = createRefreshToken({id: user._id}) res.cookie(`refreshtoken`, refresh_token, { 

HttpOnly: true, 

Path: ‘/user/refresh_token’, 

MaxAge: 7*38*23*23*121212 

}) 

 

Res.json(login success) 

 

20.Creating the logout function includes a try and catch error (res.cookie(‘token’), null and expires new Date(Date.now()), httpOnly: true}) This gets the token To logout all I do is get the token from the cookie and specifically add it to res.cookie and add null expires httponly true and res.status(200).json, success: true, and message: logged out. Then I catch err and res.status(500) 

 

 

21.Then I add forgotPassword. I added the try catch block like usual with a async(req,res) which is the normal for user Ctrl authentications. I made sure that the const email is a required body and the const user is a user.findone email and if the user isn’t equal then return this email does not exist. Then I add access token and = create access token (user._id). Then a const access_token = createAccessToken = user._id. I then added the user.id into createAccessToken and then I added const access _token . Then the url = clientUrl/user/reset/access_token. Then I added mail,(email,url, reset password similar to the activation email except I remade the authentication that added please check your email.  

 

22. Then I added a reset password. This includes const {password} = req.body and console.log(password). In addition I added const passwordHash= awaitbcrypt.hash(password,12) and then did. Await User.findOne andUpdate({ _id:req.user.id}, {password:password has. Basically the const passwordHash awaits to see if the password entered by the user exists and if it does then we use the user.findoneandupdate the req.user.id and the password/passwordHash gets updated. Password succesfffuly changed/ If not like all the other functions, I return a res.status(500).json err.message.  

 

23.Get access token (req,res) . I add a try and catch error. Const rf_token = req.cookies.refreshtoken (The rf_token is = req.cookies.refresh token). This is me getting the value of the req.cookies and it goes to the new variable rf_token. If it isn’t = to that token return please login now. Then I bring the jwt.verify token with rf_token to see if that exists. Lastly the const access_token = create access token and the user.id. If the access token is = to the createAccessToken and the user id respond with the access token  

And if it doesn’t then return the error.message. 

 

24.If the Get user info isn’t working then try const user = await user.findbyid req user.id and select password. If that user doesn’t exist, then use if(!user) user doesn’t exist and res.json the user verification 

 

25. The GetUsersAllinfor is = async (req,res) and the try and catch error is made. I try to find the user using the .select and find method and try to get the password, if that password doesn’t exist then the user doesn’t exist and I respond with a json user, else its an error. 

 

26. Update user. I use a try and catch block try and catch. The const and the avatar are req body to update the user and I use the user.findoneiand udate method with id req.user.id which updates the name and the avatar and the res.json and update success. Else return an error.  

 

27.UpdateUsersRole. This is specifically to udate the user role who has permission to access variables or not. I make sure that the role is entered. If the user.findoneand update req.params.id. This params value is specifically used to import arguments into functions and get the value of role and then update it. 

 

28. I delete the user and async(req,res). I use a try catch here similar to the update users role. If the await userfindbyidanddelete then I get a delete success else return an error. This is my user authentication that I have made. 

 

29.Specifically for the reset assword and auth had to crete a middleware function called auth, so the user knows if he/she is an authenticated user, and has those special permissions. Using a try catch block use const token = req.header(“Authorization”) and if the token is not equal then authentication has expired, please process again. And then use the access token, and jwt verify with the token, process.env access token secret (err, user). JWT verify token and process.env(Access_token_secret), (err,user) If err and return res.status(400).json ({msg: “Authorization has expired. Please process again. Req.user= user. Next() and then return error. 

 

30. In the user router,  add all the functions and add the post, get,get,get, ad patch and delete. This is specifically used for adding the authentication 

router.post('/reset', auth, userCtrl.resetPassword) 

router.get('/infor', auth, userCtrl.getUserInfor) //get user info using authentication 

router.get('/all_infor', auth, authAdmin, userCtrl.getUsersAllInfor) //get user info using authentication 

router.get('/logout', userCtrl.logout) //get route for user to log out 

router.patch('/update', auth, userCtrl.updateUser) //a request method in HTTP for making partial changes to an existing resource 

router.patch('/update_role/:id', auth, authAdmin, userCtrl.updateUsersRole) 

router.delete('/delete/:id', auth, authAdmin, userCtrl.updateUsersRole) 

 

31.GetUsersAllInfor: This route specifically gets all the information and use a try and catch error. Return res.status(500).json({msg: err.message)} 

 

32.Then you have to create a user authentication and add an authadmin route. Check if user role is =1 if not = 1 then next() and this is using a try and catch error  

 

33.In the Get users all infor, add the try and catch error, console.log(req.user) and then set the const users = await users.find().select(‘-password’). res.json(users) 

 

34.Logout route. Try and catch error res.clearCookie. Res.cookie(‘token’, null and then use expires httponly and send a res.status(200) of success and message logged out true 

 

35.UpdateUser try and catch error with name and avatar and req.body and await users.findoneand update. Req.user.id and wait for name and avatar and then respond with a res.json 

 

36. Delete user is = async (req,res) and create a try catch error. Same thing Users.findByIdAndDelete(req.params) res.json({msg: “Deleted Success!”}) and catch error  


List Products 
1.Data.js add the file to your project and create an input where you can download all your files 
2. products: [ 

{ 

name: 'Free Shirt', 

category: 'Shirts', 

image: '/images/shirt1.jpg', 

price: 70, 

brand: 'Nike', 

rating: 4.5, 

numReviews: 10, 

countInStock: 20, 

description: 'A popular shirt.', 

}, 

 
3. Add like 5 products with all the categories using an object to store the values 
4.Then go to the source code and get all the images that are necessary to download the files 
5.Then go to your index.js and import Grid with a container of 3 with data.products.map((product) => 
<Grid item md={4} key={product.name} </Grid> 
6.Get rid of styles and add data from import data from ‘utils/data’ 
7.Then import card and import Card action and add card media with component =”img” 
with an image and with a title and import CartItem as well 
8.Then import typography as well with product.name 
9. Add the cart actions and add typography and add product.price with typography and make sure all the things are imported  
10.Define a button and import add to cart and set the button size to small and the color primary 
11.What the source code looks like 
<Layout> 

<div> 

<h1>Products</h1> 

<Grid container spacing={3}> 

{data.products.map((product) => ( 

<Grid item md={4} key={product.name}> 

<Card> 

<CardActionArea> 

<CardMedia 

component="img" 

image={product.image} 

title={product.name} 

></CardMedia> 

<CardContent> 

<Typography>{product.name}</Typography> 

</CardContent> 

</CardActionArea> 

<CardActions> 

<Typography>${product.price}</Typography> 

<Button size="small" color="primary"> 

Add to cart 

</Button> 

</CardActions> 

</Card> 

</Grid> 

))} 

</Grid> 

</div> 

</Layout> 

 
