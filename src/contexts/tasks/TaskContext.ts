import React from 'react';
import { Action } from '../../reducers/TaskReducer';
import { TaskProps } from '../../types/HabitTypes';


type TaskContextType = {
  tasks: TaskProps[];
  dispatch: React.Dispatch<Action>;
}

export const TaskContext = React.createContext<TaskContextType | undefined>(undefined);

