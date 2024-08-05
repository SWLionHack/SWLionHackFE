import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../style/community/Community.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const boards = [
  { name: '정보 및 팁 공유', category: 'info-tips' },
  { name: '감정 나누기', category: 'share-feelings' },
  // 다른 카테고리들 추가
];

function Community() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { category } = useParams();  // URL에서 category 파라미터 추출

  // 현재 카테고리에 맞는 이름 찾기
  const boardName = boards.find(board => board.category === category)?.name || 'Unknown Board';

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // 데이터 로딩 시작
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://${API_BASE_URL}/posts/titles`, {
          params: {
            category,
            page: currentPage,
            size: 10
          },
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setPosts(response.data.posts);
        setCurrentPage(response.data.currentPage);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false); // 데이터 로딩 완료
      }
    };

    fetchData();
  }, [category, currentPage]);

  const goToPost = (postId) => {
    navigate(`/post/${postId}`);
  };

  const goToCreatePost = () => {
    navigate(`/community/${category}/create-post`);
  };

  const handleDeletePost = async (postId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://${API_BASE_URL}/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setPosts(posts.filter(post => post.postID !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="community-container">
      <h2>{boardName}</h2>
      <div className="post-list">
        {posts.map((post) => (
          <div key={post.postID} className="post-item" onClick={() => goToPost(post.postID)}>
            <span>{post.title}</span>
            {post.isAuthor && (
              <button onClick={(e) => { e.stopPropagation(); handleDeletePost(post.postID); }} className="delete-post-button">X</button>
            )}
          </div>
        ))}
      </div>
      <button className="create-post-button" onClick={goToCreatePost}>
        글쓰기
      </button>
      <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Community;
