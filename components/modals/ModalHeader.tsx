import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type ModalHeader = {
  placeholder: string;
  disabled: boolean;
  onClose: () => void;
  onSave: () => void;
};

export default function ModalHeader({ placeholder, disabled, onSave, onClose }: ModalHeader) {
  return (
    <View style={styles.modalHeader}>
      <TouchableOpacity style={[styles.modalButton, styles.leftButton]} onPress={onClose}>
        <Text style={[styles.buttonText, { color: "red" }]}>Cancel</Text>
      </TouchableOpacity>
      <Text style={[styles.buttonText, { color: "white" }]}>{placeholder}</Text>
      <TouchableOpacity style={[styles.modalButton, styles.rightButton, disabled ? styles.disabledButton : {}]} onPress={onSave} disabled={disabled}>
        <Text style={[styles.buttonText, disabled ? { color: "grey" } : { color: "blue" }]}>Done</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  modalHeader: {
    position: "absolute",
    top: 10,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 30,
  },
  modalButton: {
    padding: 10,
  },
  leftButton: {
    alignSelf: "flex-start",
  },
  rightButton: {
    alignSelf: "flex-end",
    marginRight: -70,
  },
  buttonText: {
    fontWeight: "bold",
  },
  disabledButton: {
    opacity: 0.5,
  },
});
