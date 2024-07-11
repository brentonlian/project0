// app/BudgetCalculator.js
'use client';

import React, { useState, useEffect } from 'react';
import { loadCSV } from '../utils/loadCSV'; // Adjust the path if needed

const BudgetCalculator = () => {
  const [data, setData] = useState([]);
  const [specificBudget, setSpecificBudget] = useState('');
  const [year, setYear] = useState('');
  const [storageType, setStorageType] = useState('Memory');
  const [specificResult, setSpecificResult] = useState(null);

  const [generalBudget, setGeneralBudget] = useState('');
  const [generalResult, setGeneralResult] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const csvData = await loadCSV('/data.csv');
      setData(csvData);
    };
    fetchData();
  }, []);

  const handleSpecificCalculate = () => {
    if (specificBudget && year && storageType) {
      const selectedYearData = data.find(row => row.Year === year);
      if (selectedYearData) {
        const costPerTerabyte = parseFloat(selectedYearData[storageType]);
        if (!isNaN(costPerTerabyte)) {
          const amount = specificBudget / costPerTerabyte;
          setSpecificResult(`${amount.toFixed(2)} TB of ${storageType} storage`);
        } else {
          setSpecificResult('Cost per terabyte is not available for the selected storage type and year.');
        }
      } else {
        setSpecificResult('Data for the selected year is not available.');
      }
    }
  };

  const handleGeneralCalculate = () => {
    if (generalBudget) {
      const possiblePurchases = data.map(row => {
        const year = row.Year;
        const storageTypes = ['Memory', 'Flash', 'HDD', 'SSD'];
        const affordableStorage = storageTypes.map(type => {
          const costPerTerabyte = parseFloat(row[type]);
          if (isNaN(costPerTerabyte)) return null;
          const amount = generalBudget / costPerTerabyte;
          return `${amount.toFixed(2)} TB of ${type} storage`;
        }).filter(item => item !== null);
        return { year, affordableStorage };
      });
      setGeneralResult(possiblePurchases);
    }
  };

  return (
    <div>
      <h1>Budget Calculator</h1>

      {/* Specific Calculation Section */}
      <h2>Specific Storage Calculation</h2>
      <div>
        <label>Budget:</label>
        <input
          type="number"
          value={specificBudget}
          onChange={(e) => setSpecificBudget(e.target.value)}
          required
        />
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
      <button type="button" onClick={handleSpecificCalculate}>Calculate</button>
      {specificResult && (
        <div>
          <h2>Result:</h2>
          <p>{specificResult}</p>
        </div>
      )}

      {/* General Calculation Section */}
      <h2>General Storage Calculation</h2>
      <div>
        <label>Budget:</label>
        <input
          type="number"
          value={generalBudget}
          onChange={(e) => setGeneralBudget(e.target.value)}
          required
        />
      </div>
      <button type="button" onClick={handleGeneralCalculate}>Calculate</button>
      {generalResult && (
        <div>
          <h2>Results:</h2>
          {generalResult.map((item, index) => (
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
