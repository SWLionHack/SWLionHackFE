import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../login/AuthContext';

function NavBar() {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="App-nav">
      <ul>
        <li><Link to="/diary">마음일기</Link></li>
        <li><Link to="/survey">설문조사</Link></li>
        <li><Link to="/community">커뮤니티</Link></li>
        <li><Link to="/qna">전문가 Q&A</Link></li>
        {/* <li><Link to="/counseling">실시간 상담</Link></li> */}
        <li><Link to="/nearby">가까운 상담소</Link></li>
      </ul>
      <button className="logout-button" onClick={handleLogout}>로그아웃</button>
    </nav>
  );
}

export default NavBar;
