import React from 'react';
import '../style/daily_question/SharedAnswers.css';

const SharedAnswers = ({ answers, onLike }) => {
  return (
    <div className="shared-answers">
      <h3 className="shared-answers__header">실시간 답변</h3>
      <div className="shared-answers__container">
        {answers.map(answer => (
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
    </div>
  );
};

export default SharedAnswers;
