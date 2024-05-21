import { NewTaskProps, TaskProps } from '../types/shared';

export type Action =
  | { type: 'INITIALIZE_TASKS'; payload: TaskProps[] }
  | { type: 'DELETE_TASK'; id: number }
  | { type: 'UPDATE_TASK'; id: number; updatedTask: TaskProps }
  | { type: 'ADD_TASK'; payload: TaskProps }
  | { type: 'TOGGLE_SCOPE'; id: number; selectedDate: string }
  | { type: 'TOGGLE_COMPLETED'; id: number; selectedDate: any };

export const initialState = {
  tasks: [],
};

const updateScope = (state: TaskProps[], action: { id: number; selectedDate: string }): TaskProps[] => {
  return state.map(tag => {
    if (tag.id === action.id) {
      const newScopeDay = tag.inScopeDay === action.selectedDate ? null : action.selectedDate;
      return { ...tag, inScopeDay: newScopeDay };
    }
    return tag;
  });
};

const toggleCompleted = (state: TaskProps[], action: { id: number; selectedDate: any }): TaskProps[] => {
  const dateFormatted = action.selectedDate.toISOString().split('T')[0];
  return state.map(tag => {
    if (tag.id === action.id) {
      if (tag.completed) {
        return { ...tag, completed: null };
      } else {
        return { ...tag, completed: dateFormatted };
      }
    } else {
      return tag;
    }
  });
};

export function taskReducer(state: TaskProps[], action: Action): TaskProps[] {
  switch (action.type) {
    case 'INITIALIZE_TASKS':
      return action.payload;
    case 'ADD_TASK':
      return [...state, action.payload];
    case 'DELETE_TASK':
      return state.filter(task => task.id !== action.id);
    case 'UPDATE_TASK':
      return state.map(task => (task.id === action.id ? action.updatedTask : task));
    case 'TOGGLE_SCOPE':
      return updateScope(state, action);
    case 'TOGGLE_COMPLETED':
      return toggleCompleted(state, action);
  }
}
