import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Swipeable } from "react-native-gesture-handler";
import EditModal from "../shared/EditModal";
import { HabitProps } from "../../src/types/HabitTypes";

type RightSwipe = {
  project: HabitProps;
  handleDelete: (id: number) => Promise<void>;
  handleEdit: (id: number, newName: string) => Promise<void>;
  swipeableRow: React.RefObject<Swipeable | null>;
  dispatch: React.Dispatch<any>;
};

export default function ProjectRightSwipe({
  project,
  handleDelete,
  handleEdit,
  swipeableRow,
}: RightSwipe) {
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  function handleClose() {
    swipeableRow.current?.close();
    setShowEditModal(false);
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
        onPress={() => handleDelete(project.id)}
      >
        <MaterialCommunityIcons name="close-circle" size={24} color="white" />
      </TouchableOpacity>
      <EditModal
        visible={showEditModal}
        onClose={handleClose}
        onSave={handleEdit}
        placeholder={"Edit"}
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
