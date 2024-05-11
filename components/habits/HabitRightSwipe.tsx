import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Swipeable } from "react-native-gesture-handler";
import {
  deleteHabit,
  editHabit,
  editHabitData,
  markHabitAsComplete,
} from "../../src/api/SupabaseHabits";
import EditModal from "../shared/EditModal";
import DataEditModal from "../shared/DataEditModal";
import { HabitProps } from "../../src/types/HabitTypes";
import { useHabitContext } from "../../src/contexts/habits/UseHabitContext";
import { useHabitDataContext } from "../../src/contexts/habitData/UseHabitDataContext";
import { useDateContext } from "../../src/contexts/date/useDateContext";

type RightSwipe = {
  habit: HabitProps;
  habitData: any;
  swipeableRow: React.RefObject<Swipeable | null>;
};

export default function HabitRightSwipe({ habit, habitData, swipeableRow }: RightSwipe) {
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showEditDataModal, setShowEditDataModal] = useState<boolean>(false);

  const { dispatch } = useHabitContext();
  const { dispatch: habitDataDispatch } = useHabitDataContext();
  const { selectedDate } = useDateContext();

  function handleClose() {
    swipeableRow.current?.close();
    setShowEditModal(false);
    setShowEditDataModal(false);
  }

  async function handleDeleteHabit(id: number) {
    try {
      await deleteHabit(id);
      swipeableRow.current?.close();
      dispatch({ type: "DELETE_HABIT", id });
    } catch (error) {
      console.error("Failed to delete habit:", error);
    }
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

  async function handleEditHabitData(count: number) {
    if (!habitData) {
      return;
    }

    try {
      const updatedHabitData = await editHabitData(habit, selectedDate, count);
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
        onPress={() => handleDeleteHabit(habit.id)}
      >
        <MaterialCommunityIcons name="close-circle" size={24} color="white" />
      </TouchableOpacity>
      <EditModal
        visible={showEditModal}
        onClose={handleClose}
        onSave={handleEditHabit}
        placeholder={"Edit"}
        id={habit.id}
        name={habit.name}
      />
      {handleEditHabitData && habitData && (
        <DataEditModal
          visible={showEditDataModal}
          onClose={handleClose}
          onSave={handleEditHabitData}
          placeholder={"Edit Day"}
          habitData={habitData ? habitData && habitData.day : 0}
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
