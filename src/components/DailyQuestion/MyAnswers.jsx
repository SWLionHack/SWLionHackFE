import React from 'react';
import '../style/daily_question/SharedAnswers.css';

const SharedAnswers = ({ answers, onLike }) => {
  return (
    <div className="shared-answers">
      {answers.slice().reverse().map(answer => (  // 최신 답변이 위로 오도록 역순으로 정렬
        <div className="shared-answers__item" key={answer.id}>
          <p className="shared-answers__content">{answer.content}</p>
          <div className="shared-answers__likes">
            <button className="shared-answers__like-button" onClick={() => onLike(answer.id)}>
              👍 {answer.likes}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SharedAnswers;
