import { useContext } from 'react';
import { PlanContext } from './PlanContext';

export const usePlanContext = () => {
  const context = useContext(PlanContext);

  if (!context) {
    throw new Error('usePlanContext must be used within a PlanContextProvider');
  }

  return context;
};