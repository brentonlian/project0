// hooks/useStorageCalculator.js
'use client';

import { useState, useEffect } from 'react';
import { loadCSV } from '../../utils/loadCSV';

const useStorageCalculator = () => {
  const [data, setData] = useState([]);
  const [result, setResult] = useState(null);
  const [decadeInfo, setDecadeInfo] = useState(null);
  const [decade, setDecade] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const csvData = await loadCSV('/data.csv');
        setData(csvData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load data.');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCalculate = async ({ amount, unit, year, storageType }) => {
    if (loading) {
      setResult("Data is still loading. Please try again.");
      return;
    }

    const parsedYear = parseInt(year, 10);
    const yearData = data.find((row) => parseInt(row.Year, 10) === parsedYear);
    if (yearData) {
      const costPerTerabyteStr = yearData[storageType];
      //fix issues with data types
      const costPerTerabyte = parseFloat(costPerTerabyteStr);
      if (isNaN(costPerTerabyte)) {
        //nullify results
        setResult("Cost data not available for selected storage type and year.");
        setDecadeInfo(null);
        setDecade('');
        return;
      }
      const amountInTerabytes = convertToTerabytes(parseFloat(amount), unit);
      const totalCost = costPerTerabyte * amountInTerabytes;
      const resultMessage = `The estimated cost of ${amount} ${unit} of ${storageType} storage in ${year} was $${totalCost.toFixed(2)} in 2023 USD.`;
      setResult(resultMessage);

      const calculatedDecade = getDecade(parsedYear);
      setDecade(calculatedDecade);
      const decadeData = await fetchDecadeInfo(calculatedDecade);
      if (decadeData) {
        setDecadeInfo(decadeData);
      } else {
        setDecadeInfo(null);
      }
    } else {
      //nullify results
      setResult(`Year ${year} not found in data.`);
      setDecadeInfo(null);
      setDecade('');
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
    try {
      const response = await fetch('/decadesInfo.json');
      if (!response.ok) {
        throw new Error('Failed to fetch decade info.');
      }
      const data = await response.json();
      return data[decade];
    } catch (err) {
      setError('Failed to load decade info.');
      return null;
    }
  };

  const reset = () => {
    setResult(null);
    setDecadeInfo(null);
    setDecade('');
    setError(null);
  };

  return {
    result,
    decadeInfo,
    decade,
    handleCalculate,
    loading,
    error,
    reset,
  };
};

export default useStorageCalculator;
