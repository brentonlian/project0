'use client';

import React, { useState, useEffect } from 'react';
import { loadCSV } from '../utils/loadCSV'; // Adjust the import path

const StorageCalculator = () => {
  const [data, setData] = useState([]);
  const [amount, setAmount] = useState('');
  const [unit, setUnit] = useState('terabytes');
  const [year, setYear] = useState('');
  const [result, setResult] = useState(null);
  const [storageType, setStorageType] = useState('Memory');

  useEffect(() => {
    const fetchData = async () => {
      const csvData = await loadCSV('/data.csv');
      setData(csvData);
    };
    fetchData();
  }, []);

  const handleCalculate = () => {
    if (amount && unit && year && storageType) {
      const yearData = data.find((row) => row.Year === year);
      if (yearData) {
        const costPerTerabyte = parseFloat(yearData[storageType]);
        if (isNaN(costPerTerabyte)) {
          setResult("Cost data not available for selected storage type and year.");
          return;
        }
        const amountInTerabytes = convertToTerabytes(parseFloat(amount), unit);
        const totalCost = costPerTerabyte * amountInTerabytes;
        setResult(totalCost);
      } else {
        setResult("Year not found in data.");
      }
    }
  };

  const convertToTerabytes = (amount, unit) => {
    switch (unit) {
      case 'gigabytes':
        return amount / 1024;
      case 'megabytes':
        return amount / (1024 * 1024);
      default:
        return amount;
    }
  };

  return (
    <div>
      <h1>Storage Cost Calculator</h1>
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
      <div>
        <label>Storage Type:</label>
        <select value={storageType} onChange={(e) => setStorageType(e.target.value)}>
          <option value="Memory">Memory</option>
          <option value="Flash">Flash</option>
          <option value="HDD">HDD</option>
          <option value="SSD">SSD</option>
        </select>
      </div>
      <button type="button" onClick={handleCalculate}>Calculate</button>
      {result !== null && <div>The calculated cost is: {isNaN(result) ? result : `$${result.toFixed(2)}`}</div>}
    </div>
  );
};

export default StorageCalculator;
