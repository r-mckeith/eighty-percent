import React from 'react';
import { View } from 'react-native';
import { PlanProps } from '../../src/types';
import { Divider, List } from 'react-native-paper';

type RootPlans = {
  plans: PlanProps[];
  setSelected: (arg0: number) => void;
};

export default function RootPlans({ plans, setSelected }: RootPlans) {
  return (
    <List.Section>
      {plans.map((plan, index) => {
        return (
          <View key={index}>
            <List.Item
              title={plan.name}
              style={{ opacity: plan.completed ? 0.25 : 1 }}
              onPress={() => setSelected(plan.id)}
            />
            <Divider />
          </View>
        );
      })}
    </List.Section>
  );
}
