import React, { useState } from 'react';
import axios from 'axios';
import '../style/qna/VoteForm.css'; // 스타일 파일을 연결합니다.

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'localhost:8181';

const NewVoteForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('30'); // 기본값 30분
  const [customHours, setCustomHours] = useState(0);
  const [customMinutes, setCustomMinutes] = useState(30);

  const handleDurationChange = (event) => {
    setSelectedDuration(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem('token');
      let duration;

      if (selectedDuration === 'custom') {
        duration = parseInt(customHours) * 60 + parseInt(customMinutes);
      } else {
        duration = parseInt(selectedDuration);
      }

      const expirationTime = new Date(new Date().getTime() + duration * 60 * 1000).toISOString();

      const voteData = {
        title,
        content,
        expirationTime
      };

      await axios.post(`http://${API_BASE_URL}/qna/create`, voteData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('투표가 생성되었습니다!');
      window.location.href = '/vote';
    } catch (error) {
      console.error('Error creating vote:', error);
    }
  };

  return (
    <div className="vote-form-container">
      <h2 className="vote-form-header">새 투표 만들기</h2>
      <form className="vote-form" onSubmit={handleSubmit}>
        <div className="form-group">
          {/* <label htmlFor="title">Title</label> */}
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="제목을 입력해주세요"
          />
        </div>

        <div className="form-group">
          {/* <label htmlFor="content">Content</label> */}
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            placeholder="내용을 입력해주세요"
          ></textarea>
        </div>

        <div className="form-group">
          <label>시간 설정</label>
          <div className="duration-options">
            <input
              type="radio"
              id="duration-30"
              value="30"
              checked={selectedDuration === '30'}
              onChange={handleDurationChange}
            />
            <label htmlFor="duration-30">30 분</label>

            <input
              type="radio"
              id="duration-60"
              value="60"
              checked={selectedDuration === '60'}
              onChange={handleDurationChange}
            />
            <label htmlFor="duration-60">1 시간</label>

            <input
              type="radio"
              id="duration-360"
              value="360"
              checked={selectedDuration === '360'}
              onChange={handleDurationChange}
            />
            <label htmlFor="duration-360">6 시간</label>

            <input
              type="radio"
              id="duration-1440"
              value="1440"
              checked={selectedDuration === '1440'}
              onChange={handleDurationChange}
            />
            <label htmlFor="duration-1440">24 시간</label>

            <input
              type="radio"
              id="duration-custom"
              value="custom"
              checked={selectedDuration === 'custom'}
              onChange={handleDurationChange}
            />
            <label htmlFor="duration-custom">사용자 설정</label>
          </div>
          {selectedDuration === 'custom' && (
            <div className="custom-time">
              <input
                type="number"
                min="0"
                value={customHours}
                onChange={(e) => setCustomHours(e.target.value)}
                placeholder="Hours"
              />
              <input
                type="number"
                min="0"
                max="59"
                value={customMinutes}
                onChange={(e) => setCustomMinutes(e.target.value)}
                placeholder="Minutes"
              />
            </div>
          )}
        </div>

        <button type="submit" className="submit-button">투표 생성하기</button>
      </form>
    </div>
  );
};

export default NewVoteForm;
