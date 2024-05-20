import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { editHabit } from "../../src/api/Habits";
import { editPlan } from "../../src/api/Plans";
import EditModal from "./EditModal";
import { HabitProps, PlanProps } from "../../src/types/shared";
import { usePlanContext, useHabitContext } from "../../src/contexts";
import { Icon } from "../shared";

type Edit = {
  item: HabitProps | PlanProps;
  swipeableRow: React.RefObject<Swipeable | null>;
  type?: string;
};

export default function Edit({ item, swipeableRow, type }: Edit) {
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  const { dispatch: habitDispatch } = useHabitContext();
  const { dispatch: planDispatch } = usePlanContext();

  function handleClose() {
    swipeableRow.current?.close();
    setShowEditModal(false);
  }

  async function handleEditHabit(id: number, newName: string) {
    swipeableRow.current?.close();
    try {
      await editHabit(id, newName);
      habitDispatch({ type: "EDIT_HABIT", id, newName });
    } catch (error) {
      console.error("Failed to edit habit:", error);
    }
  }

  async function handleEditPlan(id: number, newName: string) {
    try {
      await editPlan(id, newName);
      swipeableRow.current?.close();
      planDispatch({ type: "EDIT_PLAN", id, newName });
    } catch (error) {
      console.error("Failed to edit habit:", error);
    }
  }

  async function handleEditItem(id: number, newName: string) {
  type === 'plan' ? handleEditPlan(id, newName) : handleEditHabit(id, newName)
  }



  return (
    <>
      <Icon
        name="square-edit-outline"
        size={24}
        color="white"
        opacity={0.2}
        opacityStyle={[styles.rightSwipeItem, styles.editButton]}
        onPress={() => setShowEditModal(true)}
      />

      <EditModal
        visible={showEditModal}
        onClose={handleClose}
        onSave={handleEditItem}
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
