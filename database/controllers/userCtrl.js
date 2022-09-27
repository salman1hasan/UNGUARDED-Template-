const User = require('../models/userModel') //makes sure user is active
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const bcrypt = require('bcrypt') //makes sure bcrypt is downloaded
const jwt = require('jsonwebtoken') //makes sure jwt is active
const sendMail = require('./sendMail') //makes sure its connected
const Mail = require('./Mail') //makes sure its connected
const sendthemmail= require('./sendthemail') //makes sure its connected
const sendToken = require('../utils/jwtToken')
const crypto = require('crypto');
const { get } = require('http');

const {CLIENT_URL} = process.env //import client url


exports.registerUser = catchAsyncErrors( async(req,res,next) =>{
    const {name, email,phone,password} = req.body //makes sure name is required 
       
      
            const newUser = {
                name, email, phone, password
            }
    
            const activation_token = createActivationToken(newUser)
            const url = `${CLIENT_URL}/user/activation/${activation_token}` //**/
            sendMail(email, url, "Verify your email address")
            res.json({msg: "Register Success! Please activate your email to start."})
})

exports.activateEmail = catchAsyncErrors( async(req,res,next) =>{
    const {activation_token} = req.body
    const user = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN_SECRET)

    const {name, email, password,phone} = user //I set the const name,email and password = user


    const check = await User.findOne({email})
    if(check) return res.status(400).json({msg:"This email already exists."})


    const newUser = await User.create({
        name,
        email,
        phone,
        password,
        avatar: {
            public_id: 'avatar_zedfmr_ijrudp.png',
            url: 'https://res.cloudinary.com/unguarded/image/upload/v1659673491/avatar_zedfmr_ijrudp.png'
        }
   }) 
   
   await newUser.save()

            res.json({msg: "Account has been activated!"}) 
})

exports.login = catchAsyncErrors( async(req,res,next) =>{
    const {email, password} = req.body //I check for an email and password that is req by the body
    const user = await User.findOne({email}).select('+password') //I await to see if the email does exist 
    if(!user) return res.status(400).json({msg: "This email does not exist."}) // if the user does not exist respond with a res.json 400

     // Checks if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return res.status(400).json({msg:"Password is incorrect, please try again"})
    }
    sendToken(user, 200,res)   
})


exports.logout = catchAsyncErrors( async(req,res,next) =>{
    try{
        res.cookie('token',null, {
            expires: new Date(Date.now()),
            httpOnly: true
          })
        
          res.status(200).json({
            success:true,
            message: 'Logged out'
          })
    }catch (err) {
        return res.status(500).json({msg: err.message})
    }
  })


  exports.forgotPassword = catchAsyncErrors(async (req, res, next) => { 
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new ErrorHandler('User not found with this email', 404));
    }
  
    // Get reset token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });
  
    // Create reset password url
    const resetUrl = `${CLIENT_URL}/user/password/reset/${resetToken}`
    // `${req.protocol}://${req.get('host')}/user/password/reset/${resetToken}`;
    
    try {
        Mail(req.body.email, resetUrl, "Reset your password")
  
        res.status(200).json({
            success: true,
            message: `Email sent to: ${user.email}`
        })
  
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
  
        await user.save({ validateBeforeSave: false });
  
        return next(new ErrorHandler(error.message, 500))
    }
  
  })

  exports.resetPassword = catchAsyncErrors(async(req,res,next) => {  
       const {password} = req.body //I check for an email and password that is req by the body  

     
       const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

       const user = await User.findOne({
          resetPasswordToken,
          resetPasswordExpire: { $gt: Date.now() }, 
          
        })
    
        if(!user) {
        return next(new ErrorHandler('Password reset token is invalid or has been expired', 400))
        }
  
        if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Password does not match', 400))
        }
      

    
       // Setup new password
       user.password = req.body.password;


       user.resetPasswordToken = undefined;
       user.resetPasswordExpire = undefined;
   
       await user.save();
   
       sendToken(user, 200, res)
   })

exports.getUserProfile = catchAsyncErrors(async (req,res,next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user
    })

})

//Update/Change password 
exports.updatePassword = catchAsyncErrors(async(req,res,next)=> {
   const user = await User.findById(req.user.id).select('+password');
    
   const {password} = req.body
     
  


  if(!validatePassword(password))
  return res.status(400).json({msg: "Password must contain a special character"})

  const isMatched = await user.comparePassword(req.body.oldPassword)
  if(!isMatched){
  return next(new ErrorHandler('Old password is incorrect'));
}

if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler('Password does not match', 400))
}

  const isMatch= await user.comparePassword(req.body.password)
  if(isMatch){
  return next(new ErrorHandler('You entered your old password'));
}

user.password = req.body.password;
await user.save();

sendToken(user, 200, res)
})


exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const {name,email} = req.body
  

  
  const newUserData = {
        name: req.body.name,
        email: req.body.email
    }
  
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
      new: true,
      runValidators: true,
  
  })
  
  res.status(200).json({
      success: true
  })
})

//Get all users 
exports.allUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
      success: true,
      users
  })
})

exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
      return next(new ErrorHandler(`User does not found with id: ${req.params.id}`))
  }

  res.status(200).json({
      success: true,
      user
  })
})


exports.updateUser = catchAsyncErrors(async (req, res, next) => { 
  const {name,email} = req.body

  if(!name || !email ) //if there is no value for name email and password, please fill in all fields 
  return res.status(400).json({msg: "Please fill in all fields."})

  if(!validateEmail(email))
  return res.status(400).json({msg: "Invalid emails."})

  const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }
  
    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
      runValidators: true,
  
  })
  
  res.status(200).json({
      success: true
  })
})


exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
      return next(new ErrorHandler(`User does not found with id: ${req.params.id}`))
  }
  await user.remove()
  res.status(200).json({
      success: true,
  })
})



 const validateEmail = (email) => { //this const is a specific constant to make sure that emails are validated and I enter an email addres there as well
   return String(email)
       .toLowerCase()
       .match(
         /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
       );
  };

  const validatePassword = (password) => { //this const is a specific constant to make sure that emails are validated and I enter an email addres there as well
    return String(password)
        .toLowerCase()
        .match(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
        );
   };


  const createActivationToken = (payload) => { //You activate a software token on a device that is used for authentication, such as a mobile phone
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {expiresIn: '5m'})
}

//     activateEmail: async (req, res) => { //I really want to add a phone authentication route here instead of an activate email but that will be for later, as its something not necessary
//         try {
//             const {activation_token} = req.body
//             const user = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN_SECRET)

//             const {name, email, password,phone} = user //I set the const name,email and password = user
    
    
//             const check = await User.findOne({email})
//             if(check) return res.status(400).json({msg:"This email already exists."})

    
//             const newUser = await User.create({
//                 name,
//                 email,
//                 phone,
//                 password,
//                 avatar: {
//                     public_id: 'avatar_zedfmr_ijrudp.png',
//                     url: 'https://res.cloudinary.com/unguarded/image/upload/v1659673491/avatar_zedfmr_ijrudp.png'
//                 }
//            }) 
           
//         sendToken(newUser, 200,res)   
    
//         } catch (err) {
//             return res.status(500).json({msg: err.message})
//         }
//     },
//     login: async (req, res) => { //login I use a request and response 
//         const {email, password} = req.body //I check for an email and password that is req by the body
//         const user = await User.findOne({email}).select('+password') //I await to see if the email does exist 
//         if(!user) return res.status(400).json({msg: "This email does not exist."}) // if the user does not exist respond with a res.json 400
    
//          // Checks if password is correct or not
//         const isPasswordMatched = await user.comparePassword(password);

//         if (!isPasswordMatched) {
//             return res.status(400).json({msg:"Password is incorrect, please try again"})
//         }
//         sendToken(user, 200,res)   
    
//         try { //using a try and catch error again 
       
//     } catch (err) {
//         return res.status(500).json({msg: err.message}) //respond with an error message
//     }
//     }, //create a ctrl and from there add register as this is where I will test the register function in postman. An async function is a function declared with the async keyword.
//     logout: async (req,res) => {
//         try{
//             res.cookie('token',null, {
//                 expires: new Date(Date.now()),
//                 httpOnly: true
//               })
            
//               res.status(200).json({
//                 success:true,
//                 message: 'Logged out'
//               })
//         }catch (err) {
//             return res.status(500).json({msg: err.message})
//         }
//       },
//     forgotPassword: async (req, res) => {
//         const {email} = req.body //I check for an email and password that is req by the body
//         const user = await User.findOne({ email: req.body.email });

//         if (!user) {
//               return res.status(400).json({msg:"email not found "})
//         }
   
//         const resetToken = user.getResetPasswordToken();

//         await user.save({ validateBeforeSave: false });
    
//         const url = `${req.protocol}://${req.get('host')}/user/reset/${resetToken}`//I created a url that is set to client url with user/reset/the token. implemented new way so incase the url is different it still works


//         try {
//             await Mail(email, url, "Reset your password") //i created a button for reset your password 
//             res.json({msg: "Please check your email to reset your password."}) //i sent a response to the server resend the password and check your email
        
//         } catch (err) {
//          user.resetPasswordToken = undefined;
//          user.resetPasswordExpire = undefined;

//          await user.save({ validateBeforeSave: false})

//          return res.status(500).json({msg: err.message})
    
//         }
//     },
//     resetPassword: async (req, res) => { 
//         const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

//         const user = await User.findOne({
//             resetPasswordToken,
//             resetPasswordExpire: { $gt: Date.now() }
//         })
    
//         if (!user) {
//             res.json({msg: "Please check your email to reset your password."}) //i sent a response to the server resend the password and check your email
        
//         }
    
//         if (req.body.password !== req.body.confirmPassword) {
//           res.json({msg: "Please check your email to reset your password."}) //i sent a response to the server resend the password and check your email
        
//         }
    
//         // Setup new password
//         user.password = req.body.password;
    
//         user.resetPasswordToken = undefined;
//         user.resetPasswordExpire = undefined;
    
//         await user.save();
    
//         sendToken(user, 200, res)
        
// },
    
// getAccessToken: (req, res) => { //this creates a getAccessToken
//     try { //I have a try catch error where I set the rf_token and req.cookies.refreshtoken (gives us the token), if it's not filled out then return login now. verify the token is refreshed and then there is an error 
//         const rf_token = req.cookies.refreshtoken
//         if(!rf_token) return res.status(400).json({msg: "Please login now!"})

//         jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
//             if(err) return res.status(400).json({msg: "Please login now!"})

//             const access_token = createAccessToken({id: user.id}) //access token is then made to create access token 
//             res.json({access_token}) //response json the accesstoken which has the user id
//         })
//     } catch (err) {
//         return res.status(500).json({msg: err.message})
//     }
// },
// getUserInfor: async (req, res) => { //by looking up the password of the user i'm able to get the information of the user
//     try {
//         const user = await User.findById(req.user.id).select('-password')
//         if(!user) return res.status(400).json({msg: "User does not exist"})
       
//         res.json(user)
//     } catch (err) {
//         return res.status(500).json({msg: err.message})
//     }
// },
// getUsersAllInfor: async (req, res) => {
//     try {
//         const user = await User.find().select('-password') //by setting one admin i'm able to see the status of all the users that are connected to the mongo db
//         if(!user) return res.status(400).json({msg: "User does not exist"})


//         res.json(user)
//     } catch (err) {
//         return res.status(500).json({msg: err.message})
//     }
//   },

//   updateUser: async (req, res) => {
//     try {
//         const {name, avatar} = req.body //const the name and avatar with a request to the server 
//         await User.findOneAndUpdate({_id: req.user.id}, { //I await to find the name and avatar 
//             name, avatar
//         })

//         res.json({msg: "Update Success!"}) //update success and res.json to the server
//     } catch (err) {
//         return res.status(500).json({msg: err.message})
//     }
// },
// updateUsersRole: async (req, res) => {
//     try {
//         const {role} = req.body  //theres roles with admins and not an admin, at the moment i havent implemented this as there is no use for the shop at the moment. This is on the way 

//         await User.findOneAndUpdate({_id: req.params.id}, {
//             role
//         })

//         res.json({msg: "Update Success!"})
//     } catch (err) {
//         return res.status(500).json({msg: err.message})
//     }
// },
// deleteUser: async (req, res) => { //helps delete a user. This is going to be fixed and updated as I progress with new shopping cart video, but is going to take a lot of time.
//     try {
//         await User.findByIdAndDelete(req.params.id)

//         res.json({msg: "Deleted Success!"})
//     } catch (err) {
//         return res.status(500).json({msg: err.message})
//     }
// }
// }





// const createActivationToken = (payload) => { //You activate a software token on a device that is used for authentication, such as a mobile phone
//     return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {expiresIn: '15m'})
// }

// const createAccessToken = (payload) => { //I add a createactivation token
//     return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'})
// }

// const createRefreshToken = (payload) => { //I add a createactivation token
//     return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '60m'})
// }



// module.exports = userCtrl









// // register: async (req, res) => {
// //     try {
// //         const {name, email,phone,password} = req.body //makes sure name is required 
// //         if(!name || !email || !phone || !password ) //if there is no value for name email and password, please fill in all fields 
// //             return res.status(400).json({msg: "Please fill in all fields."})

// //         if(!validateEmail(email))
// //             return res.status(400).json({msg: "Invalid emails."})

// //         const user = await Users.findOne({email})
// //         if(user) return res.status(400).json({msg: "This email already exists."})

       
// //         if(phone.length<10){
// //             return res.status(400).json({msg: "Phone must be 10 characters."})
// //          } else if(phone.search( /^(\+[1-9][0-9]*(\([0-9]*\)|-[0-9]*-))?[0]?[1-9][0-9\- ]*$/)){
// //             return  res.status(400).json({msg: "Phone error."})
// //         };

// //         const user_phone = await Users.findOne({ phone });
// //         if (user_phone)
// //           return res.status(400).json({ msg: "This phone already exists." });


// //         if(password.length < 6)
// //             return res.status(400).json({msg: "Password must be at least 6 characters."})

// //         //const hashpassword is now in user ctrl

// //         const newUser = {
// //             name, email, phone, password
// //         }

// //         const activation_token = createActivationToken(newUser)

// //         const url = `${CLIENT_URL}/user/activate/${activation_token}`
// //         sendMail(email, url, "Verify your email address")


// //         res.json({msg: "Register Success! Please activate your email to start."})
// //     } catch (err) {
// //         return res.status(500).json({msg: err.message})
// //     }
// // },
// // activateEmail: async (req, res) => {
// //     try {
// //         const {activation_token} = req.body
// //         const user = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN_SECRET)

// //         const {name, email, password,phone} = user //I set the const name,email and password = user


// //         const check = await Users.findOne({email})
// //         if(check) return res.status(400).json({msg:"This email already exists."})

// //         const newUser = new Users({  //new user is equal to name email and password 
// //             name,email,password,phone
// //         })


// //         await newUser.save()

// //         res.json({msg: "Account has been activated!"})

// //     } catch (err) {
// //         return res.status(500).json({msg: err.message})
// //     }
// // },
// // login: async (req, res, next) => { //login I use a request and response 
// // try { //using a try and catch error again 
// //     const {email, password} = req.body //I check for an email and password that is req by the body
// //     const user = await Users.findOne({email}).select('+password') //I await to see if the email does exist 
// //     if(!user) return res.status(400).json({msg: "This email does not exist."}) // if the user does not exist respond with a res.json 400

// //     const isPasswordMatched = await user.comparePassword(password);
// //     if (!isPasswordMatched) 
// //         return res.status(400).json({msg: "This password does not exist."}) 
    

// //     const refresh_token = createRefreshToken({id: user._id}) //I create a const to refresh the activation token of the user id/ cookie 
// //     res.cookie('refreshtoken', refresh_token, { //I generate the cookie and refresh the token 
// //         httpOnly: true, //http I set it to true 
// //         path: '/user/refresh_token', //the user is = refresh_token
// //         maxAge: 7*24*60*60*1000 // 7 days //and then I set the maxAge to 7*24*23232, this sets the max days how long a cookie will exist and this is the max age
// //     })

// //     res.json({msg: "Login success!"}) //I respond with a login success
// // } catch (err) {
// //     return res.status(500).json({msg: err.message}) //respond with an error message
// // }

// // },