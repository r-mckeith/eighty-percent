import React from "react";
import { StyleSheet } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { deleteHabit } from "../../src/api/Habits";
import { deletePlan } from "../../src/api/Plans";
import { HabitProps, PlanProps } from "../../src/types/shared";
import { usePlanContext, useHabitContext } from "../../src/contexts";
import { Icon } from "../shared";

type Delete = {
  item: HabitProps | PlanProps;
  swipeableRow: React.RefObject<Swipeable | null>;
  type?: string;
};

export default function Delete({ item, swipeableRow, type }: Delete) {
  const { dispatch: habitDispatch } = useHabitContext();
  const { dispatch: planDispatch } = usePlanContext();

  async function handleDeleteHabit(id: number) {
    try {
      await deleteHabit(id);
      swipeableRow.current?.close();
      habitDispatch({ type: "DELETE_HABIT", id });
    } catch (error) {
      console.error("Failed to delete habit:", error);
    }
  }

  async function handleDeletePlan(id: number) {
    try {
      await deletePlan(id);
      swipeableRow.current?.close();
      planDispatch({ type: "DELETE_PLAN", id });
    } catch (error) {
      console.error("Failed to delete habit:", error);
    }
  }

  function handleDeleteItem() {
    type === 'plan' ? handleDeletePlan(item.id) : handleDeleteHabit(item.id)
  }

  return (
      <Icon
        name="close-circle"
        size={24}
        color="white"
        opacity={0.2}
        opacityStyle={[styles.rightSwipeItem, styles.deleteButton]}
        onPress={handleDeleteItem}
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
