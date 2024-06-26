import React from 'react';
import { Action } from '../../reducers/PlanReducer';
import { PlanProps } from '../../types';

type PlanContextType = {
  plans: PlanProps[];
  dispatch: React.Dispatch<Action>;
};

export const PlanContext = React.createContext<PlanContextType | undefined>(undefined);
