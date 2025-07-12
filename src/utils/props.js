export const generateLayoutProps = (
  layout,
  spreadPosition,
  month,
  year,
  startingWeekday
) => {
  const layoutProps = {
    layout: layout,
    spreadPosition: spreadPosition,
    month: month,
    year: year,
    startingWeekday: startingWeekday,
  };
  return layoutProps;
};

export const weeklyLayoutProps = {
  month: 6,
  year: 2025,
  startingWeekday: 'monday',
};
