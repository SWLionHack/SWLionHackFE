import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function Counseling() {
  const [experts, setExperts] = useState([]);
  const [chatRooms, setChatRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 전문가 목록을 가져옵니다.
    axios.get(`http://${API_BASE_URL}/experts`)
      .then(response => {
        console.log('Fetched experts:', response.data);
        setExperts(response.data);
      })
      .catch(error => console.error('Error fetching experts:', error));

    // 채팅방 목록을 가져옵니다.
    axios.get(`http://${API_BASE_URL}/chatrooms`)
      .then(response => {
        console.log('Fetched chat rooms:', response.data);
        setChatRooms(response.data);
      })
      .catch(error => console.error('Error fetching chat rooms:', error));
  }, []);

  const createChatRoom = (expert) => {
    const userId = 1; // 실제 사용자 ID로 대체
    axios.post(`http://${API_BASE_URL}/chatroom`, { userId, expertId: expert.id, name: expert.name })
      .then(response => {
        console.log('Created chat room:', response.data);
        setChatRooms([...chatRooms, response.data]);
        navigate(`/counseling/${response.data.id}`);
      })
      .catch(error => console.error('Error creating chat room:', error));
  };

  const selectChatRoom = (room) => {
    navigate(`/counseling/${room.id}`);
  };

  return (
    <div>
      <h2>상담방</h2>
      <p>전문가에게 상담을 받아보세요</p>
      <div>
        <h3>전문가 목록</h3>
        <ul>
          {experts.length > 0 ? experts.map(expert => (
            <li key={expert.id}>
              {expert.name}
              <button onClick={() => createChatRoom(expert)}>상담 시작</button>
            </li>
          )) : <p>Loading experts...</p>}
        </ul>
      </div>
      <div>
        <h3>채팅방 목록</h3>
        <ul>
          {chatRooms.length > 0 ? chatRooms.map(room => (
            <li key={room.id}>
              {room.name} (User: {room.userId}, Expert: {room.expertId})
              <button onClick={() => selectChatRoom(room)}>Enter</button>
            </li>
          )) : <p>Loading chat rooms...</p>}
        </ul>
      </div>
    </div>
  );
}

export default Counseling;
