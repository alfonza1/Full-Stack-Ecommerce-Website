import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JS
import HomePage from './pages/HomePage';
import ReleasesData from './pages/ReleasesData';

import 'bootstrap-icons/font/bootstrap-icons.css'; // Import the Bootstrap Icons CSS

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import PopularReleasesPage from './pages/ReleasesData';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/popular" element={<ReleasesData />} />
        <Route path="/men" element={<ReleasesData />} />
        <Route path="/women" element={<ReleasesData />} />
        <Route path="/kids" element={<ReleasesData />} />
        <Route path="/newArrivals" element={<ReleasesData />} />

      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
