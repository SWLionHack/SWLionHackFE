import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const MeetVote = () => {
  const { meetID } = useParams();

  const handleVote = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(`http://${API_BASE_URL}/meet/vote/${meetID}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert(response.data.message);
      if (response.data.meetingChatRoom) {
        console.log('Chat room created:', response.data.meetingChatRoom);
      }
    } catch (error) {
      console.error('Error joining meeting:', error);
      alert('Failed to join meeting');
    }
  };

  return (
    <div>
      <button onClick={handleVote}>Join Meeting</button>
    </div>
  );
};

export default MeetVote;
