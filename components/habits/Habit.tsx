import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useHabitContext } from "../../src/contexts/habits/UseHabitContext";
import { HabitProps } from "../../src/types/HabitTypes";
import { deleteHabit, selectHabit, markHabitAsComplete } from "../../src/api/SupabaseHabits";
import { useHabitDataContext } from "../../src/contexts/habitData/UseHabitDataContext";
import { useDateContext } from "../../src/contexts/date/useDateContext";
import RightSwipe from "../shared/RightSwipe";
import {
  useAggregatedData,
  HabitsAggregatedData,
} from "../../src/hooks/aggregateData";

type HabitComponent = {
  habit: HabitProps;
  sectionName: string;
  isEditMode: boolean;
};

export default function Habit({ habit, sectionName }: HabitComponent) {
  const [isSelected, setIsSelected] = useState(false);
  const [isSelectedLater, setIsSelectedLater] = useState(false);
  const [habitData, setHabitData] = useState<HabitsAggregatedData | null>(null);

  const { dispatch: habitDispatch } = useHabitContext();
  const { dispatch: habitDataDispatch } = useHabitDataContext();
  const { habitsTableData } = useAggregatedData();
  const { selectedDate } = useDateContext();

  const swipeableRow = useRef<Swipeable | null>(null);

  useEffect(() => {
    const data = habitsTableData.find((data) => data.tag_name === habit.name);
    if (data !== undefined) {
      setHabitData(data);
    } else {
      setHabitData(null);
    }
    if (sectionName === "today") {
      setIsSelectedLater(false);
      setIsSelected(false);
      if (
        habit.completed &&
        habit.completed === selectedDate.toISOString().split("T")[0]
      ) {
        setIsSelected(true);
      } else if (
        habit.completed &&
        habit.completed > selectedDate.toISOString().split("T")[0]
      ) {
        setIsSelectedLater(true);
      }
    }
  }, [
    selectedDate,
    isSelected,
    isSelectedLater,
    habit.completed,
    habitsTableData,
  ]);

  async function handleDeleteHabit(id: number) {
    try {
      await deleteHabit(id);
      swipeableRow.current?.close();
      habitDispatch({ type: "DELETE_HABIT", id });
    } catch (error) {
      console.error("Failed to delete habit:", error);
    }
  }

  const handleSelectHabit = async (selectedHabit: HabitProps) => {
    if (sectionName === "today") {
      setIsSelected(!isSelected);
      handleToggleCompleted(habit.id, selectedDate, habitDispatch);
    } else {
      try {
        setIsSelected(true);
        const updatedTagData = await selectHabit(selectedHabit, selectedDate);
        habitDataDispatch({
          type: "UPDATE_HABIT_DATA",
          payload: updatedTagData,
        });
        setTimeout(() => setIsSelected(false), 1);
      } catch (error) {
        console.error("Error selecting habit:", error);
        setIsSelected(false);
      }
    }
  };

  async function handleToggleCompleted (id: number, selectedDate: Date, dispatch: React.Dispatch<any>) {
    dispatch({ type: 'TOGGLE_COMPLETED', id: id, selectedDate: selectedDate });
  
    try {
      const updatedTask = await markHabitAsComplete(id, selectedDate);
      
      if (updatedTask) {
      } else {
        console.error('Failed to toggle complete');
      }
    } catch (error) {
      console.error('Failed to toggle complete', error);
    }
  };

  const habitStyle = isSelected
    ? [styles.habit, styles.selectedHabit]
    : isSelectedLater
    ? [styles.habit, styles.disabledHabit]
    : styles.habit;

  return (
    <Swipeable
      ref={swipeableRow}
      renderRightActions={() => (
        <RightSwipe
          handleDelete={handleDeleteHabit}
          id={habit.id}
          swipeableRow={swipeableRow}
          dispatch={habitDispatch}
        />
      )}
      overshootLeft={false}
      rightThreshold={20}
    >
      <TouchableOpacity
        activeOpacity={isSelectedLater ? 1 : 0.2}
        onPress={!isSelectedLater ? () => handleSelectHabit(habit) : () => {}}
        style={habitStyle}
      >
        <View style={styles.habitText}>
          <Text
            style={[
              styles.habitName,
              habit.section === "today" && isSelected
                ? styles.selectedText
                : isSelectedLater
                ? styles.selectedLaterText
                : {},
            ]}
          >
            {habit.name}
          </Text>
          {habit.section === "habits" && habitData && (
            <View style={styles.statsContainer}>
              <Text style={styles.statsText}>{habitData.day}</Text>
              <Text style={styles.statsText}>
                {habitData.week > habitData.day && habitData.week}
              </Text>
              <Text style={styles.statsText}>
                {habitData.month > habitData.week && habitData.month}
              </Text>
              <Text style={styles.statsText}>
                {habitData.year > habitData.month && habitData.year}
              </Text>
            </View>
          )}
        </View>
        {habit.section === "today" && isSelected && (
          <MaterialCommunityIcons name="check" size={16} color="white" />
        )}
        {habit.section === "today" && isSelectedLater && (
          <MaterialCommunityIcons name="arrow-right" size={16} color="white" />
        )}
      </TouchableOpacity>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  habit: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#2c2c2e",
    borderBottomWidth: 1,
    borderColor: "#333",
    alignSelf: "stretch",
  },
  selectedHabit: {
    backgroundColor: "#3a3a3c",
  },
  disabledHabit: {
    backgroundColor: "#3a3a3c",
    borderColor: "#505050",
  },
  habitText: {
    flexDirection: "row",
    color: "#FFF",
    flex: 1,
    justifyContent: "space-between",
  },
  habitName: {
    flex: 2.75,
    fontWeight: "bold",
    color: "white",
    textAlign: "left",
  },
  statsContainer: {
    flexDirection: "row",
    flex: 3,
    justifyContent: "space-between",
  },
  statsText: {
    paddingHorizontal: 5,
    color: "#DDD",
    flex: 1,
    textAlign: "center",
  },
  selectedText: {
    textDecorationLine: "line-through",
    color: "#b1b1b3",
  },
  selectedLaterText: {
    color: "#b1b1b3",
  },
});
