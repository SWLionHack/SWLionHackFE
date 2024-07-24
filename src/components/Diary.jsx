import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

// 스타일 객체
const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
  },
  header: {
    marginBottom: '20px',
  },
  diaryForm: {
    marginBottom: '20px',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    marginTop: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
  },
  button: {
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
  },
  calendarContainer: {
    marginTop: '20px',
  },
  selectedDate: {
    marginTop: '20px',
  },
};

const MainPage = () => {
  const [date, setDate] = useState(new Date());
  const [diary, setDiary] = useState({});
  const [currentEntry, setCurrentEntry] = useState('');

  const handleDateChange = (newDate) => {
    setDate(newDate);
    setCurrentEntry(diary[newDate.toDateString()] || '');
  };

  const handleDiaryChange = (e) => {
    setCurrentEntry(e.target.value);
  };

  const handleDiarySave = () => {
    const dateString = date.toDateString();
    setDiary({ ...diary, [dateString]: currentEntry });
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>일기 작성 및 열람</h1>
      </header>

      <div style={styles.diaryForm}>
        <h2>일기 작성</h2>
        <textarea
          style={styles.textarea}
          rows="6"
          placeholder="일기를 작성하세요..."
          value={currentEntry}
          onChange={handleDiaryChange}
        ></textarea>
        <button style={styles.button} onClick={handleDiarySave}>
          일기 저장
        </button>
      </div>

      <div style={styles.calendarContainer}>
        <Calendar
          onChange={handleDateChange}
          value={date}
        />
      </div>

      <div style={styles.selectedDate}>
        <h2>{date.toDateString()}</h2>
        <p>{diary[date.toDateString()] || '이 날짜에 작성된 일기가 없습니다.'}</p>
      </div>
    </div>
  );
};

export default MainPage;
