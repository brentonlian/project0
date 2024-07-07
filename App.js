import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import InputForm from './components/InputForm';
import StorageCalculator from './components/StorageCalculator';
import Sources from './components/Sources';

const App = () => {
  const handleCalculate = ({ amount, unit, year }) => {
    console.log('Calculate:', amount, unit, year);
    // Handle the calculation logic here or pass the data to StorageCalculator
  };

  return (
    <Router>
      <div style={{ textAlign: 'center' }}>
        <header style={{ display: 'flex', justifyContent: 'center', padding: '10px', background: '#f0f0f0' }}>
          <nav>
            <Link to="/" style={{ margin: '0 10px' }}>Home</Link>
            <Link to="/calculator" style={{ margin: '0 10px' }}>Storage Calculator</Link>
            <Link to="/sources" style={{ margin: '0 10px' }}>Sources</Link>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<InputForm onCalculate={handleCalculate} />} />
            <Route path="/calculator" element={<StorageCalculator />} />
            <Route path="/sources" element={<Sources />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
