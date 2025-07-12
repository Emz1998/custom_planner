import React from 'react';
import { Layouts } from './Layouts.jsx';

const Pages = ({ config, style }) => {
  console.log('Pages component loaded', { config, style });

  if (!config) {
    console.error('Pages component: config prop is undefined');
    return null;
  }

  return (
    <div className={`page ${style}`}>
      <Layouts config={config} />
    </div>
  );
};

export default Pages;
