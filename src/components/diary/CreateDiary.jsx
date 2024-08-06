import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/diary/DiaryStyles.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const CreateDiary = () => {
  const [step, setStep] = useState(1); // 현재 단계 상태
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [score, setScore] = useState('50');
  const navigate = useNavigate();

  const handleNext = () => {
    if (step === 1 && (title === '' || content === '')) {
      alert('Please fill in the title and content.');
      return;
    }
    if (step === 2 && score === '') {
      alert('Please fill in the score.');
      return;
    }
    
    if (step === 1) {
      setStep(2); // 다음 단계로 이동
    } else if (step === 2) {
      handleSubmit(); // 제출
    }
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.post(`http://${API_BASE_URL}/diary/new`, 
      { title, content, score }, 
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      navigate('/diary');
    } catch (error) {
      console.error('Error creating diary:', error);
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setScore(value);
    console.log(value);
  };

  return (
    <div className="container">
      {step === 1 && (
        <>
          <h1 className="diary-title">일기 작성하기</h1>
          <form>
            <div className="form-group">
              <input 
                type="text" 
                className="form-input"
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                required
                placeholder="제목을 입력해주세요" 
              />
            </div>
            <div className="form-group">
              <textarea 
                className="form-textarea"
                value={content} 
                onChange={(e) => setContent(e.target.value)} 
                required 
                placeholder="오늘 어떤 일이 있었나요?"
              />
            </div>
            <button className="form-button" type="button" onClick={handleNext}>다음</button>
          </form>
        </>
      )}
      {step === 2 && (
        <>
          <h1 className="diary-title">오늘은 몇 점짜리 하루였나요?</h1>
          <form>
            <div className="form-group">
              <div className="picker-container">
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={score} 
                  onChange={handleChange} 
                  className="picker-input"
                />
                <h2 className="picker-value">{score} 점</h2>
              </div>
            </div>
            <button className="form-button" type="button" onClick={handleNext}>저장하기</button>
          </form>
        </>
      )}
    </div>
  );
};

export default CreateDiary;
