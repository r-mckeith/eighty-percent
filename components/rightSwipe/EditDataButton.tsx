import React, { useState } from 'react';
import { Swipeable } from 'react-native-gesture-handler';
import { editHabitData } from '../../src/api/Habits';
import DataModal from './DataModal';
import RightSwipeButton from './RightSwipeButton';
import { HabitProps } from '../../src/types';
import { useDateContext, useHabitDataContext } from '../../src/contexts';

type EditDataButton = {
  item: HabitProps;
  habitData: any;
  swipeableRow: React.RefObject<Swipeable | null>;
};

export default function EditDataButton({ item, habitData, swipeableRow }: EditDataButton) {
  const [showEditDataModal, setShowEditDataModal] = useState<boolean>(false);

  const { dispatch: habitDataDispatch } = useHabitDataContext();
  const { selectedDate } = useDateContext();

  function handleClose() {
    swipeableRow.current?.close();
    setShowEditDataModal(false);
  }

  async function handleEditHabitData(count: number) {
    if (!habitData) {
      return;
    }

    try {
      const updatedHabitData = await editHabitData(item, selectedDate, count);
      swipeableRow.current?.close();
      habitDataDispatch({
        type: 'UPDATE_HABIT_DATA',
        payload: updatedHabitData,
      });
    } catch (error) {
      console.error('Failed to edit habit data:', error);
    }
  }

  return (
    <>
    <RightSwipeButton icon='table-edit' backgroundColor='green' text='Edit day' onPress={() => setShowEditDataModal(true)}/>
      <DataModal
        visible={showEditDataModal}
        onClose={handleClose}
        onSave={handleEditHabitData}
        placeholder={'Edit Day'}
        habitData={habitData}
      />
    </>
  );
}
