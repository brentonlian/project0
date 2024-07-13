// app/Home.js
'use client';

import React from 'react';
import InputForm from './components/InputForm';
import useStorageCalculator from './hooks/useStorageCalculator';
import styles from '../styles/Home.module.css';

const Home = () => {
  const { result, decadeInfo, decade, handleCalculate } = useStorageCalculator();

  return (
    <div className={styles.container}>
      <InputForm onCalculate={handleCalculate} />
      {result && <div className={styles.result}>{result}</div>}
      {decadeInfo && (
        <div className={styles.decadeInfo}>
          <h2>{decade}</h2>
          <p>{decadeInfo.description}</p>
          <img src={decadeInfo.photo} alt={`${decade} storage`} style={{ width: '300px', height: 'auto' }} />
        </div>
      )}
    </div>
  );
};

export default Home;
