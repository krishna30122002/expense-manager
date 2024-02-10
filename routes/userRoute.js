const express = require('express')
const { loginController, registerController } = require('../controllers/userController')

//router object
const router = express.Router()

//routers

//POST route || login
router.post('/login', loginController)

//POST route || Register
router.post('/register', registerController)

module.exports = router