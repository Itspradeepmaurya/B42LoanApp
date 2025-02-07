// src/pages/LoanApplication.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoanApplication = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1
    name: '',
    email: '',
    phone: '',
    // Step 2
    income: '',
    employment: '',
    // Step 3
    document: null,
  });

  const [errors, setErrors] = useState({});

  const validateStep = () => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.name) newErrors.name = 'Name is required';
      if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
        newErrors.email = 'Valid email is required';
      if (!formData.phone) newErrors.phone = 'Phone is required';
    }
    if (step === 2) {
      if (!formData.income) newErrors.income = 'Income is required';
      if (!formData.employment) newErrors.employment = 'Employment status is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      alert('Loan Application Submitted!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        income: '',
        employment: '',
        document: null,
      });
      setStep(1);
    }
  };

  const stepVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Loan Application</h2>
      <div className="progress-container">
        {['Personal Info', 'Financial Details', 'Document Uploads'].map((label, index) => (
          <div
            key={index}
            className={`progress-step ${step === index + 1 ? 'active' : ''}`}
          >
            {label}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <AnimatePresence exitBeforeEnter>
          {step === 1 && (
            <motion.div
              key="step1"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4 }}
            >
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
              />
              {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}

              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
              {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}

              <label>Phone:</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
              {errors.phone && <span style={{ color: 'red' }}>{errors.phone}</span>}
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4 }}
            >
              <label>Monthly Income:</label>
              <input
                type="number"
                name="income"
                value={formData.income}
                onChange={handleChange}
                placeholder="Enter your income"
              />
              {errors.income && <span style={{ color: 'red' }}>{errors.income}</span>}

              <label>Employment Status:</label>
              <select name="employment" value={formData.employment} onChange={handleChange}>
                <option value="">Select</option>
                <option value="employed">Employed</option>
                <option value="self-employed">Self-Employed</option>
                <option value="unemployed">Unemployed</option>
              </select>
              {errors.employment && <span style={{ color: 'red' }}>{errors.employment}</span>}
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4 }}
            >
              <label>Upload Document:</label>
              <input type="file" name="document" onChange={handleChange} />
            </motion.div>
          )}
        </AnimatePresence>

        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          {step > 1 && <button type="button" onClick={prevStep}>Previous</button>}
          {step < 3 && <button type="button" onClick={nextStep} style={{ marginLeft: '10px' }}>Next</button>}
          {step === 3 && <button type="submit" style={{ marginLeft: '10px' }}>Submit Application</button>}
        </div>
      </form>
    </div>
  );
};

export default LoanApplication;
