import React, { useState } from "react";
import { View, Text, TextInput, Modal, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import useUserId from "../../src/contexts/sessions/UseSessionHook";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { StyleSheet } from "react-native";
import { useTagContext } from "../../src/contexts/habits/UseHabitContext";
import { addTagToList, getTaskLevelName } from "../../helpers/habitHelpers";

export default function AddTask({ parentId, depth, variant = "default" }: any) {
  const [showModal, setShowModal] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");

  const { dispatch } = useTagContext();

  const userId = useUserId();

  const taskLevel = getTaskLevelName(depth)

  const handleAddTask = async () => {
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
            color="white"
          />
        </TouchableOpacity>
      )}
          <Modal
      animationType="slide"
      transparent={true}
      visible={showModal}
      onRequestClose={() => setShowModal(!showModal)}
    >
      <KeyboardAvoidingView
        style={styles.centeredView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              style={[styles.modalButton, styles.leftButton]}
              onPress={() => setShowModal(false)}
            >
              <Text style={[styles.buttonText, { color: "red" }]}>Cancel</Text>
            </TouchableOpacity>
            <Text style={[styles.buttonText, { color: "white" }]}>{`New ${taskLevel}`}</Text>
            <TouchableOpacity
              style={[
                styles.modalButton,
                styles.rightButton,
                newTaskName ? {} : styles.disabledButton,
              ]}
              onPress={handleAddTask}
              disabled={!newTaskName}
            >
              <Text
                style={[
                  styles.buttonText,
                  newTaskName ? { color: "blue" } : { color: "grey" },
                ]}
              >
                Done
              </Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.textInput}
            placeholder={`${taskLevel}...`}
            placeholderTextColor="white"
            value={newTaskName}
            onChangeText={setNewTaskName}
            autoFocus={true}
            returnKeyType="done"
          />
        </View>
      </KeyboardAvoidingView>
    </Modal>
      {/* <Modal
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
      </Modal> */}
    </View>
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
  modalText: {
    marginBottom: 15,
    textAlign: "center",
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
});
