import React from 'react';

type DateContextType = {
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
  selectedDateString: string;
  todayDate: Date;
  todayString: string;
  yesterday: Date;
  yesterdayString: string;
  oneWeekAgo: Date;
  oneWeekAgoString: string;
  oneMonthAgo: Date;
  oneMonthAgoString: string;
  oneYearAgo: Date;
  oneYearAgoString: string;
  tomorrow: Date;
  tomorrowString: string;
};

export const DateContext = React.createContext<DateContextType | undefined>(undefined);

export default DateContext;
