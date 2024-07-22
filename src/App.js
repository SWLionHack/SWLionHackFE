import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import NavBar from './components/common/NavBar';
import Diary from './components/Diary';
import Survey from './components/Survey';
import Community from './components/Community';
import QnA from './components/QnA';
// import Counseling from './components/Counseling';
import NearbyCounseling from './components/NearbyCounseling';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <NavBar />
        <main>
          <Routes>
          <Route path="/diary" element={<Diary />} />
            <Route path="/survey" element={<Survey />} />
            <Route path="/community" element={<Community />} />
            <Route path="/qna" element={<QnA />} />
            {/* <Route path="/counseling" element={<Counseling />} /> */}
            <Route path="/nearby" element={<NearbyCounseling />} />
            <Route path="/" element={<Diary />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
