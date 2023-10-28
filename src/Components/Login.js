// Login.js
import React, { useState } from 'react';
import { useAuth } from '../AuthContext';

function Login() {
  const { login } = useAuth();
  const [name, setName] = useState('');

  const handleLogin = () => {
    if (name.trim() !== '') {
      login(name);
    }
  };

  return (
    <div>
      <p>Please log in to start the quiz.</p>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
