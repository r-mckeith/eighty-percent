import React from 'react';
import { View, StyleSheet, useColorScheme } from 'react-native';
import Plan from './Plan';
import { PlanProps } from '../../src/types/HabitTypes';
import { Section, RowText } from '../shared';
import { getColors } from '../../src/colors';

export default function NestedList({ plans, rootPlanId }: { plans: PlanProps[]; rootPlanId: number | null }) {
  const scheme = useColorScheme();
  const colors = getColors(scheme);

  const rootPlan = plans.find(plan => plan.id === rootPlanId);

  const renderPlansRecursively = (parentId: number) => {
    return plans
      .filter(plan => plan.parentId === parentId)
      .map((plan, index) => (
        <View key={plan.id} style={[colors.row, styles.childPlan]}>
          <Plan key={index} plan={plan} rootPlanId={rootPlanId} first={true} last={true} />
          {renderPlansRecursively(plan.id)}
        </View>
      ));
  };

  return (
    <Section>
      {rootPlan ? (
        <View>
          <Plan plan={rootPlan} rootPlanId={rootPlanId} first={true} last={true} />
          {renderPlansRecursively(rootPlan.id)}
        </View>
      ) : (
        <RowText text='No plan found' />
      )}
    </Section>
  );
}

const styles = StyleSheet.create({
  childPlan: {
    paddingLeft: 20,
  },
});
