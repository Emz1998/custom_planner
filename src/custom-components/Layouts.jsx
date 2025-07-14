import React from 'react';
import Calendar from './Calendar';
import { monthNames } from '../utils/calendarUtils';
import { MonthlyNotes } from './Notes';
import {
  WeekHeader,
  WeekGoals,
  DayColumns,
  WeeklyNotesSection,
} from './WeeklyComponents';

const Layouts = ({ config }) => {
  console.log('Layouts component loaded');
  return (
    <>
      {config.layout === 'monthly' && <MonthlyLayout config={config} />}
      {config.layout === 'weekly' && <WeeklyLayout config={config} />}
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

const WeeklyLayout = ({
  config: { spreadPosition, weekStart, weekEnd, startingWeekday, days },
}) => {
  console.log('WeeklyLayout component loaded');

  return (
    <div className="weekly-layout">
      {/* Week Header */}
      <WeekHeader
        weekStart={weekStart}
        weekEnd={weekEnd}
        spreadPosition={spreadPosition}
      />

      {/* Main Content */}
      <div className="week-content flex gap-4">
        {/* Left Sidebar - Week Goals */}
        {spreadPosition === 'left' && (
          <div className="w-48 flex-shrink-0">
            <WeekGoals />
          </div>
        )}

        {/* Day Columns */}
        <div className="flex-1">
          <DayColumns
            weekStart={weekStart}
            days={days}
            startingWeekday={startingWeekday}
          />
        </div>

        {/* Right Sidebar - Week Goals (for right spread) */}
        {spreadPosition === 'right' && (
          <div className="w-48 flex-shrink-0">
            <WeekGoals />
          </div>
        )}
      </div>

      {/* Notes Section */}
      <WeeklyNotesSection />
    </div>
  );
};

export { MonthlyLayout, WeeklyLayout, Layouts, MonthlyNotes };
