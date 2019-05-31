const router = require("express").Router()

const homeController = require('../controllers/homeController')

//home get
router.get('/home', homeController.getHome)





//exports
module.exports = router