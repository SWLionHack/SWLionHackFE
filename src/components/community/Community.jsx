import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/Community.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function Community() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://${API_BASE_URL}/posts/titles?page=${currentPage}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setPosts(response.data.posts);
        setCurrentPage(response.data.currentPage);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchData();
  }, [currentPage]);

  const goToPost = (postId) => {
    navigate(`/post/${postId}`);
  };

  const goToCreatePost = () => {
    navigate('/create-post');
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

  return (
    <div className="community-container">
      <h2>Community Posts</h2>
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
