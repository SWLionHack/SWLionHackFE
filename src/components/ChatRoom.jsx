import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './style/ChatRoom.css'; // CSS 파일 import

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function ChatRoom() {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [selectedRoom, setSelectedRoom] = useState(null);
  const wsRef = useRef(null);
  const userId = 1; // 실제 사용자 ID로 대체

  useEffect(() => {
    if (!id) return;

    // 채팅방 정보 및 메시지 불러오기
    axios.get(`http://${API_BASE_URL}/chatroom/${id}`)
      .then(response => {
        console.log('Fetched chat room:', response.data);
        setSelectedRoom(response.data);
        setMessages(response.data.Messages || []); // 데이터가 없을 경우 빈 배열로 설정
      })
      .catch(error => console.error('Error fetching chat room:', error));

    // WebSocket 설정
    wsRef.current = new WebSocket(`ws://${API_BASE_URL}`);
    wsRef.current.onopen = () => {
      console.log('WebSocket connection opened');
    };
    wsRef.current.onmessage = (event) => {
      const { chatRoomId, newMessage } = JSON.parse(event.data);
      console.log('Received message:', event.data);
      if (chatRoomId === id) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    };
    wsRef.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    wsRef.current.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      wsRef.current.close();
    };
  }, [id]);

  const sendMessage = () => {
    if (selectedRoom && message && wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      const newMessage = { chatRoomId: id, senderId: userId, senderType: 'user', content: message };
      wsRef.current.send(JSON.stringify(newMessage));
      console.log('Sent message:', newMessage);
      setMessage('');
    } else {
      console.error('WebSocket is not open. Unable to send message.');
    }
  };

  return (
    <div className="chat-container">
      {selectedRoom ? (
        <>
          <div className="chat-header">{selectedRoom.name}</div>
          <div className="chat-messages">
            {messages.map(msg => (
              <div key={msg.id} className={`chat-message ${msg.senderType}`}>
                {msg.content}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="메시지를 입력하세요..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </>
      ) : (
        <p>Loading chat room...</p>
      )}
    </div>
  );
}

export default ChatRoom;
