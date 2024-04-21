import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Task from "./tasks/Task";
import { TagProps } from "../src/types/TagTypes";

function NestedList({
  tags,
  rootTagId,
}: {
  tags: TagProps[];
  rootTagId: number | null;
}) {
  const rootTag = tags.find((tag) => tag.id === rootTagId);

  const renderTasksRecursively = (parentId: number) => {
    return tags
      .filter((tag) => tag.parentId === parentId)
      .map((tag) => (
        <View key={tag.id} style={styles.childTask}>
          <Task tag={tag} rootTagId={rootTagId} />
          {renderTasksRecursively(tag.id)}
        </View>
      ));
  };

  return (
    <View style={styles.section}>
      {rootTag ? (
        <View style={styles.tagContainer}>
          <Task tag={rootTag} rootTagId={rootTagId} />
          {renderTasksRecursively(rootTag.id)}
        </View>
      ) : (
        <Text style={styles.headerText}>No task found</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    flexShrink: 1,
    flexGrow: 1,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#333333",
    backgroundColor: "#1c1c1e",
    marginBottom: 20,
  },
  tagContainer: {
    flexDirection: "column",
    alignSelf: "stretch",
  },
  headerText: {
    color: "white",
  },
  childTask: {
    paddingLeft: 20,
    backgroundColor: "#2c2c2e",
  },
});

export default NestedList;