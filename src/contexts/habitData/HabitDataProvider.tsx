import React, { useEffect, useReducer, ReactNode } from 'react';
import { getHabitData } from '../../api/Habits';
import { HabitDataContext } from './HabitDataContext';
import { habitDataReducer } from '../../reducers/HabitDataReducer';
import { useDateContext } from '../date/useDateContext';

type HabitDataContextProviderProps = {
  children: ReactNode;
}

const HabitDataContextProvider = ({ children }: HabitDataContextProviderProps) => {
  const [habitData, dispatchHabitData] = useReducer(habitDataReducer, []);
  const { selectedDate } = useDateContext();


  useEffect(() => {
    const fetchHabitData = async () => {
      const habitData = await getHabitData(selectedDate);
      dispatchHabitData({ type: 'INITIALIZE_HABIT_DATA', payload: habitData });
    };

    fetchHabitData();
  }, []);

  return (
    <HabitDataContext.Provider value={{ habitData, dispatch: dispatchHabitData }}>
      {children}
    </HabitDataContext.Provider>
  );
};

export default HabitDataContextProvider;
