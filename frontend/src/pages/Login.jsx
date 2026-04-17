import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AppContext } from '../context/AppContext'

const Login = () => {

  const navigate = useNavigate()
  const { setIsLoggedin, getUserdata , backendUrl } = useContext(AppContext)

  const [data, setData] = useState({
    email: "",
    password: ""
  })

  const [checkbox, setCheckbox] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!data.email || !data.password) {
      toast.error("Please provide email and password")
      return
    }

    try {
      setLoading(true)

      axios.defaults.withCredentials = true
      const res = await axios.post(`${backendUrl}/api/auth/login`, data)

      if (res.data.success) {
        setIsLoggedin(true)
        toast.success("Login successful!")
        await getUserdata()
        navigate('/')
      } else {
        toast.error(res.data.message)
      }

    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong")
    }

    setLoading(false)
  }

  return (
    <div className='min-h-screen flex items-center justify-center 
      bg-linear-to-br from-gray-900 via-gray-950 to-black px-4'>

      {/* Top Logo */}
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
        onSubmit={handleSubmit}
        className='w-full max-w-md bg-white/10 backdrop-blur-xl 
        border border-white/20 shadow-2xl rounded-3xl p-8 text-white'
      >

        <h1 className='text-3xl font-bold text-center mb-2'>
          Welcome Back
        </h1>

        <p className='text-sm text-gray-300 text-center mb-6'>
          Sign in to continue
        </p>

        {/* Email */}
        <div className='relative mb-5'>
          <Mail className='w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2' />

          <input
            type="email"
            name="email"
            placeholder='Enter Email'
            value={data.email}
            onChange={handleChange}
            className='w-full pl-12 pr-4 py-3 rounded-full 
            bg-white/10 border border-white/20 
            outline-none focus:ring-2 focus:ring-white/30 transition'
            required
          />
        </div>

        {/* Password */}
        <div className='relative mb-5'>
          <Lock className='w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2' />

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder='Enter Password'
            value={data.password}
            onChange={handleChange}
            className='w-full pl-12 pr-12 py-3 rounded-full 
            bg-white/10 border border-white/20 
            outline-none focus:ring-2 focus:ring-white/30 transition'
            required
          />

          <div
            className='absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-300'
            onClick={() => setShowPassword(prev => !prev)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </div>
        </div>

        {/* Options */}
        <div className='flex items-center justify-between mb-6 text-sm text-gray-300'>
          <label className='flex items-center gap-2 '>
            <input
              type="checkbox"
              checked={checkbox}
              className='cursor-pointer'
              onChange={(e) => setCheckbox(e.target.checked)}
            />
            Remember me
          </label>

          <span
            className='text-blue-400 cursor-pointer hover:underline '
            onClick={() => navigate('/reset-password')}
          >
            Forgot Password
          </span>
        </div>

        {/* Button */}
        <button
          type='submit'
          disabled={loading}
          className='w-full py-3 rounded-full bg-white text-black font-medium 
          hover:scale-[1.02] hover:shadow-lg transition-all disabled:opacity-50 cursor-pointer'
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>

        {/* Footer */}
        <p className='text-sm text-center mt-6 text-gray-300'>
          Don't have an account?{' '}
          <span
            onClick={() => navigate('/register')}
            className='text-blue-400 cursor-pointer hover:underline'
          >
            Sign Up
          </span>
        </p>

      </form>

    </div>
  )
}

export default Login