'use client';

import React from 'react';
import StorageCalculator from './components/StorageCalculator';

const HomePage = () => {
  return (
    <div>
      {result && <div>{result}</div>}
      {decade && <div>Decade: {decade}</div>}
    </div>
  );
};

export default StorageCalculator;
