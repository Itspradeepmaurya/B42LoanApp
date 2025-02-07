// src/pages/Login.jsx
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email });
  };

  return (
    <div style={{ maxWidth: '400px', margin: '40px auto' }}>
      <h2 style={{ textAlign: 'center' }}>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <label>Password:</label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit" style={{ width: '100%', marginTop: '10px' }}>Login</button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '10px' }}>
        New to LoanPay? <Link to="/signup">Signup here</Link>
      </p>
    </div>
  );
};

export default Login;
