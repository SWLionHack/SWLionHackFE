import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import SharedAnswers from './SharedAnswers';
import MyAnswers from './MyAnswers';
import '../style/daily_question/TodayQuestion.css';
import '../style/daily_question/SharedAnswers.css';
import '../style/daily_question/MyAnswers.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'localhost:8181';
const socket = io(`http://${API_BASE_URL}`);

const TodayQuestion = () => {
  const [question, setQuestion] = useState({});
  const [answer, setAnswer] = useState('');
  const [hasAnswered, setHasAnswered] = useState(false);
  const [sharedAnswers, setSharedAnswers] = useState([]);
  const [myAnswers, setMyAnswers] = useState([]);
  const [showMyAnswers, setShowMyAnswers] = useState(false);
  const [isShared, setIsShared] = useState(true); // 공유 여부 상태 기본값을 true로 변경
  const [remainingTime, setRemainingTime] = useState('');
  // const [isQuestionReady, setIsQuestionReady] = useState(false);

  useEffect(() => {
    const fetchQuestionAndAnswer = async () => {
      const now = new Date();
      const hours = now.getHours();

      if (hours >= 8) {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`http://${API_BASE_URL}/daily-questions/my-answer`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setQuestion(response.data.question);
          if (response.data.answer) {
            setHasAnswered(true);
            setAnswer(response.data.answer);
            await fetchSharedAnswers();
          }
          setIsQuestionReady(true);
        } catch (error) {
          console.error('Error fetching today\'s question and answer:', error);
        }
      }
    };

    fetchQuestionAndAnswer();

    const updateRemainingTime = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);
      const diff = midnight - now;

      const hours = Math.floor(diff / 1000 / 60 / 60);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setRemainingTime(`${hours}시간 ${minutes}분 ${seconds}초`);
    };

    const timer = setInterval(updateRemainingTime, 1000);

    socket.on('receiveSharedAnswer', (newAnswer) => {
      setSharedAnswers(prevAnswers => [...prevAnswers, newAnswer]); // 새로운 답변을 리스트의 맨 아래에 추가
    });

    socket.on('updateLikeCount', (updatedAnswer) => {
      setSharedAnswers(prevAnswers =>
        prevAnswers.map(answer =>
          answer.id === updatedAnswer.id ? { ...answer, likes: updatedAnswer.likes } : answer
        )
      );
    });

    return () => {
      clearInterval(timer);
      socket.off('receiveSharedAnswer');
      socket.off('updateLikeCount');
    };
  }, []);

  const fetchSharedAnswers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://${API_BASE_URL}/daily-questions/shared`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setSharedAnswers(response.data);
    } catch (error) {
      console.error('Error fetching shared answers:', error);
    }
  };

  const fetchMyAnswers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://${API_BASE_URL}/daily-questions/all`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMyAnswers(response.data);
    } catch (error) {
      console.error('Error fetching my answers:', error);
    }
  };

  const handleAnswerSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`http://${API_BASE_URL}/daily-questions`, {
        content: answer,
        questionId: question.id,
        isShared: isShared // 공유 여부 추가
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setHasAnswered(true);
      if (response.data.isShared) {
        socket.emit('receiveSharedAnswer', response.data);
      }
      await fetchSharedAnswers();
    } catch (error) {
      console.error('Error submitting answer:', error);
    }
  };

  const handleLike = async (questionId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`http://${API_BASE_URL}/daily-questions/${questionId}/like`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setSharedAnswers(sharedAnswers.map(answer => 
        answer.id === questionId ? { ...answer, likes: response.data.likes } : answer
      ));
      socket.emit('updateLikeCount', response.data); // 좋아요 수 업데이트 이벤트를 서버로 전송
    } catch (error) {
      console.error('Error liking the answer:', error);
    }
  };

  const toggleMyAnswers = async () => {
    setShowMyAnswers(!showMyAnswers);
    if (!showMyAnswers) {
      await fetchMyAnswers();
    }
  };

  const now = new Date();
  const hours = now.getHours();
  

  if (hours < 8) {
    const remainingUntilEight = new Date();
    remainingUntilEight.setHours(8, 0, 0, 0);
    const diff = remainingUntilEight - now;

    const hoursLeft = Math.floor(diff / 1000 / 60 / 60);
    const minutesLeft = Math.floor((diff / 1000 / 60) % 60);
    const secondsLeft = Math.floor((diff / 1000) % 60);

    return (
      <div className="today-question">
      <h2 className="today-question__header">오늘의 질문을 준비중입니다.</h2>
      <p className="today-question__timer">질문까지 남은 시간: {hoursLeft}시간 {minutesLeft}분 {secondsLeft}초</p>
        <div className="today-question__animation">
       
        <img src="./loading_img.png" alt="Sleeping dog" className="sleeping-image" />
        <div className="z z1">Z</div>
        <div className="z z2">Z</div>
        <div className="z z3">Z</div>
       
        </div>
      </div>  

    );
  }

  return (
    <div className="today-question">
      <div className="today-question__timer">
        오늘의 질문 남은 시간: {remainingTime}
      </div>
      <h2 className="today-question__header">오늘의 질문</h2>
      <p className="today-question__text">{question.question}</p>
      {hasAnswered ? (
        <>
          <p className="today-question__answer"><strong>오늘의 답변:</strong> {answer}</p>
          <button className="today-question__toggle-btn" onClick={toggleMyAnswers}>
            {showMyAnswers ? '실시간 답변 보기' : '내 답변 보기'}
          </button>
          <hr className="today-question__divider" />
          {showMyAnswers ? <MyAnswers answers={myAnswers} /> : 
            <SharedAnswers 
              answers={sharedAnswers} 
              onLike={handleLike} 
            />}
        </>
      ) : (
        <>
          <textarea
            className="today-question__textarea"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            rows="4"
            cols="50"
          />
          <br />
          <label>
            <input 
              className="today-question__checkbox"
              type="checkbox" 
              checked={isShared}
              onChange={(e) => setIsShared(e.target.checked)} 
            />
            공유하기
          </label>
          <br />
          <button className="today-question__submit-btn" onClick={handleAnswerSubmit}>답변 제출</button>
        </>
      )}
    </div>
  );
};

export default TodayQuestion;
