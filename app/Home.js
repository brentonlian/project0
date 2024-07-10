// Home.js
import React from 'react';
import InputForm from './components/InputForm';
import styles from '../styles/Home.module.css';

const Home = () => {
  const handleCalculate = (data) => {
    console.log('Calculation data:', data);
    // Handle the calculation logic here
  };

  return (
    <div>

      <InputForm onCalculate={handleCalculate} />
    </div>
  );
};

export default Home;
