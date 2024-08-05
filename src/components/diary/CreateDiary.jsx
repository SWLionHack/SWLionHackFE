import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/diary/DiaryStyles.css'

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const CreateDiary = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [summary, setSummary] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post(`http://${API_BASE_URL}/diary/new`, 
      { title, content, summary }, 
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      navigate('/diary');
    } catch (error) {
      console.error('Error creating diary:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="diary-title">Create a New Diary</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Title</label>
          <input 
            type="text" 
            className="form-input"
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label className="form-label">Content</label>
          <textarea 
            className="form-textarea"
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            required 
          />
        </div>
        {/* <div className="form-group">
          <label className="form-label">Summary</label>
          <input 
            type="text" 
            className="form-input"
            value={summary} 
            onChange={(e) => setSummary(e.target.value)} 
            required 
          />
        </div> */}
        <button className="form-button" type="submit">Save Diary</button>
      </form>
    </div>
  );
};

export default CreateDiary;
