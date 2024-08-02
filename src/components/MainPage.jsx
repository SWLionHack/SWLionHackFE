import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function MainPage() {
  return (
    <div style={{ fontFamily: 'Roboto, sans-serif' }}>
      {/* Google Fonts 링크 추가 */}
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" />
      
      {/* Carousel 섹션 */}
      <div id="demo" className="carousel slide" data-bs-ride="carousel" style={{ marginTop: '60px' }}>
        {/* Indicators/dots */}
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#demo" data-bs-slide-to="0" className="active"></button>
          <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
          <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
        </div>
        
        {/* 슬라이드쇼 / 캐러셀 */}
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="Home.image/1.jpg" alt="Community" className="d-block w-100" />
            <div className="carousel-caption d-none d-md-block">
              <h3>또래 커뮤니티</h3>
              <p>청소년들의 정신건강을 지키는 안전한 공간</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src="Home.image/2.jpg" alt="Support" className="d-block w-100" />
            <div className="carousel-caption d-none d-md-block">
              <h3>공감과 지지</h3>
              <p>또래 간의 공감을 통해 고민을 나누고 해결해요</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src="Home.image/3.jpg" alt="AI Chatbot" className="d-block w-100" />
            <div className="carousel-caption d-none d-md-block">
              <h3>AI 상담 챗봇</h3>
              <p>개인 맞춤형 상담 서비스를 제공합니다</p>
            </div>
          </div>
        </div>
        
        {/* 좌우 컨트롤 */}
        <button className="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>

      {/* 소개 섹션 */}
      <div className="container mt-5">
        <h2 className="text-center mb-4">청소년 정신건강 커뮤니티</h2>
        <p className="text-center">우리 프로젝트는 청소년들이 안전하게 고민을 나눌 수 있는 또래 커뮤니티를 제공합니다. <br /><strong>AI 기술을 활용하여 개인 맞춤형 상담 서비스도 함께 제공됩니다.</strong></p>
      </div>

      {/* Scrollable Sections */}
      <div id="section1" className="container-fluid py-5" style={{ backgroundColor: '#f0f8ff' }}>
        <div className="container">
          <h2 className="text-center mb-4">프로젝트 소개</h2>
          <p className="lead text-center">이 프로젝트는 <strong>청소년들이 정신건강을 보호하고 <br />더 나은 삶의 질을 유지할 수 있도록 돕기 위해 개발</strong>되었습니다.<br /> <br />기존의 정신건강 서비스와는 다르게, 우리 커뮤니티는 <strong>또래 간의 공감과 지지를 통해 자연스럽고 효과적으로 문제를 해결하는 것을 목표</strong>로 합니다.</p>
        </div>
      </div>
      
      <div id="section2" className="container-fluid py-5" style={{ backgroundColor: '#add8e6' }}>
        <div className="container">
          <h2 className="text-center mb-4">주요 기능</h2>
          <p className="lead text-center">우리 커뮤니티는 다양한 기능을 통해 청소년들이  <br /><strong>서로의 이야기를 듣고, 공감하며, 문제를 해결할 수 있는 공간</strong>을 제공합니다. <br />주요 기능으로는 <strong>오늘의 질문, 커뮤니티, 투표방, 오픈채팅방, 주변장소 리뷰, AI 상담 챗봇</strong> 등이 있습니다.</p>
        </div>
      </div>
      
      <div id="section3" className="container-fluid py-5" style={{ backgroundColor: '#4682b4' }}>
        <div className="container">
          <h2 className="text-center mb-4 text-white">왜 이 프로젝트가 필요한가?</h2>
          <p className="lead text-center text-white"><strong>청소년들이 스스로 부담을 느끼지 않고 편안하게 접근할 수 있는 공간을 마련함</strong>으로써, 그들의 정신건강을 보호하고 나아가 <strong>더 나은 삶의 질을 유지할 수 있도록 돕기 위함</strong>입니다. <br /><br />우리 커뮤니티는 청소년들이 서로의 이야기를 듣고 공감할 수 있는 환경을 조성해, 보다 <strong>자연스럽고 효과적으로 그들의 정신적 어려움을 해소하는데 기여</strong>할 것입니다.</p>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
