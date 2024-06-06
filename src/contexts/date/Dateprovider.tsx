import React, { useState, useEffect, ReactNode } from 'react';
import DateContext from './DateContext';
import { AppState, AppStateStatus } from 'react-native';

type DateProviderProps = {
  children: ReactNode;
};

const DateProvider = ({ children }: DateProviderProps) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const selectedDateString = selectedDate.toISOString().split('T')[0];

  const todayDate = new Date();
  const todayString = todayDate.toISOString().split('T')[0];

  const yesterday = new Date(selectedDate);
  yesterday.setDate(selectedDate.getDate() - 1);
  const yesterdayString = yesterday.toISOString().split('T')[0];

  const oneWeekAgo = new Date(selectedDate);
  oneWeekAgo.setDate(selectedDate.getDate() - 6);
  const oneWeekAgoString = oneWeekAgo.toISOString().split('T')[0];

  const oneMonthAgo = new Date(selectedDate);
  oneMonthAgo.setDate(selectedDate.getDate() - 29);
  const oneMonthAgoString = oneMonthAgo.toISOString().split('T')[0];

  const oneYearAgo = new Date(selectedDate);
  oneYearAgo.setDate(selectedDate.getDate() - 364);
  const oneYearAgoString = oneYearAgo.toISOString().split('T')[0];

  const tomorrow = new Date(selectedDate);
  tomorrow.setDate(selectedDate.getDate() + 1);
  const tomorrowString = tomorrow.toISOString().split('T')[0];


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

  return (
    <DateContext.Provider
      value={{
        selectedDate,
        setSelectedDate,
        selectedDateString,
        todayDate,
        todayString,
        yesterday,
        yesterdayString,
        oneWeekAgo,
        oneWeekAgoString,
        oneMonthAgo,
        oneMonthAgoString,
        oneYearAgo,
        oneYearAgoString,
        tomorrow,
        tomorrowString
      }}>
      {children}
    </DateContext.Provider>
  );
};

export default DateProvider;
