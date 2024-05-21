import React from 'react';
import { View } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { HabitProps, PlanProps } from '../../src/types/shared';
import { DeleteButton, EditButton, EditDataButton, NoteButton } from '.';

type RightSwipe = {
  item: HabitProps | PlanProps;
  habitData?: any;
  showData?: boolean;
  swipeableRow: React.RefObject<Swipeable | null>;
  type: string;
};

export default function RightSwipe({ item, habitData, showData, swipeableRow, type }: RightSwipe) {
  const width = showData ? 160 : 120;

  function renderShowData() {
    if (showData) {
      return <EditDataButton item={item as HabitProps} habitData={habitData} swipeableRow={swipeableRow} />;
    }
  }

  return (
    <View style={{ flexDirection: 'row', width: width }}>
      {renderShowData()}
      <EditButton item={item} swipeableRow={swipeableRow} type={type} />
      <NoteButton type={type} itemId={item.id} swipeableRow={swipeableRow} />
      <DeleteButton item={item} swipeableRow={swipeableRow} type={type} />
    </View>
  );
}
