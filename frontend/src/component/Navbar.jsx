import React, { useContext, useState } from 'react'
import { User, ArrowRight, Menu, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const Navbar = () => {
  const navigate = useNavigate()
  const { userData, setUserData, setIsLoggedin , backendUrl} = useContext(AppContext)

  const [isOpen, setIsOpen] = useState(false)

 const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true

      const { data } = await axios.post(`${backendUrl}/api/auth/send-verify-otp`)

      if (data.success) {
        navigate('/email-verify')
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(`${backendUrl}/api/auth/logout`)

      if (data.success) {
        setIsLoggedin(false);
        setUserData(null);
        navigate('/');
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between p-4 bg-gray-900 text-white">
        <h2 className="font-bold">Chatbot</h2>
        <button onClick={() => setIsOpen(true)}>
          <Menu className='cursor-pointer'/>
        </button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-screen w-64 z-50
        bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white
        flex flex-col p-5 shadow-2xl
        transform transition-transform duration-300

        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0
      `}>

        <div className="flex justify-end mb-4 md:hidden">
          <button onClick={() => setIsOpen(false)}>
            <X className='cursor-pointer'/>
          </button>
        </div>

        {/* Logo */}
        <div
          className='flex items-center gap-3 cursor-pointer group mb-10'
          onClick={() => {
            navigate('/')
            setIsOpen(false)
          }}
        >
          <div className='w-11 h-11 flex items-center justify-center rounded-xl 
            bg-gradient-to-br from-indigo-500 to-purple-600'>
            <User className='w-5 h-5 text-white' />
          </div>

          <h2 className='font-bold text-xl'>Chatbot</h2>
        </div>

        {/* Menu */}
        <div className='flex flex-col gap-2'>
          <button
            onClick={() => {
              navigate('/')
              setIsOpen(false)
            }}
            className='text-left px-4 py-2 rounded-lg hover:bg-white/10 cursor-pointer'
          >
            Home
          </button>

          <button
            onClick={() => {
              navigate('/chat')
              setIsOpen(false)
            }}
            className='text-left px-4 py-2 rounded-lg hover:bg-white/10 cursor-pointer'
          >
            Chat 
          </button>

          {userData && !userData.isAccountVerified && (
            <button
              onClick={() => {
                sendVerificationOtp()
                setIsOpen(false)
              }}
              className='text-left px-4 py-2 rounded-lg text-yellow-400 hover:bg-yellow-500/20'
            >
              Verify Email
            </button>
          )}
        </div>

        {/* Bottom */}
        <div className='mt-auto'>
          {userData ? (
            <div className='flex flex-col gap-3'>
              <div className='flex items-center gap-3 bg-white/10 p-3 rounded-xl'>
                <div className='w-10 h-10 flex justify-center items-center rounded-full 
                  bg-gradient-to-br from-indigo-500 to-purple-600'>
                  {userData.name[0].toUpperCase()}
                </div>

                <div>
                  <p className='text-sm'>{userData.name}</p>
                </div>
              </div>

              <button
                onClick={logout}
                className='w-full bg-red-500 py-2 rounded-lg cursor-pointer'
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                navigate('/login')
                setIsOpen(false)
              }}
              className='flex items-center justify-center gap-2 text-white py-2 rounded-lg cursor-pointer w-full bg-purple-500 hover:bg-purple-700 transition-all'
            >
              Login
              <ArrowRight className='w-4 h-4' />
            </button>
          )}
        </div>

      </div>
    </>
  )
}

export default Navbar