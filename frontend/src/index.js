import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { WbContextProvider } from './context/WordbankContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WbContextProvider>
    <App />
    </WbContextProvider>
  </React.StrictMode>
);
