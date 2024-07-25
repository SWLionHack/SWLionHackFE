import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

function Register() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState('parent'); // 기본값 설정
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`http://${process.env.REACT_APP_API_BASE_URL}/sign-up`, {
        name,
        phone,
        email,
        password,
        confirmPassword,
        status,
      });
      if (response.status === 201) {
        alert('회원가입 성공');
        navigate('/login');
      } else {
        alert(response.data);
      }
    } catch (error) {
      console.error('회원가입 오류:', error);
      alert('회원가입 실패');
    }
  };

  return (
    <div className="register-container">
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">이름:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">전화번호:</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">이메일:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">비밀번호:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">비밀번호 확인:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>역할:</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                value="parent"
                checked={status === 'parent'}
                onChange={(e) => setStatus(e.target.value)}
              />
              Parent
            </label>
            <label>
              <input
                type="radio"
                value="child"
                checked={status === 'child'}
                onChange={(e) => setStatus(e.target.value)}
              />
              Child
            </label>
          </div>
        </div>
        <button type="submit">회원가입</button>
        <p>로그인으로 돌아갈까요? <Link to="/login">로그인</Link></p>
      </form>
    </div>
  );
}

export default Register;
