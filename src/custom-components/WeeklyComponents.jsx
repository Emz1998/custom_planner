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
    <div className="week-header mb-4">
      {spreadPosition === 'left' ? (
        <h1 className="text-xl font-bold uppercase tracking-wider">
          Week of{' '}
          <span className="block text-base mt-1">{weekRange}</span>
        </h1>
      ) : (
        <h1 className="text-xl font-bold uppercase tracking-wider opacity-0">
          Week of{' '}
          <span className="block text-base mt-1">{weekRange}</span>
        </h1>
      )}
    </div>
  );
};

// Main Goal Component
const MainGoal = () => (
  <div className="mb-4">
    <div className="bg-black text-white px-3 py-2 font-bold text-xs uppercase tracking-wider">
      Main Goal
    </div>
    <div className="border border-black border-t-0 h-16"></div>
  </div>
);

// Priorities Component
const Priorities = () => (
  <div className="mb-4">
    <div className="bg-black text-white px-3 py-2 font-bold text-xs uppercase tracking-wider">
      Priorities
    </div>
    <div className="border border-black border-t-0 p-2">
      <div className="h-20"></div>
    </div>
  </div>
);

// Todo List Component
const TodoList = () => {
  const todoItems = Array(8).fill(null);
  
  return (
    <div className="mb-4">
      <div className="bg-black text-white px-3 py-2 font-bold text-xs uppercase tracking-wider">
        To Do List
      </div>
      <div className="border border-black border-t-0 p-3">
        {todoItems.map((_, index) => (
          <div key={index} className="flex items-center mb-2">
            <input type="checkbox" className="mr-2 w-3 h-3" />
            <div className="flex-1 border-b border-gray-300 h-4"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Upcoming Exams Component
const UpcomingExams = () => (
  <div className="mb-4">
    <div className="bg-black text-white px-3 py-2 font-bold text-xs uppercase tracking-wider">
      Upcoming Exams
    </div>
    <div className="border border-black border-t-0 p-2">
      <div className="h-20"></div>
    </div>
  </div>
);

// Week Goals Sidebar Component
export const WeekGoals = () => (
  <div className="week-goals">
    <MainGoal />
    <Priorities />
    <TodoList />
    <UpcomingExams />
  </div>
);

// Day Column Component
const DayColumn = ({ day, date, isWeekend }) => {
  const dayName = day.toUpperCase();
  const formattedDate = date.toString().padStart(2, '0');
  const hours = Array.from({ length: 17 }, (_, i) => i + 7); // 7 AM to 11 PM

  return (
    <div className="day-column flex-1">
      <div className={`day-header ${isWeekend ? 'bg-gray-100' : 'bg-black'} ${isWeekend ? 'text-black' : 'text-white'} px-2 py-1 text-center`}>
        <div className="font-bold text-xs">{dayName}</div>
        <div className="text-sm">{formattedDate}</div>
      </div>
      <div className="hourly-slots">
        {hours.map((hour) => (
          <div key={hour} className="hour-slot border-b border-gray-300 h-8 relative">
            <span className="absolute left-1 top-0 text-tiny text-gray-500">{hour}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Day Columns Container Component
export const DayColumns = ({ weekStart, days, startingWeekday }) => {
  const dayNames = startingWeekday === 'monday' 
    ? ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
    : ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const isWeekendDay = (index) => {
    if (startingWeekday === 'monday') {
      return index >= 5; // SAT and SUN
    } else {
      return index === 0 || index === 6; // SUN and SAT
    }
  };

  return (
    <div className="day-columns flex border border-black">
      {dayNames.map((day, index) => (
        <DayColumn
          key={day}
          day={day}
          date={days[index]}
          isWeekend={isWeekendDay(index)}
        />
      ))}
    </div>
  );
};

// Notes Section Component
export const WeeklyNotesSection = () => (
  <div className="notes-section flex gap-4 mt-4">
    <div className="flex-1">
      <div className="bg-black text-white px-3 py-2 font-bold text-xs uppercase tracking-wider text-center">
        School Notes
      </div>
      <div className="border border-black border-t-0 h-32"></div>
    </div>
    <div className="flex-1">
      <div className="bg-black text-white px-3 py-2 font-bold text-xs uppercase tracking-wider text-center">
        Personal Notes
      </div>
      <div className="border border-black border-t-0 h-32"></div>
    </div>
  </div>
);