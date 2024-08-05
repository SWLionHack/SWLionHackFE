import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/survey/surveyForm.css'; // 스타일을 위한 CSS 파일

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const SurveyForm = () => {
  const questions = [
    { id: 1, text: '나는 사물의 재미있는 면을 보고 웃을 수 있었다.', options: ['예전과 똑같았다.', '예전보다 조금 줄었다.', '확실히 예전보다 많이 줄었다.', '전혀 그렇지 않았다.'] },
    { id: 2, text: '나는 어떤 일들을 기쁜 마음으로 기다렸다.', options: ['예전과 똑같았다.', '예전보다 조금 줄었다.', '확실히 예전보다 많이 줄었다.', '거의 그렇지 않았다.'] },
    { id: 3, text: '일이 잘못될 때면 공연히 자신을 탓하였다.', options: ['대부분 그랬다.', '가끔 그랬다.', '자주 그렇지 않았다.', '전혀 그렇지 않았다.'] },
    { id: 4, text: '나는 특별한 이유 없이 불안하거나 걱정스러웠다.', options: ['전혀 그렇지 않았다.', '거의 그렇지 않았다.', '가끔 그랬다.', '자주 그랬다.'] },
    { id: 5, text: '특별한 이유 없이 무섭거나 안절부절 못하였다.', options: ['꽤 자주 그랬다.', '가끔 그랬다.', '거의 그렇지 않았다.', '전혀 그렇지 않았다.'] },
    { id: 6, text: '요즘 들어 많은 일들이 힘겹게 느껴졌다.', options: ['대부분 그러하였고, 일을 전혀 처리할 수 없었다.', '가끔 그러하였고, 평소처럼 일을 처리하기가 힘들었다.', '그렇지 않았고, 대개는 일을 잘 처리하였다.', '그렇지 않았고, 평소와 다름없이 일을 잘 처리하였다.'] },
    { id: 7, text: '너무 불행하다고 느껴서 잠을 잘 잘 수가 없었다.', options: ['대부분 그랬다.', '가끔 그랬다.', '자주 그렇지 않았다.', '전혀 그렇지 않았다.'] },
    { id: 8, text: '슬프거나 비참하다고 느꼈다.', options: ['대부분 그랬다.', '가끔 그랬다.', '자주 그렇지 않았다.', '전혀 그렇지 않았다.'] },
    { id: 9, text: '불행하다고 느껴서 울었다.', options: ['대부분 그랬다.', '자주 그랬다.', '가끔 그랬다.', '전혀 그렇지 않았다.'] },
    { id: 10, text: '자해하고 싶은 마음이 생긴 적이 있다.', options: ['자주 그랬다.', '가끔 그랬다.', '거의 그렇지 않았다.', '전혀 그렇지 않았다.'] },
  ];

  const [answers, setAnswers] = useState(Array(questions.length).fill(0));
  const navigate = useNavigate();

  const handleOptionChange = (questionId, optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[questionId - 1] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post(`http://${API_BASE_URL}/survey/submit`, 
        { answers },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      navigate('/survey'); // 제출 후 결과 페이지로 이동
    } catch (error) {
      console.error('Error submitting survey:', error);
      alert('Failed to submit survey.');
    }
  };

  return (
    <div className="survey-form-container">
      <h1>한국판 에딘버러 산후우울 척도</h1>
      <form onSubmit={handleSubmit}>
        {questions.map((question, index) => (
          <div key={question.id} className="survey-question">
            <p>{index + 1}. {question.text}</p>
            {question.options.map((option, optionIndex) => (
              <label key={optionIndex}>
                <input 
                  type="radio" 
                  name={`question-${question.id}`} 
                  value={optionIndex} 
                  checked={answers[question.id - 1] === optionIndex}
                  onChange={() => handleOptionChange(question.id, optionIndex)}
                />
                {option} ({optionIndex}점)
              </label>
            ))}
          </div>
        ))}
        <button type="submit" className="submit-button">Submit Survey</button>
      </form>
    </div>
  );
};

export default SurveyForm;
