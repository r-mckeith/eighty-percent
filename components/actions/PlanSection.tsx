import React, { useState } from 'react';
import { View} from 'react-native';
import { PlanProps } from '../../src/types/shared';
import { markPlanAsComplete } from '../../src/api/Plans';
import { usePlanContext, useDateContext } from '../../src/contexts';
import { Divider, RadioButton } from 'react-native-paper';

type Plans = {
  plans: (PlanProps & { breadcrumb: string })[];
};

export default function PlanSection({ plans }: Plans) {
  const [checkedValues, setCheckedValues] = useState(new Set());

  const { selectedDate } = useDateContext();
  const { dispatch } = usePlanContext();

  async function handleToggleCompleted(plan: PlanProps, selectedDate: Date, dispatch: React.Dispatch<any>) {
    handleToggle(plan.name);
    if (plan.name === 'Weekly review') {
    } else {
      dispatch({ type: 'TOGGLE_COMPLETED', id: plan.id, selectedDate: selectedDate });
      try {
        const updatedPlan = await markPlanAsComplete(plan.id, selectedDate);

        if (updatedPlan) {
        } else {
          console.error('Failed to toggle complete');
        }
      } catch (error) {
        console.error('Failed to toggle complete', error);
      }
    }
  }

  const handleToggle = (planName: string) => {
    const updatedCheckedValues = new Set(checkedValues);
    if (updatedCheckedValues.has(planName)) {
      updatedCheckedValues.delete(planName);
    } else {
      updatedCheckedValues.add(planName);
    }
    setCheckedValues(updatedCheckedValues);
  };

  return (
    <View style={{ marginBottom: 30 }}>
      {plans.map((plan, index) => {
        const isSelected = plan.completed ? plan.completed === selectedDate.toISOString().split('T')[0] : false;
        const isSelectedLater = plan.completed ? plan.completed > selectedDate.toISOString().split('T')[0] : false;
        const breadcrumb = plan.breadcrumb;

        return (
          <>
            <RadioButton.Item
              key={index}
              label={`${breadcrumb ? breadcrumb : ''} ${plan.name}`}
              value={plan.name}
              labelVariant='bodyMedium'
              status={isSelected || isSelectedLater ? 'checked' : 'unchecked'}
              onPress={!isSelectedLater ? () => handleToggleCompleted(plan, selectedDate, dispatch) : () => {}}
              disabled={isSelectedLater}
            />
            <Divider />
          </>
        );
      })}
    </View>
  );
}
