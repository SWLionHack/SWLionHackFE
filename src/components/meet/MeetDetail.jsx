// MeetDetail.jsx 파일

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../style/meet/MeetDetail.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const MeetDetail = () => {
  const { meetID } = useParams();
  const [meeting, setMeeting] = useState(null);
  const [hasJoined, setHasJoined] = useState(false);

  const fetchMeetingDetail = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`http://${API_BASE_URL}/meet/${meetID}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMeeting(response.data);
      console.log(meeting);
      const userID = localStorage.getItem('userID');
      const userVote = response.data.votes.find(vote => vote.voterID === parseInt(userID));
      setHasJoined(!!userVote);
    } catch (error) {
      console.error('Error fetching meeting detail:', error);
    }
  };

  useEffect(() => {
    fetchMeetingDetail();
  }, [meetID]);

  const handleJoin = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(`http://${API_BASE_URL}/meet/vote/${meetID}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('모임에 참여됬습니다.');
      setHasJoined(true);
      fetchMeetingDetail();
    } catch (error) {
      console.error('Error joining meeting:', error);
      if (error.response && error.response.status === 403) {
        alert('참여할 수 없습니다. 이미 참여했거나, 자신의 글이거나, 최대 인원이 다 찼을 수 있습니다.');
      } else {
        alert('Failed to join the meeting.');
      }
    }
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
      setMeeting((prevMeeting) => ({
        ...prevMeeting,
        remainingTime: getRemainingTime(prevMeeting.expirationTime),
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [meeting]);

  if (!meeting) {
    return <div>Loading...</div>;
  }

  return (
    <div className="meet-detail">
      <div className="meet-detail-header">
        <h2>{meeting.title}</h2>
        <span className="meet-detail-time">{meeting.remainingTime}</span>
      </div>
      <p className="meet-detail-content">{meeting.content}</p>
      <p className="meet-detail-expiration">마감일 : {new Date(meeting.expirationTime).toLocaleString()}</p>
      <p className="meet-detail-capacity">모집 인원 : {meeting.votes.length}/{meeting.maxCapacity}</p>
      <ul className="meet-detail-participants">
        {meeting.votes.map(vote => (
          <li key={vote.voteID} className="meet-detail-participant">{vote.voterID}</li>
        ))}
      </ul>
      {!hasJoined && (
        <button
          className="meet-detail-join-button"
          onClick={handleJoin}
          disabled={hasJoined || meeting.votes.length >= meeting.maxCapacity}
        >
          {meeting.votes.length >= meeting.maxCapacity ? '모집 완료' : '참여하기'}
        </button>
      )}
      {hasJoined && <p className="meet-detail-joined">이미 이 모임에 참여중입니다.</p>}
    </div>
  );
};

export default MeetDetail;
