import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../style/qna/Vote.css'; 

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'localhost:8181';

const Vote = () => {
  const [activeVotes, setActiveVotes] = useState([]);
  const [expiredVotes, setExpiredVotes] = useState([]);
  const [showActiveVotes, setShowActiveVotes] = useState(true);
  const [activePage, setActivePage] = useState(1);
  const [expiredPage, setExpiredPage] = useState(1);
  const [activeTotalPages, setActiveTotalPages] = useState(0);
  const [expiredTotalPages, setExpiredTotalPages] = useState(0);
  const [sortBy, setSortBy] = useState('expiration'); // 기본 정렬 기준을 'expiration'으로 설정

  useEffect(() => {
    const fetchVotes = async () => {
      try {
        const token = localStorage.getItem('token');

        // Fetch active votes
        const activeResponse = await axios.get(`http://${API_BASE_URL}/qna/active-titles?page=${activePage}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        setActiveVotes(activeResponse.data.data);
        setActiveTotalPages(activeResponse.data.totalPages);

        // Fetch expired votes
        const expiredResponse = await axios.get(`http://${API_BASE_URL}/qna/expired?page=${expiredPage}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        setExpiredVotes(expiredResponse.data.data);
        setExpiredTotalPages(expiredResponse.data.totalPages);

      } catch (error) {
        console.error('Error fetching votes:', error);
      }
    };

    fetchVotes();
  }, [activePage, expiredPage]); // activePage와 expiredPage가 변경될 때마다 데이터를 다시 로드

  useEffect(() => {
    const sortVotes = (votes) => {
      return votes.slice().sort((a, b) => {
        if (sortBy === 'expiration') {
          return new Date(a.expirationTime) - new Date(b.expirationTime);
        } else if (sortBy === 'creation') {
          return new Date(b.createdAt) - new Date(a.createdAt);
        }
        return 0;
      });
    };

    setActiveVotes(sortVotes(activeVotes));
    setExpiredVotes(sortVotes(expiredVotes));
  }, [sortBy]); // 여기서 activeVotes와 expiredVotes를 의존성에서 제거

  const calculateRemainingTime = (expirationTime) => {
    const now = new Date();
    const timeRemaining = new Date(expirationTime) - now;

    const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    let remainingTimeString = '';
    if (hours > 0) {
      remainingTimeString += `${hours}h `;
    }
    if (minutes > 0 || hours > 0) {
      remainingTimeString += `${minutes}m `;
    }
    remainingTimeString += `${seconds}s`;

    return remainingTimeString;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveVotes((prevVotes) => [...prevVotes]); // Re-trigger rendering every second
    }, 1000);

    return () => clearInterval(interval); // Clear the interval on component unmount
  }, []);

  return (
    <div className="vote-container">
      {/* <h2 className="vote-header">Vote System</h2> */}
      <div className="vote-controls">
        <div className="vote-toggle-buttons">
          <button 
            className={`vote-toggle-button ${showActiveVotes ? 'active' : ''}`}
            onClick={() => setShowActiveVotes(true)}
          >
            진행중
          </button>
          <button 
            className={`vote-toggle-button ${!showActiveVotes ? 'active' : ''}`}
            onClick={() => setShowActiveVotes(false)}
          >
            만료됨
          </button>
        </div>
        <div className="vote-sort-buttons">
          <button 
            className={`sort-button ${sortBy === 'expiration' ? 'active' : ''}`}
            onClick={() => setSortBy('expiration')}
          >
            마감순
          </button>
          <button 
            className={`sort-button ${sortBy === 'creation' ? 'active' : ''}`}
            onClick={() => setSortBy('creation')}
          >
            최신순
          </button>
        </div>
      </div>
      <div className="vote-list">
        {showActiveVotes ? (
          activeVotes.map(vote => (
            <Link to={`/vote/${vote.qnaID}`} key={vote.qnaID} className="vote-item-link">
              <div className="vote-item">
                <div className="vote-time-remaining">
                  {calculateRemainingTime(vote.expirationTime)}
                </div>
                <h3 className="vote-item-title">{vote.title}</h3>
              </div>
            </Link>
          ))
        ) : (
          expiredVotes.map(vote => (
            <div className="vote-item" key={vote.qnaID}>
              <h3 className="vote-item-title">{vote.title}</h3>
              <p className="vote-expired">만료됨</p>
            </div>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      <div className="pagination-controls">
        {showActiveVotes ? (
          activeTotalPages > 1 && (
            <>
              <button 
                className="pagination-button" 
                onClick={() => setActivePage(prevPage => Math.max(prevPage - 1, 1))}
                disabled={activePage === 1}
              >
                Previous
              </button>
              <span className="pagination-info">Page {activePage} of {activeTotalPages}</span>
              <button 
                className="pagination-button" 
                onClick={() => setActivePage(prevPage => Math.min(prevPage + 1, activeTotalPages))}
                disabled={activePage === activeTotalPages}
              >
                Next
              </button>
            </>
          )
        ) : (
          expiredTotalPages > 1 && (
            <>
              <button 
                className="pagination-button" 
                onClick={() => setExpiredPage(prevPage => Math.max(prevPage - 1, 1))}
                disabled={expiredPage === 1}
              >
                Previous
              </button>
              <span className="pagination-info">Page {expiredPage} of {expiredTotalPages}</span>
              <button 
                className="pagination-button" 
                onClick={() => setExpiredPage(prevPage => Math.min(prevPage + 1, expiredTotalPages))}
                disabled={expiredPage === expiredTotalPages}
              >
                Next
              </button>
            </>
          )
        )}
      </div>

      <Link to="/vote/new" className="new-vote-button">투표 생성하기</Link>
    </div>
  );
};

export default Vote;
