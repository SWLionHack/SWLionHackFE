import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import NavBar from './components/common/NavBar';
import Diary from './components/Diary';
import Survey from './components/Survey';
import Community from './components/Community';
import QnA from './components/QnA';
// import Counseling from './components/Counseling';
import NearbyCounseling from './components/NearbyCounseling';

import Login from './components/login/Login';
import Register from './components/login/Register';
import { AuthProvider, AuthContext } from './components/login/AuthContext';
import ProtectedRoute from './components/login/ProtectedRoute';
import './App.css';

const AppRoutes = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate, isAuthenticated]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="*"
        element={
          <>
            <Header />
            <NavBar />
            <main>
              <Routes>
                <Route path="/diary" element={<ProtectedRoute><Diary /></ProtectedRoute>} />
                <Route path="/survey" element={<ProtectedRoute><Survey /></ProtectedRoute>} />
                <Route path="/community" element={<ProtectedRoute><Community /></ProtectedRoute>} />
                <Route path="/qna" element={<ProtectedRoute><QnA /></ProtectedRoute>} />
                {/* <Route path="/counseling" element={<ProtectedRoute><Counseling /></ProtectedRoute>} /> */}
                <Route path="/nearby" element={<ProtectedRoute><NearbyCounseling /></ProtectedRoute>} />
                <Route path="/" element={<Diary />} />
              </Routes>
            </main>
            <Footer />
          </>
        }
      />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
