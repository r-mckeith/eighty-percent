import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Switch, TouchableOpacity } from "react-native";
import { useTagContext } from "../src/contexts/tags/UseTagContext";
import { useDateContext } from "../src/contexts/date/useDateContext";
import TaskContainer from "../components/tasks/TaskContainer";
import ListHeader from "../components/ListHeader";
import { TagProps } from "../src/types/TagTypes";

export default function MonthlyScreen() {
  const [showCompleted, setShowCompleted] = useState<boolean>(false);
  const [listTags, setListTags] = useState<TagProps[]>([]);
  const [collapsed, setCollapsed] = useState(new Set());
  const [expandAll, setExpandAll] = useState(true);

  const { tags } = useTagContext();
  const { selectedDate, setSelectedDate } = useDateContext();

  useEffect(() => {
    const listTags = showCompleted ? tags.filter(tag => tag.section === 'today') : tags.filter(tag => tag.section === 'today' && !tag.completed)
    setListTags(listTags)
  }, [showCompleted, tags])


  const handleExpandAll = () => {
    if (expandAll) {
      setCollapsed(new Set(tags.map((tag) => tag.id)));
    } else {
      setCollapsed(new Set());
    }
    setExpandAll(!expandAll);
  };

  return (
    <>
      <ListHeader
        title={""}
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
      />
      <View style={styles.toggleAndAddContainer}>
        <View style={styles.toggleContainer}>
          <Text style={styles.toggleLabel}>Show Completed</Text>
          <Switch value={showCompleted} onValueChange={setShowCompleted} ios_backgroundColor={'#FFF'} trackColor={{true: '#3a3a3c'}} />
        </View>
        <TouchableOpacity style={styles.expandButton} onPress={handleExpandAll}>
          <Text style={styles.expandButtonText}>{expandAll ? "Collapse All" : "Expand All"}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TaskContainer tags={listTags} collapsed={collapsed} setCollapsed={setCollapsed}/>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  toggleAndAddContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#000",
    padding: 10,
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  toggleLabel: {
    marginRight: 8,
    color: "#FFF",
  },
  expandButton: {
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  expandButtonText: {
    color: "#FFF",
  }
});
