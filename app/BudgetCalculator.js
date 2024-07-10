// app/BudgetCalculator.js
'use client';

import React, { useState, useEffect } from 'react';
import { loadCSV } from '../utils/loadCSV'; // Adjust the path if needed

const BudgetCalculator = () => {
  const [data, setData] = useState([]);
  const [budget, setBudget] = useState('');
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const csvData = await loadCSV('/data.csv');
      setData(csvData);
    };
    fetchData();
  }, []);

  const handleCalculate = () => {
    if (budget) {
      const possiblePurchases = data.map(row => {
        const year = row.Year;
        const storageTypes = ['Memory', 'Flash', 'HDD', 'SSD'];
        const affordableStorage = storageTypes.map(type => {
          const costPerTerabyte = parseFloat(row[type]);
          if (isNaN(costPerTerabyte)) return null;
          const amount = budget / costPerTerabyte;
          return `${amount.toFixed(2)} TB of ${type} storage`;
        }).filter(item => item !== null);
        return { year, affordableStorage };
      });
      setResult(possiblePurchases);
    }
  };

  return (
    <div>
      <h1>Budget Calculator</h1>
      <div>
        <label>Budget:</label>
        <input
          type="number"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          required
        />
      </div>
      <button type="button" onClick={handleCalculate}>Calculate</button>
      {result && (
        <div>
          <h2>Results:</h2>
          {result.map((item, index) => (
            <div key={index}>
              <h3>{item.year}</h3>
              <ul>
                {item.affordableStorage.map((storage, i) => (
                  <li key={i}>{storage}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BudgetCalculator;
