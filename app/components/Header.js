import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header style={{ display: 'flex', justifyContent: 'center', padding: '10px', background: '#f0f0f0' }}>
      <nav>
        <Link href="/" style={{ margin: '0 10px' }}>Home</Link>
        <Link href="/sources" style={{ margin: '0 10px' }}>Sources</Link>
      </nav>
    </header>
  );
};

export default Header;
