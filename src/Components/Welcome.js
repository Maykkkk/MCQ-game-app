import React from 'react';
import './Welcome.css';

function Welcome({ user }) {
  return (
    <div className='welcome-container'>
      <h2 className='welcome-message'>Welcome to the Quiz Game, {user}!</h2>
      <p className="greeting-message">Let's test your knowledge!</p>
    </div>
  );
}

export default Welcome;
