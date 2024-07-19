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
      <h1 className="centered-text">Find out how much storage cost in the past</h1>
      <InputForm onCalculate={handleCalculate} />
      {result && <div>{result}</div>}
    </div>
  );
};

export default Home;
