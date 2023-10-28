// Logout.js
import React from 'react';
import { useAuth } from '../AuthContext';

function Logout() {
  const { user, logout } = useAuth();

  return (
    <div>
      {user && <p>Welcome, {user}</p>}
      {user && <button onClick={logout}>Logout</button>}
    </div>
  );
}

export default Logout;
