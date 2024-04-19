import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import Task from "./tasks/Task";
import { TagProps } from "../src/types/TagTypes";

export default function NestedList({ tags }: { tags: TagProps[] }) {
  const [collapsed, setCollapsed] = useState(new Set());
  const [expandAll, setExpandAll] = useState(true);

  const toggleCollapse = (id: number) => {
    const updatedCollapsed = new Set(collapsed);
    if (collapsed.has(id)) {
      updatedCollapsed.delete(id);
    } else {
      updatedCollapsed.add(id);
    }
    setCollapsed(updatedCollapsed);
  };

  const handleExpandAll = () => {
    if (expandAll) {
      setCollapsed(new Set(tags.map((tag) => tag.id)));
    } else {
      setCollapsed(new Set());
    }
    setExpandAll(!expandAll);
  };

  const findRootTags = () => {
    const allIds = new Set(tags.map((tag) => tag.id));
    return tags.filter((tag) => !tag.parentId || !allIds.has(tag.parentId));
  };

  const renderTags = (parentId: number | null) => {
    const tagsToRender =
      parentId === null
        ? findRootTags()
        : tags.filter((tag) => tag.parentId === parentId);

    tagsToRender.sort((a, b) => {
      if (parentId === null) {
        return b.id - a.id;
      } else {
        return a.id - b.id;
      }
    });

    return tagsToRender.map((tag, index) => (
      <View
        key={tag.id}
        style={[
          parentId !== null ? styles.subtask : undefined,
          parentId === null && index !== 0 ? styles.headerSpacing : undefined,
        ]}
      >
        {parentId === null && (
          <TouchableOpacity onPress={() => toggleCollapse(tag.id)}>
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
      <TouchableOpacity style={styles.expandButton} onPress={handleExpandAll}>
        <Text>{expandAll ? "Collapse All" : "Expand All"}</Text>
      </TouchableOpacity>
      {renderTags(null)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 20,
    backgroundColor: "#F5F5F5",
    padding: 10,
    marginTop: 15,
    marginHorizontal: 10,
  },
  expandButton: {
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  iconStyle: {
    marginRight: 10,
  },
  taskName: {
    fontWeight: "bold",
  },
  headerSpacing: {
    marginTop: 20,
  },
  subtask: {
    marginLeft: 20,
  },
});
