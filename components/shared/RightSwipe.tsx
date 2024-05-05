import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Swipeable } from "react-native-gesture-handler";
import EditModal from "./EditModal";
import DataEditModal from "./DataEditModal";

type RightSwipe = {
  id: number;
  name: string;
  habitData?: any;
  handleDelete: (id: number) => Promise<void>;
  handleEdit: (id: number, newName: string) => Promise<void>;
  handleEditData?: (id: number, value: number) => Promise<void>;
  swipeableRow: React.RefObject<Swipeable | null>;
  dispatch: React.Dispatch<any>;
};

export default function RightSwipe({
  id,
  name,
  habitData,
  handleDelete,
  handleEdit,
  handleEditData,
  swipeableRow,
}: RightSwipe) {
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showEditDataModal, setShowEditDataModal] = useState<boolean>(false);

  function handleClose() {
    swipeableRow.current?.close();
    setShowEditModal(false);
    setShowEditDataModal(false);
  }

  return (
    <View style={styles.rightActionContainer}>
      <TouchableOpacity
        style={[styles.rightSwipeItem, styles.dataEditButton]}
        onPress={() => setShowEditDataModal(true)}
      >
        <MaterialCommunityIcons name="table-edit" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.rightSwipeItem, styles.editButton]}
        onPress={() => setShowEditModal(true)}
      >
        <MaterialCommunityIcons name="square-edit-outline" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.rightSwipeItem, styles.deleteButton]}
        onPress={() => handleDelete(id)}
      >
        <MaterialCommunityIcons name="close-circle" size={24} color="white" />
      </TouchableOpacity>
      <EditModal
        visible={showEditModal}
        onClose={handleClose}
        onSave={handleEdit}
        placeholder={"Edit"}
        id={id}
        name={name}
      />
      {handleEditData && (
        <DataEditModal
          visible={showEditDataModal}
          onClose={handleClose}
          onSave={handleEditData}
          placeholder={"Edit"}
          id={id}
          name={name}
          habitData={habitData}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  rightActionContainer: {
    flexDirection: "row",
    width: 105,
  },
  rightSwipeItem: {
    justifyContent: "center",
    alignItems: "center",
    width: 35,
  },
  dataEditButton: {
    backgroundColor: "grey",
  },
  editButton: {
    backgroundColor: "orange",
  },
  deleteButton: {
    backgroundColor: "#EE4B60",
  },
});
