import React from 'react';
import { Action } from '../../reducers/ReviewReducer';
import { DailyReviewProps } from '../../types/shared';

export interface DailyReviewContextType {
  dailyReviews: DailyReviewProps[];
  dispatch: React.Dispatch<Action>;
}

export const DailyReviewContext = React.createContext<DailyReviewContextType | undefined>(undefined);
