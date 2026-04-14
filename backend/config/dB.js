const mongoose = require('mongoose')
const { configDotenv } = require('dotenv')

configDotenv()
const url = process.env.DB_URL




const connectDb = async ()=>{
    await mongoose.connect(url)
    .then((data)=> console.log('DB Connect'))
    .catch((err)=> console.log('DB Error' , err))
}


module.exports = connectDb