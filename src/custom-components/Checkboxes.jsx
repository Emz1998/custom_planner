import React from 'react';
import Underline from './Underline';

const Checkboxes = ({ count = 3 }) => {
  return (
    <div className="flex flex-col gap-[12px] mt-3 h-full">
      {[...Array(count)].map((_, index) => (
        <div key={index} className="flex">
          <div className="w-3 h-3 border-y-thin mr-2">
            <div className="w-full h-full border-x-thin"></div>
          </div>
          <div className="flex-1 border-b-thin"></div>
        </div>
      ))}
    </div>
  );
};

export default Checkboxes;
