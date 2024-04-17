import React from "react";
import { View, StyleSheet } from "react-native";
import Tag from "./Tag";
import TaskTag from "./TaskTag";
import { Task } from "../../src/types/TaskTypes";

export default function TaskSection({ tasks }: { tasks: Task[] }) {
  return (
      <View
        style={[
          styles.section,
          { borderColor: "black", backgroundColor: "#FFF" },
        ]}
      >
        <View style={styles.tagContainer}>
          {tasks.map((task, index) => (
            <TaskTag
              key={index}
              task={task}
            />
          ))}
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  section: {
    flexShrink: 1,
    flexGrow: 1,
    minHeight: 70,
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    marginBottom: 8,
    borderWidth: 2,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
  },
});
