import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useHabitContext as useProjectContext } from "../src/contexts/habits/UseHabitContext";
import AddButton from "../components/shared/AddButton";
import { HabitProps as ProjectProps } from "../src/types/HabitTypes";
import ProjectSection from "../components/projects/ProjectSection";
import NestedList from "../components/projects/NestedList";
import { SectionTitle, Scroll } from "../components/layout";
import ToggleAndBack from "../components/projects/ToggleAndBack";

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
    <Scroll>
      {selected && (
        <View>
          <ToggleAndBack
            onPressBack={handlePressBack}
            onToggle={setShowCompleted}
            showCompleted={showCompleted}
          />
          <NestedList projects={filteredProjects} rootProjectId={selected} />
        </View>
      )}

      {!selected && (
        <View>
          <View style={styles.addButton}>
            <AddButton parentId={0} depth={0} type={"project"} />
          </View>
          <SectionTitle title="Recent" />
          <ProjectSection projects={projectRoots} setSelected={setSelected} />
        </View>
      )}
    </Scroll>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#000",
    padding: 16,
  },
  addButton: {
    alignSelf: "flex-end",
    marginRight: 4,
    marginBottom: 5,
  },
});
