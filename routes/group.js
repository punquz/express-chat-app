const router = require("express").Router()
const groupController = require("../controllers/groupController")


//get group page
router.get('/group/:name', groupController.getGroup)

//post group page
router.post('/group/:name', groupController.postGroupPage)






//exports
module.exports = router;