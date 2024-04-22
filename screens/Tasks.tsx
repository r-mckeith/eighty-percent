import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Switch, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useTagContext } from "../src/contexts/tags/UseTagContext";
import AddTask from "../components/projects/AddTask";
import { TagProps } from "../src/types/TagTypes";
import TaskSection from "../components/projects/TaskSection";
import NestedList from "../components/NestedList";

export default function MonthlyScreen() {
  const [showCompleted, setShowCompleted] = useState<boolean>(false);
  const [rootTags, setRootTags] = useState<TagProps[]>([]);
  const [listTags, setListTags] = useState<TagProps[]>([]);
  const [selected, setSelected] = useState<number | null>(null);

  const { tags } = useTagContext();

  useEffect(() => {
    const listTags = showCompleted
      ? tags.filter((tag) => tag.section === "today")
      : tags.filter((tag) => tag.section === "today" && !tag.completed);
    setListTags(listTags);

    const rootTags = listTags.filter((tag) => tag.parentId === 0);
    setRootTags(rootTags);
  }, [showCompleted, tags, selected]);

  function handlePressBack() {
    setSelected(null);
    setShowCompleted(false);
  }

  return (
    <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="handled">
      {selected && (
        <View style={styles.toggleAndBackContainer}>
          <TouchableOpacity onPress={() => {}}>
            <MaterialCommunityIcons
              name="chevron-left"
              size={30}
              color={"white"}
              onPress={handlePressBack}
            />
          </TouchableOpacity>
          <View style={styles.toggleContainer}>
            <Text style={styles.toggleLabel}>Show Completed</Text>
            <Switch
              value={showCompleted}
              onValueChange={setShowCompleted}
              ios_backgroundColor={"#FFF"}
              trackColor={{ true: "#3a3a3c" }}
            />
          </View>
        </View>
      )}

      <View style={styles.container}>
        <View style={styles.sectionsContainer}>
          {!selected && (
            <View style={styles.addButton}>
              <AddTask parentId={0} depth={0} />
            </View>
          )}
          {!selected && (
            <View style={styles.sectionName}>
              <Text style={styles.sectionTitle}>Recent</Text>
            </View>
          )}

          {!selected && (
    
            <TaskSection tags={rootTags} setSelected={setSelected} />
          )}
          {selected && <NestedList tags={listTags} rootTagId={selected} />}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#000",
  },
  addButton: {
    alignSelf: "flex-end",
    marginRight: 4,
    marginBottom: 5,
  },
  sectionsContainer: {
    padding: 16,
  },
  sectionName: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  sectionTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
    textTransform: "capitalize",
  },
  toggleAndBackContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#000",
    padding: 10,
    paddingTop: 20,
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  toggleLabel: {
    marginRight: 8,
    color: "#FFF",
  },
});
