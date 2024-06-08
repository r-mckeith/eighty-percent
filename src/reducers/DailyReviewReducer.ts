import { DailyReviewProps } from '../types';

export type Action =
  | { type: 'INITIALIZE_REVIEWS'; payload: DailyReviewProps[] }
  | { type: 'DELETE_REVIEW'; id: number }
  | { type: 'ADD_REVIEW'; payload: DailyReviewProps; date: string }
  | { type: 'UPDATE_REVIEW'; id: number; newReview: DailyReviewProps };

export const initialState = {
  reviews: [],
};

export function dailyReviewReducer(state: DailyReviewProps[], action: Action): DailyReviewProps[] {
  switch (action.type) {
    case 'INITIALIZE_REVIEWS':
      return action.payload;
    case 'ADD_REVIEW':
      return [action.payload, ...state];
    case 'DELETE_REVIEW':
      return state.filter(review => review.id !== action.id);
    case 'UPDATE_REVIEW':
      return state.map(review => (review.id === action.id ? { ...review, name: action.newReview } : review));
    default:
      return state;
  }
}
