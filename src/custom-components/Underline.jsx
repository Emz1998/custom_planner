import React from 'react';

const Underline = ({ count = 3 }) => {
  return (
    <div className="flex flex-col gap-[12px] mt-3 h-full">
      {[...Array(count)].map((_, index) => (
        <div key={index} className="border-b-primary pb-2"></div>
      ))}
    </div>
  );
};

export default Underline;
