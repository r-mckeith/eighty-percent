import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useHabitContext as useProjectContext } from "../src/contexts/habits/UseHabitContext";
import AddButton from "../components/shared/AddButton";
import { HabitProps as ProjectProps } from "../src/types/HabitTypes";
import ProjectSection from "../components/projects/ProjectSection";
import NestedList from "../components/projects/NestedList";
import { SectionTitle, Scroll } from "../components/shared";
import ToggleAndBack from "../components/projects/ToggleAndBack";
import { Toggle } from "../components/shared";

export default function Projects() {
  const [showCompleted, setShowCompleted] = useState<boolean>(false);
  const [projectRoots, setProjectRoots] = useState<ProjectProps[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<ProjectProps[]>([]);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const { habits: projects } = useProjectContext();

  useEffect(() => {
    const filteredProjects = showCompleted
      ? projects.filter((tag) => tag.section === "today")
      : projects.filter((tag) => tag.section === "today" && !tag.completed);
    setFilteredProjects(filteredProjects);

    const projectRoots = filteredProjects.filter((tag) => tag.parentId === 0);
    setProjectRoots(projectRoots);
  }, [showCompleted, projects, selectedProject]);

  function handlePressBack() {
    setSelectedProject(null);
    setShowCompleted(false);
  }

  return (
    <Scroll>
      {selectedProject && (
        <View>
          <ToggleAndBack
            onPressBack={handlePressBack}
            onToggle={setShowCompleted}
            showCompleted={showCompleted}
          />
          <NestedList projects={filteredProjects} rootProjectId={selectedProject} />
        </View>
      )}

      {!selectedProject && (
        <>
          <Toggle
            onToggle={setShowCompleted}
            value={showCompleted}
            label={'Show Completed'}
            style={{justifyContent: 'flex-end', paddingBottom: 30}}
          />
          <SectionTitle title="Recent">
            <AddButton parentId={0} depth={0} type={"project"} />
          </SectionTitle>
          <ProjectSection projects={projectRoots} setSelected={setSelectedProject} />
        </>
      )}
    </Scroll>
  );
}
