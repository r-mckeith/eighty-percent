import React, { useState, useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useHabitContext } from "../../src/contexts/habits/UseHabitContext";
import { toggleScope } from "../../src/api/SupabaseHabits";
import { useDateContext } from "../../src/contexts/date/useDateContext";

type ScopeProject = {
  id: number;
  inScopeDay: Date | string | null;
  completed: string | null | undefined;
};

export default function ScopeProject({
  id,
  inScopeDay,
  completed,
}: ScopeProject) {
  const [inScope, setInScope] = useState<any>();
  const { dispatch } = useHabitContext();
  const { selectedDate } = useDateContext();

  useEffect(() => {
    setInScope(
      inScopeDay && inScopeDay <= selectedDate.toISOString().split("T")[0]
    );
  }, [inScopeDay]);

  async function handleToggleScope() {
    if (completed) {
      return;
    }
    dispatch({
      type: "TOGGLE_SCOPE",
      id: id,
      selectedDate: selectedDate.toISOString().split("T")[0],
    });

    try {
      const updatedTask = await toggleScope(
        id,
        selectedDate.toISOString().split("T")[0]
      );

      if (updatedTask) {
      } else {
        console.error("Failed to toggle scope for day");
      }
    } catch (error) {
      console.error("Failed to toggle scope for day:", error);
    }
  }

  return (
    <View>
      <TouchableOpacity
        onPress={handleToggleScope}
        activeOpacity={completed ? 1 : 0.2}
      >
        <MaterialCommunityIcons
          name={inScope ? "radiobox-marked" : "radiobox-blank"}
          size={24}
          style={{ paddingLeft: 8 }}
          color={completed ? "grey" : "white"}
        />
      </TouchableOpacity>
    </View>
  );
}
