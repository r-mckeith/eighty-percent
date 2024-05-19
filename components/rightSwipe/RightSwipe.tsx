import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { HabitProps, PlanProps } from '../../src/types/HabitTypes';
import Edit from './Edit';
import Delete from './Delete';
import EditData from './EditData';

type RightSwipe = {
  item: HabitProps | PlanProps;
  habitData?: any;
  showData?: boolean;
  swipeableRow: React.RefObject<Swipeable | null>;
  type?: string;
};

export default function RightSwipe({ item, habitData, showData, swipeableRow, type }: RightSwipe) {
  const width = showData ? 120 : 80;

  return (
    <View style={[styles.rightActionContainer, { width: width }]}>
      {showData && <EditData item={item as HabitProps} habitData={habitData} swipeableRow={swipeableRow} />}
      <Edit item={item} swipeableRow={swipeableRow} type={type} />
      <Delete item={item} swipeableRow={swipeableRow} type={type} />
    </View>
  );
}

const styles = StyleSheet.create({
  rightActionContainer: {
    flexDirection: 'row',
  },
});
