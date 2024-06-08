import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-paper';
import { useDateContext, usePlanContext } from '../../src/contexts';
import { toggleScope } from '../../src/api/Plans';
import { PlanProps } from '../../src/types';

type Scope = {
  plan: PlanProps;
};

export default function Scope({ plan }: Scope) {
  const [inScope, setInScope] = useState<any>();
  const { dispatch } = usePlanContext();
  const { selectedDateString } = useDateContext();

  useEffect(() => {
    setInScope(plan.inScopeDay && plan.inScopeDay <= selectedDateString);
  }, [plan.inScopeDay]);

  async function handleToggleScope() {
    if (plan.completed) {
      return;
    }
    dispatch({
      type: 'TOGGLE_SCOPE',
      id: plan.id,
      selectedDate: selectedDateString,
    });

    try {
      const updatedTask = await toggleScope(plan.id, selectedDateString);

      if (updatedTask) {
      } else {
        console.error('Failed to toggle scope for day');
      }
    } catch (error) {
      console.error('Failed to toggle scope for day:', error);
    }
  }

  return (
    <TouchableOpacity onPress={handleToggleScope} style={{ opacity: plan.completed ? 0.2 : 1 }}>
      <Icon source={inScope ? 'radiobox-marked' : 'radiobox-blank'} size={20} />
    </TouchableOpacity>
  );
}
