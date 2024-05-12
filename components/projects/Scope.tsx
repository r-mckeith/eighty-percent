import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { useHabitContext } from "../../src/contexts/habits/UseHabitContext";
import { toggleScope } from "../../src/api/SupabaseHabits";
import { useDateContext } from "../../src/contexts/date/useDateContext";
import { Icon } from "../layout";

type Scope = {
  id: number;
  inScopeDay: Date | string | null;
  completed: string | null | undefined;
};

export default function Scope({ id, inScopeDay, completed }: Scope) {
  const [inScope, setInScope] = useState<any>();
  const { dispatch } = useHabitContext();
  const { selectedDate } = useDateContext();

  useEffect(() => {
    setInScope(inScopeDay && inScopeDay <= selectedDate.toISOString().split("T")[0]);
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
      const updatedTask = await toggleScope(id, selectedDate.toISOString().split("T")[0]);

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
      <Icon
        opacity={completed ? 1 : 0.2}
        name={inScope ? "radiobox-marked" : "radiobox-blank"}
        size={24}
        style={{ paddingLeft: 8 }}
        color={completed ? "grey" : "white"}
        onPress={handleToggleScope}
      />
    </View>
  );
}