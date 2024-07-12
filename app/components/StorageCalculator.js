'use client';

import React, { useState, useEffect } from 'react';
import { loadCSV } from '../../utils/loadCSV';

const StorageCalculator = () => {
  const [data, setData] = useState([]);
  const [amount, setAmount] = useState('');
  const [unit, setUnit] = useState('TB');
  const [year, setYear] = useState('');
  const [result, setResult] = useState(null);
  const [storageType, setStorageType] = useState('Memory');
  const [decadeInfo, setDecadeInfo] = useState(null);
  const [decade, setDecade] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const csvData = await loadCSV('/data.csv');
      setData(csvData);
    };
    fetchData();
  }, []);

  const handleCalculate = async () => {
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
        
        const calculatedDecade = getDecade(year);
        setDecade(calculatedDecade);
        const decadeData = await fetchDecadeInfo(calculatedDecade);
        if (decadeData) {
          setDecadeInfo(decadeData);
        } else {
          setDecadeInfo(null);
        }
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

  const getDecade = (year) => {
    const decade = Math.floor(year / 10) * 10;
    return `${decade}s`;
  };

  const fetchDecadeInfo = async (decade) => {
    const response = await fetch('/decadesInfo.json');
    const data = await response.json();
    return data[decade];
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
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
          <option value="TB">TB</option>
          <option value="GB">GB</option>
          <option value="MB">MB</option>
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
      {result !== null && <div>{result}</div>}
      {decadeInfo && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <h2>{decade}</h2>
          <p>{decadeInfo.description}</p>
          <img src={decadeInfo.photo} alt={`${decade} storage`} style={{ width: '300px', height: 'auto' }} />
        </div>
      )}
    </div>
  );
};

export default StorageCalculator;