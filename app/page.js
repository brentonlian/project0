'use client';

import React from 'react';
import Header from './components/Header';
import StorageCalculator from './StorageCalculator';


const HomePage = () => {
  return (
    <div>
      <Header />
      <h1>Home Page</h1>
      <StorageCalculator />
    </div>
  );
};

export default HomePage;
