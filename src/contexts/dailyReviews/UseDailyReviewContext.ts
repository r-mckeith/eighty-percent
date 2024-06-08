import { useContext } from 'react';
import { DailyReviewContext } from './DailyReviewContext';

export const useDailyReviewContext = () => {
  const context = useContext(DailyReviewContext);

  if (!context) {
    throw new Error('useDailyReviewContext must be used within a DailyReviewContextProvider');
  }

  return context;
};
