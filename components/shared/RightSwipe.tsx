import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Swipeable } from "react-native-gesture-handler";
import EditModal from "./EditModal";

type RightSwipe = {
  id: number;
  name: string;
  handleDelete: (id: number) => Promise<void>;
  handleEdit: (id: number, newName: string) => Promise<void>;
  swipeableRow: React.RefObject<Swipeable | null>;
  dispatch: React.Dispatch<any>;
};

export default function RightSwipe({
  id,
  name,
  handleDelete,
  handleEdit,
  swipeableRow,
}: RightSwipe) {
  const [showModal, setShowModal] = useState<boolean>(false);

  function handleClose() {
    swipeableRow.current?.close();
    setShowModal(false);
  }

  return (
    <View style={styles.rightActionContainer}>
      <TouchableOpacity
        style={[styles.rightSwipeItem, styles.dataEditButton]}
        onPress={() => setShowModal(true)}
      >
        <MaterialCommunityIcons name="table-edit" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.rightSwipeItem, styles.editButton]}
        onPress={() => setShowModal(true)}
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
        visible={showModal}
        onClose={handleClose}
        onSave={handleEdit}
        placeholder={"Edit"}
        id={id}
        name={name}
      />
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
