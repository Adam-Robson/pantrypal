import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GoogleMapsProvider } from './context/GoogleContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleMapsProvider>
      <App />
    </GoogleMapsProvider>
  </React.StrictMode>
);
