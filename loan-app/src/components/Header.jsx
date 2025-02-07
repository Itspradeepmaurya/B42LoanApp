// src/components/Header.jsx
import React from 'react';
import logo from '../assets/logo.png';
import ThemeToggle from './ThemeToggle';
import { motion } from 'framer-motion';

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={logo} alt="LoanPay Logo" style={{ width: '50px', marginRight: '10px' }} />
        <h1>LoanPay</h1>
      </div>
      <ThemeToggle />
    </motion.header>
  );
};

export default Header;
