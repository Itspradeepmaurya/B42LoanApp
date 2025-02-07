// src/components/Footer.jsx
import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <p>&copy; {new Date().getFullYear()} LoanPay. All rights reserved.</p>
    </motion.footer>
  );
};

export default Footer;
