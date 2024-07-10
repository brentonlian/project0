// app/layout.js
import '../styles/globals.css';
import Header from './components/Header';

export const metadata = {
  title: 'Storage Cost Calculator',
  description: 'Calculate storage costs across different years',
};

export default function RootLayout({ children }) {
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
