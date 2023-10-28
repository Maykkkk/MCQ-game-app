// In index.js or your root component
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Adjust the path if needed
import { AuthProvider } from './AuthContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
