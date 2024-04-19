import React, { useState } from "react";
import { View, Text, TextInput, Modal, TouchableOpacity } from "react-native";
import useUserId from "../../src/contexts/sessions/UseSessionHook";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { StyleSheet } from "react-native";
import { useTagContext } from "../../src/contexts/tags/UseTagContext";
import { addTagToList, getTaskLevelName } from "../../helpers/tagHelpers";

export default function AddTask({ parentId, depth, variant = "default" }: any) {
  const [showModal, setShowModal] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");

  const { dispatch } = useTagContext();

  const userId = useUserId();

  const onAddTask = async () => {
    const success = await addTagToList(
      newTaskName,
      userId,
      parentId,
      depth,
      "today",
      dispatch
    );
    if (success) {
      setNewTaskName("");
      setShowModal(false);
    } else {
      console.error("Failed to add task");
    }
  };

  return (
    <View>
      {variant === "button" ? (
        <View style={styles.addButtonContainer}>
          <TouchableOpacity
            style={styles.addButton2}
            onPress={() => setShowModal(true)}
          >
            <Text style={styles.addButtonText}>Add New Goal</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => setShowModal(true)}
          style={styles.defaultAddButton}
        >
          <MaterialCommunityIcons
            name="plus"
            size={24}
            color="#767577"
          />
        </TouchableOpacity>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(!showModal);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{`New ${getTaskLevelName(
              depth
            )}`}</Text>
            <TextInput
              style={[styles.textInput, styles.input, { marginBottom: 10 }]}
              placeholder={`${getTaskLevelName(depth)} Name`}
              value={newTaskName}
              onChangeText={setNewTaskName}
              autoFocus={true}
              onSubmitEditing={onAddTask}
              returnKeyType="done"
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.iconButton} onPress={onAddTask}>
                <MaterialCommunityIcons
                  name="check-circle-outline"
                  size={24}
                  color="#4CAF50"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => setShowModal(false)}
              >
                <MaterialCommunityIcons
                  name="cancel"
                  size={24}
                  color="#F44336"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  modalView: {
    margin: 20,
    width: "90%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: "#bbb",
    marginBottom: 10,
    paddingHorizontal: 0,
    paddingVertical: 10,
  },
  textInput: {
    width: "100%",
  },

  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  iconButton: {
    padding: 10,
  },
  defaultAddButton: {
    borderRadius: 25,
    padding: 2,
    elevation: 2,
    justifyContent: "center",
    alignItems: "center",
    width: 30,
    height: 30,
  },
  addButtonContainer: {
    alignSelf: "center",
    width: "90%",
    marginBottom: 20,
  },
  addButton2: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 10,
  },
  addButtonText: {
    color: "#000",
    fontSize: 16,
  },
});
