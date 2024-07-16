'use client';

import { useState, useEffect } from 'react';
import { loadCSV } from '../../utils/loadCSV';

const useStorageCalculator = () => {
  const [data, setData] = useState([]);
  const [result, setResult] = useState(null);
  const [decadeInfo, setDecadeInfo] = useState(null);
  const [decade, setDecade] = useState('');
  const [loading, setLoading] = useState(true); // State for loading indication
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchData = async () => {
      try {
        const csvData = await loadCSV('/data.csv');
        setData(csvData);
        setLoading(false);
        console.log('Loaded data:', csvData); // Debug: log loaded data
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

    console.log('Selected storage type:', storageType); // Debug: log storage type
    const parsedYear = parseInt(year, 10);
    const yearData = data.find((row) => parseInt(row.Year, 10) === parsedYear);
    if (yearData) {
      console.log('Year data:', yearData); // Debug: log year data
      console.log('Available storage types:', Object.keys(yearData)); // Debug: log available storage types
      const costPerTerabyteStr = yearData[storageType];
      console.log('Cost per terabyte (raw):', costPerTerabyteStr); // Debug: log raw cost per terabyte
      const costPerTerabyte = parseFloat(costPerTerabyteStr);
      console.log('Cost per terabyte (parsed):', costPerTerabyte); // Debug: log parsed cost per terabyte
      if (isNaN(costPerTerabyte)) {
        setResult("Cost data not available for selected storage type and year.");
        return;
      }
      const amountInTerabytes = convertToTerabytes(parseFloat(amount), unit);
      const totalCost = costPerTerabyte * amountInTerabytes;
      const resultMessage = `The estimated cost of ${amount} ${unit} of ${storageType} storage in ${year} was $${totalCost.toFixed(2)}.`;
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
      setResult(`Year ${year} not found in data.`);
      console.log('Year not found:', year, data); // Debug: log year and data
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

  return {
    result,
    decadeInfo,
    decade,
    handleCalculate,
    loading,
    error,
  };
};

export default useStorageCalculator;
