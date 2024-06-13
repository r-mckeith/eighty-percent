import React, { useState, useRef, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist';
import { PlanProps } from '../../src/types';
import { Swipeable } from 'react-native-gesture-handler';
import { Divider, List, Icon } from 'react-native-paper';
import { AddButton, Swipe } from '../shared';
import RightSwipe from '../rightSwipe/RightSwipe';
import Scope from './Scope';

type PlanSection = {
  rootPlans: PlanProps[];
  plans: PlanProps[];
  expanded: number[];
  setExpanded: (arg0: any) => void;
};

export default function DraggableList({ rootPlans, plans, expanded, setExpanded }: PlanSection) {
  const [data, setData] = useState(rootPlans);
  const swipeableRow = useRef<Swipeable | null>(null);


  useEffect(() => {
    setData(rootPlans);
  }, [rootPlans]);

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
                style={{ opacity: plan.completed ? 0.25 : 1 }}
                disabled={!!plan.completed}
                left={props => (
                  <TouchableOpacity
                    onPress={() => handleSetExpanded(plan.id)}
                    style={{ paddingLeft: hasChildPlans ? 0 : 22 }}>
                    <Icon
                      {...props}
                      source={hasChildPlans ? (isExpanded ? 'chevron-down' : 'chevron-up') : ''}
                      size={20}
                    />
                  </TouchableOpacity>
                )}
                right={props => (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <AddButton parentId={plan.id} depth={plan.depth ? plan.depth : 0} type={'plan'} />
                    <Scope plan={plan} />
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

  const renderItem = ({ item, drag, isActive }: any) => {
    const isExpanded = expanded.includes(item.id);
    return (
      <View style={{ marginBottom: 30 }}>
        <View key={item.id}>
          <ScaleDecorator>
            <TouchableOpacity
              onLongPress={drag}
              disabled={isActive}
              style={{ opacity: isActive ? 0.5 : 1 }}>
              <List.Item
                style={{ backgroundColor: item.completed ? '#0E9FFF' : '#0E5FFF' }}
                title={item.name}
                left={props => (
                  <TouchableOpacity style={{ paddingLeft: 10 }} onPress={() => handleSetExpanded(item.id)}>
                    <Icon {...props} source={isExpanded ? 'chevron-down' : 'chevron-up'} size={20} />
                  </TouchableOpacity>
                )}
                right={props => (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <AddButton parentId={item.id} depth={item.depth ? item.depth : 0} type={'plan'} />
                    <Scope plan={item} />
                  </View>
                )}
              />
              <Divider bold={true} />
            </TouchableOpacity>
          </ScaleDecorator>

          {isExpanded && renderPlansRecursively(item.id)}
        </View>
      </View>
    );
  };

  return (
    <DraggableFlatList
      data={data}
      onDragEnd={({ data }) => setData(data)}
      keyExtractor={item => item.id.toString()}
      renderItem={renderItem}
    />
  );
}

const styles = StyleSheet.create({
  childPlan: {
    paddingLeft: 10,
  },
});
