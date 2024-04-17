import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useDateContext } from "../../src/contexts/date/useDateContext";
import { useTaskContext } from "../../src/contexts/tasks/UseTaskContext";
import { Task } from "../../src/types/TaskTypes";
import { toggleCompleted } from "../../src/api/SupabaseTasks";

export default function TaskTag({ task }: { task: Task}) {
  const [isSelected, setIsSelected] = useState(false);

  const { selectedDate } = useDateContext();
  const { dispatch } = useTaskContext();

  useEffect(() => {
    if (
      task.completed &&
      task.completed <= selectedDate.toISOString().split("T")[0]
    ) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, []);

  async function handleToggleCompleted(id: number) {
    dispatch({ type: 'TOGGLE_COMPLETED', id: id, selectedDate: selectedDate });
  
    try {
      const updatedTask = await toggleCompleted(id, selectedDate);
      
      if (updatedTask) {
      } else {
        console.error('Failed to toggle complete');
      }
    } catch (error) {
      console.error('Failed to toggle complete', error);
    }
  };

  const tagStyle = isSelected ? [styles.tag, styles.selectedTag] : styles.tag;

  return (
      <View style={tagStyle}>
        <TouchableOpacity
          onPress={() => handleToggleCompleted(task.id)}
          style={styles.tagText}
        >
          <Text>{task.name}</Text>
        </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
  tag: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderRadius: 16,
    backgroundColor: "#FFF",
    margin: 4,
    alignSelf: "flex-start",
    borderWidth: 2,
    borderColor: "#000",
  },
  tagText: {
    // flex: 1,
  },
  selectedTag: {
    backgroundColor: "#DDDDDD",
  },
  x: {
    marginRight: 8,
  },
  deleteBubble: {
    position: "absolute",
    top: -6,
    left: -5,
    color: "black",
    backgroundColor: "grey",
    borderRadius: 50,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
