'use client';

import React, { useState } from 'react';
import { BudgetCalculator } from '../BudgetCalculator';

const InputForm = ({ onCalculate }) => {
  const [amount, setAmount] = useState('');
  const [unit, setUnit] = useState('terabytes');
  const [year, setYear] = useState('');
  const [storageType, setStorageType] = useState('Memory');

  const budgetCalculator = BudgetCalculator();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount && year) {
      const result = budgetCalculator.calculateStorageCost({ amount: parseFloat(amount), unit, year: parseInt(year), storageType });
      onCalculate(result);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container" style={{ textAlign: 'center' }}>
      <div className="section">
        <label className="label">Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          className="input"
        />
      </div>
      <div className="section">
        <label className="label">Unit:</label>
        <select value={unit} onChange={(e) => setUnit(e.target.value)} className="select">
          <option value="terabytes">TB</option>
          <option value="gigabytes">GB</option>
          <option value="megabytes">MB</option>
        </select>
      </div>
      <div className="section">
        <label className="label">Year:</label>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
          className="input"
        />
      </div>
      <div className="section">
        <label className="label">Storage Type:</label>
        <select value={storageType} onChange={(e) => setStorageType(e.target.value)} className="select">
          <option value="Memory">Memory</option>
          <option value="Flash">Flash</option>
          <option value="HDD">HDD</option>
          <option value="SSD">SSD</option>
        </select>
      </div>
      <button type="submit" className="button">Calculate</button>
    </form>
  );
};

export default InputForm;
