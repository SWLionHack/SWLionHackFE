import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function SurveyDetail() {
  const { surveyId } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    axios.get(`http://${API_BASE_URL}/survey/${surveyId}`)
      .then(response => {
        setQuestions(response.data);
      })
      .catch(error => {
        console.error('Error fetching survey questions:', error);
      });
  }, [surveyId]);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: answer
    }));
  };

  const handleSubmit = () => {
    const formattedAnswers = Object.keys(answers).map(questionId => ({
      questionId: parseInt(questionId, 10), // questionId를 정수로 변환
      answer: answers[questionId]
    }));

    axios.post(`http://${API_BASE_URL}/survey/${surveyId}/submit`, formattedAnswers)
      .then(() => {
        alert('설문이 제출되었습니다.');
        navigate('/survey'); // 설문 제출 후 설문조사 목록 페이지로 이동
      })
      .catch(error => {
        console.error('Error submitting survey:', error);
      });
  };

  const options = ['전혀 그렇지 않다', '그렇지 않다', '보통이다', '그렇다', '매우 그렇다'];

  return (
    <div>
      <h2>설문조사</h2>
      <ul>
        {questions.map(question => (
          <li key={question.id}>
            <p>{question.text}</p>
            {options.map(option => (
              <label key={option}>
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option}
                  checked={answers[question.id] === option}
                  onChange={e => handleAnswerChange(question.id, e.target.value)}
                />
                {option}
              </label>
            ))}
          </li>
        ))}
      </ul>
      <button onClick={handleSubmit}>제출</button>
    </div>
  );
}

export default SurveyDetail;
