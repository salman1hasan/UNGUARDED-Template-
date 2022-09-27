const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name!"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Please enter your email!"],
        trim: true,
        unique: true,
        validate: [validator.isEmail, 'Please enter valid email address']
    },
    phone: {
      type: Number,
      unqiue: true
     },
    password: {
      type:String, 
      required: true,
      select: false,
      minLength: 8
     }, 
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type:String,
            required:true,
        }
    },
    role: {
        type: String,
        default: "user" // 0 = user, 1 = admin
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
})

//encrypting password before saving user
userSchema.pre('save', async function(next) {
    if(!this.isModified('password')){
        next()
    }
    this.password = await bcrypt.hash(this.password,10)
})

//Return JWT token
userSchema.methods.getJwtToken = function(){
    return jwt.sign({ id: this._id}, process.env.JWT_SECRET, {
       expiresIn: process.env.JWT_EXPIRES_TIME
    });
}

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

//Generate password reset token 
userSchema.methods.getResetPasswordToken = function () {
    // Generate token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash and set to resetPasswordToken
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    // Set token expire time
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000

    return resetToken

}


module.exports = mongoose.model("User", userSchema)

// userSchema.pre('save', async function(next) {
//     if(!this.isModified('password')){
//         next()
//     }
//     this.password = await bcrypt.hash(this.password,10)
// })


// userSchema.methods.comparePassword = async function(enteredPassword){
//     return await bcrypt.compare(enteredPassword, this.password)
// }


// //return jwt token
// userSchema.methods.getJwtToken = function(){
//     return jwt.sign({ id: this._id}, process.env.JWT_SECRET, {
//        expiresIn: process.env.JWT_EXPIRES_TIME
//     })
// }


//encrypting password before saving user







//   avatar: {  /** */
//public_id: {
    //type: String,
    //required: true
//},
//url: {
    //type: String,
    //required: true
//}
//resetPasswordToken: String,
//resetPasswordExpire: Date







//in store example use validator specifically for email and avatar/role . Avatar has a public_id with a type String, required true, and a url type string, true and role string and type user



// const mongoose =require('mongoose');
// const validator = require('validator'); //used specifically for email

// const userSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: [true, "Please enter your name"],
//         maxLength: [30,"Name cannot exceed 30 characters" ],
//         mminLength: [4,"Name should have more than 6 characters" ]
//     }, 
//     email: {
//        type: String, 
//        required: [true,"Please enter your Email" ],
//        unique: true,
//        validate: [validator.isEmail, "Please enter a valid email" ] //used to verify email validation
//     },
//     password: {
//         type:String, 
//         required: [true,"Please enter your password" ],
//         minLength: [8, "Password should be longer than 8 characters "],
//         select: false //in the backend with mongodb, password wont appear 
//     }, 
//     avatar: {
//         public_id: {
//             type: String, 
//             required: true
//         },
//         url: {
//             type: String,
//             required: true
//         },
//     }, 
//     role: {
//         type: String, 
//         default: "user",
//     },

//     resetPasswordToken: String,
//     resetPasswordExpire: Date,

// });

// module.exports = mongoose.model("User", userSchema);

//userSchema.pre("save", async function(next){ //creating a function to see if password is modified make sure that the password is hashed, this is different from the way previously done 
   //before 
   
  // if(!this.isModified("password")){
    //   next();
   //}


   //this.password = await bcrypt.hash(this.password,10)
//})

//module.exports = mongoose.model("User", userSchema);