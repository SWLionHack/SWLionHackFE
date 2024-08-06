import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/diary/DiaryStyles.css'

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const DiaryDetail = () => {
  const [diary, setDiary] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDiary = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`http://${API_BASE_URL}/diary/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setDiary(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching diary:', error);
      }
    };

    fetchDiary();
  }, [id]);

  if (!diary) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1 className="diary-title">{diary.title}</h1>
      <p className="diary-date">{new Date(diary.createdAt).toLocaleDateString()}</p>
      <p className="diary-content">{diary.content}</p>
      <p className="diary-content">{diary.score} 점</p>
    </div>
  );
};

export default DiaryDetail;
