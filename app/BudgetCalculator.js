'use client';

import React, { useState, useEffect } from 'react';
import { loadCSV } from '../utils/loadCSV'; // Adjust the path if needed

const BudgetCalculator = () => {
  const [data, setData] = useState([]);
  const [budget, setBudget] = useState('');
  const [generalResult, setGeneralResult] = useState(null);
  const [specificResult, setSpecificResult] = useState(null);
  const [dollarAmount, setDollarAmount] = useState('');
  const [unit, setUnit] = useState('TB');
  const [year, setYear] = useState('');
  const [storageType, setStorageType] = useState('Memory');
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
      const storageTypes = ['Memory', 'Flash', 'HDD', 'SSD'];
      const possiblePurchases = {};

      storageTypes.forEach(type => {
        data.forEach(row => {
          const year = row.Year;
          const costPerTerabyte = parseFloat(row[type]);
          if (isNaN(costPerTerabyte)) return;
          const convertedBudget = convertFromTerabytes(budget, generalUnit);
          const amount = convertedBudget / costPerTerabyte;
          if (!possiblePurchases[year]) {
            possiblePurchases[year] = [];
          }
          possiblePurchases[year].push(`${amount.toFixed(2)} ${generalUnit} of ${type}`);
        });
      });

      setGeneralResult(possiblePurchases);
    }
  };

  const handleSpecificCalculate = () => {
    if (dollarAmount && unit && year && storageType) {
      const yearData = data.find((row) => row.Year === year);
      if (yearData) {
        const costPerTerabyte = parseFloat(yearData[storageType]);
        if (isNaN(costPerTerabyte)) {
          setSpecificResult("Cost data not available for selected storage type and year.");
          return;
        }
        const amountInTerabytes = parseFloat(dollarAmount) / costPerTerabyte;
        const convertedAmount = convertFromTerabytes(amountInTerabytes, unit);
        const resultMessage = `For $${dollarAmount}, you could buy ${convertedAmount.toFixed(2)} ${unit} of ${storageType} storage in ${year}.`;
        setSpecificResult(resultMessage);
      } else {
        setSpecificResult("Year not found in data.");
      }
    } else {
      setSpecificResult("Please enter all fields.");
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
    <div className="container">
      <h1 className="title">Budget Calculator</h1>
      <div className="section">
        <h2 className="subtitle">General Calculation</h2>
        <div>
          <label className="label">Budget:</label>
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            required
            className="input"
          />
        </div>
        <div>
          <label className="label">Unit:</label>
          <select
            value={generalUnit}
            onChange={(e) => setGeneralUnit(e.target.value)}
            className="select"
          >
            <option value="TB">TB</option>
            <option value="GB">GB</option>
            <option value="MB">MB</option>
          </select>
        </div>
        <button
          type="button"
          onClick={handleGeneralCalculate}
          className="button"
        >
          Calculate
        </button>
        {generalResult && (
          <div>
            <h2 className="subtitle">Results:</h2>
            {Object.keys(generalResult).map(year => (
              <div key={year}>
                <h3>{year}</h3>
                {generalResult[year].map((storageInfo, index) => (
                  <p key={index}>{storageInfo}</p>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="section">
        <h2 className="subtitle">Specific Calculation</h2>
        <div>
          <label className="label">Budget:</label>
          <input
            type="number"
            value={dollarAmount}
            onChange={(e) => setDollarAmount(e.target.value)}
            required
            className="input"
          />
        </div>
        <div>
          <label className="label">Unit:</label>
          <select value={unit} onChange={(e) => setUnit(e.target.value)} className="select">
            <option value="TB">TB</option>
            <option value="GB">GB</option>
            <option value="MB">MB</option>
          </select>
        </div>
        <div>
          <label className="label">Year:</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
            className="input"
          />
        </div>
        <div>
          <label className="label">Storage Type:</label>
          <select
            value={storageType}
            onChange={(e) => setStorageType(e.target.value)}
            className="select"
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
          className="button"
        >
          Calculate
        </button>
        {specificResult !== null && typeof specificResult === 'string' && <div>{specificResult}</div>}
      </div>
    </div>
  );
};

export default BudgetCalculator;
