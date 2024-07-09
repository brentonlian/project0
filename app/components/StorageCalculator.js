'use client';

import React, { useState, useEffect } from 'react';
import { loadCSV } from '../../utils/loadCSV';

const StorageCalculator = ({ calculation }) => {
  const [data, setData] = useState([]);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const csvData = await loadCSV('/data.csv');
      setData(csvData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (calculation) {
      const { amount, unit, year } = calculation;
      const yearData = data.find((row) => row.Year === year.toString());
      if (yearData) {
        const costPerTerabyte = parseFloat(yearData.Memory); // Change 'Memory' to the correct storage type key
        if (isNaN(costPerTerabyte)) {
          setResult("Cost data not available for the selected year.");
          return;
        }
        const amountInTerabytes = convertToTerabytes(amount, unit);
        const totalCost = costPerTerabyte * amountInTerabytes;
        setResult(`The estimated cost of ${amount} ${unit} of storage in ${year} was $${totalCost.toFixed(2)}`);
      } else {
        setResult("Year not found in data.");
      }
    }
  }, [calculation, data]);

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
    <div style={{ textAlign: 'center' }}>
      {result && <p>{result}</p>}
    </div>
  );
};

export default StorageCalculator;