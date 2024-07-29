import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/CreatePost.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const CreatePost = () => {
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post(`http://${API_BASE_URL}/posts/create`, {
        title: postTitle,
        content: postContent
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      navigate('/community');
    } catch (error) {
      console.error('게시글 작성 중 오류가 발생했습니다:', error);
    }
  };

  return (
    <div className="create-post-container">
      <form className="create-post-form" onSubmit={handleSubmit}>
        <input
          type="text"
          id="postTitle"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
          required
          placeholder='게시글 제목을 입력해주세요'
        />
        <textarea
          id="postContent"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          required
          placeholder='게시글 내용을 입력해주세요'
        />
        <button type="submit">저장하기</button>
      </form>
    </div>
  );
};

export default CreatePost;
