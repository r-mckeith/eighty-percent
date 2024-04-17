import React from 'react';
import { Task } from '../../types/TaskTypes';
import { Action } from '../../reducers/TaskReducer';

export interface TaskContextType {
  state: Task[];
  dispatch: React.Dispatch<Action>;
}

export const TaskContext = React.createContext<TaskContextType | undefined>(undefined);