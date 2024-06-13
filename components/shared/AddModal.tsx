import React, { useState } from 'react';
import { View, useColorScheme } from 'react-native';
import { Text, TextInput, Switch } from 'react-native-paper';
import { getColors } from '../../src/colors';
import Modal from './Modal';
import TargetSelector from './TargetSelector';

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

  const scheme = useColorScheme();
  const colors = getColors(scheme);

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
        style={colors.background}
        label={`New ${displayName}`}
        activeUnderlineColor={colors.text.color}
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
          <Text variant='bodyMedium' style={{ paddingRight: 10 }}>
            Set target
          </Text>
          <Switch onValueChange={setHasTarget} value={hasTarget} color='#0E5FFF' />
        </View>
      )}

      {hasTarget && (
        <TargetSelector times={times} timeframe={timeframe} setTimes={setTimes} setTimeframe={setTimeframe} />
      )}
    </Modal>
  );
}
