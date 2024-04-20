import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { TagProps } from "../src/types/TagTypes";
import Task from "./tasks/Task";
import AddTask from "../components/tasks/AddTask";

type NestedListProps = {
  tags: TagProps[];
  collapsed: Set<number | unknown>;
  setCollapsed: (arg0: Set<number | unknown>) => void;
};

export default function NestedList({ tags, collapsed, setCollapsed }: NestedListProps) {
  const toggleCollapse = (id: number) => {
    const updatedCollapsed = new Set(collapsed);
    if (collapsed.has(id)) {
      updatedCollapsed.delete(id);
    } else {
      updatedCollapsed.add(id);
    }
    setCollapsed(updatedCollapsed);
  };

  const findRootTags = () => {
    const allIds = new Set(tags.map(tag => tag.id));
    return tags.filter(tag => !tag.parentId || !allIds.has(tag.parentId));
  };

  const hasChildren = (id: number) => {
    return tags.some(tag => tag.parentId === id);
  };

  const renderTags = (parentId: number | null) => {
    const tagsToRender = parentId === null ? findRootTags() : tags.filter(tag => tag.parentId === parentId);

    tagsToRender.sort((a, b) => (parentId === null ? b.id - a.id : a.id - b.id));

    return tagsToRender.map((tag, index) => (
      <View
        key={tag.id}
        style={[
          parentId !== null ? styles.subtask : undefined,
          parentId === null && index !== 0 ? styles.headerSpacing : undefined,
        ]}
      >
        {parentId === null && hasChildren(tag.id) && (
          <TouchableOpacity onPress={() => toggleCollapse(tag.id)} style={styles.taskHeader}>
            <Text>{collapsed.has(tag.id) ? "Expand" : "Collapse"}</Text>
          </TouchableOpacity>
        )}
        <Task {...tag} />
        {!collapsed.has(tag.id) && renderTags(tag.id)}
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.addButton}>
        <AddTask parentId={0} depth={0} />
      </View>
      {renderTags(null)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 20,
    backgroundColor: "#000",
    padding: 10,
    marginTop: 15,
    marginHorizontal: 10,
  },
  taskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButton: {
    alignSelf: "flex-end",
    marginRight: 4,
    marginBottom: 5,
  },
  headerSpacing: {
    marginTop: 20,
  },
  subtask: {
    marginLeft: 20,
  },
});
