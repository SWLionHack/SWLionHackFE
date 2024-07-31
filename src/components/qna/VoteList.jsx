import React, { useEffect, useState } from 'react';
import VoteItem from './VoteItem';

const VoteList = ({ showActiveVotes }) => {
  const [votes, setVotes] = useState([]);

  useEffect(() => {
    // showActiveVotes에 따라 진행중인 투표 또는 만료된 투표를 가져옵니다.
    const endpoint = showActiveVotes ? '/qna/active-titles' : '/qna/expired';
    fetch(endpoint)
      .then(response => response.json())
      .then(data => setVotes(data));
  }, [showActiveVotes]);

  return (
    <div>
      {votes.map(vote => (
        <VoteItem key={vote.qnaID} vote={vote} />
      ))}
    </div>
  );
};

export default VoteList;
