import React from 'react';
import { View } from 'react-native';
import { PlanProps } from '../../src/types/shared';
import { Divider, List, RadioButton } from 'react-native-paper';

type PlanSection = {
  plans: PlanProps[];
  setSelected: (arg0: number) => void;
};

export default function ProjectSection({ plans, setSelected }: PlanSection) {
  return (
    <List.Section>
      {plans.map((plan, index) => {
        return (
          <View key={index}>
            <RadioButton.Item
              label={plan.name}
              value={plan.name}
              onPress={() => setSelected(plan.id)}
              disabled={plan.completed ? true : false}
            />
            <Divider />
          </View>
        );
      })}
    </List.Section>
  );
}
// key={index}
// label={`${breadcrumb ? breadcrumb : ''} ${plan.name}`}
// value={plan.name}
// labelVariant='bodyMedium'
// status={isSelected || isSelectedLater ? 'checked' : 'unchecked'}
// onPress={!isSelectedLater ? () => handleToggleCompleted(plan, selectedDate, dispatch) : () => {}}
// disabled={isSelectedLater}
