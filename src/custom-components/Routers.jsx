import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PrintPreview from './PrintPreview';
import Test from './Test';

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Test />} />
      <Route path="/print-preview" element={<PrintPreview />} />
    </Routes>
  );
};

export default Routers;
