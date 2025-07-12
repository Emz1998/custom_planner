export const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const fullWeekdays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export const getWeekdaysForCalendar = (startingWeekday, position) => {
  const days = fullWeekdays;
  let orderedDays = days;

  if (startingWeekday === 'monday') {
    orderedDays = [...days.slice(1), days[0]];
  }

  if (position === 'left') {
    return orderedDays.slice(0, 4); // First 4 days
  } else {
    return orderedDays.slice(4, 7); // Last 3 days
  }
};

export const getDaysInMonth = (month, year) => {
  return new Date(year, month + 1, 0).getDate();
};

export const getFirstDayOfMonth = (month, year, startingWeekday) => {
  const firstDay = new Date(year, month, 1).getDay();
  if (startingWeekday === 'monday') {
    return firstDay === 0 ? 6 : firstDay - 1;
  }
  return firstDay;
};

export const calculateCalendarDays = (
  month,
  year,
  startingWeekday,
  position
) => {
  const daysInMonth = getDaysInMonth(month, year);
  const daysInPrevMonth = getDaysInMonth(
    month === 0 ? 11 : month - 1,
    month === 0 ? year - 1 : year
  );
  const firstDay = getFirstDayOfMonth(month, year, startingWeekday);
  const days = [];

  // Build a full calendar first
  const fullCalendar = [];

  // Add previous month days to start
  const prevMonthDaysCount = firstDay;
  for (let i = prevMonthDaysCount; i > 0; i--) {
    fullCalendar.push({
      day: daysInPrevMonth - i + 1,
      isOtherMonth: true,
    });
  }

  // Add current month days
  for (let day = 1; day <= daysInMonth; day++) {
    fullCalendar.push({
      day: day,
      isOtherMonth: false,
    });
  }

  // Add next month days to complete calendar
  let nextMonthDay = 1;
  while (fullCalendar.length < 42) {
    // 6 weeks * 7 days
    fullCalendar.push({
      day: nextMonthDay,
      isOtherMonth: true,
    });
    nextMonthDay++;
  }

  // Now extract only the days we need based on position
  if (position === 'left') {
    // Extract first 4 days of each week (Sun-Wed or Mon-Thu)
    for (let week = 0; week < 5; week++) {
      // 5 weeks
      for (let day = 0; day < 4; day++) {
        const index = week * 7 + day;
        if (index < fullCalendar.length) {
          days.push(fullCalendar[index]);
        }
      }
    }
  } else {
    // Extract last 3 days of each week (Thu-Sat or Fri-Sun)
    for (let week = 0; week < 5; week++) {
      // 5 weeks
      for (let day = 4; day < 7; day++) {
        const index = week * 7 + day;
        if (index < fullCalendar.length) {
          days.push(fullCalendar[index]);
        }
      }
    }
  }

  return days;
};

export const isToday = (dayObj, month, year) => {
  if (!dayObj || dayObj.isOtherMonth) return false;
  const today = new Date();
  return (
    dayObj.day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear()
  );
};
