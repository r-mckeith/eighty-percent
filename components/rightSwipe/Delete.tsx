import React from "react";
import { StyleSheet } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { deleteHabit } from "../../src/api/Habits";
import { HabitProps } from "../../src/types/HabitTypes";
import { useHabitContext } from "../../src/contexts/habits/UseHabitContext";
import { Icon } from "../shared";

type Delete = {
  item: HabitProps;
  swipeableRow: React.RefObject<Swipeable | null>;
};

export default function Delete({ item, swipeableRow }: Delete) {
  const { dispatch } = useHabitContext();

  async function handleDeleteHabit(id: number) {
    try {
      await deleteHabit(id);
      swipeableRow.current?.close();
      dispatch({ type: "DELETE_HABIT", id });
    } catch (error) {
      console.error("Failed to delete habit:", error);
    }
  }

  return (
      <Icon
        name="close-circle"
        size={24}
        color="white"
        opacity={1}
        opacityStyle={[styles.rightSwipeItem, styles.deleteButton]}
        onPress={() => handleDeleteHabit(item.id)}
      />
  );
}

const styles = StyleSheet.create({
  rightSwipeItem: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    paddingVertical: 12
  },
  deleteButton: {
    backgroundColor: "#EE4B60",
  },
});
