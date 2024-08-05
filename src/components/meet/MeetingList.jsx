import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/meet/MeetingList.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const MeetList = () => {
  const [meetings, setMeetings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showExpired, setShowExpired] = useState(false); // 만료된 모임을 보여줄지 여부
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMeetings = async () => {
      const token = localStorage.getItem('token');
      const endpoint = showExpired ? 'expired' : 'active-titles';
      try {
        const response = await axios.get(`http://${API_BASE_URL}/meet/${endpoint}?page=${currentPage}&size=10`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setMeetings(response.data.data);
        setCurrentPage(response.data.currentPage);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error fetching meetings:', error);
      }
    };

    fetchMeetings();
  }, [currentPage, showExpired]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleCreateNewMeeting = () => {
    navigate('/meet-vote/create');
  };

  const handleMeetingClick = (meetID) => {
    navigate(`/meet-vote/${meetID}`);
  };

  const handleToggleShowExpired = () => {
    setShowExpired(!showExpired);
    setCurrentPage(1); // 페이지를 초기화합니다.
  };

  const getRemainingTime = (expirationTime) => {
    const currentTime = new Date();
    const expiration = new Date(expirationTime);
    const diffTime = Math.max(expiration - currentTime, 0);
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
    const diffSeconds = Math.floor((diffTime % (1000 * 60)) / 1000);

    let remainingTime = "";
    if (diffHours > 0) remainingTime += `${diffHours}시간 `;
    if (diffMinutes > 0 || (diffHours > 0 && diffSeconds > 0)) remainingTime += `${diffMinutes}분 `;
    if (diffSeconds > 0) remainingTime += `${diffSeconds}초 남음`;

    return remainingTime.trim();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setMeetings((prevMeetings) =>
        prevMeetings.map((meet) => ({
          ...meet,
          remainingTime: getRemainingTime(meet.expirationTime),
        }))
      );
    }, 1000); // 1초마다 업데이트

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 클리어
  }, [meetings]);

  return (
    <div className="meeting-list">
      <h2>{showExpired ? '만료된 모임' : '참여 가능한 모임'}</h2>
      <div className="meeting-actions">
        <button onClick={handleCreateNewMeeting}>새 모임 만들기</button>
        <button onClick={handleToggleShowExpired}>
          {showExpired ? '활성 모임 보기' : '만료된 모임 보기'}
        </button>
      </div>
      <ul>
        {meetings.map(meet => (
          <li key={meet.meetID} onClick={() => handleMeetingClick(meet.meetID)} className="meeting-item">
            <div className="meeting-header">
              <h3>{meet.title}</h3>
              {!showExpired && <span>{meet.remainingTime}</span>} {/* 활성 모임에서만 남은 시간 표시 */}
            </div>
            <p>작성자: {meet.author}</p> {/* 작성자 이름을 표시 */}
            <p>{meet.content}</p>
            <p>마감일 : {new Date(meet.expirationTime).toLocaleString()}</p>
            <p>모집 인원 : {meet.currentVotes}/{meet.maxCapacity}</p>
          </li>
        ))}
      </ul>
      <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default MeetList;
