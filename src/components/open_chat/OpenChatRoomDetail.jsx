import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';
import '../style/open_chat_css/OpenChatRoomDetail.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const OpenChatRoomDetail = () => {
  const { id } = useParams();
  const [roomName, setRoomName] = useState('');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userCount, setUserCount] = useState(0);
  const socket = useRef(null);
  const messagesEndRef = useRef(null);
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const userId = `user-${Math.floor(Math.random() * 10000)}`;
    const username = `익명 ${Math.floor(Math.random() * 1000)}`;

    setUserId(userId);
    setUsername(username);

    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://${API_BASE_URL}/api/chatroom/${id}`);
        setRoomName(response.data.name);
        setMessages(response.data.OpenChatMessages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();

    socket.current = io(`http://${API_BASE_URL}`);
    socket.current.emit('joinOpenRoom', { roomId: id, userId, username }); // 이벤트를 joinOpenRoom으로 변경

    socket.current.on('receiveMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.current.on('userCountUpdate', (count) => {
      setUserCount(count);
    });

    return () => {
      socket.current.disconnect();
    };
  }, [id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      openChatRoomId: id,
      senderId: userId,
      senderType: username,
      content: newMessage,
      createdAt: new Date()
    };

    socket.current.emit('sendOpenMessage', message); // 이벤트를 sendOpenMessage로 변경
    setNewMessage('');
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="open-chat-room-detail">
      <h2>{roomName}</h2>
      <div className="user-count">접속자 수: {userCount}</div>
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <b>{msg.senderType}</b>: {msg.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="input-container">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button className="message_send_button" onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default OpenChatRoomDetail;
