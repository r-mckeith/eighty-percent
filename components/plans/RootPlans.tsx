import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { PlanProps } from '../../src/types';
import { Divider, List } from 'react-native-paper';
import { AddButton } from '../shared';
import Scope from './Scope';

type RootPlans = {
  rootPlans: PlanProps[];
  plans: PlanProps[];
};

export default function RootPlans({ rootPlans, plans }: RootPlans) {
  const [expanded, setExpanded] = useState<number | null>(null);

  const renderPlansRecursively = (parentId: number) => {
    return plans
      .filter(plan => plan.parentId === parentId)
      .map((plan, index) => {
        return (
        <View key={index} style={styles.childPlan}>
          <List.Item
            title={plan.name}
            style={{opacity: plan.completed ? 0.25 : 1}}
            left={props => (
              <Scope id={plan.id} inScopeDay={plan.inScopeDay ? plan.inScopeDay : null} completed={plan.completed} />
            )}
            right={props => <AddButton parentId={plan.id} depth={plan.depth ? plan.depth : 0} type={'plan'} />}
          />
          {renderPlansRecursively(plan.id)}
        </View>
      )});
  };

  function handleSetExpanded(rootPlanId: number) {
    setExpanded(expanded === rootPlanId ? null : rootPlanId);
  }

  return (
    <List.Section title='Recent'>
      {rootPlans.map((rootPlan, index) => {
        return (
          <View>
            <List.Accordion
              key={index}
              onPress={() => handleSetExpanded(rootPlan.id)}
              title={rootPlan.name}
              expanded={expanded === rootPlan.id}>
                <View style={{flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 25, paddingVertical: 10}}>
                <AddButton parentId={rootPlan.id} depth={rootPlan.depth ? rootPlan.depth : 0} type={'plan'} />

                </View>

              {renderPlansRecursively(rootPlan.id)}
            </List.Accordion>
            <Divider />
          </View>
        );
      })}
    </List.Section>
  );
}

const styles = StyleSheet.create({
  childPlan: {
    paddingLeft: 20,
  },
});
