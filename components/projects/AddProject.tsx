import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Modal,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { StyleSheet } from "react-native";
import { useHabitContext } from "../../src/contexts/habits/UseHabitContext";
import { addProject } from "../../src/api/SupabaseHabits";

type AddProject = {
  parentId: number;
  depth: number;
};

export default function AddProject({ parentId, depth }: AddProject) {
  const [showModal, setShowModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");

  const { dispatch } = useHabitContext();

  async function handleAddProject(): Promise<boolean> {
    const newProject: any = {
      name: newProjectName,
      parentId: parentId,
      depth: depth + 1,
      section: "today",
    };

    try {
      const createdProject = await addProject(newProject);
      dispatch({ type: "ADD_HABIT", payload: createdProject });
      setNewProjectName('');
      setShowModal(false);
      return true;
    } catch (error) {
      console.error("Failed to add project:", error);
      return false;
    }
  }

  function getProjectLevelName(depth: number): "List" | "Task" | "Subtask" {
    const newProjectDepth = depth + 1;
    switch (newProjectDepth) {
      case 1:
        return "List";
      case 2:
        return "Task";
      default:
        return "Subtask";
    }
  }

  return (
    <View>
      <TouchableOpacity
        onPress={() => setShowModal(true)}
        style={styles.defaultAddButton}
      >
        <MaterialCommunityIcons name="plus" size={24} color="white" />
      </TouchableOpacity>

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
                <Text style={[styles.buttonText, { color: "red" }]}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <Text
                style={[styles.buttonText, { color: "white" }]}
              >{`New ${getProjectLevelName(depth)}`}</Text>
              <TouchableOpacity
                style={[
                  styles.modalButton,
                  styles.rightButton,
                  newProjectName ? {} : styles.disabledButton,
                ]}
                onPress={handleAddProject}
                disabled={!newProjectName}
              >
                <Text
                  style={[
                    styles.buttonText,
                    newProjectName ? { color: "blue" } : { color: "grey" },
                  ]}
                >
                  Done
                </Text>
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.textInput}
              placeholder={`${getProjectLevelName(depth)}...`}
              placeholderTextColor="white"
              value={newProjectName}
              onChangeText={setNewProjectName}
              autoFocus={true}
              returnKeyType="done"
            />
          </View>
        </KeyboardAvoidingView>
      </Modal>
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
