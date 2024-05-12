import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "./Modal";

type EditModal = {
  visible: boolean;
  placeholder: string;
  habitData: any;
  onClose: () => void;
  onSave: (value: number) => void;
};

export default function DataEditModal({
  visible,
  placeholder,
  habitData,
  onClose,
  onSave,
}: EditModal) {
  const [currentValue, setCurrentValue] = useState<number>(habitData);

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

  return (
    <Modal placeholder={placeholder} visible={visible} onClose={handleCancel} onSave={handleSave}>
      <View style={styles.numberInputContainer}>
        <TouchableOpacity onPress={decrementValue} style={styles.controlButton}>
          <Text style={styles.controlButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.numberDisplay}>{currentValue}</Text>
        <TouchableOpacity onPress={incrementValue} style={styles.controlButton}>
          <Text style={styles.controlButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  numberInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'center',
    marginTop: 30,
  },
  numberDisplay: {
    fontSize: 24,
    color: "white",
    marginHorizontal: 20,
  },
  controlButton: {
    padding: 10,
    backgroundColor: "#333",
    borderRadius: 5,
  },
  controlButtonText: {
    color: "white",
    fontSize: 24,
  },
});
