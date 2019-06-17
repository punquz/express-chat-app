const router = require("express").Router()
const adminController = require("../controllers/adminController")
const aws = require('../util/s3Upload')


//get admin dashboard
router.get('/dashboard', adminController.getAdminDashboard)


// //post upload file
// router.post('/uploadFile', aws.Upload.array('upload1', 1), function(req, res, next){
//     console.log('uploaded')
//     res.send('uploaded')
// })

//save data to database
router.post('/dashboard', adminController.postSave)

//exports
module.exports = router;