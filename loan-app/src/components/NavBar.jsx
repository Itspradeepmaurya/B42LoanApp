// src/components/NavBar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const NavBar = () => {
  const { user, logout } = useAuth();

  return (
    <nav>
      <Link to="/">Home</Link>
      {user ? (
        <>
          <Link to="/loan-application">Apply Loan</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/repayment-calendar">Calendar</Link>
          <Link to="/loan-comparison">Compare Loans</Link>
          <button onClick={logout} style={{ marginLeft: '10px' }}>
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </>
      )}
    </nav>
  );
};

export default NavBar;
