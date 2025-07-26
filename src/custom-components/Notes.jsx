import React from 'react';
import Underline from './Underline';
import Checkboxes from './Checkboxes';
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

const SideNotes = ({
  title = 'Tasks',
  variant = 'regular',
  numOfTasks = 1,
}) => {
  const heading = title;
  const [word1, word2] = heading.split(' ');

  return (
    <div className="w-full">
      <h1 className="bg-black text-white py-2 px-3  text-heading-sm font-bold uppercase tracking-wider text-center">
        {word1}
        <span> {word2}</span>
      </h1>

      {(() => {
        switch (variant) {
          case 'regular':
            return <Underline count={numOfTasks} />;
          case 'checkbox':
            return <Checkboxes count={numOfTasks} />;
          default:
            return <Underline count={numOfTasks} />;
        }
      })()}
    </div>
  );
};

const BottomNotes = ({
  heading = 'School Notes',
  subheading = 'What will make you happy this month?',
  variant = 'primary',
}) => (
  <div
    className={`w-full h-full border-x-thin mt-auto ${
      variant === 'secondary' ? 'flex' : ''
    }`}
  >
    {/* Header */}
    <div className="header">
      <h1 className="bg-black text-white py-2 px-3 text-heading-sm ">
        {heading}
      </h1>
      {variant === 'secondary' && (
        <div className="p-2">
          <p className="text-xs text-center">{subheading}</p>
        </div>
      )}
    </div>

    {/* Content */}
    <div className="flex-1"></div>
  </div>
);

export { MonthlyNotes, Notes, SideNotes, BottomNotes };
