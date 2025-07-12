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
  const weekdays = useMemo(
    () => getWeekdaysForCalendar(startingWeekday, spreadPosition),
    [startingWeekday, spreadPosition]
  );

  const calendarDays = useMemo(
    () => calculateCalendarDays(month, year, startingWeekday, spreadPosition),
    [month, year, startingWeekday, spreadPosition]
  );

  return (
    // Calendar Grid
    <div className="calendar">
      {/* Weekday Headers */}
      {weekdays.map((day) => (
        <div key={day} className="header">
          <span
            className={`font-bold ${
              spreadPosition === 'right' && 'col-span-1 col-start-1 col-end-3'
            }`}
          >
            {day.slice(0, 3)}
          </span>
          {day.slice(3)}
        </div>
      ))}

      {/* Calendar Days */}
      {calendarDays.map((dayObj, index) => (
        <h1
          key={index}
          className={`days ${
            dayObj && isToday(dayObj, month, year) ? 'today' : ''
          } ${dayObj && dayObj.isOtherMonth ? 'other-month' : ''}`}
        >
          {dayObj ? dayObj.day : ''}
        </h1>
      ))}

      {spreadPosition === 'right' && (
        <div className="col-start-4 row-start-1 row-end-[-1] border-0 flex flex-col gap-6 pl-5 py-3">
          <div className="sidenotes">
            <h1 className="text-heading-base">
              Prior<span>ities</span>
            </h1>

            <Underline count={3} />
          </div>

          <div>
            <h1 className="text-heading-base">
              Monthly
              <div>Goals</div>
            </h1>

            <Underline count={9} />
          </div>

          <div>
            <h1 className="text-heading-base">
              Important<div>Events</div>
            </h1>

            <Underline count={5} />
          </div>

          <div>
            <h1 className="text-heading-base">Appointments</h1>

            <Underline count={3} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
