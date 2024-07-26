import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../style/open_chat_css/OpenChatRooms.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const OpenChatRooms = () => {
  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const response = await axios.get(`http://${API_BASE_URL}/api/open-chat-rooms`);
        setChatRooms(response.data);
      } catch (error) {
        console.error('Error fetching chat rooms:', error);
      }
    };

    fetchChatRooms();
  }, []);

  return (
    <div className="open-chat-rooms">
      <h2>Open Chat Rooms</h2>
      {chatRooms.length > 0 ? (
        <ul>
          {chatRooms.map((room) => (
            <li key={room.id}>
              <Link to={`/open-chatroom/${room.id}`}>{room.name}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No chat rooms available</p>
      )}
    </div>
  );
};

export default OpenChatRooms;
