import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/diary/DiaryStyles.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const DiaryList = () => {
  const [diaries, setDiaries] = useState([]);
  const [canCreateDiary, setCanCreateDiary] = useState(true); // 일기 작성 가능 여부
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

        // 오늘 날짜의 일기 확인
        const today = new Date().toISOString().split('T')[0]; // 오늘 날짜 (YYYY-MM-DD)
        const todayDiaryExists = response.data.some(diary => new Date(diary.createdAt).toISOString().split('T')[0] === today);
        setCanCreateDiary(!todayDiaryExists); // 오늘 날짜의 일기가 없으면 true
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

  const handleViewScores = () => {
    navigate('/diary/score');
  };

  return (
    <div className="container">
      <h1 className="diary-title">일기장</h1>
      <ul className="diary-list">
        {diaries.map(diary => (
          <li key={diary.id} className="diary-list-item" onClick={() => handleViewDiary(diary.id)}>
            <h2 className="diary-title">{diary.title}</h2>
            <p className="diary-date">{new Date(diary.createdAt).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
      {canCreateDiary && (
        <button className="button" onClick={handleCreateDiary}>일기 작성하기</button>
      )}
      <button className="button" onClick={handleViewScores}>지난 점수 보기</button>
    </div>
  );
};

export default DiaryList;
