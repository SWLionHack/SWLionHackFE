import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/meet/MeetCreateForm.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const MeetCreateForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('30'); // 기본 30분 설정
  const [expirationTime, setExpirationTime] = useState('');
  const [maxCapacity, setMaxCapacity] = useState(1); // 기본값 1명
  const navigate = useNavigate();

  const handleDurationChange = (e) => {
    const value = e.target.value;
    setSelectedDuration(value);
    if (value !== 'custom') {
      const currentTime = new Date();
      const durationMinutes = parseInt(value);
      const expirationDate = new Date(currentTime.getTime() + durationMinutes * 60000);
      setExpirationTime(expirationDate.toISOString()); // ISO 형식으로 설정
    } else {
      setExpirationTime(''); // 사용자 설정 시 초기화
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedDuration === 'custom' && !expirationTime) {
      alert('Expiration time must be set when choosing custom duration.');
      return;
    }

    if (!expirationTime || expirationTime === 'Invalid date') {
      alert('Invalid expiration time. Please select a valid duration or set a custom time.');
      return;
    }

    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(`http://${API_BASE_URL}/meet/create`, {
        title,
        content,
        expirationTime,
        maxCapacity
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('Meeting created successfully');
      navigate('/meet-vote');
    } catch (error) {
      console.error('Error creating meeting:', error);
      alert('Failed to create meeting');
    }
  };

  return (
    <div className="meet-create-form-container">
      <h2 className="form-title">새 모임 만들기</h2>
      <form onSubmit={handleSubmit} className="meet-create-form">
        <div className="form-group">
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
            placeholder="제목을 입력해주세요"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <textarea 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            required 
            placeholder="내용을 입력해주세요"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">시간 설정</label>
          <div className="duration-options">
            <div className="duration-option">
              <input
                type="radio"
                id="duration-30"
                value="30"
                checked={selectedDuration === '30'}
                onChange={handleDurationChange}
              />
              <label htmlFor="duration-30">30 분</label>
            </div>
            <div className="duration-option">
              <input
                type="radio"
                id="duration-60"
                value="60"
                checked={selectedDuration === '60'}
                onChange={handleDurationChange}
              />
              <label htmlFor="duration-60">1 시간</label>
            </div>
            <div className="duration-option">
              <input
                type="radio"
                id="duration-360"
                value="360"
                checked={selectedDuration === '360'}
                onChange={handleDurationChange}
              />
              <label htmlFor="duration-360">6 시간</label>
            </div>
            <div className="duration-option">
              <input
                type="radio"
                id="duration-1440"
                value="1440"
                checked={selectedDuration === '1440'}
                onChange={handleDurationChange}
              />
              <label htmlFor="duration-1440">24 시간</label>
            </div>
            <div className="duration-option">
              <input
                type="radio"
                id="duration-custom"
                value="custom"
                checked={selectedDuration === 'custom'}
                onChange={handleDurationChange}
              />
              <label htmlFor="duration-custom">사용자 설정</label>
            </div>
          </div>
        </div>
        {selectedDuration === 'custom' && (
          <div className="form-group">
            <label className="form-label">마감 시간 :</label>
            <input 
              type="datetime-local" 
              value={expirationTime.slice(0, 16)} // datetime-local 형식으로 변환
              onChange={(e) => setExpirationTime(e.target.value)} 
              required 
              className="form-input"
            />
          </div>
        )}
        <div className="form-group">
          <label className="form-label">모집 인원(본인 미포함) :</label>
          <input 
            type="number" 
            value={maxCapacity} 
            onChange={(e) => setMaxCapacity(e.target.value)} 
            min="1" 
            max="10"
            required 
            className="form-input"
          />
        </div>
        <button type="submit" className="form-submit-button">모임 생성하기</button>
      </form>
    </div>
  );
};

export default MeetCreateForm;
