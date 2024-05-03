import React, { useState, useEffect, ReactNode } from 'react';
import DateContext from './DateContext';
import { AppState, AppStateStatus } from 'react-native';

type DateProviderProps = {
  children: ReactNode;
};

const formatDate = (date: Date) => {
  return date.toISOString().split('T')[0];
};

const DateProvider = ({ children }: DateProviderProps) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDateString, setSelectedDateString] = useState(formatDate(new Date()));

  useEffect(() => {
    const setToday = () => {
      const today = new Date();
      setSelectedDate(new Date(today.getFullYear(), today.getMonth(), today.getDate()));
      setSelectedDateString(formatDate(today));
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
    <DateContext.Provider value={{ selectedDate, selectedDateString, setSelectedDate, setSelectedDateString }}>
      {children}
    </DateContext.Provider>
  );
};

export default DateProvider;
