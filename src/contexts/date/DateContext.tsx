import React from 'react';

type DateContextType = {
  selectedDate: Date;
  selectedDateString: string;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
  setSelectedDateString: React.Dispatch<React.SetStateAction<string>>;
};

export const DateContext = React.createContext<DateContextType | undefined>(undefined);

export default DateContext;
