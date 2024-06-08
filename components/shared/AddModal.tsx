import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Modal from './Modal';
import TargetSelector from './TargetSelector';
import { TextInput, Switch } from 'react-native-paper';

type AddHabitModal = {
  visible: boolean;
  displayName: string;
  onClose: () => void;
  onSave: (name: string, target: { times: number; timeframe: string } | null) => void;
};

export default function AddHabitModal({ visible, displayName, onClose, onSave }: AddHabitModal) {
  const [newName, setNewName] = useState('');
  const [hasTarget, setHasTarget] = useState(false);
  const [times, setTimes] = useState(1);
  const [timeframe, setTimeframe] = useState('day');

  function handleSave() {
    if (newName) {
      const target = hasTarget ? { times, timeframe } : null;
      onSave(newName, target);
      setNewName('');
      setHasTarget(false);
      setTimes(1);
      setTimeframe('day');
      onClose();
    }
  }

  function handleCancel() {
    setNewName('');
    setHasTarget(false);
    setTimes(1);
    setTimeframe('day');
    onClose();
  }

  const disabled = newName === '';

  return (
    <Modal visible={visible} onClose={handleCancel} onSave={handleSave} disabled={disabled}>
      <TextInput
        placeholder={`New ${displayName}`}
        value={newName}
        mode='flat'
        dense={true}
        onChangeText={setNewName}
        autoFocus={true}
        onSubmitEditing={handleSave}
        returnKeyType='done'
      />

      {displayName === 'Habit' && (
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
