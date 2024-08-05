import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/diary/DiaryStyles.css'

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const DiaryList = () => {
  const [diaries, setDiaries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDiaries = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`http://${API_BASE_URL}/diary/all`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setDiaries(response.data);
      } catch (error) {
        console.error('Error fetching diaries:', error);
      }
    };

    fetchDiaries();
  }, []);

  const handleCreateDiary = () => {
    navigate('/diary/new');
  };

  const handleViewDiary = (id) => {
    navigate(`/diary/${id}`);
  };

  return (
    <div className="container">
      <h1 className="diary-title">Diary List</h1>
      <ul className="diary-list">
        {diaries.map(diary => (
          <li key={diary.id} className="diary-list-item" onClick={() => handleViewDiary(diary.id)}>
            <h2 className="diary-title">{diary.title}</h2>
            <p className="diary-date">{new Date(diary.createdAt).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
      <button className="button" onClick={handleCreateDiary}>Write a New Diary</button>
    </div>
  );
};

export default DiaryList;
