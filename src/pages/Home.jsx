// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Welcome to LoanPay</h2>
      <p>Your one-stop portal for managing loan applications and repayments.</p>
      <div style={{ marginTop: '20px' }}>
        <Link to="/login">
          <button style={{ marginRight: '10px' }}>Login</button>
        </Link>
        <Link to="/signup">
          <button>Signup</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
