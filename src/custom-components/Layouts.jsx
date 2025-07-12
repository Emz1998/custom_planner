import React from 'react';
import Calendar from './Calendar';
import { monthNames } from '../utils/calendarUtils';
import { MonthlyNotes } from './Notes';

const Layouts = ({ config }) => {
  console.log('Layouts component loaded');
  return (
    <>
      {config.layout === 'monthly' && <MonthlyLayout config={config} />}
      {/* {layout === 'weekly' && <WeeklyLayout config={weeklyLayoutProps} />} */}
    </>
  );
};

const MonthlyLayout = ({
  config: { spreadPosition, month, year, startingWeekday },
}) => {
  console.log('MonthlyLayout component loaded');
  const monthName = monthNames[month];

  return (
    <div className="monthly layout">
      {/* Header */}
      {spreadPosition === 'left' ? (
        <h1 className="text-heading flex-0 text-start">
          {monthName} <span className="">{year}</span>
        </h1>
      ) : (
        <h1 className="text-heading opacity-0">
          {monthName} <span>{year}</span>
        </h1>
      )}

      {/* Calendar */}

      <div className="calendar-container flex-2 h-full">
        <Calendar
          month={month}
          year={year}
          startingWeekday={startingWeekday}
          spreadPosition={spreadPosition}
        />
      </div>

      {/* Footer */}
      <div className="footer h-30">
        <MonthlyNotes
          config={{
            header: 'Happiness',
            headerSpan: 'Space',
            subheader: 'What will make you happy this month?',
          }}
        />
      </div>
    </div>
  );
};

export { MonthlyLayout, Layouts, MonthlyNotes };
