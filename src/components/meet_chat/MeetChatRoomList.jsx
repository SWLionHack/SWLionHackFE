import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../style/meet_chat/MeetChatRoomList.css'; // CSS 파일 경로

const MeetChatRoomList = () => {
  const [chatRooms, setChatRooms] = useState([]);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const response = await axios.get(`http://${API_BASE_URL}/meet_chat/rooms`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setChatRooms(response.data);
      } catch (error) {
        console.error('Failed to fetch chat rooms', error);
      }
    };

    fetchChatRooms();
  }, [API_BASE_URL, token]);

  return (
    <div className="chat-room-list-container">
      <h2 className="page-title">채팅방 목록</h2>
      <ul className="chat-room-list">
        {chatRooms.map(room => (
          <li key={room.id} className="chat-room-item">
            <Link to={`/meet-chat/${room.id}`} className="chat-room-link">{room.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MeetChatRoomList;
