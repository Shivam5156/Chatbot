const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    name: { type: String, required: true },
    email: { type: String, required: true, unique: true,lowercase: true },
    password: { type: String, required: true },
    phone: { type: String },
    verifyOtp: { type: String },
    verifyOtpExpireAt: { type: Number, default: 0 },
    isAccountVerified: { type: Boolean, default: false },
    resetOtp: { type: String },
    resetOtpExpireAt: { type: Number, default: 0 }


})

module.exports = mongoose.models.user || mongoose.model('user', userSchema)