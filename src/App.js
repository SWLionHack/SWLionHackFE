import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/common/NavBar';
import MainPage from './components/MainPage';

// 커뮤니티
import Community from './components/community/Community';
import PostDetail from './components/community/PostDetail';
import CreatePost from './components/community/CreatePost';
import CommunityList from './components/community/CommunityList'

// 지도
import NearbyPlace from './components/map/NearbyPlace';
import ReviewPage from './components/map/ReviewPage';
import { SearchProvider } from './components/map/SearchContext';

// 로그인
import Login from './components/login/Login';
import Register from './components/login/Register';
import { AuthProvider } from './components/login/AuthContext';
import ProtectedRoute from './components/login/ProtectedRoute';

// 오픈채팅
import OpenChatRooms from './components/open_chat/OpenChatRooms';
import OpenChatRoomDetail from './components/open_chat/OpenChatRoomDetail';

// 투표
import Vote from './components/qna/Vote';
import NewVoteForm from './components/qna/VoteForm';
import VoteDetail from './components/qna/VoteDetail';

// 오늘의 질문
import TodayQuestion from './components/DailyQuestion/TodayQuestion';
import SharedAnswers from './components/DailyQuestion/SharedAnswers';
import MyAnswers from './components/DailyQuestion/MyAnswers';

// 챗봇
import ChatbotPage from './components/chatbot/ChatbotPage'
import ChatbotIcon from './components/chatbot/ChatbotIcon'

// 일기
import DiaryList from './components/diary/DiaryList'
import CreateDiary from './components/diary/CreateDiary'
import DiaryDetail from './components/diary/DiaryDetail'

import SurveyForm from './components/survey/SurveyForm'
import Survey from './components/survey/Survey'

import { LoadScript } from '@react-google-maps/api';
import './App.css';
import './index.css';

const libraries = ['places'];
const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

function App() {
  const [navHeight, setNavHeight] = useState(70); // 초기값
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const updateNavHeight = () => {
      const nav = document.querySelector('nav');
      if (nav) {
        setNavHeight(nav.offsetHeight);
      }
    };

    updateNavHeight();
    window.addEventListener('resize', updateNavHeight);

    return () => {
      window.removeEventListener('resize', updateNavHeight);
    };
  }, []);

  return (
    <AuthProvider>
      <SearchProvider>
        <LoadScript
          googleMapsApiKey={googleMapsApiKey}
          libraries={libraries}
          onLoad={() => setIsLoaded(true)}
        >
          {isLoaded ? (
            <Router>
              <div className="App">
                <NavBar />
                <main style={{ marginTop: `${navHeight}px` }}>
                  <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* 보호된 라우트 */}
                    {/* 커뮤니티 */}
                    <Route path="/communityList" element={<ProtectedRoute><CommunityList /></ProtectedRoute>} />
                    <Route path="/community/:category" element={<ProtectedRoute><Community /></ProtectedRoute>} />
                    <Route path="/post/:postId" element={<ProtectedRoute><PostDetail /></ProtectedRoute>} />
                    <Route path="/community/:category/create-post" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
      
                    {/* 오픈 채팅방 */}
                    <Route path="/open-chatrooms" element={<ProtectedRoute><OpenChatRooms /></ProtectedRoute>} />
                    <Route path="/open-chatroom/:id" element={<ProtectedRoute><OpenChatRoomDetail /></ProtectedRoute>} />

                    {/* 투표 */}
                    <Route path="/vote" element={<ProtectedRoute><Vote /></ProtectedRoute>} />
                    <Route path="/vote/new" element={<ProtectedRoute><NewVoteForm /></ProtectedRoute>} />
                    <Route path="/vote/:voteID" element={<ProtectedRoute><VoteDetail /></ProtectedRoute>} />

                    {/* 지도 */}
                    <Route path="/nearby" element={<ProtectedRoute><NearbyPlace /></ProtectedRoute>} />
                    <Route path="/reviews/:academyName" element={<ProtectedRoute><ReviewPage /></ProtectedRoute>} />

                    {/* 오늘의 질문 */}
                    <Route path="/today-question" element={<ProtectedRoute><TodayQuestion /></ProtectedRoute>} />
                    <Route path="/shared-answers" element={<ProtectedRoute><SharedAnswers /></ProtectedRoute>} />
                    <Route path="/my-answers" element={<ProtectedRoute><MyAnswers /></ProtectedRoute>} />

                    {/* 챗봇 */}
                    <Route path="/chatbot" element={<ProtectedRoute><ChatbotPage /></ProtectedRoute>} /> 

                    {/* 다이어리 */}
                    <Route path="/diary" element={<ProtectedRoute><DiaryList /></ProtectedRoute>} />
                    <Route path="/diary/new" element={<ProtectedRoute><CreateDiary /></ProtectedRoute>} />
                    <Route path="/diary/:id" element={<ProtectedRoute><DiaryDetail /></ProtectedRoute>} />

                    {/* 설문조사 */}
                    <Route path="/survey" element={<ProtectedRoute><Survey /></ProtectedRoute>} />
                    <Route path="/survey-form" element={<ProtectedRoute><SurveyForm /></ProtectedRoute>} />

                    <Route path="/" element={<MainPage />} />
                  </Routes>
                </main>
                <ChatbotIcon /> {/* 추가된 챗봇 아이콘 */}
              </div>
            </Router>
          ) : (
            <div>Loading...</div> // 로딩 상태일 때 표시할 컴포넌트
          )}
        </LoadScript>
      </SearchProvider>
    </AuthProvider>
  );
}

export default App;
