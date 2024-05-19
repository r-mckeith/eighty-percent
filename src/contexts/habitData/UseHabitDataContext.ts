import { useContext } from 'react';
import { HabitDataContext } from './HabitDataContext';

export const useHabitDataContext = () => {
  const context = useContext(HabitDataContext);

  if (!context) {
    throw new Error('useHabitDataContext must be used within a HabitDataContextProvider');
  }

  return context;
};
