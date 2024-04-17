import React, { useEffect, useReducer, ReactNode } from 'react';
import { getTasks } from '../../api/SupabaseTasks';
import { TaskContext } from './TaskContext';
import { taskReducer } from '../../reducers/TaskReducer';

interface TaskContextProviderProps {
  children: ReactNode;
}

const TaskContextProvider = ({ children }: TaskContextProviderProps) => {
  const [state, dispatch] = useReducer(taskReducer, []);

  useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await getTasks();
      dispatch({ type: 'INITIALIZE_TASKS', payload: tasks });
    };

    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContextProvider;