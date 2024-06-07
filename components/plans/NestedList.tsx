import React from 'react';
import { View, StyleSheet, useColorScheme } from 'react-native';
import { List } from 'react-native-paper';
import Plan from './Plan';
import { AddButton } from '../shared';
import { PlanProps } from '../../src/types';
import { RowText } from '../layout';
import { getColors } from '../../src/colors';

export default function NestedList({ plans, rootPlanId }: { plans: PlanProps[]; rootPlanId: number | null }) {
  const scheme = useColorScheme();
  const colors = getColors(scheme);

  const rootPlan = plans.find(plan => plan.id === rootPlanId);

  const renderPlansRecursively = (parentId: number) => {
    return plans
      .filter(plan => plan.parentId === parentId)
      .map((plan, index) => (
        <View key={index} style={[colors.row, styles.childPlan]}>
          {/* <Plan key={index} plan={plan} rootPlanId={rootPlanId} first={true} last={true} /> */}
          <List.Item
            title={plan.name}
            left={props => <List.Icon {...props} icon='radiobox-blank' />}
            right={props => <AddButton parentId={plan.id} depth={plan.depth ? plan.depth : 0} type={'plan'} />}
          />
          {renderPlansRecursively(plan.id)}
        </View>
      ));
  };

  return (
    <View>
      {rootPlan ? (
        <View>
          <List.Accordion title={rootPlan.name}>{renderPlansRecursively(rootPlan.id)}</List.Accordion>
        </View>
      ) : (
        // <View>
        //   <Plan plan={rootPlan} rootPlanId={rootPlanId} first={true} last={true} />
        //   {renderPlansRecursively(rootPlan.id)}
        // </View>
        <RowText text='No plan found' />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  childPlan: {
    paddingLeft: 20,
  },
});
