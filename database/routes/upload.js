const router = require('express').Router() //router specifically for uploading images
const uploadImage = require('../middleware/uploadImage') //upload image
const uploadCtrl = require('../controllers/uploadCtrl') //include controllers and uploadctrl


router.post('/upload_avatar', uploadImage, uploadCtrl.uploadAvatar) //specifcally for avatar


module.exports = router