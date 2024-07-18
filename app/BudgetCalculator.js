'use client';

import React, { useState, useEffect } from 'react';
import { loadCSV } from '../utils/loadCSV'; // Adjust the path if needed
import '../styles/globals.css'; // Ensure global styles are imported

const BudgetCalculator = () => {
  const [data, setData] = useState([]);
  const [budget, setBudget] = useState('');
  const [generalResult, setGeneralResult] = useState(null);
  const [specificResult, setSpecificResult] = useState(null);
  const [years, setYears] = useState([]);
  const [formData, setFormData] = useState({
    dollarAmount: '',
    unit: 'TB',
    year: '',
    storageType: 'Memory',
    generalUnit: 'TB',
    generalYear: '',
    budget: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      const csvData = await loadCSV('/data.csv');
      setData(csvData);
      const availableYears = csvData.map(row => row.Year);
      setYears(availableYears);
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGeneralCalculate = (e) => {
    e.preventDefault();
    const { budget, generalUnit, generalYear } = formData;
    if (budget && generalYear) {
      const storageTypes = ['Memory', 'Flash', 'HDD', 'SSD'];
      const possiblePurchases = [];

      storageTypes.forEach(type => {
        data.forEach(row => {
          if (row.Year === generalYear) {
            const costPerTerabyte = parseFloat(row[type]);
            if (isNaN(costPerTerabyte)) return;
            const convertedBudget = convertFromTerabytes(budget, generalUnit);
            const amount = convertedBudget / costPerTerabyte;
            possiblePurchases.push(`${amount.toFixed(2)} ${generalUnit} of ${type}`);
          }
        });
      });

      setGeneralResult({ year: generalYear, purchases: possiblePurchases });
    }
  };

  const handleSpecificCalculate = (e) => {
    e.preventDefault();
    const { dollarAmount, unit, year, storageType } = formData;
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
    <div className="calculator-container">
      
      {/* General Calculation Form */}
      <div className="section">
        <h2 className="subtitle">General Calculation</h2>
        <form className="calculator-form" onSubmit={handleGeneralCalculate}>
          <input
            type="number"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            placeholder="Budget"
            required
            className="input"
          />
          <select
            name="generalUnit"
            value={formData.generalUnit}
            onChange={handleChange}
            className="select"
          >
            <option value="TB">TB</option>
            <option value="GB">GB</option>
            <option value="MB">MB</option>
          </select>
          <input
            type="number"
            name="generalYear"
            value={formData.generalYear}
            onChange={handleChange}
            placeholder="Year"
            required
            className="input"
          />
          <button type="submit" className="button">Calculate</button>
        </form>
      </div>
      
      <div>
        {generalResult && (
          <div>
            <h2>Results for {generalResult.year}:</h2>
            <div>
              {generalResult.purchases.map((result, index) => (
                <div key={index}>
                  <p>{result}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Specific Calculation Form */}
      <div className="section">
        <h2 className="subtitle">Specific Calculation</h2>
        <form className="calculator-form" onSubmit={handleSpecificCalculate}>
          <input
            type="number"
            name="dollarAmount"
            value={formData.dollarAmount}
            onChange={handleChange}
            placeholder="Dollar Amount"
            required
            className="input"
          />
          <select name="unit" value={formData.unit} onChange={handleChange} className="select">
            <option value="TB">TB</option>
            <option value="GB">GB</option>
            <option value="MB">MB</option>
          </select>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            placeholder="Year"
            required
            className="input"
          />
          <select name="storageType" value={formData.storageType} onChange={handleChange} className="select">
            <option value="Memory">Memory</option>
            <option value="Flash">Flash</option>
            <option value="HDD">HDD</option>
            <option value="SSD">SSD</option>
          </select>
          <button type="submit" className="button">Calculate</button>
        </form>
      </div>
      
      <div>
        {specificResult !== null && typeof specificResult === 'string' && (
          <div>
            {specificResult}
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetCalculator;
