const cloudinary = require('cloudinary'); //import cloudinary 
const fs = require('fs') //require fs 

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME, //use this and hook it up to the env to update profile pictues 
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
})



const uploadCtrl = { //create a const, uploadavatar,add a try const file = req.files.file 
    uploadAvatar: (req, res) => {
        try {
            const file = req.files.file;
            
            cloudinary.v2.uploader.upload(file.tempFilePath, { //v2 upload it to the file temp and avatar with width height and crop 
                folder: 'avatar', width: 150, height: 150, crop: "fill"
            }, async(err, result) => { //async function if err, remove temp if no error console.log the url result
                if(err) throw err; 

                removeTmp(file.tempFilePath)

                console.log({result})
                res.json({url: result.secure_url})
            })
        
        } catch (err) {
            return res.status(500).json({msg: err.message}) //if an error besides the one in our try and catch error then error message 
        }
    }
}


const removeTmp = (path) => { //remove temp and throw error if not able to recieve 
    fs.unlink(path, err => {
        if(err) throw err
    })
}







module.exports = uploadCtrl