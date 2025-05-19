import "./styles.css";

import React, { useState } from 'react';

export default function App() {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const reset = () => {
  setLoanAmount('');
  setInterestRate('');
  setLoanTerm('');
  setResult(null);
  setError('');
  }


  const calculateMortgage = () => {
    const loan = parseFloat(loanAmount);
    const rate = parseFloat(interestRate);
    const term = parseInt(loanTerm);

    // Reset messages
    setError('');
    setResult(null);

    if (isNaN(loan) || loan <= 0 ||
        isNaN(rate) || rate <= 0 ||
        isNaN(term) || term <= 0) {
      setError('Please enter valid positive numbers for all fields.');
      return;
    }

    const principal = loan;
    const monthlyRate = rate / 100 / 12;
    const totalPayments = term * 12;

    const numerator = monthlyRate * Math.pow(1 + monthlyRate, totalPayments);
    const denominator = Math.pow(1 + monthlyRate, totalPayments) - 1;
    const monthlyPayment = principal * (numerator / denominator);

    const totalPayment = monthlyPayment * totalPayments;
    const totalInterest = totalPayment - principal;

    setResult({
      monthlyPayment: monthlyPayment.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2)
    });
  };

  return (
    <div className="calculator" style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>Mortgage Calculator</h2>

      <label>Loan Amount ($)</label>
      <input
        type="text"
        value={loanAmount}
        onChange={(e) => setLoanAmount(e.target.value)}
        placeholder="e.g. 200000"
      />

      <label>Annual Interest Rate (%)</label>
      <input
        type="text"
        value={interestRate}
        onChange={(e) => setInterestRate(e.target.value)}
        placeholder="e.g. 5"
      />

      <label>Loan Term (years)</label>
      <input
        type="text"
        value={loanTerm}
        onChange={(e) => setLoanTerm(e.target.value)}
        placeholder="e.g. 30"
      />

      <button onClick={calculateMortgage}>Calculate</button>
      <button onClick={reset}>Reset</button>

      {error && <div style={{ color: 'red', marginTop: 10 }}>{error}</div>}

      {result && (
        <div style={{ marginTop: 20, backgroundColor: '#e9f7ef', padding: 10 }}>
          <strong>Monthly Payment:</strong> ${result.monthlyPayment}<br />
          <strong>Total Payment:</strong> ${result.totalPayment}<br />
          <strong>Total Interest Paid:</strong> ${result.totalInterest}
        </div>
      )}
    </div>
  );
}

