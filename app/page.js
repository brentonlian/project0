// app/page.js
'use client';

import React, { useState } from 'react';
import InputForm from './InputForm';
import Result from './Result';
import './styles.css';

const Page = () => {
  const [cost, setCost] = useState(null);

  const handleCalculate = ({ amount, unit, year }) => {
    console.log('Calculating cost for:', { amount, unit, year });
  
    /* 
    const costPerUnit = {
      2023: { terabytes: 20, gigabytes: 0.02, megabytes: 0.00002 },
      2020: { terabytes: 30, gigabytes: 0.03, megabytes: 0.00003 },
      2015: { terabytes: 50, gigabytes: 0.05, megabytes: 0.00005 },
      2010: { terabytes: 100, gigabytes: 0.1, megabytes: 0.0001 },
    };
  
    const unitCosts = costPerUnit[year];
    if (unitCosts) {
      const unitCost = unitCosts[unit];
      const totalCost = amount * unitCost;
      setCost(totalCost);
    } else {
      setCost(null);
    }
    */
  };
  

  return (
    <div className="App">
      <h1>Storage Cost Calculator</h1>
      <InputForm onCalculate={handleCalculate} />
      <Result cost={cost} />
    </div>
  );
};

export default Page;
