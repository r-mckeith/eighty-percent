import React, { useState } from "react";
import { TextInput, StyleSheet, useColorScheme } from "react-native";
import Modal from "./Modal";
import { getColors } from "../../src/colors";

type AddModal = {
  visible: boolean;
  displayName: string;
  onClose: () => void;
  onAdd: (name: string) => void;
};

export default function AddModal({ visible, displayName, onClose, onAdd }: AddModal) {
  const [newName, setNewName] = useState("");

  const scheme = useColorScheme();
  const colors = getColors(scheme);

  function handleSave() {
    if (newName) {
      onAdd(newName);
      setNewName("");
      onClose();
    }
  }

  function handleCancel() {
    setNewName("");
    onClose();
  }

  const disabled = newName === ''

  return (
    <Modal
      placeholder={`New ${displayName}`}
      visible={visible}
      onClose={handleCancel}
      onSave={handleSave}
      disabled={disabled}
    >
      <TextInput
        style={[styles.textInput, colors.background, colors.border]}
        placeholder={`${displayName}...`}
        placeholderTextColor="white"
        value={newName}
        onChangeText={setNewName}
        autoFocus={true}
        returnKeyType="done"
      />
    </Modal>
  );
}

const styles = StyleSheet.create({
  textInput: {
    marginTop: 30,
    paddingLeft: 10,
    paddingBottom: 5,
    alignSelf: "stretch",
    height: 30,
    borderRadius: 10,
    borderBottomWidth: 1,
  },
});
