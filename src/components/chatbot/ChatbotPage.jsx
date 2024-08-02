import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import '../style/chatbot/ChatbotPage.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const ChatbotPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const token = localStorage.getItem('token');

      const response = await axios.post(`http://${API_BASE_URL}/gpt/chat/continue`, {
        message: input
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const botMessage = { sender: 'bot', text: response.data.response };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = { sender: 'bot', text: 'Sorry, something went wrong.' };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="chatbot-page">
      <div className="chatbot-window">
        <div className="chatbot-messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`chatbot-message ${msg.sender === 'bot' ? 'bot' : 'user'}`}
            >
              {msg.text}
            </div>
          ))}
          {loading && <div className="chatbot-message bot">Loading...</div>}
          <div ref={messagesEndRef} />
        </div>
        <div className="chatbot-input-container">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => { if (e.key === 'Enter') handleSendMessage() }}
            placeholder="Type a message..."
            className="chatbot-input"
            disabled={loading}
          />
          <button onClick={handleSendMessage} className="chatbot-send-button" disabled={loading || input.trim() === ''}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;
