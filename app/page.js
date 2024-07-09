'use client';

import React, { useState, useEffect } from 'react';
import { loadCSV } from '../utils/loadCSV'; // Adjust the import path

const StorageCalculator = ({ formData }) => {
  const [data, setData] = useState([]);
  const [result, setResult] = useState(null);
  const [decade, setDecade] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const csvData = await loadCSV('/data.csv');
      console.log("CSV Data Loaded:", csvData);
      setData(csvData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (formData) {
      calculateCost(formData);
    }
  }, [formData, data]);

  const calculateCost = ({ amount, unit, year, storageType }) => {
    if (amount && unit && year && storageType) {
      console.log("Year being searched:", year);
      console.log("Data available:", data);

      const yearData = data.find((row) => row.Year.toString() === year.toString());
      console.log("Year Data Found:", yearData);

      if (yearData) {
        const costPerTerabyte = parseFloat(yearData[storageType]);
        if (isNaN(costPerTerabyte)) {
          setResult("Cost data not available for selected storage type and year.");
          return;
        }
        const amountInTerabytes = convertToTerabytes(parseFloat(amount), unit);
        const totalCost = costPerTerabyte * amountInTerabytes;
        setResult(`The estimated cost of ${amount} ${unit} of ${storageType} storage in ${year} was $${totalCost.toFixed(2)}.`);
      } else {
        setResult("Year not found in data.");
      }

      // Set the decade based on the year
      const decadeStart = Math.floor(year / 10) * 10;
      setDecade(`${decadeStart}s`);
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
      {result && <div>{result}</div>}
      {decade && <div>Decade: {decade}</div>}
    </div>
  );
};

export default StorageCalculator;
