import React, { useState } from 'react';
import { Icon } from 'react-native-paper';
import { NewHabitProps } from '../../src/types';
import { useGroupContext, useHabitContext, usePlanContext } from '../../src/contexts';
import { addHabit } from '../../src/api/Habits';
import { addPlan } from '../../src/api/Plans';
import { addGroup } from '../../src/api/Groups';
import AddModal from './AddModal';
import { View, TouchableOpacity } from 'react-native';

type AddButton = {
  type: string;
  sectionName?: string;
  groupId?: number;
  parentId?: number;
};

export default function AddButton({ sectionName, groupId, parentId, type }: AddButton) {
  const [showModal, setShowModal] = useState(false);

  const { dispatch: habitDispatch } = useHabitContext();
  const { dispatch: planDispatch } = usePlanContext();
  const { dispatch: groupDispatch } = useGroupContext();

  const habit = type === 'habit';
  const plan = type === 'plan';

  const handleAction = habit ? handleAddHabit : plan ? handleAddPlan : handleAddGroup;

  async function handleAddHabit(name: string, target: { times: number; timeframe: string } | null): Promise<void> {
    if (sectionName && groupId) {
      const newTarget: any = target ? target : null;
      const newHabit: NewHabitProps = {
        name: name,
        section: sectionName,
        group_id: groupId,
        target: newTarget,
      };

      try {
        const createdHabit = await addHabit(newHabit);
        habitDispatch({ type: 'ADD_HABIT', payload: createdHabit });
      } catch (error) {
        console.error('Failed to add habit:', error);
      }
    }
  }

  async function handleAddPlan(name: string): Promise<void> {
    if (name) {
      const newPlan: any = {
        name: name,
        parentId: parentId,
      };

      try {
        const createdPlan = await addPlan(newPlan);
        planDispatch({ type: 'ADD_PLAN', payload: createdPlan });
      } catch (error) {
        console.error('Failed to add plan:', error);
      }
    }
  }

  async function handleAddGroup(name: string): Promise<void> {
    try {
      const createdGroup = await addGroup(name);
      groupDispatch({ type: 'ADD_GROUP', payload: createdGroup });
    } catch (error) {
      console.error('Failed to add group:', error);
    }
  }



  function getDisplayName() {
    if (habit) {
      return 'Habit';
    } else if (plan) {
      return 'Plan';
    }
    return 'Group';
  }

  return (
    <View>
      <TouchableOpacity onPress={() => setShowModal(true)}>
        <Icon source='plus' size={25} />
      </TouchableOpacity>
      <AddModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleAction}
        displayName={getDisplayName()}
      />
    </View>
  );
}
