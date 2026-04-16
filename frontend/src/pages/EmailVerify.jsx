import React, { useContext, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { User } from 'lucide-react'

const EmailVerify = () => {

  axios.defaults.withCredentials = true

  const { userData, getUserdata, isLoggedin, backendUrl } = useContext(AppContext)
  const navigate = useNavigate()

  const inputRefs = React.useRef([])

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

  const submitHandler = async (e) => {
    try {
      e.preventDefault()

      const otpArray = inputRefs.current.map((e) => e.value)
      const otp = otpArray.join('')

      const { data } = await axios.post(`${backendUrl}+ /api/auth/verify-account`, { otp })

      if (data.success) {
        toast.success(data.message)
        getUserdata()
        navigate('/')
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    isLoggedin && userData && userData.isAccountVerified && navigate('/')
  }, [isLoggedin, userData])

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
      <form
        onSubmit={submitHandler}
        className='w-full max-w-md bg-white/10 backdrop-blur-xl 
        border border-white/20 shadow-2xl rounded-3xl p-8 text-white'
      >

        <h1 className='text-3xl font-bold text-center mb-2'>
          Email Verification
        </h1>

        <p className='text-sm text-gray-300 text-center mb-6'>
          Enter the 6-digit OTP sent to your email
        </p>

        {/* OTP Inputs */}
        <div
          className="flex justify-between gap-2 mb-6"
          onPaste={handlePaste}
        >
          {Array(6).fill(0).map((_, index) => (
            <input
              type="text"
              maxLength='1'
              key={index}
              required
              className="w-12 h-12 text-center text-lg rounded-xl 
              bg-white/10 border border-white/20 
              outline-none focus:ring-2 focus:ring-white/30 transition"
              ref={el => inputRefs.current[index] = el}
              onInput={(e) => handleInput(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
        </div>

        {/* Button */}
        <button
          type='submit'
          className="w-full py-3 rounded-full bg-white text-black font-medium 
          hover:scale-[1.02] hover:shadow-lg transition-all cursor-pointer"
        >
          Verify Email
        </button>

      </form>
    </div>
  )
}

export default EmailVerify