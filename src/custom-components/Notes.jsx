import React from 'react';

const Notes = ({ config }) => {
  console.log('Layouts component loaded');
  return (
    <>
      {config.layout === 'monthly' && <MonthlyLayout config={config} />}
      {/* {layout === 'weekly' && <WeeklyLayout config={weeklyLayoutProps} />} */}
    </>
  );
};

const MonthlyNotes = ({ config: { header, headerSpan, subheader } }) => {
  console.log('MonthlyNotes component loaded');
  return (
    <div className="notes monthly">
      <div className="content">
        <h2 className="header">
          {header} <span className="">{headerSpan}</span>
        </h2>
        <p className="subheader">{subheader}</p>
      </div>
      <div className="empty-space"></div>
    </div>
  );
};
export { MonthlyNotes, Notes };
