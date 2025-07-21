import React from 'react';
import { monthNames } from '../utils/calendarUtils';

// Week Header Component
export const WeekHeader = ({ weekStart, weekEnd, spreadPosition }) => {
  const formatDate = (date) => {
    const month = monthNames[date.getMonth()].toUpperCase().slice(0, 3);
    const day = date.getDate().toString().padStart(2, '0');
    return `${month} ${day}`;
  };

  const weekRange = `${formatDate(weekStart)} - ${formatDate(weekEnd)}`;

  return (
    <div className="week-header mt-1">
      {spreadPosition === 'left' ? (
        <h1 className="text-heading-xl">
          Week of <div className="block text-base">{weekRange}</div>
        </h1>
      ) : (
        <h1 className="text-heading-xl opacity-0">
          Week of <div className="block text-base">{weekRange}</div>
        </h1>
      )}
    </div>
  );
};

// Day Column Component
const DayColumn = ({ day, date, isWeekend }) => {
  const dayName = day.toUpperCase();
  const formattedDate = date.toString().padStart(2, '0');
  const hours = Array.from({ length: 17 }, (_, i) => i + 7); // 7 AM to 11 PM

  return (
    <div className="day-column h-full w-full flex flex-col">
      <div
        className={`day-header bg-black text-white px-2 py-3 flex gap-2 justify-center items-center`}
      >
        <h1 className="text-heading-sm font-bold">{dayName}</h1>
        <h1 className="text-heading-sm font-normal">{formattedDate}</h1>
      </div>

      {hours.map((hour, index) => (
        <div
          key={hour}
          className={`hour-slot ${
            index === hours.length - 1
              ? 'border-b-0'
              : 'border-b-thin border-gray-300'
          } px-2 py-[13px]`}
        >
          <h1 className="text-tiny font-normal text-black">{hour}</h1>
        </div>
      ))}
    </div>
  );
};

// Day Columns Container Component
export const DayColumns = ({
  weekStart,
  days,
  startingWeekday,
  dayIndices,
}) => {
  const allDayNames =
    startingWeekday === 'monday'
      ? ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
      : ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const isWeekendDay = (index) => {
    if (startingWeekday === 'monday') {
      return index >= 5; // SAT and SUN
    } else {
      return index === 0 || index === 6; // SUN and SAT
    }
  };

  // Use dayIndices if provided, otherwise show all days
  const indicesToShow = dayIndices || days.map((_, i) => i);

  return (
    <>
      {indicesToShow.map((dayIndex, i) => (
        <div
          className={`w-full border-r-primary border-y-primary ${
            i === 0 ? 'border-l-primary' : ''
          } ${i === indicesToShow.length - 1 ? 'border-r-primary' : ''}`}
        >
          <DayColumn
            key={allDayNames[dayIndex]}
            day={allDayNames[dayIndex]}
            date={days[i]}
            isWeekend={isWeekendDay(dayIndex)}
          />
        </div>
      ))}
    </>
  );
};

// Notes Section Component
export const WeeklyNotesSection = ({ spreadPosition }) => (
  <div className="w-full flex flex-col h-full">
    {spreadPosition === 'left' ? (
      <>
        <div className="bg-black text-white px-3 py-2 font-bold text-xs uppercase tracking-wider text-center flex-0">
          School Notes
        </div>
        <div className="border border-black border-t-0 flex-1"></div>
      </>
    ) : (
      <>
        <div className="bg-black text-white px-3 py-2 font-bold text-xs uppercase tracking-wider text-center flex-0">
          Personal Notes
        </div>
        <div className="border border-black border-t-0 flex-1"></div>
      </>
    )}
  </div>
);
