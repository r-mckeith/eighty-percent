import { PlanProps } from '../types/shared';

export type Action =
  | { type: 'INITIALIZE_PLANS'; payload: PlanProps[] }
  | { type: 'DELETE_PLAN'; id: number }
  | { type: 'EDIT_PLAN'; id: number; newName: string }
  | { type: 'ADD_PLAN'; payload: PlanProps }
  | { type: 'TOGGLE_SCOPE'; id: number; selectedDate: string }
  | { type: 'TOGGLE_COMPLETED'; id: number; selectedDate: any };

export const initialState = {
  plans: [],
};

const updateScope = (state: PlanProps[], action: { id: number; selectedDate: string }): PlanProps[] => {
  return state.map(plan => {
    if (plan.id === action.id) {
      const newScopeDay = plan.inScopeDay === action.selectedDate ? null : action.selectedDate;
      return { ...plan, inScopeDay: newScopeDay };
    }
    return plan;
  });
};

const toggleCompleted = (state: PlanProps[], action: { id: number; selectedDate: any }): PlanProps[] => {
  const dateFormatted = action.selectedDate.toISOString().split('T')[0];
  return state.map(plan => {
    if (plan.id === action.id) {
      if (plan.completed) {
        return { ...plan, completed: null };
      } else {
        return { ...plan, completed: dateFormatted };
      }
    } else {
      return plan;
    }
  });
};

export function planReducer(state: PlanProps[], action: Action): PlanProps[] {
  switch (action.type) {
    case 'INITIALIZE_PLANS':
      return action.payload;
    case 'ADD_PLAN':
      return [...state, action.payload];
    case 'DELETE_PLAN':
      return state.filter(plan => plan.id !== action.id);
    case 'EDIT_PLAN':
      return state.map(tag => {
        if (tag.id === action.id) {
          return {
            ...tag,
            name: action.newName,
          };
        } else {
          return tag;
        }
      });
    case 'TOGGLE_SCOPE':
      return updateScope(state, action);
    case 'TOGGLE_COMPLETED':
      return toggleCompleted(state, action);
  }
}
