import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter as Router} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    {/* input component to be able to access router functionality from react-router-dom */}
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

