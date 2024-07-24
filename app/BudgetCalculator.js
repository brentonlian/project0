"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { loadCSV } from '../utils/loadCSV'; // Adjust the path if needed
import '../styles/globals.css'; // Ensure global styles are imported

const BudgetCalculator = () => {
  const [data, setData] = useState([]);
  const [generalResult, setGeneralResult] = useState(null);
  const [specificResult, setSpecificResult] = useState(null);
  const [yearNotFound, setYearNotFound] = useState(false);
  const [specificYearNotFound, setSpecificYearNotFound] = useState(false);
  const [storageTypeNotAvailable, setStorageTypeNotAvailable] = useState(false);
  const [formData, setFormData] = useState({
    dollarAmount: '',
    unit: 'TB',
    year: '',
    storageType: 'Memory',
    generalUnit: 'TB',
    generalYear: '',
    budget: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      const csvData = await loadCSV('/data.csv');
      setData(csvData);
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Updating field: ${name} with value: ${value}`);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const findCostPerTerabyte = (year, type) => {
    const yearData = data.find(row => row.Year === year);
    return yearData ? parseFloat(yearData[type]) : NaN;
  };

  const calculateStorageAmount = (dollarAmount, unit, year, storageType) => {
    const costPerTerabyte = findCostPerTerabyte(year, storageType);
    if (isNaN(costPerTerabyte)) {
      return null;
    }
    const amountInTerabytes = parseFloat(dollarAmount) / costPerTerabyte;
    return convertFromTerabytes(amountInTerabytes, unit);
  };

  const handleGeneralCalculate = useCallback((e) => {
    e.preventDefault();
    const { budget, generalUnit, generalYear } = formData;
    console.log('General calculation triggered:', formData);
    
    if (budget && generalYear) {
      const storageTypes = ['Memory', 'Flash', 'HDD', 'SSD'];
      const possiblePurchases = [];

      let yearExists = false;
      storageTypes.forEach(type => {
        const amount = calculateStorageAmount(budget, generalUnit, generalYear, type);
        if (amount !== null) {
          possiblePurchases.push(`${amount.toFixed(2)} ${generalUnit} of ${type}`);
          yearExists = true;
        }
      });

      setYearNotFound(!yearExists);
      setGeneralResult(yearExists ? { budget: budget, year: generalYear, purchases: possiblePurchases } : null);
    }
  }, [formData, data]);

  const handleSpecificCalculate = useCallback((e) => {
    e.preventDefault();
    const { dollarAmount, unit, year, storageType } = formData;
    console.log('Specific calculation triggered:', formData);

    if (dollarAmount && unit && year && storageType) {
      const yearData = data.find(row => row.Year === year);
      if (!yearData) {
        setSpecificYearNotFound(true);
        setStorageTypeNotAvailable(false);
        setSpecificResult(null);
        return;
      }

      const costPerTerabyte = parseFloat(yearData[storageType]);
      if (isNaN(costPerTerabyte)) {
        setStorageTypeNotAvailable(true);
        setSpecificYearNotFound(false);
        setSpecificResult(null);
        return;
      }

      const amountInTerabytes = parseFloat(dollarAmount) / costPerTerabyte;
      const convertedAmount = convertFromTerabytes(amountInTerabytes, unit);
      const resultMessage = `For $${dollarAmount} in ${year}, you could buy ${convertedAmount.toFixed(2)} ${unit} of ${storageType} storage.`;

      setSpecificYearNotFound(false);
      setStorageTypeNotAvailable(false);
      setSpecificResult(resultMessage);
    } else {
      setSpecificResult("Please enter all fields.");
    }
  }, [formData, data]);

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

  const resetGeneralForm = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      budget: '',
      generalUnit: 'TB',
      generalYear: '',
    }));
    setGeneralResult(null);
    setYearNotFound(false);
  };

  const resetSpecificForm = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      dollarAmount: '',
      unit: 'TB',
      year: '',
      storageType: 'Memory',
    }));
    setSpecificResult(null);
    setSpecificYearNotFound(false);
    setStorageTypeNotAvailable(false);
  };

  return (
    <div className="calculator-container">
      {/* General Calculation Form */}
      <div className="section">
        <h2 className="subtitle">Reverse Calculation</h2>
        <h3 className="subtitle">Enter budget, storage unit, and year</h3>
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
          <button type="button" className="button" onClick={resetGeneralForm}>Reset</button>
        </form>
      </div>

      <div>
        {yearNotFound && <div style={{ color: 'black' }}>Year not found in data.</div>}
        {generalResult && (
          <div>
            <h2>For ${generalResult.budget} in {generalResult.year} you could purchase:</h2>
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
        <h3 className="subtitle">Enter budget, storage unit, year, and storage type</h3>
        <form className="calculator-form" onSubmit={handleSpecificCalculate}>
          <input
            type="number"
            name="dollarAmount"
            value={formData.dollarAmount}
            onChange={handleChange}
            placeholder="Budget"
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
          <button type="button" className="button" onClick={resetSpecificForm}>Reset</button>
        </form>
      </div>

      <div>
        {specificYearNotFound && <div style={{ color: 'black' }}>Year not found in data.</div>}
        {storageTypeNotAvailable && <div style={{ color: 'black' }}>Selected storage type not available for the selected year.</div>}
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
