import React, { useEffect, useReducer, ReactNode } from 'react';
import { getPlans } from '../../api/Plans';
import { PlanContext } from './PlanContext';
import { planReducer } from '../../reducers/PlanReducer';

type PlanContextProvider = {
  children: ReactNode;
};

const PlanContextProvider = ({ children }: PlanContextProvider) => {
  const [plans, dispatch] = useReducer(planReducer, []);

  useEffect(() => {
    const fetchPlans = async () => {
      const plans = await getPlans();
      dispatch({ type: 'INITIALIZE_PLANS', payload: plans });
    };

    fetchPlans();
  }, []);

  return <PlanContext.Provider value={{ plans, dispatch }}>{children}</PlanContext.Provider>;
};

export default PlanContextProvider;
