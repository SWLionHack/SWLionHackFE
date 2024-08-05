import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';
import '../style/meet_chat/MeetChatRoom.css'; // 스타일 파일을 추가

const MeetChatRoom = () => {
  const { roomID } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userId, setUserId] = useState(null); // 사용자 ID 상태 추가
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const token = localStorage.getItem('token');
  const socketRef = useRef(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axios.get(`http://${API_BASE_URL}/info`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserId(response.data.id); // 사용자 ID 저장
      } catch (error) {
        console.error('Failed to fetch user ID', error);
      }
    };

    fetchUserId();

    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://${API_BASE_URL}/meet_chat/room/${roomID}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setMessages(response.data.MeetingChatMessages || []);
      } catch (error) {
        console.error('Failed to fetch messages', error);
      }
    };

    fetchMessages();

    // Setup Socket.IO connection
    socketRef.current = io(`http://${API_BASE_URL}`, {
      query: { token },
      transports: ['websocket'],
    });

    socketRef.current.emit('joinRoom', { roomId: roomID, chatType: 'meeting' });

    socketRef.current.on('receiveMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [API_BASE_URL, roomID, token]);

  const sendMessage = async () => {
    if (newMessage.trim() === '') return;

    const messageData = {
      meetingChatRoomId: roomID,
      content: newMessage,
    };

    try {
      await axios.post(`http://${API_BASE_URL}/meet_chat/room/${roomID}/message`, messageData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setNewMessage('');
    } catch (error) {
      console.error('Failed to send message', error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="chat-container">
      <h2 className="chat-header">Chat Room</h2>
      <div className="chat-messages">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.senderId === userId ? 'my-message' : 'other-message'}`}
          >
            <div className="message-content">
              {message.content}
            </div>
            {message.senderId !== userId && (
              <div className="message-info">
                <strong>{message.senderName || 'Unknown'}</strong>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default MeetChatRoom;
