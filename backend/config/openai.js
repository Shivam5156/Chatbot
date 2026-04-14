const OpenAI = require("openai")
const { configDotenv } = require("dotenv")

configDotenv()

const openai = new OpenAI({
  apiKey: process.env.OPEN_API_KEY, 
  baseURL: "https://api.groq.com/openai/v1"
})

module.exports = openai
