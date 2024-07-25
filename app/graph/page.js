'use client';

import React, { useState, useEffect } from 'react';
import { loadCSV } from '../../utils/loadCSV';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

// Storage types and colors
const storageTypes = {
  Memory: '#ff6347', // Tomato
  Flash: '#4682b4', // SteelBlue
  HDD: '#32cd32', // LimeGreen
  SSD: '#ffa500' // Orange
};
const units = ['TB', 'GB', 'MB'];
const decades = ['1950', '1960', '1970', '1980', '1990', '2000', '2010', '2020'];

const convertToUnit = (value, unit) => {
  switch (unit) {
    case 'GB':
      return value / 1024; 
    case 'MB':
      return value / (1024 * 1024); 
    default:
      return value; // Already in TB
  }
};

const GraphPage = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDecades, setSelectedDecades] = useState([decades[0]]);
  const [selectedStorageTypes, setSelectedStorageTypes] = useState([Object.keys(storageTypes)[0]]);
  const [selectedUnit, setSelectedUnit] = useState(units[0]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const csvData = await loadCSV('/data.csv');
        setData(csvData);
        filterDataByDecadesAndStorageTypes(csvData, selectedDecades, selectedStorageTypes);
        setLoading(false);
      } catch (err) {
        setError('Failed to load data.');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    filterDataByDecadesAndStorageTypes(data, selectedDecades, selectedStorageTypes);
  }, [selectedDecades, selectedStorageTypes, selectedUnit, data]);

  const filterDataByDecadesAndStorageTypes = (data, decades, storageTypes) => {
    const filtered = data.filter(row => {
      const year = parseInt(row.Year, 10);
      //return selected decades and types
      return decades.some(decade => {
        const startYear = parseInt(decade, 10);
        const endYear = startYear + 9;
        return year >= startYear && year <= endYear;
      }) && storageTypes.some(storageType => row[storageType]);
    }).map(row => {
      const cleanedRow = { Year: row.Year };
      storageTypes.forEach(storageType => {
        if (row[storageType]) {
          cleanedRow[storageType] = convertToUnit(parseFloat(row[storageType]), selectedUnit);
        }
      });
      return cleanedRow;
    });
    setFilteredData(filtered);
  };

  const handleDecadeClick = (decade) => {
    setSelectedDecades(prevDecades =>
      prevDecades.includes(decade) ? prevDecades.filter(d => d !== decade) : [...prevDecades, decade]
    );
  };

  const handleStorageTypeClick = (type) => {
    setSelectedStorageTypes(prevTypes =>
      prevTypes.includes(type) ? prevTypes.filter(t => t !== type) : [...prevTypes, type]
    );
  };

  const handleUnitClick = (unit) => {
    setSelectedUnit(unit);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center'
    }}>
      <h1 style={{ marginBottom: '1rem' }}>Storage Costs Over Time</h1>
      <h3 style={{ marginBottom: '1rem' }}>2023 US Dollars per Unit</h3>

      {/* Decades Section */}
      <div style={{ marginBottom: '1rem' }}>
        <h2>Decades</h2>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          {decades.map(decade => (
            <button
              key={decade}
              onClick={() => handleDecadeClick(decade)}
              style={{
                padding: '0.5rem 1rem',
                margin: '0.2rem',
                backgroundColor: selectedDecades.includes(decade) ? '#007bff' : '#e0e0e0',
                color: selectedDecades.includes(decade) ? '#fff' : '#000',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                minWidth: '60px',
                height: '40px'
              }}
            >
              {decade}
            </button>
          ))}
        </div>
      </div>

      {/* Storage Types Section */}
      <div style={{ marginBottom: '1rem' }}>
        <h2>Storage Types</h2>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          {Object.keys(storageTypes).map(type => (
            <button
              key={type}
              onClick={() => handleStorageTypeClick(type)}
              style={{
                padding: '0.5rem 1rem',
                margin: '0.2rem',
                backgroundColor: selectedStorageTypes.includes(type) ? storageTypes[type] : '#e0e0e0',
                color: selectedStorageTypes.includes(type) ? '#fff' : '#000',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                minWidth: '60px',
                height: '40px'
              }}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Unit Section */}
      <div style={{ marginBottom: '1rem' }}>
        <h2>Unit</h2>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          {units.map(unit => (
            <button
              key={unit}
              onClick={() => handleUnitClick(unit)}
              style={{
                padding: '0.5rem 1rem',
                margin: '0.2rem',
                backgroundColor: selectedUnit === unit ? '#007bff' : '#e0e0e0',
                color: selectedUnit === unit ? '#fff' : '#000',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                minWidth: '60px',
                height: '40px'
              }}
            >
              {unit}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          width={500}
          height={300}
          data={filteredData}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Year" />
          <YAxis />
          <Tooltip />
          <Legend />
          {selectedStorageTypes.map(type => (
            <Line
              key={type}
              type="monotone"
              dataKey={type}
              stroke={storageTypes[type] || '#8884d8'}
              strokeWidth={2}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraphPage;
