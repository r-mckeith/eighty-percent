import React from 'react';
import { Action } from '../../reducers/HabitDataReducer';
import { HabitDataProps } from '../../types/shared';

type HabitDataContextType = {
  habitData: HabitDataProps[];
  dispatch: React.Dispatch<Action>;
};

export const HabitDataContext = React.createContext<HabitDataContextType | undefined>(undefined);
