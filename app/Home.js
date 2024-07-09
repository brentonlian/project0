import React, { useState } from 'react';
import Header from './components/Header';
import InputForm from './components/InputForm';
import StorageCalculator from './components/StorageCalculator';

const Home = () => {
  const [calculation, setCalculation] = useState(null);

  const handleCalculate = (data) => {
    setCalculation(data);
  };

  return (
    <div>
      <Header />
      <div style={{ textAlign: 'center' }}>
        <InputForm onCalculate={handleCalculate} />
        <StorageCalculator calculation={calculation} />
      </div>
    </div>
  );
};

export default Home;
