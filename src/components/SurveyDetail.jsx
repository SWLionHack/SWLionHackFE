import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function SurveyDetail() {
  const { surveyId } = useParams();
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
      questionId,
      answer: answers[questionId]
    }));

    axios.post(`http://${API_BASE_URL}/survey/${surveyId}/submit`, formattedAnswers)
      .then(() => {
        alert('설문이 제출되었습니다.');
      })
      .catch(error => {
        console.error('Error submitting survey:', error);
      });
  };

  return (
    <div>
      <h2>설문조사</h2>
      <ul>
        {questions.map(question => (
          <li key={question.id}>
            <p>{question.text}</p> {/* 여기서 content를 text로 변경 */}
            <input
              type="text"
              value={answers[question.id] || ''}
              onChange={e => handleAnswerChange(question.id, e.target.value)}
            />
          </li>
        ))}
      </ul>
      <button onClick={handleSubmit}>제출</button>
    </div>
  );
}

export default SurveyDetail;
