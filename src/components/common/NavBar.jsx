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
    <nav className="navbar navbar-expand-sm navbar fixed-top" style={{ backgroundColor: '#EAD1DC' }}>
      <a className="navbar-brand ms-5" href="/">!육아</a>
      <ul className="navbar-nav me-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/today-question">오늘의 미션</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/diary">엄마의 기록</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/survey">심리검사</Link>
        </li>
        <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            모임
          </Link>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li>
              <Link className="dropdown-item" to="/meet-vote">같이 모일까요</Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/meet-chat">함께 이야기해요</Link>
            </li>
          </ul>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/communityList">COMMUNITY</Link>
        </li>
        {/* <li className="nav-item">
          <Link className="nav-link" to="/open-chatrooms">오픈 채팅방</Link>
        </li> */}
        <li className="nav-item">
          <Link className="nav-link" to="/nearby">MOM/BABY'S PLACE</Link>
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
