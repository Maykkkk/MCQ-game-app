// Login.js
import React, { useState } from 'react';
//import { Form } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import './Login.css';
function Login() {
  const { login } = useAuth();
  const [name, setName] = useState('');

  const handleLogin = () => {
    if (name.trim() !== '') {
      login(name);
    }
  };

  return (
    <div className="login-container">
      <p>Hello, Please log in to start the quiz.</p>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button className="login-button" onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
