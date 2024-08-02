import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/chatbot/ChatbotIcon.css'

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const ChatbotIcon = () => {
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`http://${API_BASE_URL}/gpt/chat`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // 서버에서 스레드 생성 후, 채팅 페이지로 이동
      if (response.data) {
        navigate('/chatbot');
      }
    } catch (error) {
      console.error('Error creating chat thread:', error);
      // 오류 처리 로직 추가 (예: 에러 메시지 표시)
    }
  };

  return (
    <div className="chatbot-icon-container-custom" onClick={handleClick}>
      <img src="./chatbot.png" alt="Chatbot" className="chatbot-icon-custom" />
    </div>
  );
};

export default ChatbotIcon;
