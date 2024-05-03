import React, { useState, useEffect, useRef } from "react";
import { Swipeable } from "react-native-gesture-handler";
import { useHabitContext } from "../../src/contexts/habits/UseHabitContext";
import { HabitProps } from "../../src/types/HabitTypes";
import { deleteHabit, selectHabit, markHabitAsComplete } from "../../src/api/SupabaseHabits";
import { useHabitDataContext } from "../../src/contexts/habitData/UseHabitDataContext";
import { useDateContext } from "../../src/contexts/date/useDateContext";
import RightSwipe from "../shared/RightSwipe";
import { useAggregatedData } from "../../src/hooks/aggregateData";
import Row from "../shared/Row";

type HabitComponent = {
  habit: HabitProps;
  sectionName: string;
};

export default function Habit({ habit, sectionName }: HabitComponent) {
  const [isSelected, setIsSelected] = useState(false);
  const [isSelectedLater, setIsSelectedLater] = useState(false);

  const { dispatch: habitDispatch } = useHabitContext();
  const { dispatch: habitDataDispatch } = useHabitDataContext();
  const { habitsTableData } = useAggregatedData();
  const { selectedDate, selectedDateString } = useDateContext();

  const swipeableRow = useRef<Swipeable | null>(null);

  const selectedRow = isSelected;
  const disabledRow = isSelectedLater;
  const selectedText = isSelected;
  const disabledText = isSelectedLater;

  useEffect(() => {
      setIsSelectedLater(false);
      setIsSelected(false);
      if (habit.completed && habit.completed === selectedDateString) {
        setIsSelected(true);
      } else if (habit.completed && habit.completed > selectedDateString) {
        setIsSelectedLater(true);
      }
    
  }, [selectedDate, isSelected, isSelectedLater, habit]);

  async function handleDeleteHabit(id: number) {
    try {
      await deleteHabit(id);
      swipeableRow.current?.close();
      habitDispatch({ type: "DELETE_HABIT", id });
    } catch (error) {
      console.error("Failed to delete habit:", error);
    }
  }

  const handleSelectHabit = async () => {
    if (sectionName === "today") {
      setIsSelected(!isSelected);
      handleToggleCompleted(habit.id, habitDispatch);
    } else {
      try {
        const updatedTagData = await selectHabit(habit, selectedDate);
        habitDataDispatch({
          type: "UPDATE_HABIT_DATA",
          payload: updatedTagData,
        });
        setTimeout(() => setIsSelected(false), 1);
      } catch (error) {
        console.error("Error selecting habit:", error);
      }
    }
  };

  async function handleToggleCompleted(
    id: number,
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
    >
      <Row
        activeOpacity={disabledRow ? 1 : 0.2}
        onPress={disabledRow ? () => {} : handleSelectHabit}
        name={habit.name}
        data={habitsTableData.find((data) => data.name === habit.name)}
        selectedRow={selectedRow}
        disabledRow={disabledRow}
        selectedText={selectedText}
        disabledText={disabledText}
      />
    </Swipeable>
  );
}
