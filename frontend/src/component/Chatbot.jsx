import React, { useState, useEffect, useRef, useContext } from "react";
import { AppContext } from '../context/AppContext';
import axios from 'axios';

const Chatbot = () => {
  const { userData, backendUrl } = useContext(AppContext);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, loading]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMsg = { role: "user", text: message };
    setChat((prev) => [...prev, userMsg]);
    setMessage("");
    setLoading(true);

    try {
      const res = await axios.post(`${backendUrl}+ /api/chat`, { message }, { withCredentials: true });

      const botMsg = { role: "bot", text: res.data.reply };
      setChat((prev) => [...prev, botMsg]);
    } catch (err) {
      setChat((prev) => [...prev, { role: "bot", text: "Something went wrong..." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const renderMessage = (msg) => {
    if (msg.text.includes("```")) {
      const parts = msg.text.split("```");
      return parts.map((part, idx) =>
        idx % 2 === 1 ? (
          <pre key={idx} className="bg-black text-green-400 p-3 rounded-lg my-2 overflow-auto text-sm">
            <code>{part.replace(/^[a-z]*\n/, "")}</code>
          </pre>
        ) : (
          <span key={idx}>{part}</span>
        )
      );
    }
    return msg.text;
  };

  return (
    <div className="md:ml-64 h-screen flex justify-center bg-linear-to-br from-gray-100 to-gray-200">

      <div className="w-full max-w-4xl flex flex-col">

        {/* Header */}
        <div className="p-4 border-b bg-white/70 backdrop-blur-md shadow-sm">
          <h1 className="text-lg font-semibold text-gray-800">
            AI Chatbot 🤖
          </h1>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">

          {chat.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"
                }`}
            >
              <div
                className={`px-4 py-3 rounded-2xl max-w-[75%] text-sm shadow-md ${msg.role === "user"
                  ? "bg-linear-to-r from-blue-500 to-indigo-500 text-white rounded-br-none"
                  : "bg-white text-gray-800 rounded-bl-none border"
                  }`}
              >
                {renderMessage(msg)}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-white px-4 py-3 rounded-2xl shadow text-gray-500 text-sm">
                Typing<span className="animate-pulse">...</span>
              </div>
            </div>
          )}

          <div ref={chatEndRef}></div>
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white/80 backdrop-blur-md border-t flex items-end gap-3">

          <textarea
            className="flex-1 border border-gray-300 rounded-xl p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            rows={1}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Send a message..."
          />

          <button
            onClick={sendMessage}
            disabled={loading}
            className="bg-linear-to-r from-blue-500 to-indigo-500 text-white px-5 py-2 rounded-xl 
            hover:scale-105 transition disabled:opacity-50 shadow-md cursor-pointer"
          >
            Send
          </button>

        </div>

      </div>
    </div>
  );
};

export default Chatbot;