'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import InputForm from './InputForm';

const HomePage = () => {
  const router = useRouter();

  const handleCalculate = ({ amount, unit, year }) => {
    // Example calculation logic
    const calculatedResult = amount * 10; // Replace with your actual calculation logic

    // Redirect to the results page with the calculation result
    router.push(`/result?amount=${amount}&unit=${unit}&year=${year}&result=${calculatedResult}`);
  };

  return (
    <div>
      <h1>Storage Cost Calculator</h1>
      <InputForm onCalculate={handleCalculate} />
    </div>
  );
};

export default HomePage;
