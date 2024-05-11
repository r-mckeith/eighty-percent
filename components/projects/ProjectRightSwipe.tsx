import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Swipeable } from "react-native-gesture-handler";
import { deleteHabit, editHabit } from "../../src/api/SupabaseHabits";
import { useHabitContext } from "../../src/contexts/habits/UseHabitContext";
import EditModal from "../shared/EditModal";
import { HabitProps } from "../../src/types/HabitTypes";

type RightSwipe = {
  project: HabitProps;
  swipeableRow: React.RefObject<Swipeable | null>;
};

export default function ProjectRightSwipe({ project, swipeableRow }: RightSwipe) {
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const { dispatch } = useHabitContext();

  function handleClose() {
    swipeableRow.current?.close();
    setShowEditModal(false);
  }

  async function handleDeleteProject(id: number) {
    try {
      // habits and projects are still the same objects in the db for now
      await deleteHabit(id);
      swipeableRow.current?.close();
      dispatch({ type: "DELETE_HABIT", id });
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  }

  async function handleEditProject(id: number, newName: string) {
    try {
      await editHabit(id, newName);
      swipeableRow.current?.close();
      dispatch({ type: "EDIT_HABIT", id, newName });
    } catch (error) {
      console.error("Failed to edit habit:", error);
    }
  }

  return (
    <View style={styles.rightActionContainer}>
      <TouchableOpacity
        style={[styles.rightSwipeItem, styles.editButton]}
        onPress={() => setShowEditModal(true)}
      >
        <MaterialCommunityIcons name="square-edit-outline" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.rightSwipeItem, styles.deleteButton]}
        onPress={() => handleDeleteProject(project.id)}
      >
        <MaterialCommunityIcons name="close-circle" size={24} color="white" />
      </TouchableOpacity>
      <EditModal
        visible={showEditModal}
        onClose={handleClose}
        onSave={handleEditProject}
        id={project.id}
        name={project.name}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  rightActionContainer: {
    flexDirection: "row",
    width: 70,
  },
  rightSwipeItem: {
    justifyContent: "center",
    alignItems: "center",
    width: 35,
  },
  editButton: {
    backgroundColor: "orange",
  },
  deleteButton: {
    backgroundColor: "#EE4B60",
  },
});
