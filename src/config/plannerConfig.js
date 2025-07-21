import { generateLayoutProps } from '../utils/props.js';
import { monthNames } from '../utils/calendarUtils.js';

const generateWeekDatesArray = (weekStart) => {
  const days = [];
  const currentDate = new Date(weekStart);

  for (let i = 0; i < 7; i++) {
    days.push(currentDate.getDate());
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return days;
};

const calculateEndDate = (startMonth, startYear, duration) => {
  let endMonth = startMonth + duration - 1;
  let endYear = startYear;

  while (endMonth > 12) {
    endMonth -= 12;
    endYear++;
  }

  return { month: endMonth, year: endYear };
};

const generateMonthsInRange = (
  startMonth,
  startYear,
  duration,
  startingWeekday = 'monday'
) => {
  const months = [];
  let currentMonth = startMonth - 1;
  let currentYear = startYear;

  for (let i = 0; i < duration; i++) {
    months.push({
      month: currentMonth,
      year: currentYear,
      monthName: monthNames[currentMonth],
      pages: {
        left: generateLayoutProps(
          'monthly',
          'left',
          currentMonth,
          currentYear,
          startingWeekday
        ),
        right: generateLayoutProps(
          'monthly',
          'right',
          currentMonth,
          currentYear,
          startingWeekday
        ),
      },
    });

    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
  }

  return months;
};

const generateWeeksInRange = (
  startMonth,
  startYear,
  duration,
  startingWeekday = 'monday'
) => {
  const weeks = [];
  const startDate = new Date(startYear, startMonth - 1, 1);
  const endDate = calculateEndDate(startMonth, startYear, duration);
  const finalDate = new Date(
    endDate.year,
    endDate.month - 1,
    new Date(endDate.year, endDate.month, 0).getDate()
  );

  let currentWeek = new Date(startDate);
  currentWeek.setDate(
    currentWeek.getDate() -
      currentWeek.getDay() +
      (startingWeekday === 'monday' ? 1 : 0)
  );

  while (currentWeek <= finalDate) {
    const weekEnd = new Date(currentWeek);
    weekEnd.setDate(weekEnd.getDate() + 6);

    weeks.push({
      weekStart: new Date(currentWeek),
      weekEnd: new Date(weekEnd),
      pages: {
        left: {
          layout: 'weekly',
          spreadPosition: 'left',
          weekStart: new Date(currentWeek),
          weekEnd: new Date(weekEnd),
          startingWeekday,
          days: generateWeekDatesArray(new Date(currentWeek)),
        },
        right: {
          layout: 'weekly',
          spreadPosition: 'right',
          weekStart: new Date(currentWeek),
          weekEnd: new Date(weekEnd),
          startingWeekday,
          days: generateWeekDatesArray(new Date(currentWeek)),
        },
      },
    });

    currentWeek.setDate(currentWeek.getDate() + 7);
  }

  return weeks;
};

export const generateMonthlyPlanner = (
  duration,
  startMonth = 1,
  startYear = new Date().getFullYear(),
  startingWeekday = 'monday'
) => {
  const months = generateMonthsInRange(
    startMonth,
    startYear,
    duration,
    startingWeekday
  );

  return {
    type: 'monthly',
    duration,
    startMonth,
    startYear,
    startingWeekday,
    months,
    totalPages: months.length * 2,
  };
};

export const generateWeeklyPlanner = (
  duration,
  startMonth = 1,
  startYear = new Date().getFullYear(),
  startingWeekday = 'monday'
) => {
  const weeks = generateWeeksInRange(
    startMonth,
    startYear,
    duration,
    startingWeekday
  );

  return {
    type: 'weekly',
    duration,
    startMonth,
    startYear,
    startingWeekday,
    weeks,
    totalPages: weeks.length * 2,
  };
};

export const generate12MonthsMonthly = (
  startMonth = 1,
  startYear = new Date().getFullYear(),
  startingWeekday = 'monday'
) => {
  return generateMonthlyPlanner(12, startMonth, startYear, startingWeekday);
};

export const generate10MonthsMonthly = (
  startMonth = 1,
  startYear = new Date().getFullYear(),
  startingWeekday = 'monday'
) => {
  return generateMonthlyPlanner(10, startMonth, startYear, startingWeekday);
};

export const generate6MonthsMonthly = (
  startMonth = 1,
  startYear = new Date().getFullYear(),
  startingWeekday = 'monday'
) => {
  return generateMonthlyPlanner(6, startMonth, startYear, startingWeekday);
};

export const generate3MonthsMonthly = (
  startMonth = 1,
  startYear = new Date().getFullYear(),
  startingWeekday = 'monday'
) => {
  return generateMonthlyPlanner(3, startMonth, startYear, startingWeekday);
};

export const generate12MonthsWeekly = (
  startMonth = 1,
  startYear = new Date().getFullYear(),
  startingWeekday = 'monday'
) => {
  return generateWeeklyPlanner(12, startMonth, startYear, startingWeekday);
};

export const generate10MonthsWeekly = (
  startMonth = 1,
  startYear = new Date().getFullYear(),
  startingWeekday = 'monday'
) => {
  return generateWeeklyPlanner(10, startMonth, startYear, startingWeekday);
};

export const generate6MonthsWeekly = (
  startMonth = 1,
  startYear = new Date().getFullYear(),
  startingWeekday = 'monday'
) => {
  return generateWeeklyPlanner(6, startMonth, startYear, startingWeekday);
};

export const generate3MonthsWeekly = (
  startMonth = 1,
  startYear = new Date().getFullYear(),
  startingWeekday = 'monday'
) => {
  return generateWeeklyPlanner(3, startMonth, startYear, startingWeekday);
};

export const plannerGenerators = {
  monthly: {
    12: generate12MonthsMonthly,
    10: generate10MonthsMonthly,
    6: generate6MonthsMonthly,
    3: generate3MonthsMonthly,
  },
  weekly: {
    12: generate12MonthsWeekly,
    10: generate10MonthsWeekly,
    6: generate6MonthsWeekly,
    3: generate3MonthsWeekly,
  },
};

export const generatePlanner = (
  type,
  duration,
  startMonth = 1,
  startYear = new Date().getFullYear(),
  startingWeekday = 'monday'
) => {
  const generator = plannerGenerators[type]?.[duration];
  if (!generator) {
    throw new Error(
      `Invalid planner type "${type}" or duration "${duration}". Available: monthly/weekly with durations 3, 6, 10, 12`
    );
  }

  return generator(startMonth, startYear, startingWeekday);
};

// Get all weeks that belong to a specific month
const getWeeksForMonth = (month, year, startingWeekday = 'monday') => {
  const weeks = [];
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  
  // Find the start of the first week that contains days from this month
  let currentWeek = new Date(firstDay);
  const dayOffset = startingWeekday === 'monday' ? 1 : 0;
  const firstDayOfWeek = currentWeek.getDay();
  const daysToSubtract = firstDayOfWeek === 0 ? (dayOffset ? 6 : 0) : firstDayOfWeek - dayOffset;
  currentWeek.setDate(currentWeek.getDate() - daysToSubtract);
  
  // Generate weeks until we pass the last day of the month
  while (currentWeek <= lastDay || currentWeek.getMonth() === month) {
    const weekEnd = new Date(currentWeek);
    weekEnd.setDate(weekEnd.getDate() + 6);
    
    // Include week if it contains any days from the target month
    const weekStartMonth = currentWeek.getMonth();
    const weekEndMonth = weekEnd.getMonth();
    if (weekStartMonth === month || weekEndMonth === month || 
        (weekStartMonth < month && weekEndMonth > month)) {
      weeks.push({
        weekStart: new Date(currentWeek),
        weekEnd: new Date(weekEnd),
        pages: {
          left: {
            layout: 'weekly',
            spreadPosition: 'left',
            weekStart: new Date(currentWeek),
            weekEnd: new Date(weekEnd),
            startingWeekday,
            days: generateWeekDatesArray(new Date(currentWeek)),
          },
          right: {
            layout: 'weekly',
            spreadPosition: 'right',
            weekStart: new Date(currentWeek),
            weekEnd: new Date(weekEnd),
            startingWeekday,
            days: generateWeekDatesArray(new Date(currentWeek)),
          },
        },
      });
    }
    
    currentWeek.setDate(currentWeek.getDate() + 7);
    
    // Break if we've moved past the month and the week doesn't contain any days from it
    if (currentWeek.getMonth() > month && weekEnd.getMonth() > month) {
      break;
    }
  }
  
  return weeks;
};

// Generate combined monthly + weekly planner
export const generateMonthWithWeeklyPages = (
  duration,
  startMonth = 1,
  startYear = new Date().getFullYear(),
  startingWeekday = 'monday'
) => {
  const pages = [];
  let currentMonth = startMonth - 1;
  let currentYear = startYear;
  
  for (let i = 0; i < duration; i++) {
    // Add month pages
    pages.push({
      type: 'month',
      month: currentMonth,
      year: currentYear,
      monthName: monthNames[currentMonth],
      pages: {
        left: generateLayoutProps(
          'monthly',
          'left',
          currentMonth,
          currentYear,
          startingWeekday
        ),
        right: generateLayoutProps(
          'monthly',
          'right',
          currentMonth,
          currentYear,
          startingWeekday
        ),
      },
    });
    
    // Add weekly pages for this month
    const weeksForMonth = getWeeksForMonth(currentMonth, currentYear, startingWeekday);
    weeksForMonth.forEach(week => {
      pages.push({
        type: 'week',
        ...week
      });
    });
    
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
  }
  
  return {
    type: 'monthly-weekly',
    duration,
    startMonth,
    startYear,
    startingWeekday,
    pages,
    totalPages: pages.length * 2,
  };
};

export const plannerDefaults = {
  type: 'monthly',
  duration: 12,
  startMonth: 1,
  startYear: new Date().getFullYear(),
  startingWeekday: 'monday',
};
