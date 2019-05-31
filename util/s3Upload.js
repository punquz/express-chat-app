const AWS = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')

AWS.config.update({
    accessKeyId: 'AKIAIDEHM4H7Y4QSNOFQ',
    secretAccessKey: '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',
    region: 'us-east-1'
})



const s3 = new AWS.S3()
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'express-chat',
        // metadata(req, file, cb) {
        //     cb(null, {fieldName: file.fieldName})
        // },
        key: function (req, file, cb) {
            console.log(file);
            cb(null, file.originalname); //use Date.now() for unique file keys
        }
        // rename(fieldName, fileName) {
        //     return fileName.replace(/\w+/g, '-')
        // }
    })
})
exports.Upload = upload;