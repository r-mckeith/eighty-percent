import { useContext } from 'react';
import { ReviewContext } from './ReviewContext';

export const useReviewContext = () => {
  const context = useContext(ReviewContext);

  if (!context) {
    throw new Error('useReviewContext must be used within a ReviewContextProvider');
  }

  return context;
};
