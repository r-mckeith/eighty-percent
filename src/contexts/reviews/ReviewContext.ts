import React from 'react';
import { Action } from '../../reducers/ReviewReducer';
import { ReviewProps } from '../../types';

export interface ReviewContextType {
  reviews: ReviewProps[];
  dispatch: React.Dispatch<Action>;
}

export const ReviewContext = React.createContext<ReviewContextType | undefined>(undefined);
