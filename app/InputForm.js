'use client';

import React, { useState } from 'react';

const InputForm = ({ onCalculate }) => {
  const [amount, setAmount] = useState('');
  const [unit, setUnit] = useState('terabytes');
  const [year, setYear] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount && year) {
      onCalculate({ amount: parseFloat(amount), unit, year: parseInt(year) });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Unit:</label>
        <select value={unit} onChange={(e) => setUnit(e.target.value)}>
          <option value="terabytes">Terabytes</option>
          <option value="gigabytes">Gigabytes</option>
          <option value="megabytes">Megabytes</option>
        </select>
      </div>
      <div>
        <label>Year:</label>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
        />
      </div>
      <button type="submit">Calculate</button>
    </form>
  );
};

export default InputForm;
