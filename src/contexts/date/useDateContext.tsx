import { useContext } from 'react';
import { DateContext } from './DateContext';

export const useDateContext = () => {
  const context = useContext(DateContext);

  if (!context) {
    throw new Error('useDateContext must be used within a DateContextProvider');
  }

  return context;
};
