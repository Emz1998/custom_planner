export const baseStyles = {
  textSize: 14,
};

export const monthlyStyles = {
  heading: 14,
  subheading: 12,
  paragraph: 10,
  subparagraph: 8,
};

export const weeklyStyles = {
  heading: 14,
  subheading: 12,
  paragraph: 10,
  subparagraph: 8,
  calendarHeader: {
    heading: 12,
    subheading: 10,
    paragraph: 8,
    subparagraph: 6,
  },
  calendarBody: {
};

export const text = (scale = 1, baseScale = 2) => {
  const baseSize = baseStyles.textSize;
  const textSize = baseSize + baseScale * scale;
  const tw = `text-[${textSize}px]`;

  if (textSize) {
    console.log(textSize);
  }
  return tw;
};
