import React from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { TagProps } from "../../src/types/HabitTypes";
import NestedList from "../NestedList";
import AddTask from "./AddTask";
import { ScrollView } from "react-native-gesture-handler";

type TaskContainerProps = {
  tags: TagProps[];
  // collapsed: Set<number>;
  // setCollapsed: (arg0: Set<number | unknown>) => void;
};

export default function TaskContainer({ tags }: TaskContainerProps) {
  return (
    <View style={styles.container}>
         <View style={styles.addButton}>
        <AddTask parentId={0} depth={0} />
      </View>
      {tags.length > 0 ? (
        <ScrollView style={styles.taskList} keyboardShouldPersistTaps="handled">
          <NestedList tags={tags} rootTagId={0}/>
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
    addButton: {
    alignSelf: "flex-end",
    marginRight: 4,
    marginBottom: 5,
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
