'use client';

import React, { useState, useEffect } from 'react';
import { loadCSV } from '../utils/loadCSV'; // Adjust the path if needed
import styles from './BudgetCalculator.module.css'; // Import the CSS module

const BudgetCalculator = () => {
  const [data, setData] = useState([]);
  const [budget, setBudget] = useState('');
  const [result, setResult] = useState(null);
  const [amount, setAmount] = useState('');
  const [unit, setUnit] = useState('TB');
  const [year, setYear] = useState('');
  const [storageType, setStorageType] = useState('Memory');
  const [generalStorageType, setGeneralStorageType] = useState('Memory');
  const [generalUnit, setGeneralUnit] = useState('TB');

  useEffect(() => {
    const fetchData = async () => {
      const csvData = await loadCSV('/data.csv');
      setData(csvData);
    };
    fetchData();
  }, []);

  const handleGeneralCalculate = () => {
    if (budget) {
      const possiblePurchases = data.map(row => {
        const year = row.Year;
        const costPerTerabyte = parseFloat(row[generalStorageType]);
        if (isNaN(costPerTerabyte)) return null;
        const convertedBudget = convertFromTerabytes(budget, generalUnit);
        const amount = convertedBudget / costPerTerabyte;
        return {
          year,
          affordableStorage: `${amount.toFixed(2)} ${generalUnit} of ${generalStorageType} storage`
        };
      }).filter(item => item !== null);
      setResult(possiblePurchases);
    }
  };

  const handleSpecificCalculate = () => {
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
        const resultMessage = `The estimated cost of ${amount} ${unit} of ${storageType} storage in ${year} was $${totalCost.toFixed(2)}.`;
        setResult(resultMessage);
      } else {
        setResult("Year not found in data.");
      }
    } else {
      setResult("Please enter all fields.");
    }
  };

  const convertToTerabytes = (amount, unit) => {
    switch (unit) {
      case 'GB':
        return amount / 1024;
      case 'MB':
        return amount / (1024 * 1024);
      default:
        return amount;
    }
  };

  const convertFromTerabytes = (amount, unit) => {
    switch (unit) {
      case 'GB':
        return amount * 1024;
      case 'MB':
        return amount * (1024 * 1024);
      default:
        return amount;
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Budget Calculator</h1>
      <div className={styles.section}>
        <h2 className={styles.subtitle}>General Calculation</h2>
        <div>
          <label className={styles.label}>Budget:</label>
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div>
          <label className={styles.label}>Unit:</label>
          <select
            value={generalUnit}
            onChange={(e) => setGeneralUnit(e.target.value)}
            className={styles.select}
          >
            <option value="TB">TB</option>
            <option value="GB">GB</option>
            <option value="MB">MB</option>
          </select>
        </div>
        <div>
          <label className={styles.label}>Storage Type:</label>
          <select
            value={generalStorageType}
            onChange={(e) => setGeneralStorageType(e.target.value)}
            className={styles.select}
          >
            <option value="Memory">Memory</option>
            <option value="Flash">Flash</option>
            <option value="HDD">HDD</option>
            <option value="SSD">SSD</option>
          </select>
        </div>
        <button
          type="button"
          onClick={handleGeneralCalculate}
          className={styles.button}
        >
          Calculate
        </button>
        {result && Array.isArray(result) && (
          <div>
            <h2 className={styles.subtitle}>Results:</h2>
            {result.map((item, index) => (
              <div key={index}>
                <h3>{item.year}</h3>
                <p>{item.affordableStorage}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={styles.section}>
        <h2 className={styles.subtitle}>Specific Calculation</h2>
        <div>
          <label className={styles.label}>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div>
          <label className={styles.label}>Unit:</label>
          <select value={unit} onChange={(e) => setUnit(e.target.value)} className={styles.select}>
            <option value="TB">TB</option>
            <option value="GB">GB</option>
            <option value="MB">MB</option>
          </select>
        </div>
        <div>
          <label className={styles.label}>Year:</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div>
          <label className={styles.label}>Storage Type:</label>
          <select
            value={storageType}
            onChange={(e) => setStorageType(e.target.value)}
            className={styles.select}
          >
            <option value="Memory">Memory</option>
            <option value="Flash">Flash</option>
            <option value="HDD">HDD</option>
            <option value="SSD">SSD</option>
          </select>
        </div>
        <button
          type="button"
          onClick={handleSpecificCalculate}
          className={styles.button}
        >
          Calculate
        </button>
        {result !== null && typeof result === 'string' && <div>{result}</div>}
      </div>
    </div>
  );
};

export default BudgetCalculator;
