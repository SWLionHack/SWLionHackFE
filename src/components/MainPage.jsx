import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// src/components/MainPage.jsx
import '../App.css'; // 상위 디렉토리로 올라가서 참조

function MainPage() {
  return (
    <div style={{ fontfamily: 'Jua, sans-serif' }}>
      <link rel="stylesheet" href="https://fonts.google.com/specimen/Jua?subset=korean&script=Kore"></link>
      <div id="demo" className="carousel slide" data-bs-ride="carousel" style={{ marginTop: '60px' }}>
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#demo" data-bs-slide-to="0" className="active"></button>
          <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
          <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
        </div>
        
        <div className="carousel-inner">
       
          <div className="carousel-item active">
            <img src="Home.image/1.jpg" alt="Community" className="d-block w-100" />
            <div className="carousel-caption d-none d-md-block">
              <h3>오직 산모를 위한 서비스</h3>
              <p>아기만 바라보는 엄마, 돌보지 못한 나, 이제 내가 챙겨요 </p>
            </div>
          </div>
          <div className="carousel-item">
            <img src="Home.image/2.jpg" alt="Support" className="d-block w-100" />
            <div className="carousel-caption d-none d-md-block">
              <h3>출산 직후, 우울감에 노출되는 시기 </h3>
              <p>내 맘 속의 이야기를 꺼내볼까요?</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src="Home.image/3.jpg" alt="AI Chatbot" className="d-block w-100" />
            <div className="carousel-caption d-none d-md-block">
              <h3>AI 상담 챗봇</h3>
              <p>오직 엄마의 마음을 보듬어줄 옹알이만의 맞춤 AI 채팅 서비스</p>
            </div>
          </div>
        </div>
        
        <button className="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>

      <div className="container-fluid py-5" style={{ backgroundColor: '#FFFFFF' }}>
        <h2 className="text-center mb-4">"엄마의 옹알이"</h2>
        <p className="text-center"><br /><strong>아기가 첫 옹알이를 하는 시기, 엄마도 마음 속의 이야기를 옹알거릴 시간이 필요하다구요!! <br /><strong></strong> 같이 옹알하러 갈까요?</strong></p>
      </div>

      <div className="container-fluid py-5" style={{ backgroundColor: '#fff2cc' }}>
        <h2 className="text-center mb-4">"오늘의 옹알이"</h2>
        <p className="text-center"><br /><strong>하루에 한 번씩 나의 마음을 파고드는 질문을 줄게요 <br /><strong></strong> 같이 나를 알아보러 갈까요?</strong></p>
      </div>

      <div id="section1" className="container-fluid py-5" style={{ backgroundColor: '#F4CCCC' }}>
          <h2 className="text-center mb-4">엄마'가 아닌 '나'로 소통할까요</h2>
          <p className="lead text-center"><br /><strong>산모라는 공통점을 가진 사람들이 한 곳에 모여서 오로지 '나'를 위한 힐링을 하러 가요. 산모 커뮤니티 제공과, 대면 모임을 통한 힐링 활동 제안</strong></p>
      </div>
      
      <div id="section2" className="container-fluid py-5" style={{ backgroundColor: '#EA9999' }}>
    
          <h2 className="text-center mb-4">산후우울증 예방을 위한 심리검사</h2>
          <p className="lead text-center">  <br /><strong>산후우울증, 내가 나를 알아야 행복해질수 있어요 <br />나의 이야기를 들려주고, 맞춤 치료 방법을 제안해요.<br /></strong></p>
 
      </div>
      
      <div id="section2" className="container-fluid py-5" style={{ backgroundColor: '#E06666' }}>
      
          <h2 className="text-center mb-4">오로지 엄마를 위한 공간</h2>
          <p className="lead text-center">  <br /><strong>산후 조리원, 긴급 병원, 산후우울증 치료를 위한 힐링스팟 등 엄마를 위한 모든 공간을 리뷰와 함께 볼 수 있어요</strong></p>
  
      </div>

    </div>
  );
}


export default MainPage;
