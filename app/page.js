'use client';

import React, { useState } from 'react';
import InputForm from '../components/InputForm';
import StorageCalculator from './StorageCalculator';

const Home = () => {
  const [formData, setFormData] = useState(null);

  const handleCalculate = (data) => {
    setFormData(data);
  };

  return (
    <div>
      <h1>Home Page</h1>
      <InputForm onCalculate={handleCalculate} />
      {formData && <StorageCalculator formData={formData} />}
    </div>
  );
};

export default Home;
