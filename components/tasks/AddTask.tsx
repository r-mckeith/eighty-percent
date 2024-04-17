import React, { useState } from "react";
import { View, Text, TextInput, Modal, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { StyleSheet } from "react-native";
import { useTaskContext } from "../../src/contexts/tasks/UseTaskContext";
import { addTask } from "../../src/api/SupabaseTasks";

export default function AddTask({ parentId, depth, variant = "default" }: any) {
  const [showModal, setShowModal] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");

  const { dispatch } = useTaskContext();

  async function handleAddTask(
    name: string,
    parentId: number,
    depth: number,
  ): Promise<boolean> {
  

    const newTask: any = {
      name: name,
      parentId: parentId,
      depth: depth + 1,
    };

    try {
      const createdTask = await addTask(newTask);
      dispatch({ type: "ADD_TASK", payload: createdTask });
      return true;
    } catch (error) {
      console.error("Failed to add tag:", error);
      return false;
    }
  }

  function getTaskLevelName(
    depth: number
  ): "Goal" | "Objective" | "Task" | "Subtask" {
    const newTaskDepth = depth + 1;
    switch (newTaskDepth) {
      case 1:
        return "Goal";
      case 2:
        return "Objective";
      case 3:
        return "Task";
      default:
        return "Subtask";
    }
  }

  const onAddTask = async () => {
    const success = await handleAddTask(
      newTaskName,
      parentId,
      depth,
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
            name="plus-circle-outline"
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
