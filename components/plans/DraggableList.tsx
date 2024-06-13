import React, { useState, useRef, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist';
import { getColors } from '../../src/colors';
import { PlanProps } from '../../src/types';
import { Swipeable } from 'react-native-gesture-handler';
import { Divider, List, Icon } from 'react-native-paper';
import { AddButton, Swipe } from '../shared';
import RightSwipe from '../rightSwipe/RightSwipe';
import Scope from './Scope';

type PlanSection = {
  plans: PlanProps[];
  expanded: number[];
  setExpanded: (arg0: any) => void;
};

export default function DraggableList({ plans, expanded, setExpanded }: PlanSection) {
  // Assign default order if not present
  const initializePlans = (plans: PlanProps[]) => {
    return plans.map((plan, index) => ({
      ...plan,
      order: plan.order !== undefined ? plan.order : index,
    }));
  };

  const [data, setData] = useState(initializePlans(plans));
  const swipeableRow = useRef<Swipeable | null>(null);

  const scheme = useColorScheme();
  const colors = getColors(scheme);

  useEffect(() => {
    setData(initializePlans(plans));
  }, [plans]);

  const handleSetExpanded = (planId: number) => {
    setExpanded((prevExpanded: number[]) =>
      prevExpanded.includes(planId) ? prevExpanded.filter((id: number) => id !== planId) : [...prevExpanded, planId]
    );
  };

  const updatePlansOrder = (updatedPlans: PlanProps[], parentId: number | null) => {
    setData(prevData => {
      const updatedPlanIds = new Set(updatedPlans.map(plan => plan.id));
      const newPlans = prevData.map(plan => {
        if (updatedPlanIds.has(plan.id)) {
          const updatedPlan = updatedPlans.find(p => p.id === plan.id);
          return updatedPlan ? { ...plan, ...updatedPlan } : plan;
        }
        return plan;
      });

      if (parentId === null) {
        return newPlans;
      }

      return [
        ...newPlans.filter(plan => plan.parentId === null),
        ...updatedPlans,
        ...newPlans.filter(plan => plan.parentId !== null && !updatedPlanIds.has(plan.id))
      ];
    });
  };

  const renderNestedPlans = (parentId: number, level: number) => {
    const nestedPlans = data.filter(plan => plan.parentId === parentId).sort((a, b) => a.order - b.order);
    if (nestedPlans.length === 0) {
      return null;
    }
    return (
      <DraggableFlatList
        data={nestedPlans}
        keyExtractor={item => item.id.toString()}
        onDragEnd={({ data }) => {
          const updatedPlans = data.map((item, index) => ({ ...item, order: index }));
          updatePlansOrder(updatedPlans, parentId);
        }}
        renderItem={({ item, drag, isActive }) => renderItem({ item, drag, isActive, level })}
        contentContainerStyle={styles.itemContainer}
      />
    );
  };

  const renderItem = ({ item, drag, isActive, level }: any) => {
    const isExpanded = expanded.includes(item.id);
    const hasChildPlans = data.some(childPlan => childPlan.parentId === item.id);

    return (
      <View key={item.id} >
        <ScaleDecorator>
          <TouchableOpacity onLongPress={drag} disabled={isActive} style={{ opacity: isActive ? 0.5 : 1 }}>
            <Swipe
              swipeableRow={swipeableRow}
              renderRightActions={() => <RightSwipe item={item} swipeableRow={swipeableRow} type={'plan'} />}
            >
              <List.Item
                style={[
                  {
                    paddingLeft: level * 10,
                    backgroundColor: item.parentId
                      ? colors.background.backgroundColor
                      : item.completed
                      ? '#0E9FFF'
                      : '#0E5FFF',
                  },
                ]}
                title={item.name}
                left={props => (
                  <TouchableOpacity style={{ paddingLeft: 10 }} onPress={() => handleSetExpanded(item.id)}>
                    <Icon
                      {...props}
                      source={hasChildPlans ? (isExpanded ? 'chevron-down' : 'chevron-up') : ''}
                      size={20}
                    />
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

            </Swipe>
          </TouchableOpacity>
        </ScaleDecorator>
        {isExpanded && hasChildPlans && renderNestedPlans(item.id, level + 1)}
      </View>
    );
  };

  const rootPlans = data.filter(plan => plan.parentId === 0).sort((a, b) => a.order - b.order);

  return (
    <DraggableFlatList
      style={styles.draggableListContent}
      data={rootPlans}
      onDragEnd={({ data }) => {
        const updatedPlans = data.map((item, index) => ({ ...item, order: index }));
        updatePlansOrder(updatedPlans, null);
      }}
      keyExtractor={plan => plan.id.toString()}
      renderItem={({ item, drag, isActive }) => renderItem({ item, drag, isActive, level: 0 })}
      contentContainerStyle={styles.itemContainer}
    />
  );
}

const styles = StyleSheet.create({
  draggableListContent: {
    paddingHorizontal: 16,
  },
  itemContainer: {
    marginBottom: 10,
  },
});
