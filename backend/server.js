const express = require('express')
const {configDotenv} = require('dotenv')
const cors = require('cors')
const cookieParser = require('cookie-parser')


const chatRoutes = require('./routes/chatRoutes')
const authRouter = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const connectDb =require('./config/dB')


configDotenv()
const app =express()
const PORT = process.env.PORT
connectDb()

//middleware
const allowedOrigins = [
    'http://localhost:5173',
    'https://chatbot-git-main-shivam5156s-projects.vercel.app'
];

app.use(cors({
    origin: function(origin, callback){
        if(!origin || allowedOrigins.includes(origin)){
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));
app.use(express.json())
app.use(cookieParser())



app.use('/api/chat' , chatRoutes)

app.use('/api/auth' , authRouter)

app.use('/api/user', userRoutes)


app.listen(PORT,()=>{
    console.log(`Server Started`);
    
})