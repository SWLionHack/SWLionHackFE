import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function Survey() {
  const [surveys, setSurveys] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://${API_BASE_URL}/surveys`)
      .then(response => {
        setSurveys(response.data);
      })
      .catch(error => {
        console.error('Error fetching surveys:', error);
      });
  }, []);

  const goToSurvey = (surveyId) => {
    navigate(`/survey/${surveyId}`);
  };

  return (
    <div>
      <h2>설문조사 목록</h2>
      <ul>
        {surveys.map(survey => (
          <li key={survey.id} onClick={() => goToSurvey(survey.id)}>
            {survey.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Survey;