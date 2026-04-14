import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import EmailVerify from './pages/EmailVerify'
import ResetPassword from './pages/ResetPassword'
import Register from './pages/Register'
import Chat from './pages/Chat'
import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <BrowserRouter>
      
      <ToastContainer />
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/email-verify' element={<EmailVerify />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        
      </Routes>

    </BrowserRouter>
  )
}

export default App
