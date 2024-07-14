import React, { useState } from 'react';
import useStorageCalculator from '../hooks/useStorageCalculator';

const InputForm = ({ onCalculate }) => {
  const [amount, setAmount] = useState('');
  const [unit, setUnit] = useState('GB');
  const [year, setYear] = useState('');
  const [storageType, setStorageType] = useState('Memory');
  const {
    result,
    decadeInfo,
    decade,
    handleCalculate,
  } = useStorageCalculator();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount && year) {
      handleCalculate({
        amount: parseFloat(amount),
        unit,
        year: parseInt(year),
        storageType,
      });
    }
  };

  return (
    <div className="container">
      <h1 className="title">Budget Calculator</h1>
      <form onSubmit={handleSubmit} className="section">
        <h2 className="subtitle">Specific Calculation</h2>
        <div>
          <label className="label">Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="input"
          />
        </div>
        <div>
          <label className="label">Unit:</label>
          <select value={unit} onChange={(e) => setUnit(e.target.value)} className="select">
            <option value="TB">TB</option>
            <option value="GB">GB</option>
            <option value="MB">MB</option>
          </select>
        </div>
        <div>
          <label className="label">Year:</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
            className="input"
          />
        </div>
        <div>
          <label className="label">Storage Type:</label>
          <select
            value={storageType}
            onChange={(e) => setStorageType(e.target.value)}
            className="select"
          >
            <option value="Memory">Memory</option>
            <option value="Flash">Flash</option>
            <option value="HDD">HDD</option>
            <option value="SSD">SSD</option>
          </select>
        </div>
        <button type="submit" className="button">Calculate</button>
      </form>
      {result !== null && typeof result === 'string' && (
        <div className="result">
          <h2 className="subtitle">Result</h2>
          <p>{result}</p>
        </div>
      )}
      {decadeInfo && (
        <div className="decade-info">
          <h2 className="subtitle">{decade} Information</h2>
          <p>{decadeInfo.description}</p>
          {decadeInfo.photo && <img src={decadeInfo.photo} alt={`${decade} photo`} />}
        </div>
      )}
    </div>
  );
};

export default InputForm;
