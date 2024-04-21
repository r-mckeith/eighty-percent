import React, { useState, useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useTagContext } from "../../src/contexts/tags/UseTagContext";
import { handleToggleScope } from "../../helpers/tagHelpers";
import { useDateContext } from "../../src/contexts/date/useDateContext";

interface Scope {
  id: number;
  inScopeDay: Date | string | null;
  completed: string | null | undefined;
}

export default function ScopeTask({ id, inScopeDay, completed }: Scope) {
  const [inScope, setInScope] = useState<any>();
  const { dispatch } = useTagContext();
  const { selectedDate } = useDateContext();

  useEffect(() => {
    setInScope(
      inScopeDay && inScopeDay <= selectedDate.toISOString().split("T")[0]
    );
  }, [inScopeDay]);

  const toggleScope = () => {
    if (completed) {
      return;
    }

    handleToggleScope(id, selectedDate.toISOString().split("T")[0], dispatch);
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleScope}        activeOpacity={completed ? 1 : 0.2}
 >
        <MaterialCommunityIcons
          name={inScope ? "radiobox-marked" : "radiobox-blank"}
          size={24}
          style={{ paddingLeft: 8 }}
          color={completed ? 'grey' : 'white'}
        />
      </TouchableOpacity>
    </View>
  );
}
