'use client';

import React, { useState } from 'react';
import InputForm from './components/InputForm';

const Home = () => {
  const [result, setResult] = useState(null);

  const handleCalculate = (calculationResult) => {
    setResult(calculationResult);
  };

  return (
    <div>
      <h1>Home Page</h1>
      <InputForm onCalculate={handleCalculate} />
      {result && <div>{result}</div>}
    </div>
  );
};

export default Home;
