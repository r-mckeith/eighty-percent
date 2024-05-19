import React from 'react';
import { Action } from '../../reducers/HabitReducer';
import { HabitProps } from '../../types/shared';

type HabitContextType = {
  habits: HabitProps[];
  dispatch: React.Dispatch<Action>;
};

export const HabitContext = React.createContext<HabitContextType | undefined>(undefined);
