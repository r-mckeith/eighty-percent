import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { PlanProps } from '../../src/types';
import { Divider, List, Text } from 'react-native-paper';
import { AddButton } from '../shared';
import Scope from './Scope';

type RootPlans = {
  rootPlans: PlanProps[];
  plans: PlanProps[];
  setSelected: (arg0: number) => void;
};

export default function RootPlans({ rootPlans, plans, setSelected }: RootPlans) {
  const [expanded, setExpanded] = useState<number>(12);

  const renderPlansRecursively = (parentId: number) => {
    return plans
      .filter(plan => plan.parentId === parentId)
      .map((plan, index) => (
        <View key={index} style={styles.childPlan}>
          <List.Item
            title={plan.name}
            left={props => (
              <Scope id={plan.id} inScopeDay={plan.inScopeDay ? plan.inScopeDay : null} completed={plan.completed} />
            )}
            right={props => <AddButton parentId={plan.id} depth={plan.depth ? plan.depth : 0} type={'plan'} />}
          />
          {renderPlansRecursively(plan.id)}
        </View>
      ));
  };

  return (
    <List.Section title='Recent'>
      {rootPlans.map((rootPlan, index) => {
        return (
          <List.Accordion
            onPress={() => setExpanded(rootPlan.id)}
            title={rootPlan.name}
            expanded={expanded === rootPlan.id}
            left={props => (
              <View style={{ paddingLeft: 10 }}>
                <AddButton parentId={rootPlan.id} depth={rootPlan.depth ? rootPlan.depth : 0} type={'plan'} />
              </View>
            )}>
            {renderPlansRecursively(rootPlan.id)}
          </List.Accordion>

          // <View key={index}>
          //   <List.Item
          //     title={plan.name}
          //     style={{ opacity: plan.completed ? 0.25 : 1 }}
          //     onPress={() => setSelected(plan.id)}
          //   />
          //   <Divider />
          // </View>
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
