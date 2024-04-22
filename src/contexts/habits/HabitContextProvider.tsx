import React, { useEffect, useReducer, ReactNode } from 'react';
import { getTags } from '../../api/SupabaseTags';
import { HabitContext } from './HabitContext';
import { tagReducer } from '../../reducers/HabitReducer';

type HabitContextProviderProps = {
  children: ReactNode;
}

const HabitContextProvider = ({ children }: HabitContextProviderProps) => {
  const [habits, dispatch] = useReducer(tagReducer, []);

  useEffect(() => {
    const fetchTags = async () => {
      const tags = await getTags();
      dispatch({ type: 'INITIALIZE_TAGS', payload: tags });
    };

    fetchTags();
  }, []);

  return (
    <HabitContext.Provider value={{ habits, dispatch }}>
      {children}
    </HabitContext.Provider>
  );
};


export default HabitContextProvider;

