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
      <InputForm onCalculate={handleCalculate} />
      {result && <div>{result}</div>}
    </div>
  );
};

export default Home;
