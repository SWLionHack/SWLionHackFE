import React from 'react';
import { Link } from 'react-router-dom';

const VoteItem = ({ vote }) => {
  const timeRemaining = new Date(vote.expirationTime) - new Date();

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
      <Link to={`/vote/${vote.qnaID}`}>
        <h3>{vote.title}</h3>
        <p>{`Time Remaining: ${Math.floor(timeRemaining / 1000 / 60)} minutes`}</p>
      </Link>
    </div>
  );
};

export default VoteItem;
