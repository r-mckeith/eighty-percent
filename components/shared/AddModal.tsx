import React, { useState } from "react";
import { TextInput, StyleSheet } from "react-native";
import Modal from "./Modal";

type AddModal = {
  visible: boolean;
  displayName: string;
  onClose: () => void;
  onAdd: (name: string) => void;
};

export default function AddModal({ visible, displayName, onClose, onAdd }: AddModal) {
  const [newName, setNewName] = useState("");

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
        style={styles.textInput}
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
    alignSelf: "stretch",
    height: 40,
    color: "white",
    borderBottomWidth: 1,
    borderColor: "#bbb",
    paddingHorizontal: 0,
    paddingVertical: 10,
    width: "100%",
  },
});
