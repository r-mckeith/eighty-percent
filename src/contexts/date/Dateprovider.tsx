// import React, { createContext, useContext, useState, ReactNode } from 'react';

// const DateContext = createContext<any>(null);

// export const useDateContext = () => useContext(DateContext);

// type DateProviderProps = {
//   children: ReactNode;
// };

// export const DateProvider = ({ children }: DateProviderProps) => {
//   const [selectedDate, setSelectedDate] = useState(new Date());

//   const dateStrings = {
//     dateString: selectedDate.toISOString().split('T')[0],
//     yesterday: new Date(selectedDate.getTime() - 24 * 60 * 60 * 1000),
//     startOfYesterday: new Date(
//       Date.UTC(
//         selectedDate.getUTCFullYear(),
//         selectedDate.getUTCMonth(),
//         selectedDate.getUTCDate() - 1,
//         0,
//         0,
//         0,
//         0
//       )
//     ),
//     endOfYesterday: new Date(
//       Date.UTC(
//         selectedDate.getUTCFullYear(),
//         selectedDate.getUTCMonth(),
//         selectedDate.getUTCDate() - 1,
//         23,
//         59,
//         59,
//         999
//       )
//     ),
//     startWeek: new Date(selectedDate.getTime() - selectedDate.getDay() * 24 * 60 * 60 * 1000),
//     startMonth: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1),
//     startYear: new Date(selectedDate.getFullYear(), 0, 1),
//   };

//   const value = {
//     selectedDate,
//     setSelectedDate,
//     ...dateStrings,
//   };

//   return <DateContext.Provider value={value}>{children}</DateContext.Provider>;
// };


import React, { useState, useEffect, ReactNode } from 'react';
import DateContext from './DateContext';
import { AppState, AppStateStatus } from 'react-native';

type DateProviderProps = {
  children: ReactNode;
};

const DateProvider = ({ children }: DateProviderProps) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const selectedDateString = selectedDate.toISOString().split('T')[0];

  const yesterday = new Date(selectedDate);
  yesterday.setDate(selectedDate.getDate() - 1);
  const yesterdayDateString = yesterday.toISOString().split('T')[0];


  useEffect(() => {
    const setToday = () => {
      const today = new Date();
      setSelectedDate(new Date(today.getFullYear(), today.getMonth(), today.getDate()));
    };

    setToday();

    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active') {
        setToday();
      }
    };

    const appStateSubscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      appStateSubscription.remove();
    };
  }, []);

  return <DateContext.Provider value={{ selectedDate, setSelectedDate, selectedDateString, yesterday, yesterdayDateString }}>{children}</DateContext.Provider>;
};

export default DateProvider;
