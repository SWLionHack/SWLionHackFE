import React from 'react';
import logo from './logo.svg';
import './App.css';
import FetchDataComponent from './components/FetchDataComponent';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {/* FetchDataComponent 추가 */}
        <FetchDataComponent />
      </header>
    </div>
  );
}

export default App;
