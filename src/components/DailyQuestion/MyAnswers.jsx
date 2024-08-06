import React from 'react';
import '../style/daily_question/MyAnswers.css';

const MyAnswers = ({ answers }) => {
  return (
    <div className="my-answers">
      {answers.slice().reverse().map(answer => (  // 최신 답변이 위로 오도록 역순으로 정렬
        <div className="my-answers__item" key={answer.id}>
          
          {answer.imagePath && (
            <div className="my-answers__image-container">
              <img 
                src={`http://${process.env.REACT_APP_API_BASE_URL}/${answer.imagePath}`} 
                alt="Answer" 
                className="my-answers__image"
              />
            </div>
          )}
          <div className="my-answers__text-container">
            <p className="my-answers__title">{answer.title}</p>
            <p className="my-answers__content">{answer.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyAnswers;
