// app/components/Header.js
'use client';

import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/sources">Sources</Link></li>
          <li><Link href="/budget-calculator">Budget Calculator</Link></li>
          <li><Link href="/graph">Graph</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
