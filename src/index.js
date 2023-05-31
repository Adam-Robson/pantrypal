import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
// Supports weights 100-900
import '@fontsource-variable/raleway';

import { GoogleProvider } from './context/GoogleContext';

ReactDOM
  .createRoot(
    document
      .getElementById('root'))
  .render(
    <React.StrictMode>
      <BrowserRouter>
        <GoogleProvider>
          <App />
        </GoogleProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
