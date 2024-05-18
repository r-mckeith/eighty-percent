import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { editHabit } from "../../src/api/Habits";
import EditModal from "../modals/EditModal";
import { HabitProps } from "../../src/types/HabitTypes";
import { useHabitContext } from "../../src/contexts/habits/UseHabitContext";
import { Icon } from "../shared";

type Edit = {
  item: HabitProps;
  swipeableRow: React.RefObject<Swipeable | null>;
};

export default function Edit({ item, swipeableRow }: Edit) {
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  const { dispatch } = useHabitContext();

  function handleClose() {
    swipeableRow.current?.close();
    setShowEditModal(false);
  }

  async function handleEditHabit(id: number, newName: string) {
    try {
      await editHabit(id, newName);
      swipeableRow.current?.close();
      dispatch({ type: "EDIT_HABIT", id, newName });
    } catch (error) {
      console.error("Failed to edit habit:", error);
    }
  }

  return (
    <>
      <Icon
        name="square-edit-outline"
        size={24}
        color="white"
        opacity={1}
        opacityStyle={[styles.rightSwipeItem, styles.editButton]}
        onPress={() => setShowEditModal(true)}
      />

      <EditModal
        visible={showEditModal}
        onClose={handleClose}
        onSave={handleEditHabit}
        id={item.id}
        name={item.name}
      />
    </>
  );
}

const styles = StyleSheet.create({
  rightSwipeItem: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    paddingVertical: 12
  },
  editButton: {
    backgroundColor: "orange",
  },
});
