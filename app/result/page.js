'use client';

import { useSearchParams } from 'next/navigation';

const ResultPage = () => {
  const searchParams = useSearchParams();
  const amount = searchParams.get('amount');
  const unit = searchParams.get('unit');
  const year = searchParams.get('year');
  const result = searchParams.get('result');

  return (
    <div>
      <h1>Calculation Result</h1>
      {amount && unit && year && result ? (
        <>
          <p>Amount: {amount}</p>
          <p>Unit: {unit}</p>
          <p>Year: {year}</p>
          <p>The calculated cost is: ${result}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ResultPage;
