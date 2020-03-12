import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader';

import logo from './logo.png';
import './App.css';


/**
 * Example Component
 * 로고 출력 및 샘플 API 연동
 * @returns JSX.Element
 */
function App() {
  const [responseData, setResponseData] = useState({ message: "" });

  useEffect(() => {
    fetch("/api/v1/samples/")
      .then(response => response.json())
      .then(json => setResponseData(json));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div className="App-logo-container">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <p>
          {responseData.message}
        </p>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://www.ibigtree.kr"
          target="_blank"
          rel="noopener noreferrer"
        >
          Hello Bigtree!
        </a>
      </header>
    </div>
  );
}

export default hot(module)(App);
