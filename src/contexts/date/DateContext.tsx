import React from 'react';

type DateContextType = {
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
  selectedDateString: string;
  yesterday: Date;
  yesterdayDateString: string;
};

export const DateContext = React.createContext<DateContextType | undefined>(undefined);

export default DateContext;
