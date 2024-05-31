import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Modal from './Modal';
import { TextInput, Switch, SegmentedButtons } from 'react-native-paper';

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
    <Modal
      placeholder={`New ${displayName}`}
      visible={visible}
      onClose={handleCancel}
      onSave={handleSave}
      disabled={disabled}>
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
        <>
          <SegmentedButtons
            style={{ paddingVertical: 10 }}
            value={times.toString()}
            onValueChange={value => setTimes(Number(value))}
            buttons={[...Array(4).keys()].map(i => ({ label: (i + 1).toString(), value: (i + 1).toString() }))}
          />
          <Text style={styles.inlineLabel}>{times === 1 ? 'time per' : 'times per'}</Text>
          <SegmentedButtons
            style={{ paddingTop: 10 }}
            value={timeframe}
            onValueChange={value => setTimeframe(value)}
            buttons={[
              { label: 'Day', value: 'day' },
              { label: 'Week', value: 'week' },
            ]}
          />
        </>
      )}
    </Modal>
  );
}

const styles = StyleSheet.create({
  dropdownContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 30,
  },
  inlineLabel: {
    textAlign: 'center',
    fontSize: 16,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    // paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
  },
});
