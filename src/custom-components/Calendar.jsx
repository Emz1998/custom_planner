import React, { useMemo } from 'react';
import {
  getWeekdaysForCalendar,
  calculateCalendarDays,
  isToday,
} from '../utils/calendarUtils';
import Underline from './Underline';

const Calendar = ({
  month = new Date().getMonth(),
  year = new Date().getFullYear(),
  startingWeekday = 'sunday',
  spreadPosition = 'left',
}) => {
  console.log('Calendar component loaded');
  const weekdays = useMemo(() => {
    const result = getWeekdaysForCalendar(startingWeekday, spreadPosition);
    console.log('Weekdays result:', result);
    return result || [];
  }, [startingWeekday, spreadPosition]);

  const calendarDays = useMemo(
    () => calculateCalendarDays(month, year, startingWeekday, spreadPosition),
    [month, year, startingWeekday, spreadPosition]
  );

  return (
    // Calendar Grid
    <div className="calendar">
      {/* Weekday Headers */}
      {weekdays.map((day, index) => (
        <div key={day || index} className="header">
          <span
            className={`font-bold ${
              spreadPosition === 'right' && 'col-span-1 col-start-1 col-end-3'
            }`}
          >
            {day && day.slice ? day.slice(0, 3) : ''}
          </span>
          {day && day.slice ? day.slice(3) : ''}
        </div>
      ))}

      {/* Calendar Days */}
      {calendarDays.map((dayObj, index) => (
        <div className="border-b-thin">
          <h1
            key={index}
            className={`days h-full ${
              dayObj && isToday(dayObj, month, year) ? 'today' : ''
            } ${dayObj && dayObj.isOtherMonth ? 'other-month' : ''}`}
          >
            {dayObj ? dayObj.day : ''}
          </h1>
        </div>
      ))}

      {spreadPosition === 'right' && (
        <div className="col-start-4 row-start-1 row-end-[-1] border-0 flex flex-col gap-6 pl-5 py-3">
          <div className="sidenotes">
            <h1 className="text-heading-sm">
              Prior<span>ities</span>
            </h1>

            <Underline count={3} />
          </div>

          <div>
            <h1 className="text-heading-sm">
              Monthly
              <div>Goals</div>
            </h1>

            <Underline count={9} />
          </div>

          <div>
            <h1 className="text-heading-sm">
              Important<div>Events</div>
            </h1>

            <Underline count={5} />
          </div>

          <div>
            <h1 className="text-heading-sm  ">Appointments</h1>

            <Underline count={3} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
