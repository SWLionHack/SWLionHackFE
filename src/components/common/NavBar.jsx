import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
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
    </nav>
  );
}

export default NavBar;
