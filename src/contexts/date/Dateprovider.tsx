import React, { useState, useEffect, ReactNode } from 'react';
import DateContext from './DateContext';
import { AppState, AppStateStatus } from 'react-native';

type DateProviderProps = {
  children: ReactNode;
};

const DateProvider = ({ children }: DateProviderProps) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

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

  return <DateContext.Provider value={{ selectedDate, setSelectedDate }}>{children}</DateContext.Provider>;
};

export default DateProvider;
