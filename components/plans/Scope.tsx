import React, { useState, useEffect } from 'react';
import { View, useColorScheme } from 'react-native';
import { useDateContext, usePlanContext } from '../../src/contexts';
import { toggleScope } from '../../src/api/Plans';
import { Icon } from '../shared';
import { getColors } from '../../src/colors';
import { PlanProps } from '../../src/types';

type Scope = {
plan: PlanProps;
};

export default function Scope({ plan }: Scope) {
  const [inScope, setInScope] = useState<any>();
  const { dispatch } = usePlanContext();
  const { selectedDateString } = useDateContext();

  const scheme = useColorScheme();
  const colors = getColors(scheme);

  useEffect(() => {
    setInScope(plan.inScopeDay && plan.inScopeDay <= selectedDateString)
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
    <View>
      <Icon
        opacity={plan.completed ? 1 : 0.2}
        name={inScope ? 'radiobox-marked' : 'radiobox-blank'}
        size={24}
        style={{ marginRight: 7 }}
        color={plan.completed ? 'grey' : colors.text.color}
        onPress={handleToggleScope}
      />
    </View>
  );
}
