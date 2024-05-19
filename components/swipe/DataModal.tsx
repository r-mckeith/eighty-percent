import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import { Modal } from '../shared';
import { getColors } from '../../src/colors';

type EditModal = {
  visible: boolean;
  placeholder: string;
  habitData: any;
  onClose: () => void;
  onSave: (value: number) => void;
};

export default function DataEditModal({ visible, placeholder, habitData, onClose, onSave }: EditModal) {
  const [currentValue, setCurrentValue] = useState<number>(habitData?.day ? habitData.day : 0);

  const scheme = useColorScheme();
  const colors = getColors(scheme);

  useEffect(() => {
    setCurrentValue(habitData?.day);
  }, [habitData?.day]);

  function incrementValue() {
    setCurrentValue(currentValue + 1);
  }

  function decrementValue() {
    setCurrentValue(currentValue - 1);
  }

  function handleSave() {
    onSave(currentValue);
    onClose();
  }

  function handleCancel() {
    setCurrentValue(habitData);
    onClose();
  }

  const disabled = currentValue === habitData;

  return (
    <Modal placeholder={placeholder} visible={visible} onClose={handleCancel} onSave={handleSave} disabled={disabled}>
      <View style={styles.numberInputContainer}>
        <TouchableOpacity onPress={decrementValue} style={[styles.controlButton, colors.border]}>
          <Text style={styles.controlButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={[styles.numberDisplay, colors.text]}>{currentValue}</Text>
        <TouchableOpacity onPress={incrementValue} style={styles.controlButton}>
          <Text style={[styles.controlButtonText, colors.text]}>+</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  numberInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  numberDisplay: {
    fontSize: 24,
    marginHorizontal: 20,
  },
  controlButton: {
    padding: 10,
    borderRadius: 5,
  },
  controlButtonText: {
    fontSize: 24,
  },
});
