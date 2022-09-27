const dotenv = require('dotenv');
dotenv.config({ path: 'database/config.env'})
const express = require('express') // used for creating routes over a node.js server
const mongoose = require('mongoose') // used to collect data and send to a mongodb database
const cors = require('cors') //used for flexing, jk, allows you to send request from one website to another
const cookieParser = require('cookie-parser') //used to import a cookie into middleware
const fileUpload = require('express-fileupload') //used to upload files and used to upload express
const connectDatabase = require('./database')

//Connecting to database
connectDatabase();


const errorMiddleware = require('./middleware/error')

// const dotenv = require('dotenv');
// dotenv.config({path: 'database/config.env'})


//setting up middlewares. The app.use() function is used to mount the specified middleware function(s) at the path which is being specified. It is mostly used to set up middleware for your application.

const app = express() //This object, which is traditionally named app, has methods for routing HTTP requests, configuring middleware, rendering HTML views, registering a template engine, and modifying application settings that control how the application behaves (e.g. the environment mode, whether route definitions are case sensitive, etc.)
app.use(express.json()) //express.json() is a built in middleware function in Express starting from v4.16.0. It parses incoming JSON requests and puts the parsed data in req.body.
app.use(cors()) //Calling use(cors()) will enable the express server to respond to preflight requests
app.use(cookieParser()) // this will make sure that a cookieparser is specified with a middleware
app.use(fileUpload({  //this will make sure that the files are uploaded and there is a usetempfiles 
    useTempFiles:true // this helps us set up temporary files 
}))

//Routes 


const products = require('./routes/product');
const order = require('./routes/order')

app.use('/api/v1', products)
app.use('/api/v1', order)

app.use('/user', require('./routes/userRouter')) //I create a route /user and then I require the file routes and userRouter.js
app.use('/api', require('./routes/upload'))

app.use(errorMiddleware);

process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.stack}`);
    console.log(`Shutting down due to uncaught exception`);
    process.exit(1)
})




//app.use('/', (req,res,next) => {  //request, response and next '/' gets it from a specific route 
  // res.json({msg: "Hello Everyone!"}) // takes a Response stream and reads it to completion(res.json)
//})


const server = app.listen(process.env.PORT,() =>{
    console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
}) 

process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err.stack}`);
    console.log('Shutting down the server due to Unhandled Promise rejection');
    server.close(() => {
        process.exit(1)
    })
}) //this isnt working at this time can figure out why later



//middleware enables communication and data management for distributed applications