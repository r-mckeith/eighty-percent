import React, { useRef } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Divider, List, Icon } from 'react-native-paper';
import { PlanProps } from '../../src/types';
import { AddButton , Swipe} from '../shared';
import RightSwipe from '../rightSwipe/RightSwipe';
import Scope from './Scope';

type RootPlans = {
  rootPlans: PlanProps[];
  plans: PlanProps[];
  expanded: number[];
  setExpanded: (arg0: any) => void;
};

export default function RootPlans({ rootPlans, plans, expanded, setExpanded }: RootPlans) {
  const swipeableRow = useRef<Swipeable | null>(null);

  const handleSetExpanded = (planId: number) => {
    setExpanded((prevExpanded: number[]) =>
      prevExpanded.includes(planId) ? prevExpanded.filter((id: number) => id !== planId) : [...prevExpanded, planId]
    );
  };

  const renderPlansRecursively = (parentId: number) => {
    return plans
      .filter(plan => plan.parentId === parentId)
      .map((plan, index) => {
        const hasChildPlans = plans.some(childPlan => childPlan.parentId === plan.id);
        const isExpanded = expanded.includes(plan.id);

        return (
          <Swipe
          key={plan.id}
          swipeableRow={swipeableRow}
          renderRightActions={() => <RightSwipe item={plan} swipeableRow={swipeableRow} type={'plan'} />}>
          <View key={plan.id} style={styles.childPlan}>
            <List.Item
              key={index}
              title={plan.name}
              style={{opacity: plan.completed ? 0.25 : 1 }}
              disabled={!!plan.completed}
              left={props => (
                <>
                  <TouchableOpacity
                    onPress={() => handleSetExpanded(plan.id)}
                    style={{ paddingLeft: hasChildPlans ? 0 : 22}}>
                    <Icon
                      {...props}
                      source={hasChildPlans ? (isExpanded ? 'chevron-down' : 'chevron-up') : ''}
                      size={20}
                    />
                  </TouchableOpacity>
                </>
              )}
              right={props => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <AddButton parentId={plan.id} depth={plan.depth ? plan.depth : 0} type={'plan'} />
                  <Scope plan={plan}/>
                </View>
              )}
            />
            <Divider />
            {isExpanded && renderPlansRecursively(plan.id)}
          </View>
          </Swipe>
        );
      });
  };

  return (
    <View style={{marginBottom: 30}}>
      {rootPlans.map((rootPlan, index) => {
        const isExpanded = expanded.includes(rootPlan.id);

        return (
          <View style={{ paddingBottom: 10 }}>
            <List.Item
              key={index}
              style={{ backgroundColor: rootPlan.completed? '#b1b1b3' : '#0E5FFF' }}
              title={rootPlan.name}
              left={props => (
                <>
                  <TouchableOpacity style={{paddingLeft: 10}} onPress={() => handleSetExpanded(rootPlan.id)}>
                    <Icon {...props} source={isExpanded ? 'chevron-down' : 'chevron-up'} size={20} />
                  </TouchableOpacity>
                </>
              )}
              right={props => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <AddButton parentId={rootPlan.id} depth={rootPlan.depth ? rootPlan.depth : 0} type={'plan'} />
                  <Scope plan={rootPlan}/>
                </View>
              )}
            />
            <Divider bold={true} />
            {isExpanded && renderPlansRecursively(rootPlan.id)}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  childPlan: {
    paddingLeft: 10,
  },
});
