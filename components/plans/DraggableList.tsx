import React, { useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist';
import { usePlanContext } from '../../src/contexts';
import { getColors } from '../../src/colors';
import { PlanProps } from '../../src/types';
import { Swipeable } from 'react-native-gesture-handler';
import { Divider, List, Icon } from 'react-native-paper';
import { Swipe } from '../shared';
import AddPlan from './AddPlan';
import RightSwipe from '../rightSwipe/RightSwipe';
import Scope from './Scope';
import { updatePlan } from '../../src/api/Plans';

type PlanSection = {
  plans: PlanProps[];
  expanded: number[];
  setExpanded: (arg0: any) => void;
};

export default function DraggableList({ plans, expanded, setExpanded }: PlanSection) {
  const { dispatch } = usePlanContext();
  const swipeableRow = useRef<Swipeable | null>(null);
  const scheme = useColorScheme();
  const colors = getColors(scheme);

  function handleSetExpanded(planId: number) {
    setExpanded((prevExpanded: number[]) =>
      prevExpanded.includes(planId) ? prevExpanded.filter((id: number) => id !== planId) : [...prevExpanded, planId]
    );
  }

  async function updatePlansOrder(updatedPlans: PlanProps[], parentId: number | null) {
    // Optimistically update the frontend state
    const newPlans = plans.map(plan => {
      const updatedPlan = updatedPlans.find(p => p.id === plan.id);
      return updatedPlan ? { ...plan, ...updatedPlan } : plan;
    });

    dispatch({ type: 'INITIALIZE_PLANS', payload: newPlans });

    // Update the backend
    const originalPlans = plans
      .filter(plan => plan.parentId === parentId)
      .sort((a, b) => a.order - b.order);

    const movedItem = updatedPlans.find((item, index) => item.id !== originalPlans[index]?.id);

    console.log('movedItem', movedItem);

    const updatedPlanIds = new Set(updatedPlans.map(plan => plan.id));
    if (movedItem) {
      try {
        await updatePlan(movedItem.id, movedItem.name, movedItem.order);
      } catch (error) {
        // Revert the optimistic update if the backend update fails
        dispatch({ type: 'INITIALIZE_PLANS', payload: plans });
        console.error('Failed to update plan order:', error);
      }
    }
  }

  function renderNestedPlans(parentId: number, level: number) {
    const nestedPlans = plans.filter(plan => plan.parentId === parentId).sort((a, b) => a.order - b.order);
    if (nestedPlans.length === 0) {
      return null;
    }
    return (
      <DraggableFlatList
        data={nestedPlans}
        keyExtractor={item => item.id.toString()}
        onDragEnd={({ data }) => {
          const updatedPlans = data.map((item, index) => ({ ...item, order: index + 1 }));
          updatePlansOrder(updatedPlans, parentId);
        }}
        renderItem={({ item, drag, isActive }) => renderItem({ item, drag, isActive, level })}
        contentContainerStyle={styles.itemContainer}
      />
    );
  }

  function renderItem({ item, drag, isActive, level }: any) {
    const isExpanded = expanded.includes(item.id);
    const hasChildPlans = plans.some(childPlan => childPlan.parentId === item.id);
    const order = plans.filter(plan => plan.parentId === item.parentId).length + 1;

    return (
      <View key={item.id}>
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
                    <AddPlan parentId={item.id} order={order} />
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
  }

  const rootPlans = plans.filter(plan => !plan.parentId).sort((a, b) => a.order - b.order);

  return (
    <DraggableFlatList
      style={styles.draggableListContent}
      data={rootPlans}
      onDragEnd={({ data }) => {
        const updatedPlans = data.map((item, index) => ({ ...item, order: index + 1 }));
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
