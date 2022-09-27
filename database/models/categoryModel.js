const mongoose = require("mongoose"); //similar to the login schema with product model js and user model login

const categoryScehma= new mongoose.Schema({ //create a product schema with name, description, price, ratings, images, id and url, to store all the products in the store
  name: {
    type: String,
    required: [true, "Please Enter product Name"],
    trim: true,
    unique: true,
  },
}, {
    timestamps: true
})

module.exports = mongoose.model("Category", categoryScehma);