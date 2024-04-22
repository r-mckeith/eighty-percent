import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

type AddModal = {
  visible: boolean;
  displayName: string;
  onClose: () => void;
  onAdd: (name: string) => void;
};

export default function AddModal({ visible, displayName, onClose, onAdd }: AddModal) {
  const [newName, setNewName] = useState("");

  function handleAdd() {
    if (newName) {
      onAdd(newName);
      setNewName('');
      onClose();
    }
  }

  function handlePressCancel() {
    setNewName('');
    onClose();
  }

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <KeyboardAvoidingView
        style={styles.centeredView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              style={[styles.modalButton, styles.leftButton]}
              onPress={handlePressCancel}
            >
              <Text style={[styles.buttonText, { color: "red" }]}>Cancel</Text>
            </TouchableOpacity>
            <Text style={[styles.buttonText, { color: "white" }]}>{`New ${displayName}`}</Text>
            <TouchableOpacity
              style={[
                styles.modalButton,
                styles.rightButton,
                newName ? {} : styles.disabledButton,
              ]}
              onPress={handleAdd}
              disabled={!newName}
            >
              <Text
                style={[styles.buttonText, newName ? { color: "blue" } : { color: "grey" }]}
              >
                Done
              </Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.textInput}
            placeholder={`${displayName}...`}
            placeholderTextColor="white"
            value={newName}
            onChangeText={setNewName}
            autoFocus={true}
            returnKeyType="done"
          />
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  modalView: {
    marginHorizontal: 20,
    width: "90%",
    backgroundColor: "#000",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "white",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: "relative",
  },
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
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    fontWeight: "bold",
  },
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
