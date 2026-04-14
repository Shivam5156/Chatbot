const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const transporter = require('../config/nodemailer')

const { configDotenv } = require('dotenv')

const userModel = require('../models/userModel')

configDotenv()

const register = async (req, res) => {

    try {
        const inputData = req.body

        if (!inputData.email || !inputData.name || !inputData.password) {
            return res.status(400).json({
                success: false,
                message: "Missing Details"

            })
        }

        const checkUser = await userModel.findOne({ email: inputData.email })
        if (checkUser) {
            return res.status(400).json({
                success: false,
                message: "User Already Exist"
            })
        }

        //hash password
        const hashedPassword = await bcrypt.hash(inputData.password, 10);
        const newData = { ...inputData, password: hashedPassword }
        const storeDb = await userModel.create(newData);

        //sending welcome email

        const mailOptions = {
            from: "singhs36533@gmail.com",
            to: inputData.email,
            subject: 'Welcome to Developer World',
            text: `Hello ${inputData.name}, Welcome to our platform 🚀`

        }

        try {
            const info = await transporter.sendMail(mailOptions);

        } catch (err) {

            console.log("ERROR FULL:", err);
        }

        return res.status(201).json({
            success: true,
            message: "User Registered Successfully"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })

    }
}

const login = async (req, res) => {
    try {

        const inputData = req.body;

        if (!inputData.email || !inputData.password) {
            return res.status(400).json({
                success: false,
                message: "Missing Details"
            })
        }

        //check user
        const checkUser = await userModel.findOne({ email: inputData.email })
        if (!checkUser) {
            return res.status(400).json({
                success: false,
                message: "User Does not Exist"
            })
        }

        //check password
        const isMatched = await bcrypt.compare(inputData.password, checkUser.password);
        if (!isMatched) {
            return res.status(400).json({
                success: false,
                message: "Invalid Credentials"
            })
        }

        //jwt token

        const token = jwt.sign(
            { id: checkUser._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '7d' }
        );

        //cookie parser
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production' ? 'none' : false,
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000

        });

        return res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                id: checkUser._id,
                email: checkUser.email,
                name: checkUser.name,
                isAccountVerified: checkUser.isAccountVerified
            }
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

const logout = async (req, res) => {

    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        })

        return res.status(200).json({
            success: true,
            message: "Logged Out Successfully"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }

}


const sendVerifyOtp = async (req, res) => {

    try {
        const userId = req.userId;

        const user = await userModel.findById(userId);

        if (user.isAccountVerified) {
            return res.json({
                success: false,
                message: "Account is Already verify"
            })

        }

        const otp = String(Math.floor(100000 + Math.random() * 900000))

        user.verifyOtp = otp
        user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000

        await user.save()

        const mailOption = {
            from: 'singhs36533@gmail.com',
            to: user.email,
            subject: 'Account Verification OTP',
            text: `Your OTP is ${otp}. Verify your account using this OTP. `

        }

        await transporter.sendMail(mailOption)

        res.json({
            success: true,
            message: "Verification OTP Sent on Email"
        })



    } catch (error) {
        console.error("VERIFY OTP ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}
const verifyEmail = async (req, res) => {
    try {

        const userId = req.userId;
        const { otp } = req.body;

        if (!userId || !otp) {
            return res.status(400).json({
                success: false,
                message: "Missing Details"
            });
        }

        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // check OTP exists + expiry
        if (!user.verifyOtp || user.verifyOtpExpireAt < Date.now()) {
            return res.status(400).json({
                success: false,
                message: "OTP Expired or Not Found"
            });
        }

        //  match OTP (safe comparison)
        if (user.verifyOtp.toString() !== otp.toString()) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            });
        }

        //  update user
        user.isAccountVerified = true;
        user.verifyOtp = null;
        user.verifyOtpExpireAt = null;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Email Verified Successfully"
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

const isAuthenticated = async (req, res) => {

    try {
        return res.json({
            success: true
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }

}


const sendResetOtp = async (req, res) => {

    try {
        const { email } = req.body;

        if (!email) {
            return res.json({
                success: false,
                message: "Email is Required"
            })
        }

        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({
                success: false,
                message: 'User not found'
            })
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000))

        user.resetOtp = otp
        user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000

        await user.save()

        const mailOption = {
            from: 'singhs36533@gmail.com',
            to: user.email,
            subject: 'Password Reset OTP',
            text: `Your OTP for reseting your password is ${otp}. Use this OTP to proceed with reseting your password `

        }

        await transporter.sendMail(mailOption)
        return res.json({
            success: true,
            message: "OTP sent to your email"
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }

}

const resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;
        if (!email || !otp || !newPassword) {
            return res.json({
                success: false,
                message: "Email , OTP and new password are required"
            })
        }

        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({
                success: false,
                message: 'User not found'
            })
        }

        if (!user.resetOtp || user.resetOtp !== otp) {
            return res.json({
                success: false,
                message: 'Invalid OTp'
            })
        }

        if (user.resetOtpExpireAt < Date.now()) {
            return res.json({
                success: false,
                message: 'OTP Expired'
            })
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword
        user.resetOtp = ''
        user.resetOtpExpireAt = 0

        await user.save();


        const mailOptions = {
            from: "singhs36533@gmail.com",
            to: user.email,
            subject: 'Reset Password Message',
            text: `Hello, your password has been successfully reset. If this was not you, please contact support immediately.`

        }


        try {
            await transporter.sendMail(mailOptions);

        } catch (err) {
            console.log("ERROR FULL:", err);
        }

        return res.json({
            success: true,
            message: 'Password has been reset successfully'
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }

}



module.exports = { register, login, logout, sendVerifyOtp, verifyEmail, isAuthenticated, sendResetOtp, resetPassword }