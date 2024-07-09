import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header style={styles.header}>
      <nav style={styles.nav}>
        <Link href="/" style={styles.link}>Home</Link>
        <Link href="/sources" style={styles.link}>Sources</Link>
      </nav>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: '#333',
    padding: '10px 0',
    textAlign: 'center',
  },
  nav: {
    display: 'flex',
    justifyContent: 'center',
  },
  link: {
    margin: '0 15px',
    color: '#fff',
    textDecoration: 'none',
    fontSize: '18px',
  }
};

export default Header;
