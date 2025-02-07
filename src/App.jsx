// <<<<<<< HEAD
// src/App.jsx
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Header from './components/Header';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';

// Import pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import LoanApplication from './pages/LoanApplication';
import Dashboard from './pages/Dashboard';
import RepaymentCalendar from './pages/RepaymentCalendar';
import LoanComparison from './pages/LoanComparison';

import { ToastContainer } from 'react-toastify';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5,
};

const App = () => {
  const location = useLocation();
  return (
    <div className="app">
      <Header />
      <NavBar />
      <main style={{ minHeight: '80vh', padding: '20px' }}>
        <AnimatePresence exitBeforeEnter>
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <Home />
                </motion.div>
              }
            />
            <Route
              path="/login"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <Login />
                </motion.div>
              }
            />
            <Route
              path="/signup"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <Signup />
                </motion.div>
              }
            />

            {/* Protected Routes */}
            <Route
              path="/loan-application"
              element={
                <PrivateRoute>
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <LoanApplication />
                  </motion.div>
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <Dashboard />
                  </motion.div>
                </PrivateRoute>
              }
            />
            <Route
              path="/repayment-calendar"
              element={
                <PrivateRoute>
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <RepaymentCalendar />
                  </motion.div>
                </PrivateRoute>
              }
            />
            <Route
              path="/loan-comparison"
              element={
                <PrivateRoute>
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <LoanComparison />
                  </motion.div>
                </PrivateRoute>
              }
            />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default App;
// =======
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from './components/Login';
// import Register from './components/Register';
// import Dashboard from './components/Dashboard'; // Import Dashboard component

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           <Route path="/" element={<Login />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/dashboard" element={<Dashboard />} /> {/* Add dashboard route */}
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
// >>>>>>> 50f5a7a37b301965018fb62cff09b31c0b8b202e
