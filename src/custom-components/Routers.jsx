import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import PrintPreview from './PrintPreview';

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/print-preview" element={<PrintPreview />} />
    </Routes>
  );
};

export default Routers;
