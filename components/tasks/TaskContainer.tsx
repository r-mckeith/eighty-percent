import React from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { TagProps } from "../../src/types/TagTypes";
import NestedList from "../NestedList";
import { ScrollView } from "react-native-gesture-handler";

type TaskContainerProps = {
  tags: TagProps[];
};

export default function TaskContainer({ tags }: TaskContainerProps) {
  return (
    <View style={styles.container}>
      {tags.length > 0 ? (
        <ScrollView style={styles.taskList} keyboardShouldPersistTaps="handled">
          <NestedList tags={tags} />
        </ScrollView>
      ) : (
        <View style={styles.emptyContainer} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  taskList: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
