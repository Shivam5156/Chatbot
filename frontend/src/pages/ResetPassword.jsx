import React, { useState,useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, User, Lock } from 'lucide-react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AppContext } from '../context/AppContext'

const ResetPassword = () => {

    axios.defaults.withCredentials = true

    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [isEmailSent, setIsEmailSent] = useState(false)
    const [otp, setOtp] = useState("")
    const [isOtpSubmitted, setIsOtpSubmitted] = useState(false)

    const inputRefs = React.useRef([])

    const { backendUrl } = useContext(AppContext)

    const handleInput = (e, index) => {
        if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus()
        }
    }

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
            inputRefs.current[index - 1].focus()
        }
    }

    const handlePaste = (e) => {
        const paste = e.clipboardData.getData('text')
        const pasteArray = paste.split('')

        pasteArray.forEach((char, index) => {
            if (inputRefs.current[index]) {
                inputRefs.current[index].value = char
            }
        })
    }

    const onSubmitEmail = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post(`${backendUrl}/api/auth/send-reset-otp`, { email })

            if (data.success) {
                toast.success(data.message)
                setIsEmailSent(true)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    const onSubmitOtp = async (e) => {
        e.preventDefault()
        try {
            const otpArray = inputRefs.current.map((el) => el.value)
            const finalOtp = otpArray.join('')

            setOtp(finalOtp)
            setIsOtpSubmitted(true)

        } catch (error) {
            toast.error(error.message)
        }
    }

    const onSubmitNewPassword = async (e) => {
        e.preventDefault()

        try {
            const { data } = await axios.post('/api/auth/reset-password', {
                email,
                otp,
                newPassword
            })

            if (data.success) {
                toast.success(data.message)
                navigate('/login')
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center 
        bg-linear-to-br from-gray-900 via-gray-950 to-black px-4'>

            {/* Logo */}
            <div
                className='absolute top-6 left-6 flex items-center gap-2 cursor-pointer group'
                onClick={() => navigate('/')}
            >
                <div className='w-10 h-10 flex items-center justify-center rounded-xl 
                bg-gray-800 shadow-md group-hover:scale-110 transition'>
                    <User className='w-5 h-5 text-white' />
                </div>

                <h2 className='font-bold text-white text-lg'>
                    auth
                </h2>
            </div>

            {/* Card */}
            <div className='w-full max-w-md bg-white/10 backdrop-blur-xl 
            border border-white/20 shadow-2xl rounded-3xl p-8 text-white'>

                {/* EMAIL STEP */}
                {!isEmailSent &&
                    <form onSubmit={onSubmitEmail}>
                        <h1 className="text-3xl font-bold text-center mb-2">
                            Reset Password
                        </h1>

                        <p className="text-sm text-gray-300 text-center mb-6">
                            Enter your registered email
                        </p>

                        <div className='relative mb-5'>
                            <Mail className='w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2' />
                            <input
                                type="email"
                                placeholder='Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className='w-full pl-12 pr-4 py-3 rounded-full 
                                bg-white/10 border border-white/20 
                                outline-none focus:ring-2 focus:ring-white/30 transition'
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 rounded-full bg-white text-black font-medium 
                            hover:scale-[1.02] hover:shadow-lg transition-all cursor-pointer"
                        >
                            Submit
                        </button>
                    </form>
                }

                {/* OTP STEP */}
                {!isOtpSubmitted && isEmailSent &&
                    <form onSubmit={onSubmitOtp}>
                        <h1 className="text-3xl font-bold text-center mb-2">
                            Enter OTP
                        </h1>

                        <p className="text-sm text-gray-300 text-center mb-6">
                            Enter the 6-digit code sent to your email
                        </p>

                        <div className="flex justify-between gap-2 mb-6" onPaste={handlePaste}>
                            {Array(6).fill(0).map((_, index) => (
                                <input
                                    type="text"
                                    maxLength='1'
                                    key={index}
                                    required
                                    className="w-12 h-12 text-center text-lg rounded-xl 
                                    bg-white/10 border border-white/20 
                                    outline-none focus:ring-2 focus:ring-white/30"
                                    ref={el => inputRefs.current[index] = el}
                                    onInput={(e) => handleInput(e, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                />
                            ))}
                        </div>

                        <button
                            type='submit'
                            className="w-full py-3 rounded-full bg-white text-black font-medium 
                            hover:scale-[1.02] hover:shadow-lg transition-all cursor-pointer"
                        >
                            Verify OTP
                        </button>
                    </form>
                }

                {/* NEW PASSWORD STEP */}
                {isOtpSubmitted && isEmailSent &&
                    <form onSubmit={onSubmitNewPassword}>
                        <h1 className="text-3xl font-bold text-center mb-2">
                            New Password
                        </h1>

                        <p className="text-sm text-gray-300 text-center mb-6">
                            Enter your new password
                        </p>

                        <div className='relative mb-5'>
                            <Lock className='w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2' />
                            <input
                                type="password"
                                placeholder='New Password'
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                                className='w-full pl-12 pr-4 py-3 rounded-full 
                                bg-white/10 border border-white/20 
                                outline-none focus:ring-2 focus:ring-white/30 transition'
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 rounded-full bg-white text-black font-medium 
                            hover:scale-[1.02] hover:shadow-lg transition-all cursor-pointer"
                        >
                            Reset Password
                        </button>
                    </form>
                }

            </div>
        </div>
    )
}

export default ResetPassword