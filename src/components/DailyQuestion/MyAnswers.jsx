import React from 'react';
import '../style/daily_question/SharedAnswers.css';

const SharedAnswers = ({ answers }) => {
  return (
    <div className="shared-answers">
      {answers.slice().reverse().map(answer => (  // 최신 답변이 위로 오도록 역순으로 정렬
        <div className="shared-answers__item" key={answer.id}>
          <p className="shared-answers__content">{answer.title} :   {answer.content}</p>
        </div>
      ))}
    </div>
  );
};

export default SharedAnswers;
