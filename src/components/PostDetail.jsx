import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './style/PostDetail.css'; 

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function PostDetail() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const postResponse = await axios.get(`http://${API_BASE_URL}/posts/${postId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setPost(postResponse.data);

        const commentsResponse = await axios.get(`http://${API_BASE_URL}/posts/${postId}/comments`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setComments(commentsResponse.data);
      } catch (error) {
        console.error('Error fetching post details:', error);
      }
    };

    fetchData();
  }, [postId]);

  const fetchComments = async () => {
    try {
      const token = localStorage.getItem('token');
      const commentsResponse = await axios.get(`http://${API_BASE_URL}/posts/${postId}/comments`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setComments(commentsResponse.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://${API_BASE_URL}/posts/${postId}/comments`, {
        content: newComment
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setNewComment('');
      fetchComments(); // 댓글 목록을 다시 가져옵니다.
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://${API_BASE_URL}/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setComments(comments.filter(comment => comment.commentID !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handleDeletePost = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://${API_BASE_URL}/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      navigate('/community');
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="post-detail-container">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      {post.isAuthor && (
        <button onClick={handleDeletePost} className="delete-post-button">삭제</button>
      )}
      <div className="comments-section">
        <h3>Comments</h3>
        <ul>
          {comments.map(comment => (
            <li key={comment.commentID}>
              <p>{comment.content}</p>
              {comment.isAuthor && (
                <button onClick={() => handleDeleteComment(comment.commentID)} className="delete-comment-button">X</button>
              )}
            </li>
          ))}
        </ul>
      </div>

      <form className="comment-form" onSubmit={handleCommentSubmit}>
        <input
          type="text"
          value={newComment}
          onChange={handleCommentChange}
          placeholder="Add a comment"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default PostDetail;
