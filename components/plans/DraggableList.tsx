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
  rootPlans: PlanProps[];
  plans: PlanProps[];
  expanded: number[];
  setExpanded: (arg0: any) => void;
};

export default function DraggableList({ rootPlans, plans, expanded, setExpanded }: PlanSection) {
  const [data, setData] = useState(rootPlans);
  const swipeableRow = useRef<Swipeable | null>(null);

  const scheme = useColorScheme();
  const colors = getColors(scheme);

  useEffect(() => {
    setData(rootPlans);
  }, [rootPlans]);

  const handleSetExpanded = (planId: number) => {
    setExpanded((prevExpanded: number[]) =>
      prevExpanded.includes(planId) ? prevExpanded.filter((id: number) => id !== planId) : [...prevExpanded, planId]
    );
  };

  const updateNestedPlans = (updatedPlan: PlanProps) => {
    const updatedPlans = plans.map(plan => (plan.id === updatedPlan.id ? updatedPlan : plan));
    setData(updatedPlans.filter(plan => plan.parentId === null));
  };

  const renderNestedPlans = (parentId: number, level: number) => {
    const nestedPlans = plans.filter(plan => plan.parentId === parentId);
    return (
      <DraggableFlatList
        data={nestedPlans}
        keyExtractor={item => item.id.toString()}
        onDragEnd={({ data }) => {
          data.forEach((item, index) => {
            item.order = index;
            updateNestedPlans(item);
          });
        }}
        renderItem={({ item, drag, isActive }) => renderItem({ item, drag, isActive, level })}
        contentContainerStyle={styles.draggableListContent}
      />
    );
  };

  const renderItem = ({ item, drag, isActive, level }: any) => {
    const isExpanded = expanded.includes(item.id);
    const hasChildPlans = plans.some(childPlan => childPlan.parentId === item.id);

    return (
      <View key={item.id} style={styles.itemContainer}>
        <View>
          <ScaleDecorator>
            <TouchableOpacity onLongPress={drag} disabled={isActive} style={{ opacity: isActive ? 0.5 : 1 }}>
              <Swipe
                swipeableRow={swipeableRow}
                renderRightActions={() => <RightSwipe item={item} swipeableRow={swipeableRow} type={'plan'} />}>
                <List.Item
                  style={[
                    {
                      padding: level * 10,
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
      </View>
    );
  };

  return (
    <DraggableFlatList
      data={data}
      onDragEnd={({ data }) => setData(data)}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item, drag, isActive }) => renderItem({ item, drag, isActive, level: 0 })}
      contentContainerStyle={styles.draggableListContent}
    />
  );
}

const styles = StyleSheet.create({
  draggableListContent: {
    paddingHorizontal: 0,
  },
  itemContainer: {
    marginBottom: 0,
  },
});
