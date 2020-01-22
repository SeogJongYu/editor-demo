import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader';

import logo from './logo.svg';
import './App.css';

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
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {responseData.message}
        </p>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default hot(module)(App);
