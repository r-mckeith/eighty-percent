import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Toggle from './Toggle';
import TextInput from './TextInput';
import Modal from './Modal';

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
      {displayName === 'Habit' && (
        <Toggle onToggle={setHasTarget} value={hasTarget} label={'Set target'} style={{ justifyContent: 'flex-end' }} />
      )}

      <TextInput
        placeholder={displayName}
        value={newName}
        handleChangeText={setNewName}
        autoFocus={true}
        onSave={handleSave}
      />

      {hasTarget && (
        <>
          <View style={styles.dropdownContainer}>
            <RNPickerSelect
              style={pickerSelectStyles}
              value={times}
              onValueChange={value => setTimes(value)}
              items={[...Array(10).keys()].map(i => ({ label: (i + 1).toString(), value: (i + 1).toString() }))}
            />
            <Text style={styles.inlineLabel}>times per</Text>
            <RNPickerSelect
              style={pickerSelectStyles}
              value={timeframe}
              onValueChange={value => setTimeframe(value)}
              items={[
                { label: 'Day', value: 'day' },
                { label: 'Week', value: 'week' },
              ]}
            />
          </View>
        </>
      )}
    </Modal>
  );
}

const styles = StyleSheet.create({
  dropdownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
  },
  inlineLabel: {
    marginHorizontal: 10,
    fontSize: 16,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
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
