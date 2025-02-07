// src/pages/LoanComparison.jsx
import React, { useState } from 'react';

const loanOptions = [
  { id: 1, type: 'Personal Loan', interest: 5.5, term: 36 },
  { id: 2, type: 'Student Loan', interest: 4.2, term: 60 },
  { id: 3, type: 'Mortgage', interest: 3.8, term: 360 },
];

const LoanComparison = () => {
  const [amount, setAmount] = useState(10000);
  const [selectedLoan, setSelectedLoan] = useState(loanOptions[0]);

  const calculatePayment = (principal, interest, term) => {
    const monthlyRate = interest / 100 / 12;
    return (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -term));
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Loan Comparison</h2>
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <label style={{ marginRight: '10px' }}>Loan Amount: </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{ width: '150px', padding: '5px' }}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Loan Type</th>
            <th>Interest (%)</th>
            <th>Term (months)</th>
            <th>Est. Monthly Payment</th>
          </tr>
        </thead>
        <tbody>
          {loanOptions.map((loan) => {
            const payment = calculatePayment(amount, loan.interest, loan.term).toFixed(2);
            return (
              <tr
                key={loan.id}
                style={{
                  backgroundColor: selectedLoan.id === loan.id ? '#e0f7fa' : 'transparent',
                }}
                onClick={() => setSelectedLoan(loan)}
              >
                <td>{loan.type}</td>
                <td>{loan.interest}</td>
                <td>{loan.term}</td>
                <td>${payment}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <p>
          Selected Loan: <strong>{selectedLoan.type}</strong>
        </p>
        <button onClick={() => alert('Proceeding with this loan option')}>
          Apply for this Loan
        </button>
      </div>
    </div>
  );
};

export default LoanComparison;
