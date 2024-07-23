import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/common/Footer';
import NavBar from './components/common/NavBar';
import MainPage from './components/MainPage';
import Diary from './components/Diary';
import Survey from './components/Survey';
import Community from './components/Community';
import QnA from './components/QnA';
// import Counseling from './components/Counseling';
import NearbyCounseling from './components/NearbyCounseling';
import Login from './components/login/Login';
import Register from './components/login/Register';
import { AuthProvider } from './components/login/AuthContext';
import ProtectedRoute from './components/login/ProtectedRoute';
import './App.css';

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <div className="App">
//           <Routes>
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//             <Route
//               path="*"
//               element={
//                 <>
//                   <NavBar />
//                   <main>
//                     <Routes>
//                       <Route path="/diary" element={<ProtectedRoute><Diary /></ProtectedRoute>} />
//                       <Route path="/survey" element={<ProtectedRoute><Survey /></ProtectedRoute>} />
//                       <Route path="/community" element={<ProtectedRoute><Community /></ProtectedRoute>} />
//                       <Route path="/qna" element={<ProtectedRoute><QnA /></ProtectedRoute>} />
//                       {/* <Route path="/counseling" element={<ProtectedRoute><Counseling /></ProtectedRoute>} /> */}
//                       <Route path="/nearby" element={<ProtectedRoute><NearbyCounseling /></ProtectedRoute>} />
//                       <Route path="/" element={<Diary />} />
//                     </Routes>
//                   </main>
//                   <Footer />
//                 </>
//               }
//             />
//           </Routes>
//         </div>
//       </Router>
//     </AuthProvider>
//   );
// }
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="*"
              element={
                <>
                  <NavBar />
                  <main>
                    <Routes>
                      <Route path="/diary" element={<Diary />} />
                      <Route path="/survey" element={<Survey />} />
                      <Route path="/community" element={<Community />} />
                      <Route path="/qna" element={<QnA />} />
                      {/* <Route path="/counseling" element={<Counseling />} /> */}
                      <Route path="/nearby" element={<NearbyCounseling />} />
                      <Route path="/" element={<MainPage />} />
                    </Routes>
                  </main>
                  {/* <Footer /> */}
                </>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
