const { generateResponse } = require('../services/openaiServices')

const sendMessage = async (req, res) => {
  try {
    const { message } = req.body

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required"
      })
    }

    const botReply = await generateResponse(message)

    res.status(200).json({
      success: true,
      reply: botReply
    })

  } catch (error) {
    console.error(error.response?.data || error.message)

    res.status(500).json({
      success: false,
      message: "Something went wrong"
    })
  }
}


module.exports = { sendMessage }