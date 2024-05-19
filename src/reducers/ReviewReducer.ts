import { ReviewProps } from '../types/shared';

export type Action =
  | { type: 'INITIALIZE_REVIEWS'; payload: ReviewProps[] }
  | { type: 'DELETE_REVIEW'; id: number }
  | { type: 'ADD_REVIEW'; payload: ReviewProps; date: string }
  | { type: 'UPDATE_REVIEW'; id: number; newReview: ReviewProps };

export const initialState = {
  reviews: [],
};

export function reviewReducer(state: ReviewProps[], action: Action): ReviewProps[] {
  switch (action.type) {
    case 'INITIALIZE_REVIEWS':
      return action.payload;
    case 'ADD_REVIEW':
      return [...state, action.payload];
    case 'DELETE_REVIEW':
      return state.filter(review => review.id !== action.id);
    case 'UPDATE_REVIEW':
      return state.map(review => (review.id === action.id ? { ...review, name: action.newReview } : review));
    default:
      return state;
  }
}
