// app/Home.js
'use client';

import React, { useState, useEffect } from 'react';
import InputForm from './components/InputForm';
import StorageCalculator from './components/StorageCalculator';
import { loadCSV } from '../utils/loadCSV'; // Adjust the path if needed
import styles from '../styles/Home.module.css';

const Home = () => {
  const [data, setData] = useState([]);
  const [result, setResult] = useState(null);
  const [decadeInfo, setDecadeInfo] = useState(null);
  const [decade, setDecade] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const csvData = await loadCSV('/data.csv');
      setData(csvData);
    };
    fetchData();
  }, []);

  const handleCalculate = async ({ amount, unit, year, storageType }) => {
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
    <div className={styles.container}>
      <h1>Home</h1>
      <StorageCalculator />
    </div>
  );
};

export default Home;
