import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Modal, TargetSelector } from '../shared';
import { HabitProps, PlanProps } from '../../src/types';
import { Switch, TextInput } from 'react-native-paper';

type EditModal = {
  visible: boolean;
  item: HabitProps | PlanProps;
  type: string;
  target: { times: number; timeframe: string } | null;
  onClose: () => void;
  onSave: (id: number, newName: string, target: { times: number; timeframe: string } | null) => void;
};

export default function EditModal({ visible, item, type, target, onClose, onSave }: EditModal) {
  const [newName, setNewName] = useState(item.name);
  const [hasTarget, setHasTarget] = useState(!!target);
  const [times, setTimes] = useState(target?.times ? target.times : 1);
  const [timeframe, setTimeframe] = useState(target?.timeframe ? target.timeframe : 'day');

  function handleSave() {
    if (newName) {
      const target = hasTarget ? { times, timeframe } : null;
      onSave(item.id, newName, target);
      setNewName(item.name);
      onClose();
    }
  }

  function handleCancel() {
    setNewName(item.name);
    onClose();
  }

  const disabled =
    newName === item.name &&
    ((target && target.times === times && target.timeframe === timeframe) || (!target && !hasTarget));
  return (
    <Modal
      placeholder={`Edit ${type}`}
      visible={visible}
      onClose={handleCancel}
      onSave={handleSave}
      disabled={disabled}>
      <TextInput
        value={newName}
        mode='flat'
        dense={true}
        onChangeText={setNewName}
        autoFocus={true}
        onSubmitEditing={handleSave}
        returnKeyType='done'
      />

      {type === 'habit' && (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', paddingVertical: 10 }}>
          <Text style={{ paddingRight: 10 }}>Set target</Text>
          <Switch onValueChange={setHasTarget} value={hasTarget} />
        </View>
      )}
      {hasTarget && (
        <TargetSelector times={times} timeframe={timeframe} setTimes={setTimes} setTimeframe={setTimeframe} />
      )}
    </Modal>
  );
}
