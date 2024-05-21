import React, { useEffect, useReducer, ReactNode } from 'react';
import { getTasks } from '../../api/Tasks';
import { TaskContext } from './TaskContext';
import { taskReducer } from '../../reducers/TaskReducer';

type TaskContextProviderProps = {
  children: ReactNode;
};

const TaskContextProvider = ({ children }: TaskContextProviderProps) => {
  const [tasks, dispatch] = useReducer(taskReducer, []);

  useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await getTasks();
      dispatch({ type: 'INITIALIZE_TASKS', payload: tasks });
    };

    fetchTasks();
  }, []);

  return <TaskContext.Provider value={{ tasks, dispatch }}>{children}</TaskContext.Provider>;
};

export default TaskContextProvider;
