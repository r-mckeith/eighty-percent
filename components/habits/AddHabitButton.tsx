import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { NewHabitProps } from "../../src/types/HabitTypes";
import { useHabitContext } from "../../src/contexts/habits/UseHabitContext";
import { addHabit } from "../../src/api/SupabaseHabits";
import AddHabitModal from "./AddHabitModal";

type AddHabitButton = {
  sectionName: string;
  groupId: number;
};

export default function AddHabitButton({
  sectionName,
  groupId,
}: AddHabitButton) {
  const [showModal, setShowModal] = useState(false);

  const { dispatch: habitDispatch } = useHabitContext();

  const handleAddHabit = async (
    name: string,
    section: string
  ): Promise<void> => {
    const newHabit: NewHabitProps = {
      name: name,
      section: section,
      group_id: groupId,
    };

    try {
      const createdHabit = await addHabit(newHabit);
      habitDispatch({ type: "ADD_HABIT", payload: createdHabit });
    } catch (error) {
      console.error("Failed to add habit:", error);
    }
  };

  return (
    <View style={styles.modalHeader}>
      <TouchableOpacity onPress={() => setShowModal(true)}>
        <MaterialCommunityIcons name="plus" size={24} color={"white"} />
      </TouchableOpacity>

      <AddHabitModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onAddTag={handleAddHabit}
        sectionName={sectionName}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
});
