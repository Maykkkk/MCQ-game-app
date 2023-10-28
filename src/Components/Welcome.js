import React, { useState } from 'react';
import { useAuth } from '../AuthContext';

function Welcome() {
  const { login } = useAuth();
  const [name, setName] = useState('');

  const handleLogin = () => {
    if (name.trim() !== '') {
      login(name);
    }
  };

  return (
    <div>
      <h2>Welcome to the Quiz App!</h2>
    </div>
  );
}

export default Welcome;
