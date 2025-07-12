import React from 'react';

const Underline = ({ count = 3 }) => {
  return (
    <div className="flex flex-col gap-[12px] mt-3">
      {[...Array(count)].map((_, index) => (
        <div key={index} className="underline"></div>
      ))}
    </div>
  );
};

export default Underline;
