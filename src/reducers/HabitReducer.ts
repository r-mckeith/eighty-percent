import { HabitProps } from '../types/shared';

export type Action =
  | { type: 'INITIALIZE_TAGS'; payload: HabitProps[] }
  | { type: 'DELETE_HABIT'; id: number }
  | { type: 'EDIT_HABIT'; id: number; newName: string }
  | { type: 'ADD_HABIT'; payload: HabitProps }
  | { type: 'ADD_LIST_TAG'; payload: any }
  | { type: 'UPDATE_TAG'; payload: HabitProps }
  | { type: 'SELECT_TAG'; payload: HabitProps };

export const initialState = {
  tags: [],
};

export function tagReducer(state: HabitProps[], action: Action): HabitProps[] {
  switch (action.type) {
    case 'INITIALIZE_TAGS':
      return action.payload;
    case 'ADD_HABIT':
      return [...state, action.payload];
    case 'EDIT_HABIT':
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
    case 'ADD_LIST_TAG':
      return [...state, action.payload];
    case 'DELETE_HABIT':
      return state.filter(tag => tag.id !== action.id);
    case 'UPDATE_TAG':
      return state.map(tag => (tag.id === action.payload.id ? action.payload : tag));
    case 'SELECT_TAG':
      return state.map(tag => {
        if (tag.id === action.payload.tag_data?.[0]?.tag_id) {
          return {
            ...tag,
            tag_data: [...tag.tag_data, action.payload.tag_data[0]],
          };
        }
        return tag;
      });
    default:
      return state;
  }
}
