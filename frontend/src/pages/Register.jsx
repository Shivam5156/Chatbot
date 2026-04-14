import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, Lock, User, Phone } from 'lucide-react'
import { toast } from 'react-toastify'
import axios from 'axios'

const Register = () => {

    const navigate = useNavigate()

    const [data, setData] = useState({
        name: '',
        email: '',
        phone: '',
        password: ''
    })

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        setLoading(true)

        if (!data.name.trim()) {
            toast.error("Name is required")
            setLoading(false)
            return
        }

        const emailRegex = /\S+@\S+\.\S+/
        if (!emailRegex.test(data.email)) {
            toast.error("Invalid email format")
            setLoading(false)
            return
        }

        const phoneRegex = /^[0-9]{10}$/
        if (!phoneRegex.test(data.phone)) {
            toast.error("Phone must be 10 digits")
            setLoading(false)
            return
        }

        if (data.password.length < 6) {
            toast.error("Password must be at least 6 characters")
            setLoading(false)
            return
        }

        try {
            const res = await axios.post('/api/auth/register', data)

            if (res.data.success) {
                toast.success("Register successful 🔥")
                navigate('/login')
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
                onSubmit={handleSubmit}
                className='w-full max-w-md bg-white/10 backdrop-blur-xl 
                border border-white/20 shadow-2xl rounded-3xl p-8 text-white'
            >

                <h1 className='text-3xl font-bold text-center mb-2'>
                    Create Account
                </h1>

                <p className='text-sm text-gray-300 text-center mb-6'>
                    Sign up to get started
                </p>

                {error && (
                    <p className='text-red-400 text-sm mb-4 text-center'>
                        {error}
                    </p>
                )}

                {/* Name */}
                <div className='relative mb-5'>
                    <User className='w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2' />
                    <input
                        type="text"
                        name="name"
                        placeholder='Full Name'
                        value={data.name}
                        onChange={handleChange}
                        className='w-full pl-12 pr-4 py-3 rounded-full 
                        bg-white/10 border border-white/20 
                        outline-none focus:ring-2 focus:ring-white/30 transition'
                    />
                </div>

                {/* Email */}
                <div className='relative mb-5'>
                    <Mail className='w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2' />
                    <input
                        type="email"
                        name="email"
                        placeholder='Email'
                        value={data.email}
                        onChange={handleChange}
                        className='w-full pl-12 pr-4 py-3 rounded-full 
                        bg-white/10 border border-white/20 
                        outline-none focus:ring-2 focus:ring-white/30 transition'
                    />
                </div>

                {/* Phone */}
                <div className='relative mb-5'>
                    <Phone className='w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2' />
                    <input
                        type="tel"
                        name="phone"
                        placeholder='Phone Number'
                        value={data.phone}
                        onChange={handleChange}
                        className='w-full pl-12 pr-4 py-3 rounded-full 
                        bg-white/10 border border-white/20 
                        outline-none focus:ring-2 focus:ring-white/30 transition'
                    />
                </div>

                {/* Password */}
                <div className='relative mb-6'>
                    <Lock className='w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2' />
                    <input
                        type="password"
                        name="password"
                        placeholder='Password'
                        value={data.password}
                        onChange={handleChange}
                        className='w-full pl-12 pr-4 py-3 rounded-full 
                        bg-white/10 border border-white/20 
                        outline-none focus:ring-2 focus:ring-white/30 transition'
                    />
                </div>

                {/* Button */}
                <button
                    type='submit'
                    disabled={loading}
                    className='w-full py-3 rounded-full bg-white text-black font-medium 
                    hover:scale-[1.02] hover:shadow-lg transition-all disabled:opacity-50 cursor-pointer'
                >
                    {loading ? 'Signing up...' : 'Sign Up'}
                </button>

                {/* Footer */}
                <p className='text-sm text-center mt-6 text-gray-300'>
                    Already have an account?{' '}
                    <span
                        onClick={() => navigate('/login')}
                        className='text-blue-400 cursor-pointer hover:underline'
                    >
                        Login
                    </span>
                </p>

            </form>
        </div>
    )
}

export default Register