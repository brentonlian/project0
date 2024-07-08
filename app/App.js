import React from 'react';
import {Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Sources from './Sources';
import Page from './page';
import Header from './components/Header';

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sources" element={<Sources />} />
        <Route path="/page" element={<Page />} />
      </Routes>
    </div>
  );
};

export default App;
