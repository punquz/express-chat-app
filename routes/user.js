const router = require("express").Router()
const userController = require("../controllers/userController")


// router.get('/', (req, res, next) => {
//     res.render('index', {
//         title: 'hello'
//     })
// })

//getSignup Page
router.get('/', userController.getSignUp )

//postsignup
router.post ('/signup', userController.postSignUp)

//getLogin
router.get('/login', userController.getLogin)

//postLogin
router.post('/login', userController.postLogin)

//logout
router.get('/logout', userController.logout)









//export the router
module.exports = router