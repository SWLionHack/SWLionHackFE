import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style/Community.css';

function Community() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [expandedPost, setExpandedPost] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, [currentPage]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`http://${process.env.REACT_APP_API_BASE_URL}/posts?page=${currentPage}`);
      setPosts(response.data.posts);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const togglePost = (postID) => {
    setExpandedPost(expandedPost === postID ? null : postID);
  };

  return (
    <div className="community-container">
      <h2>커뮤니티 게시판</h2>
      <div className="posts-container">
        {posts.map((post) => (
          <div key={post.postID} className="post">
            <h3 onClick={() => togglePost(post.postID)} className="post-title">
              {post.title}
            </h3>
            {expandedPost === post.postID && (
              <div className="post-content">
                <p>{post.content}</p>
                <p><small>작성자: {post.author}</small></p>
                <p><small>작성일: {new Date(post.createdAt).toLocaleString()}</small></p>
              </div>
            )}
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            이전 페이지
          </button>
          <span>{currentPage} / {totalPages}</span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            다음 페이지
          </button>
        </div>
      )}
    </div>
  );
}

export default Community;
