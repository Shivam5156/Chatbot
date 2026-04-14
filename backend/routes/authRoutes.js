const express = require('express')
const authRouter = express.Router()

const authController = require('../controllers/authController')
const userAuth = require('../middleware/userAuth')

authRouter.post('/register', authController.register)
authRouter.post('/login', authController.login)
authRouter.post('/logout', authController.logout)
authRouter.post('/send-verify-otp', userAuth, authController.sendVerifyOtp)
authRouter.post('/verify-account', userAuth, authController.verifyEmail)
authRouter.get('/is-auth', userAuth, authController.isAuthenticated)
authRouter.post('/send-reset-otp', authController.sendResetOtp)
authRouter.post('/reset-password', authController.resetPassword)


module.exports = authRouter