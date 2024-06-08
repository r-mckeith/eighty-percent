import React, { useEffect, useReducer, ReactNode } from 'react';
import { getDailyReviews } from '../../api/DailyReviews';
import { DailyReviewContext } from './DailyReviewContext';
import { dailyReviewReducer } from '../../reducers/DailyReviewReducer';

interface DailyReviewContextProviderProps {
  children: ReactNode;
}

const DailyReviewContextProvider = ({ children }: DailyReviewContextProviderProps) => {
  const [dailyReviews, dispatch] = useReducer(dailyReviewReducer, []);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const fetchedReviews = await getDailyReviews();
        if (fetchedReviews.length > 0) {
          dispatch({ type: 'INITIALIZE_REVIEWS', payload: fetchedReviews });
        } else {
          setTimeout(fetchReviews, 5000);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setTimeout(fetchReviews, 5000);
      }
    };

    fetchReviews();
  }, []);

  return <DailyReviewContext.Provider value={{ dailyReviews, dispatch }}>{children}</DailyReviewContext.Provider>;
};

export default DailyReviewContextProvider;
