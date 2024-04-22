import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Switch, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useHabitContext as useProjectContext } from "../src/contexts/habits/UseHabitContext";
import AddButton from "../components/shared/AddButton";
import { HabitProps as ProjectProps } from "../src/types/HabitTypes";
import ProjectSection from "../components/projects/ProjectSection";
import NestedList from "../components/projects/NestedList";

export default function Projects() {
  const [showCompleted, setShowCompleted] = useState<boolean>(false);
  const [projectRoots, setProjectRoots] = useState<ProjectProps[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<ProjectProps[]>([]);
  const [selected, setSelected] = useState<number | null>(null);

  const { habits: projects } = useProjectContext();

  useEffect(() => {
    const filteredProjects = showCompleted
      ? projects.filter((tag) => tag.section === "today")
      : projects.filter((tag) => tag.section === "today" && !tag.completed);
    setFilteredProjects(filteredProjects);

    const projectRoots = filteredProjects.filter((tag) => tag.parentId === 0);
    setProjectRoots(projectRoots);
  }, [showCompleted, projects, selected]);

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
              <AddButton parentId={0} depth={0} type={'project'} />
            </View>
          )}
          {!selected && (
            <View style={styles.sectionName}>
              <Text style={styles.sectionTitle}>Recent</Text>
            </View>
          )}

          {!selected && (
            <ProjectSection projects={projectRoots} setSelected={setSelected} />
          )}
          {selected && (
            <NestedList projects={filteredProjects} rootProjectId={selected} />
          )}
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
