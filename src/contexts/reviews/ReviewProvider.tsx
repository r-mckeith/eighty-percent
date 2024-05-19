import React, { useEffect, useReducer, ReactNode } from 'react';
import { getReviews } from '../../api/Reviews';
import { ReviewContext } from './ReviewContext';
import { reviewReducer } from '../../reducers/ReviewReducer';

interface ReviewContextProviderProps {
  children: ReactNode;
}

const ReviewContextProvider = ({ children }: ReviewContextProviderProps) => {
  const [reviews, dispatch] = useReducer(reviewReducer, []);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const fetchedReviews = await getReviews();
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

  return <ReviewContext.Provider value={{ reviews, dispatch }}>{children}</ReviewContext.Provider>;
};

export default ReviewContextProvider;
