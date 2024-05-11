import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { useHabitContext } from "../../src/contexts/habits/UseHabitContext";
import { HabitProps } from "../../src/types/HabitTypes";
import { selectHabit, markHabitAsComplete } from "../../src/api/SupabaseHabits";
import { useHabitDataContext } from "../../src/contexts/habitData/UseHabitDataContext";
import { useDateContext } from "../../src/contexts/date/useDateContext";
import HabitRightSwipe from "./HabitRightSwipe";
import { useAggregatedData, HabitsAggregatedData } from "../../src/hooks/aggregateData";
import { Row, RowText, Swipe, Icon, StatsText } from "../layout";

type Habit = {
  habit: HabitProps;
  sectionName: string;
  isEditMode: boolean;
};

export default function Habit({ habit, sectionName }: Habit) {
  const [isSelected, setIsSelected] = useState(false);
  const [isSelectedLater, setIsSelectedLater] = useState(false);
  const [habitData, setHabitData] = useState<HabitsAggregatedData | null>(null);

  const { dispatch: habitDispatch } = useHabitContext();
  const { dispatch: habitDataDispatch } = useHabitDataContext();
  const { habitsTableData } = useAggregatedData();
  const { selectedDate } = useDateContext();

  const swipeableRow = useRef<Swipeable | null>(null);

  useEffect(() => {
    const data = habitsTableData.find((data) => data.tag_id === habit.id);
    if (data !== undefined) {
      setHabitData(data);
    } else {
      setHabitData(null);
    }
    if (sectionName === "today") {
      setIsSelectedLater(false);
      setIsSelected(false);
      if (habit.completed && habit.completed === selectedDate.toISOString().split("T")[0]) {
        setIsSelected(true);
      } else if (habit.completed && habit.completed > selectedDate.toISOString().split("T")[0]) {
        setIsSelectedLater(true);
      }
    }
  }, [selectedDate, isSelected, isSelectedLater, habit.completed, habitsTableData]);

  // right now this is handling projects, which need to be completed, and habits, which update habit data
  const handleSelectHabit = async (selectedHabit: HabitProps) => {
    if (sectionName === "today") {
      setIsSelected(!isSelected);
      handleToggleCompleted(habit.id, selectedDate, habitDispatch);
    } else {
      try {
        setIsSelected(true);
        const updatedHabitData = await selectHabit(selectedHabit, selectedDate);
        habitDataDispatch({
          type: "UPDATE_HABIT_DATA",
          payload: updatedHabitData,
        });
        setTimeout(() => setIsSelected(false), 1);
      } catch (error) {
        console.error("Error selecting habit:", error);
        setIsSelected(false);
      }
    }
  };

  async function handleToggleCompleted(
    id: number,
    selectedDate: Date,
    dispatch: React.Dispatch<any>
  ) {
    dispatch({ type: "TOGGLE_COMPLETED", id: id, selectedDate: selectedDate });

    try {
      const updatedTask = await markHabitAsComplete(id, selectedDate);

      if (updatedTask) {
      } else {
        console.error("Failed to toggle complete");
      }
    } catch (error) {
      console.error("Failed to toggle complete", error);
    }
  }

  const rowStyle = isSelected ? styles.selectedRow : isSelectedLater ? styles.disabledRow : {};

  const habitTextStyle =
    habit.section === "today" && isSelected
      ? styles.disabledText
      : isSelectedLater
      ? styles.strikethroughText
      : {};

  return (
    <Swipe
      key={habit.id}
      renderRightActions={() => (
        <HabitRightSwipe habit={habit} habitData={habitData} swipeableRow={swipeableRow} />
      )}
    >
      <Row
        opacity={isSelectedLater ? 1 : 0.2}
        onPress={!isSelectedLater ? () => handleSelectHabit(habit) : () => {}}
        style={rowStyle}
      >
        <View style={styles.rowLayout}>
          <RowText text={habit.name} style={habitTextStyle} />
          {habit.section === "habits" && habitData && (
            <StatsText
              day={habitData.day > 0 ? habitData.day : "-"}
              week={habitData.week > 0 ? habitData.week : "-"}
            />
          )}
        </View>
        {habit.section === "today" && (
          <StatsText
            day={""}
            week={""}
            children={<Icon name={isSelected ? "check" : "arrow-right"} />}
          />
        )}
      </Row>
    </Swipe>
  );
}

const styles = StyleSheet.create({
  rowLayout: {
    flexDirection: "row",
    color: "#FFF",
    flex: 1,
    justifyContent: "space-between",
  },
  selectedRow: {
    backgroundColor: "#3a3a3c",
  },
  disabledRow: {
    backgroundColor: "#3a3a3c",
    borderColor: "#505050",
  },
  disabledText: {
    textDecorationLine: "line-through",
    color: "#b1b1b3",
  },
  strikethroughText: {
    color: "#b1b1b3",
  },
});
