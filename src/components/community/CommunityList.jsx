import React from 'react';
import '../style/community/CommunityList.css'
import { useNavigate } from 'react-router-dom';

const CommunityList = () => {
  const navigate = useNavigate();

  const boards = [
    { name: '자유 게시판', category: 'free' },
    { name: '정보 게시판', category: 'info-tips' },
    { name: '장터 게시판', category: 'shopping' },
    // 다른 카테고리들 추가
  ];

  const handleBoardClick = (board) => {
    navigate(`/community/${board.category}`); // 해당 카테고리의 게시글 리스트 페이지로 이동
  };

  return (
    <div className="community-list-container">
    <h2>게시판</h2>
      <ul className="community-list">
        {boards.map(board => (
          <li key={board.category} className="community-list-item" onClick={() => handleBoardClick(board)}>
            {board.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommunityList;
