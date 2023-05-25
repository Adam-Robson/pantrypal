import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
// Supports weights 300-900
import '@fontsource-variable/recursive';



ReactDOM
  .createRoot(
    document
      .getElementById('root'))
  .render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
