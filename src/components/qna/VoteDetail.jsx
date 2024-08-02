import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../style/qna/VoteDetail.css'; 

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'localhost:8181';

const VoteDetail = () => {
  const { voteID } = useParams();
  const navigate = useNavigate();
  const [vote, setVote] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [voteCount, setVoteCount] = useState(0);

  useEffect(() => {
    const fetchVoteDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://${API_BASE_URL}/qna/${voteID}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setVote(response.data);
        setVoteCount(response.data.votes ? response.data.votes.length : 0);
        setHasVoted(response.data.votes.some(vote => vote.voterID === parseInt(localStorage.getItem('userID'))));
      } catch (error) {
        console.error('Error fetching vote details:', error);
      }
    };

    fetchVoteDetails();
  }, [voteID]);

  const handleVote = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://${API_BASE_URL}/qna/vote/${voteID}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setHasVoted(!hasVoted);
      setVoteCount(hasVoted ? voteCount - 1 : voteCount + 1);
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('투표를 정말 삭제하시겠습니까?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://${API_BASE_URL}/qna/${voteID}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        alert('투표가 삭제되었습니다!');
        navigate('/vote'); // 삭제 후 투표 목록 페이지로 리다이렉트
      } catch (error) {
        console.error('Error deleting vote:', error);
        alert('Failed to delete the vote.');
      }
    }
  };

  if (!vote) return <div>Loading...</div>;

  return (
    <div className="vote-detail-container">
      {/* <button className="delete-button" onClick={handleDelete}>×</button> */}
      <h2 className="vote-detail-title">{vote.title}</h2>
      <p className="vote-detail-content">{vote.content}</p>
      <p className="vote-count">동의수 : {voteCount}</p>
      <div className="vote-options">
        <img 
          src={hasVoted ? "/like_blue.png" : "/like_white.png"} 
          alt="Thumb Up" 
          className={`thumb-icon ${hasVoted ? 'voted' : ''}`} 
          onClick={handleVote}
        />
      </div>
      <p className="vote-detail-date">
        생성일 : {new Date(vote.createdAt).toLocaleDateString()} {new Date(vote.createdAt).toLocaleTimeString()}
      </p>
    </div>
  );
};

export default VoteDetail;
