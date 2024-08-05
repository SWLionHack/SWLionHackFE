import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/survey/survey.css'; // 스타일을 위한 CSS 파일

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const SurveyResult = () => {
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResult = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`http://${API_BASE_URL}/survey/results`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        if (response.data[0].result) {
          setResult(response.data[0].result);
        } else {
          navigate('/survey-form');
        }
      } catch (error) {
        console.error('Error fetching survey result:', error);
        navigate('/survey-form'); // 오류 발생 시 설문조사 페이지로 이동
      }
    };

    fetchResult();
  }, [navigate]);

  const handleRetakeSurvey = () => {
    navigate('/survey-form');
  };

  if (!result) {
    return <div>Loading...</div>;
  }

  return (
    <div className="survey-result-container">
      <h1>검사 결과</h1>
      <p>회원님의 검사 결과는 : <strong>{result}</strong> 입니다.</p>
      <p>{result.recommendation}</p>
      <button className="retake-button" onClick={handleRetakeSurvey}>다시 검사하기</button>
    </div>
  );
};

export default SurveyResult;
