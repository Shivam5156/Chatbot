const openai = require("../config/openai")

let lastUserMessage = ""

const generateResponse = async (userMessage) => {

 
  const isDetailed = /detail|explain|deep|elaborate|samjha|samjhao|describe|in depth|properly/i
    .test(userMessage.toLowerCase())

 
  const isOnlyDetailWord = /^(detail|explain|samjha|samjhao)$/i
    .test(userMessage.trim())

 
  const finalMessage = (isOnlyDetailWord && lastUserMessage)
    ? lastUserMessage
    : userMessage

  const response = await openai.chat.completions.create({
    model: "llama-3.1-8b-instant",
    temperature: 0.3,
    max_tokens: isDetailed ? 500 : 100,
    messages: [
      {
        role: "system",
        content: `
You are a helpful AI assistant.

Rules:
- Detect user's language.
- If English → reply in English.
- If Hindi → reply in Hinglish (English letters only).
- Default: keep answers short (2-3 lines).
- If user asks for explanation (detail, explain, samjhao, etc.) → give detailed answer.
- Never use Hindi script.
`
      },
      {
        role: "user",
        content: finalMessage
      }
    ]
  })

 
  if (!isOnlyDetailWord) {
    lastUserMessage = userMessage
  }

  return response.choices[0].message.content
}

module.exports = { generateResponse }