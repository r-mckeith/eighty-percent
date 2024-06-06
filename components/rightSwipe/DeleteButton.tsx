import React from 'react';
import { Swipeable } from 'react-native-gesture-handler';
import { deleteHabit } from '../../src/api/Habits';
import { deletePlan } from '../../src/api/Plans';
import RightSwipeButton from './RightSwipeButton';
import { HabitProps, PlanProps } from '../../src/types';
import { usePlanContext, useHabitContext } from '../../src/contexts';

type Delete = {
  item: HabitProps | PlanProps;
  swipeableRow: React.RefObject<Swipeable | null>;
  type?: string;
};

export default function Delete({ item, swipeableRow, type }: Delete) {
  const { dispatch: habitDispatch } = useHabitContext();
  const { dispatch: planDispatch } = usePlanContext();

  async function handleDeleteHabit(id: number) {
    try {
      await deleteHabit(id);
      swipeableRow.current?.close();
      habitDispatch({ type: 'DELETE_HABIT', id });
    } catch (error) {
      console.error('Failed to delete habit:', error);
    }
  }

  async function handleDeletePlan(id: number) {
    try {
      await deletePlan(id);
      swipeableRow.current?.close();
      planDispatch({ type: 'DELETE_PLAN', id });
    } catch (error) {
      console.error('Failed to delete habit:', error);
    }
  }

  function handleDeleteItem() {
    type === 'plan' ? handleDeletePlan(item.id) : handleDeleteHabit(item.id);
  }

  return <RightSwipeButton icon='close-circle' backgroundColor='red' text='Delete' onPress={handleDeleteItem} />;
}
