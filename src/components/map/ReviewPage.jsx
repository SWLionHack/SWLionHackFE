import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../style/map/ReviewPage.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const ReviewPage = () => {
  const { academyName } = useParams();
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' });
  const token = localStorage.getItem('token');
  const [existingReview, setExistingReview] = useState(null);
  const [hoverRating, setHoverRating] = useState(0);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://${API_BASE_URL}/map_academy/${academyName}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setReviews(response.data.reviews);
        setUserId(response.data.userId); // 백엔드에서 받은 유저 ID 설정
        const userReview = response.data.reviews.find(review => review.userId === response.data.userId);
        if (userReview) {
          setNewReview({ rating: userReview.rating, comment: userReview.comment });
          setExistingReview(userReview);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [academyName, token]);

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  const handleRatingChange = (rating) => {
    setNewReview({ ...newReview, rating });
  };

  const handleMouseEnter = (rating) => {
    setHoverRating(rating);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleReviewSubmit = async () => {
    const { rating, comment } = newReview;
    try {
      await axios.post(`http://${API_BASE_URL}/review`, 
      {
        academyname: academyName,
        rating: parseFloat(rating),
        comment,
      }, 
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      window.location.reload(); // 페이지 새로고침
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <div className="review-page">
      <h3>{academyName}</h3> 
      <div className="new-review">
        <h4>{existingReview ? '내 리뷰 수정' : ''}</h4>
        <div className="rating-input">
          {Array.from({ length: 5 }, (_, i) => (
            <span
              key={i}
              className={`star ${i < (hoverRating || newReview.rating) ? 'filled' : ''}`}
              onClick={() => handleRatingChange(i + 1)}
              onMouseEnter={() => handleMouseEnter(i + 1)}
              onMouseLeave={handleMouseLeave}
            >
              ★
            </span>
          ))}
        </div>
        <textarea
          name="comment"
          value={newReview.comment}
          onChange={handleReviewChange}
          placeholder="리뷰를 입력하세요"
        />
        <button onClick={handleReviewSubmit}>{existingReview ? '리뷰 수정' : '저장하기'}</button>
      </div>
      <ul className="reviews-list">
        {reviews.map((review, index) => (
          <li key={index} className="review-item">
            <div className="review-details">
              <span className="review-text">
                {review.userId === userId ? '나 : ' : ''} {review.comment}
              </span>
              <div className="stars">
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i} className={`star ${i < review.rating ? 'filled' : ''}`}>★</span>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewPage;
