import React from 'react';
import Header from './components/Header'; // Adjust the path if necessary
//import '../styles/globals.css'; // Optional: if you have global styles

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
