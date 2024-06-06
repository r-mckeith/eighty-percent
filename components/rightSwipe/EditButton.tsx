import React, { useState } from 'react';
import { Swipeable } from 'react-native-gesture-handler';
import { editHabit } from '../../src/api/Habits';
import { editPlan } from '../../src/api/Plans';
import EditModal from './EditModal';
import RightSwipeButton from './RightSwipeButton';
import { HabitProps, PlanProps } from '../../src/types';
import { usePlanContext, useHabitContext } from '../../src/contexts';
import { View } from 'react-native';

type Edit = {
  item: HabitProps | PlanProps;
  swipeableRow: React.RefObject<Swipeable | null>;
  type: string;
};

export default function Edit({ item, swipeableRow, type }: Edit) {
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  const { dispatch: habitDispatch } = useHabitContext();
  const { dispatch: planDispatch } = usePlanContext();

  const target = (item as HabitProps).target || null;

  function handleClose() {
    swipeableRow.current?.close();
    setShowEditModal(false);
  }

  async function handleEditHabit(id: number, newName: string, target: any) {
    swipeableRow.current?.close();
    try {
      await editHabit(id, newName, target);
      habitDispatch({ type: 'EDIT_HABIT', id, newName, target });
    } catch (error) {
      console.error('Failed to edit habit:', error);
    }
  }

  async function handleEditPlan(id: number, newName: string) {
    try {
      await editPlan(id, newName);
      swipeableRow.current?.close();
      planDispatch({ type: 'EDIT_PLAN', id, newName });
    } catch (error) {
      console.error('Failed to edit habit:', error);
    }
  }

  async function handleEditItem(id: any, newName: string, target?: any) {
    type === 'plan' ? handleEditPlan(id, newName) : handleEditHabit(id, newName, target);
  }

  return (
    <View>
      <RightSwipeButton
        icon={'square-edit-outline'}
        backgroundColor={'orange'}
        text={'Edit'}
        onPress={() => setShowEditModal(true)}
      />

      <EditModal
        visible={showEditModal}
        onClose={handleClose}
        onSave={handleEditItem}
        item={item}
        type={type}
        target={target}
      />
    </View>
  );
}
