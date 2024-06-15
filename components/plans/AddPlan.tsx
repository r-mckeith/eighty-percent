import React, { useState } from 'react';
import { Icon } from 'react-native-paper';
import { usePlanContext } from '../../src/contexts';
import { addPlan } from '../../src/api/Plans';
import AddPlanModal from './AddPlanModal';
import { View, TouchableOpacity } from 'react-native';

type AddButton = {
  parentId?: number;
  order: number;
};

export default function AddPlan({ parentId, order }: AddButton) {
  const [showModal, setShowModal] = useState(false);

  const { dispatch: planDispatch } = usePlanContext();

  async function handleAddPlan(name: string, order: number): Promise<void> {
    if (name) {
      const newPlan: any = {
        name: name,
        parentId: parentId,
        order: order
      };

      try {
        const createdPlan = await addPlan(newPlan);
        planDispatch({ type: 'ADD_PLAN', payload: createdPlan });
      } catch (error) {
        console.error('Failed to add plan:', error);
      }
    }
  }

  return (
    <View>
      <TouchableOpacity onPress={() => setShowModal(true)}>
        <Icon source='plus' size={25} />
      </TouchableOpacity>
      <AddPlanModal
        order={order}
        visible={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleAddPlan}
      />
    </View>
  );
}
