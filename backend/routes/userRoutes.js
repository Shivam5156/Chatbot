const express = require('express')
const userAuth = require('../middleware/userAuth')
const userRouter = express.Router()

const  userController = require('../controllers/userController')

userRouter.get('/data',userAuth ,userController.getUserData )




module.exports = userRouter