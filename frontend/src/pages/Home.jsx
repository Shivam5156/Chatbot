import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../component/Navbar'

function Home() {

  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white flex">
      
      <Navbar />

      {/* Right Content */}
      <div className="flex-1 md:ml-64 flex items-center justify-center px-4">
        
        <div className="text-center">

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Build Conversations with <br />
            <span className="text-blue-500">AI Chatbot 🤖</span>
          </h1>

          <p className="text-gray-400 max-w-xl mx-auto mb-8">
            Experience smart AI conversations. Ask anything, get instant responses,
            and boost your productivity with our intelligent chatbot.
          </p>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate('/chat')}
              className="bg-blue-500 px-6 py-3 rounded-full font-medium 
              hover:scale-105 transition-all shadow-lg cursor-pointer"
            >
              Start Chat
            </button>

            <button
              onClick={() => navigate('/login')}
              className="border border-gray-500 px-6 py-3 rounded-full 
              hover:bg-gray-800 transition-all cursor-pointer"
            >
              Login
            </button>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Home