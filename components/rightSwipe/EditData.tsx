import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { editHabitData } from "../../src/api/Habits";
import DataEditModal from "../modals/DataModal";
import { HabitProps } from "../../src/types/HabitTypes";
import { useHabitDataContext } from "../../src/contexts/habitData/UseHabitDataContext";
import { useDateContext } from "../../src/contexts/date/useDateContext";
import { Icon } from "../shared";

type EditData = {
  item: HabitProps;
  habitData: any;
  swipeableRow: React.RefObject<Swipeable | null>;
};

export default function EditData({ item, habitData, swipeableRow }: EditData) {
  const [showEditDataModal, setShowEditDataModal] = useState<boolean>(false);

  const { dispatch: habitDataDispatch } = useHabitDataContext();
  const { selectedDate } = useDateContext();

  function handleClose() {
    swipeableRow.current?.close();
    setShowEditDataModal(false);
  }

  async function handleEditHabitData(count: number) {
    if (!habitData) {
      return;
    }

    try {
      const updatedHabitData = await editHabitData(item, selectedDate, count);
      swipeableRow.current?.close();
      habitDataDispatch({
        type: "UPDATE_HABIT_DATA",
        payload: updatedHabitData,
      });
    } catch (error) {
      console.error("Failed to edit habit data:", error);
    }
  }

  return (
    <>
      <Icon
        name="table-edit"
        size={24}
        color="white"
        opacity={0.2}
        opacityStyle={[styles.rightSwipeItem, styles.dataEditButton]}
        onPress={() => setShowEditDataModal(true)}
      />
      <DataEditModal
        visible={showEditDataModal}
        onClose={handleClose}
        onSave={handleEditHabitData}
        placeholder={"Edit Day"}
        habitData={habitData}
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
  dataEditButton: {
    backgroundColor: "grey",
  },
});
