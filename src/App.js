import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/common/NavBar';
import MainPage from './components/MainPage';

// 커뮤니티
import Community from './components/community/Community';
import PostDetail from './components/community/PostDetail';
import CreatePost from './components/community/CreatePost';

// 주변 학원
import NearbyCounseling from './components/NearbyCounseling';

// 로그인
import Login from './components/login/Login';
import Register from './components/login/Register';
import { AuthProvider } from './components/login/AuthContext';
import ProtectedRoute from './components/login/ProtectedRoute';

// 오픈채팅
import OpenChatRooms from './components/open_chat/OpenChatRooms';
import OpenChatRoomDetail from './components/open_chat/OpenChatRoomDetail';

// 오늘의 질문
import TodayQuestion from './components/DailyQuestion/TodayQuestion';
import SharedAnswers from './components/DailyQuestion/SharedAnswers';
import MyAnswers from './components/DailyQuestion/MyAnswers';

import './App.css';
import './index.css';

function App() {
  const [navHeight, setNavHeight] = useState(70); // 초기값

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
      <Router>
        <div className="App">
          <NavBar />
          <main style={{ marginTop: `${navHeight}px` }}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* 보호된 라우트 */}
              {/* 커뮤니티 */}
              <Route path="/community" element={<ProtectedRoute><Community /></ProtectedRoute>} />
              <Route path="/post/:postId" element={<ProtectedRoute><PostDetail /></ProtectedRoute>} />
              <Route path="/create-post" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />

              {/* 오픈 채팅방 */}
              <Route path="/open-chatrooms" element={<ProtectedRoute><OpenChatRooms /></ProtectedRoute>} />
              <Route path="/open-chatroom/:id" element={<ProtectedRoute><OpenChatRoomDetail /></ProtectedRoute>} />

              {/* 지도 */}
              <Route path="/nearby" element={<ProtectedRoute><NearbyCounseling /></ProtectedRoute>} />

              {/* 오늘의 질문 */}
              <Route path="/today-question" element={<ProtectedRoute><TodayQuestion /></ProtectedRoute>} />
              <Route path="/shared-answers" element={<ProtectedRoute><SharedAnswers /></ProtectedRoute>} />
              <Route path="/my-answers" element={<ProtectedRoute><MyAnswers /></ProtectedRoute>} />

              <Route path="/" element={<MainPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
