import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header style={{ display: 'flex', justifyContent: 'center', padding: '10px', background: '#f0f0f0' }}>
      <nav>
        <Link to="/" style={{ margin: '0 10px' }}>Home</Link>
        <Link to="/calculator" style={{ margin: '0 10px' }}>Storage Calculator</Link>
        <Link to="/sources" style={{ margin: '0 10px' }}>Sources</Link>
      </nav>
    </header>
  );
};

export default Header;
