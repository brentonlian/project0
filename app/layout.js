'use client';

import React from 'react';
import Header from './components/Header';
import '../styles/globals.css'; // Adjust the path if you have global styles

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <title>Storage Cost Calculator</title>
      </head>
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
