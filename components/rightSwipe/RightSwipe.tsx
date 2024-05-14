import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { HabitProps } from '../../src/types/HabitTypes';
import Edit from './Edit';
import Delete from './Delete';
import EditData from './EditData';

type RightSwipe = {
  item: HabitProps;
  habitData?: any;
  showData?: boolean;
  swipeableRow: React.RefObject<Swipeable | null>;
};

export default function RightSwipe({ item, habitData, showData, swipeableRow }: RightSwipe) {
  const width = showData ? 120 : 80;

  return (
    <View style={[styles.rightActionContainer, { width: width }]}>
      {showData && <EditData item={item} habitData={habitData} swipeableRow={swipeableRow} />}
      <Edit item={item} swipeableRow={swipeableRow} />
      <Delete item={item} swipeableRow={swipeableRow} />
    </View>
  );
}

const styles = StyleSheet.create({
  rightActionContainer: {
    flexDirection: 'row',
  },
});
