import { useContext } from 'react';
import { HabitContext } from './HabitContext';

export const useHabitContext = () => {
  const context = useContext(HabitContext);

  if (!context) {
    throw new Error('useTagContext must be used within a TagContextProvider');
  }

  return context;
};
