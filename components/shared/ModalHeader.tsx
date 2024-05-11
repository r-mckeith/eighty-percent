import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type ModalHeader = {
  placeholder: string;
  onClose: () => void;
  onSave: () => void;
};

export default function ModalHeader({ placeholder, onSave, onClose }: ModalHeader) {
  return (
    <View style={styles.modalHeader}>
      <TouchableOpacity style={[styles.modalButton, styles.leftButton]} onPress={onClose}>
        <Text style={[styles.buttonText, { color: "red" }]}>Cancel</Text>
      </TouchableOpacity>
      <Text style={[styles.buttonText, { color: "white" }]}>{placeholder}</Text>
      <TouchableOpacity style={[styles.modalButton, styles.rightButton]} onPress={onSave}>
        <Text style={[styles.buttonText, { color: "blue" }]}>Done</Text>
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
    paddingHorizontal: 10,
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
});
