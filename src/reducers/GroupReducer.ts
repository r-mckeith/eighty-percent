import { GroupProps } from '../types/shared';

export type Action =
  | { type: 'INITIALIZE_GROUPS'; payload: GroupProps[] }
  | { type: 'DELETE_GROUP'; id: number }
  | { type: 'ADD_GROUP'; payload: GroupProps }
  | { type: 'UPDATE_GROUP_NAME'; id: number; name: string };

export const initialState = {
  groups: [],
};

export function groupReducer(state: GroupProps[], action: Action): GroupProps[] {
  switch (action.type) {
    case 'INITIALIZE_GROUPS':
      return action.payload;
    case 'ADD_GROUP':
      return [...state, action.payload];
    case 'DELETE_GROUP':
      return state.filter(group => group.id !== action.id);
    case 'UPDATE_GROUP_NAME':
      return state.map(group => (group.id === action.id ? { ...group, name: action.name } : group));
    default:
      return state;
  }
}
