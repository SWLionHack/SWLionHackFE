import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './style/CreatePost.css'; // CSS 파일을 임포트합니다.

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token'); // localStorage에서 토큰 가져오기
      const response = await axios.post(`http://${API_BASE_URL}/posts/create`, {
        title,
        content
      }, {
        headers: {
          Authorization: `Bearer ${token}` // 토큰을 헤더에 추가
        }
      });
      if (response.status === 201) {
        alert('게시글이 작성되었습니다.');
        navigate('/community');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('게시글 작성 중 오류가 발생했습니다:', error);
      alert('게시글 작성에 실패했습니다.');
    }
  };

  return (
    <div className="create-post-container">
      <h2>게시글 작성</h2>
      <form onSubmit={handleSubmit} className="create-post-form">
        <input
          type="text"
          id="title"
          name="title"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          id="content"
          name="content"
          placeholder="내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">작성</button>
      </form>
    </div>
  );
}

export default CreatePost;
