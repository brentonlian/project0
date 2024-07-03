// app/calculator/page.js
'use client';

import { useState } from 'react';

const Calculator = () => {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [operation, setOperation] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const number1 = parseFloat(num1);
    const number2 = parseFloat(num2);

    let res = null;
    if (operation === 'add') {
      res = number1 + number2;
    } else if (operation === 'subtract') {
      res = number1 - number2;
    } else if (operation === 'multiply') {
      res = number1 * number2;
    } else if (operation === 'divide') {
      res = number1 / number2;
    }

    setResult(res);
  };

  return (
    <div>
      <h1>Calculator</h1>
      <div>
        <label>Number 1:</label>
        <select value={num1} onChange={(e) => setNum1(e.target.value)}>
          <option value="">Select</option>
          {[...Array(10).keys()].map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Operation:</label>
        <select value={operation} onChange={(e) => setOperation(e.target.value)}>
          <option value="">Select</option>
          <option value="add">Add</option>
          <option value="subtract">Subtract</option>
          <option value="multiply">Multiply</option>
          <option value="divide">Divide</option>
        </select>
      </div>
      <div>
        <label>Number 2:</label>
        <select value={num2} onChange={(e) => setNum2(e.target.value)}>
          <option value="">Select</option>
          {[...Array(10).keys()].map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleCalculate}>Calculate</button>
      {result !== null && <h2>Result: {result}</h2>}
    </div>
  );
};

export default Calculator;
