const fs = require('fs');

module.exports = async function(req, res, next) {
    try {
        if(!req.files || Object.keys(req.files).length === 0) //if the files have no length then upload no files were uploaded 
            return res.status(400).json({msg: "No files were uploaded."})
            
        const file = req.files.file; //make sure the files require a file and a file
     

        if(file.size > 1024 * 1024){ //if the file size is bigger than 1024*1024 then removetemp and tempfilepath and return size too large
            removeTmp(file.tempFilePath) //remove the tmp file path 
            return res.status(400).json({msg: "Size too large."})
        } // 1mb

        if(file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png'){ //if fylyetype isnt a image/jpeg or png remove the temp file
            removeTmp(file.tempFilePath)
            return res.status(400).json({msg: "File format is invalid"})
        }

        next()
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

const removeTmp = (path) => { //create a const to remove temp and include path that has path and err
    fs.unlink(path, err => {
        if(err) throw err //if error throw an error
    })
}