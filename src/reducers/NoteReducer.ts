import { NoteProps } from '../types';

export type Action =
  | { type: 'INITIALIZE_NOTES'; payload: NoteProps[] }
  | { type: 'DELETE_NOTE'; id: number }
  | { type: 'ADD_NOTE'; payload: NoteProps }
  | { type: 'UPDATE_NOTE'; id: number; newNote: NoteProps };

export const initialState = {
  notes: [],
};

export function noteReducer(state: NoteProps[], action: Action): NoteProps[] {
  switch (action.type) {
    case 'INITIALIZE_NOTES':
      return action.payload;
    case 'ADD_NOTE':
      return [...state, action.payload];
    case 'DELETE_NOTE':
      return state.filter(note => note.id !== action.id);
    case 'UPDATE_NOTE':
      return state.map(note => (note.id === action.id ? action.newNote : note));
    default:
      return state;
  }
}
