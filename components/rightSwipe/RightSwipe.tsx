import React from 'react';
import { View } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { HabitProps, PlanProps } from '../../src/types/shared';
import { Delete, Edit, EditData } from '.';

type RightSwipe = {
  item: HabitProps | PlanProps;
  habitData?: any;
  showData?: boolean;
  swipeableRow: React.RefObject<Swipeable | null>;
  type?: string;
};

export default function RightSwipe({ item, habitData, showData, swipeableRow, type }: RightSwipe) {
  const width = showData ? 120 : 80;

  function renderShowData() {
    if (showData) {
      return <EditData item={item as HabitProps} habitData={habitData} swipeableRow={swipeableRow} />;
    }
  }

  return (
    <View style={{ flexDirection: 'row', width: width }}>
      {renderShowData()}
      <Edit item={item} swipeableRow={swipeableRow} type={type} />
      <Delete item={item} swipeableRow={swipeableRow} type={type} />
    </View>
  );
}
