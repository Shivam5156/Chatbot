# 🤖 AI Chatbot (MERN Stack + Groq API + JWT Authentication)

<p align="center">
  <img src="https://img.shields.io/badge/MERN-Stack-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Groq-API-purple?style=for-the-badge" />
  <img src="https://img.shields.io/badge/JWT-Auth-red?style=for-the-badge" />
  <img src="https://img.shields.io/badge/AI-Chatbot-brightgreen?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Status-Active-success?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Deployed-Vercel%2FRender-blue?style=for-the-badge" />
</p>

---

## 🚀 Overview

This is a **full-stack AI Chatbot application** built using the **MERN stack** with secure authentication and AI-powered responses.

It integrates **Groq API (Llama 3 models)** for ultra-fast AI responses and uses **JWT authentication** for secure login/signup system.

---

## 🌐 Live Demo

👉 Frontend:https://chatbot-git-main-shivam5156s-projects.vercel.app 

---

## ✨ Features

- 🔐 User Authentication (Signup / Login with JWT)
- 💬 Real-time AI Chat Interface
- ⚡ Ultra-fast responses using Groq LLM
- 🧠 AI-powered smart replies
- 🔒 Protected Routes (Middleware)
- 📦 MongoDB Database Integration
- 🌐 REST API Architecture
- 📱 Fully Responsive UI
- 🗂️ Chat History Support (if implemented)

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS / CSS

### Backend
- Node.js
- Express.js

### Database
- MongoDB

### Authentication
- JSON Web Token (JWT)
- bcrypt.js

### AI Integration
- Groq API (Llama 3)

---

## 🔒 Security

- Password hashing (bcrypt)
- JWT authentication
- Protected API routes
- Environment variable protection


## ⚙️ Environment Variables

Create a `.env` file in backend:

```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GROQ_API_KEY=your_groq_api_key
PORT=5000

## 🧪 Run Locally

### 1. Clone repo
git clone https://github.com/your-username/repo-name.git

### 2. Install dependencies
Backend:
cd backend
npm install

Frontend:
cd frontend
npm install

### 3. Start project
Backend:
npm run dev

Frontend:
npm start

## 📡 API Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/signup | Register user |
| POST | /api/auth/login | Login user |
| POST | /api/chat | Send message to AI |

## 📈 Future Improvements

- Chat history storage
- Voice input/output
- File upload support
- Multiple AI model support

## 🙌 Author

Shivam Singh  
GitHub: [@your-username](https://github.com/your-username)
LinkedIn: https://linkedin.com/in/your-profile
