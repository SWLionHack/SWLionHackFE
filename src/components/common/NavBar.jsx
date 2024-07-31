import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../login/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

function NavBar() {
  const { isAuthenticated, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark fixed-top">
      <a className="navbar-brand ms-5" href="/">MAUM</a>
      <ul className="navbar-nav me-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/today-question">오늘의 질문</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/community">커뮤니티</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/vote">투표</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/open-chatrooms">오픈 채팅방</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/nearby">주변 장소</Link>
        </li>
      </ul>
      <ul className="navbar-nav ms-auto">
        {isAuthenticated ? (
          <li className="nav-item">
            <button className="btn btn-link nav-link" onClick={handleLogout}>로그아웃</button>
          </li>
        ) : (
          <li className="nav-item">
            <Link className="nav-link" to="/login">로그인</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
