// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Force scroll to top on page load - MOST AGGRESSIVE
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

// Immediate scroll to top
window.scrollTo(0, 0);

// Also scroll to top after everything loads
document.addEventListener('DOMContentLoaded', () => {
  window.scrollTo(0, 0);
});

// Also scroll to top after full page load
window.addEventListener('load', () => {
  window.scrollTo(0, 0);
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);