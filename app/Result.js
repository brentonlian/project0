// app/Result.js
import React from 'react';

const Result = ({ cost }) => {
  return (
    <div>
      <h2>Estimated Cost</h2>
      {cost !== null ? (
        <p>The estimated cost is ${cost.toFixed(2)}</p>
      ) : (
        <p>Please enter the storage details and year to calculate the cost.</p>
      )}
    </div>
  );
};

export default Result;
