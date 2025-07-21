import React from 'react';
import Underline from './Underline';

const Checkboxes = ({ count = 3 }) => {
  return (
    <div className="flex flex-col gap-[12px] mt-3 h-full">
      {[...Array(count)].map((_, index) => (
        <div key={index} className="flex">
          <div className="w-3 h-3 border border-black mr-2"></div>
          <div className="flex-1 border-b border-black"></div>
        </div>
      ))}
    </div>
  );
};

export default Checkboxes;
