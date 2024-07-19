import React, { useState } from 'react';
import useStorageCalculator from '../hooks/useStorageCalculator';
import '../../styles/globals.css'; 

const InputForm = () => {
  const { result, decadeInfo, decade, handleCalculate, loading, error } = useStorageCalculator();
  const [formData, setFormData] = useState({ amount: '', unit: 'TB', year: '', storageType: 'HDD' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCalculate(formData);
  };

  const resetForm = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      amount: '',
      unit: '',
      year:'TB',
      year: '',
      storageType: 'HDD',
    }))};

  return (
    <div className="calculator-container">
      <form className="calculator-form" onSubmit={handleSubmit}>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Amount of storage"
        />
        <select name="unit" value={formData.unit} onChange={handleChange}>
          <option value="TB">TB</option>
          <option value="GB">GB</option>
          <option value="MB">MB</option>
        </select>
        <input
          type="number"
          name="year"
          value={formData.year}
          onChange={handleChange}
          placeholder="Year"
        />
        <select name="storageType" value={formData.storageType} onChange={handleChange}>
          <option value="HDD">HDD</option>
          <option value="SSD">SSD</option>
          <option value="Flash">Flash</option>
          <option value="Memory">Memory</option>
        </select>
        <button type="submit">Calculate</button>
        <button type="button" className="button" onClick={resetForm}>Reset</button>
      </form>
      {loading && <div>Loading data...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {result && <div>{result}</div>}
      {decadeInfo && (
        <div className="decades-info">
          <h3>{decade}</h3>
          <p>{decadeInfo.description}</p>
          <img src={decadeInfo.photo} alt={`${decade} info`} />
        </div>
      )}
    </div>
  );
};

export default InputForm;
