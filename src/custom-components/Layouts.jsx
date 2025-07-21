import React from 'react';
import Calendar from './Calendar';
import { monthNames } from '../utils/calendarUtils';
import { MonthlyNotes, SideNotes, BottomNotes } from './Notes';
import { WeekHeader, DayColumns } from './WeeklyComponents';
import Table from './Tables';
import Underline from './Underline';

const Layouts = ({ config }) => {
  console.log('Layouts component loaded');
  return (
    <>
      {config.layout === 'monthly' && <MonthlyLayout config={config} />}
      {config.layout === 'weekly' && <WeeklyLayout config={config} />}
      {config.layout === 'monthly-budget' && <MonthlyBudget />}
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
    <div className="weekly flex flex-col gap-5 h-full w-full">
      {/* Main Content */}
      <div className="week-content flex h-full">
        {/* Left Page: Week Goals + First 3 days */}
        {spreadPosition === 'left' ? (
          <>
            <div className="flex flex-col gap-vertical w-full pr-5">
              <WeekHeader
                weekStart={weekStart}
                weekEnd={weekEnd}
                spreadPosition={spreadPosition}
              />

              <SideNotes title="Main Goal" variant="regular" numOfTasks={1} />
              <SideNotes title="Priorities" variant="regular" numOfTasks={4} />
              <SideNotes title="To Do List" variant="checkbox" numOfTasks={8} />
              <SideNotes
                title="Upcoming Exams"
                variant="regular"
                numOfTasks={4}
              />
            </div>

            <DayColumns
              weekStart={weekStart}
              days={days.slice(0, 3)}
              startingWeekday={startingWeekday}
              dayIndices={[0, 1, 2]}
            />
          </>
        ) : (
          /* Right Page: Last 4 days only */

          <DayColumns
            weekStart={weekStart}
            days={days.slice(3, 7)}
            startingWeekday={startingWeekday}
            dayIndices={[3, 4, 5, 6]}
          />
        )}
      </div>

      {/* Notes Section */}

      <BottomNotes heading="School Notes" variant="primary" />
    </div>
  );
};

const MonthlyBudget = () => {
  const incomeData = {
    tableBody: [
      ['Total Income:'],
      ['Source Of Income 1', 'Source Of Income 2', 'Source Of Income 3'],
      ['Other Source of Income'],
    ],
  };

  const expenseData = {
    columnsHeader: ['Fixed Expenses', 'Variable Expenses'],
    tableBody: [
      ['Rent/Mortgage', 'Groceries'],
      ['Utilities (Electricity, Water, Etc.)', 'Transportation'],
      ['Insurance', 'Entertainment'],
      ['Loan Payments', 'Dining Out'],
    ],

    blankRows: 3,
  };

  const savingsData = {
    variant: '2d',
    columnsHeader: 'Savings',
    tableBody: [
      'Personal Savings',
      'Emergency Fund',
      'Retirement',
      'Investments',
    ],

    blankRows: 3,
  };

  return (
    <div className="add-ons monthly-budget flex flex-col gap-6  ">
      <div className="flex flex-col gap-1">
        <h1 className="text-heading-xl text-start  underlined">
          Monthly <span>budget</span>
        </h1>
      </div>

      <div className=" h-full">
        <Table tableHeader="Income" rowsData={incomeData} />
      </div>

      <div className="h-full">
        <Table tableHeader="Expenses" rowsData={expenseData} />
      </div>

      <div className="flex gap-5 flex-1">
        <Table tableHeader="Savings" rowsData={savingsData} />
        <div className="flex flex-col gap-10 justify-center p-6">
          <h1 className="text-heading-base text-start underlined">Summary</h1>

          <div className="grid grid-cols-2 gap-4 w-full">
            <h1 className="text-subheading-sm text-start">Total Income</h1>
            <h1 className="text-subheading-sm text-start">Total Expenses</h1>

            <h1 className="text-subheading-sm text-start">Net Savings</h1>
            <h1 className="text-subheading-sm text-start">Remaining Balance</h1>
          </div>

          <h1 className="text-heading-base text-start underlined">Notes</h1>
        </div>
      </div>
    </div>
  );
};

export { MonthlyLayout, WeeklyLayout, Layouts, MonthlyNotes, MonthlyBudget };
