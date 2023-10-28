// Logout.js
import React from 'react';
import { useAuth } from '../AuthContext';
import './Login.css';

function Logout() {
  const { user, logout } = useAuth();

  return (
    <div className='login-container'>
      {user && <button onClick={logout} className="login-button">Logout</button>}
    </div>
  );
}

export default Logout;
