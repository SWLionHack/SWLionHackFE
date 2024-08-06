import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import '../style/diary/DiaryScore.css'; // CSS 파일을 포함하세요

// Chart.js에 필요한 요소들을 등록합니다.
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const DiaryScore = () => {
  const [monthlyData, setMonthlyData] = useState({ labels: [], data: [] });
  const [weeklyData, setWeeklyData] = useState({ labels: [], data: [] });
  const [noData, setNoData] = useState(false);

  useEffect(() => {
    const fetchScores = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`http://${API_BASE_URL}/diary/all`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log('response : ', response)

        const scores = response.data;
        console.log('전체 점수 데이터:', scores);

        if (scores.length === 0) {
          setNoData(true);
        } else {
          setNoData(false);
          const today = new Date();
          const thirtyDaysAgo = new Date(today.setDate(today.getDate() - 30));
          const sevenDaysAgo = new Date(today.setDate(today.getDate() - 7));

          const processData = (data) => {
            return {
              labels: data.map(item => new Date(item.createdAt).toLocaleDateString()),
              data: data.map(item => item.score),
            };
          };

          const filterByDateRange = (data, startDate) => {
            return data.filter(item => new Date(item.createdAt) >= startDate);
          };

          const monthScores = processData(filterByDateRange(scores, thirtyDaysAgo));
          const weekScores = processData(filterByDateRange(scores, sevenDaysAgo));

          console.log('한 달 간의 점수 데이터:', monthScores);
          console.log('일주일 간의 점수 데이터:', weekScores);

          setMonthlyData(monthScores);
          setWeeklyData(weekScores);
        }
      } catch (error) {
        console.error('Error fetching scores:', error);
      }
    };

    fetchScores();
  }, []);

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        max: 100
      }
    }
  };

  return (
    <div className="score-container">
      {noData ? (
        <div className="no-data-message">
          <h1>점수가 없습니다</h1>
          <p>일기를 작성해 주세요.</p>
        </div>
      ) : (
        <>
          <h1 className="score-title">일기 점수</h1>

          {/* 한 달 간의 점수 변화 그래프 */}
          <div className="chart-wrapper">
            <h2 className="chart-header">한 달 간의 점수 변화</h2>
            <Line
              data={{
                labels: monthlyData.labels,
                datasets: [
                  {
                    label: '점수',
                    data: monthlyData.data,
                    fill: false,
                    borderColor: 'rgba(75,192,192,1)',
                    tension: 0.1
                  }
                ]
              }}
              options={chartOptions}
            />
            <p className="chart-description">
              이 그래프는 지난 한 달 동안의 일기 점수 변화를 보여줍니다. <br></br>시간 경과에 따라 점수가 어떻게 변했는지 확인할 수 있습니다.
            </p>
          </div>

          {/* 일주일 간의 점수 변화 그래프 */}
          <div className="chart-wrapper">
            <h2 className="chart-header">일주일 간의 점수 변화</h2>
            <Line
              data={{
                labels: weeklyData.labels,
                datasets: [
                  {
                    label: '점수',
                    data: weeklyData.data,
                    fill: false,
                    borderColor: 'rgba(153,102,255,1)',
                    tension: 0.1
                  }
                ]
              }}
              options={chartOptions}
            />
            <p className="chart-description">
              이 그래프는 지난 일주일 동안의 일기 점수 변화를 보여줍니다. <br></br>최근 일주일 간의 감정 상태를 추적하는 데 유용합니다.
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default DiaryScore;
