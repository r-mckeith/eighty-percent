import React, { useState } from "react";
import { TextInput, StyleSheet } from "react-native";
import Modal from "./Modal";

type EditModal = {
  visible: boolean;
  id: number;
  name: string;
  onClose: () => void;
  onSave: (id: number, name: string) => void;
};

export default function EditModal({ visible, id, name, onClose, onSave }: EditModal) {
  const [newName, setNewName] = useState(name);

  function handleSave() {
    if (newName) {
      onSave(id, newName);
      setNewName(name);
      onClose();
    }
  }

  function handleCancel() {
    setNewName(name);
    onClose();
  }

  const disabled = newName === name

  return (
    <Modal
      placeholder={`Edit ${name}`}
      visible={visible}
      onClose={handleCancel}
      onSave={handleSave}
      disabled={disabled}
    >
      <TextInput
        style={styles.textInput}
        placeholder={name}
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
