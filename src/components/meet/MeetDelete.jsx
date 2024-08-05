import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const MeetDelete = () => {
  const { meetID } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://${API_BASE_URL}/meet/${meetID}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('Meeting deleted successfully');
      navigate('/meet-vote');
    } catch (error) {
      console.error('Error deleting meeting:', error);
      alert('Failed to delete meeting');
    }
  };

  return (
    <div>
      <button onClick={handleDelete}>Delete Meeting</button>
    </div>
  );
};

export default MeetDelete;
