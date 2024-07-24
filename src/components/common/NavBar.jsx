import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../login/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

function NavBar() {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark fixed-top">
      <a className="navbar-brand ms-5" href="/">MAUM</a>
      <ul className="navbar-nav me-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/diary">마음일기</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/survey">설문조사</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/community">커뮤니티</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/qna">전문가 Q&A</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/nearby">가까운 상담소</Link>
        </li>
      </ul>
      <ul className="navbar-nav ms-auto">
        {isAuthenticated ? (
          <li className="nav-item">
            <span className="navbar-text">안녕하세요</span>
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