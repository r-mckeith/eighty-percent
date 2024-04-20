import React from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { TagProps } from "../../src/types/TagTypes";
import NestedList from "../NestedList";
import AddTask from "./AddTask";
import { ScrollView } from "react-native-gesture-handler";

type TaskContainerProps = {
  tags: TagProps[];
  collapsed: Set<number | unknown>;
  setCollapsed: (arg0: Set<number | unknown>) => void;
};

export default function TaskContainer({ tags, collapsed, setCollapsed }: TaskContainerProps) {
  return (
    <View style={styles.container}>
         <View style={styles.addButton}>
        <AddTask parentId={0} depth={0} />
      </View>
      {tags.length > 0 ? (
        <ScrollView style={styles.taskList} keyboardShouldPersistTaps="handled">
          <NestedList tags={tags} collapsed={collapsed} setCollapsed={setCollapsed} />
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
