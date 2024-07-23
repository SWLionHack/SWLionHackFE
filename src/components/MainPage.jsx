import React from 'react';

function MainPage() {
  return (
    <div>
      <div id="demo" className="carousel slide" data-bs-ride="carousel" style={{ marginTop: '60px' }}>
        
        {/* Indicators/dots */}
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#demo" data-bs-slide-to="0" className="active"></button>
          <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
          <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
        </div>
        
        {/* The slideshow/carousel */}
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="Home.image/1.jpg" alt="Los Angeles" className="d-block w-100" />
            <div className="carousel-caption">
              <h3>Los Angeles</h3>
              <p>We had such a great time in LA!</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src="Home.image/2.jpg" alt="Chicago" className="d-block w-100" />
            <div className="carousel-caption">
              <h3>Chicago</h3>
              <p>Thank you, Chicago!</p>
            </div> 
          </div>
          <div className="carousel-item">
            <img src="Home.image/3.jpg" alt="New York" className="d-block w-100" />
            <div className="carousel-caption">
              <h3>New York</h3>
              <p>We love the Big Apple!</p>
            </div>  
          </div>
        </div>
        
        {/* Left and right controls/icons */}
        <button className="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>
      
      <div className="container-fluid mt-3">
        <h3>Carousel Example</h3>
        <p>The following example shows how to create a basic carousel with indicators and controls.</p>
      </div>
      
      {/* Scrollable Sections */}
      <div id="section1" className="container-fluid bg-success text-white" style={{ padding: '100px 20px', width: '1440px' }}>
        <h1>Section 1</h1>
        <p>Try to scroll this section and look at the navigation bar while scrolling! Try to scroll this section and look at the navigation bar while scrolling!</p>
        <p>Try to scroll this section and look at the navigation bar while scrolling! Try to scroll this section and look at the navigation bar while scrolling!</p>
      </div>
      
      <div id="section2" className="container-fluid bg-warning" style={{ padding: '100px 20px' }}>
        <h1>Section 2</h1>
        <p>Try to scroll this section and look at the navigation bar while scrolling! Try to scroll this section and look at the navigation bar while scrolling!</p>
        <p>Try to scroll this section and look at the navigation bar while scrolling! Try to scroll this section and look at the navigation bar while scrolling!</p>
      </div>
      
      <div id="section3" className="container-fluid bg-secondary text-white" style={{ padding: '100px 20px' }}>
        <h1>Section 3</h1>
        <p>Try to scroll this section and look at the navigation bar while scrolling! Try to scroll this section and look at the navigation bar while scrolling!</p>
        <p>Try to scroll this section and look at the navigation bar while scrolling! Try to scroll this section and look at the navigation bar while scrolling!</p>
      </div>
    </div>
  );
}

export default MainPage;
