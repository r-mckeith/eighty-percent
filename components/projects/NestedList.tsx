import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Project from "./Project";
import { HabitProps as ProjectProps } from "../../src/types/HabitTypes";

export default function NestedList({
  projects,
  rootProjectId,
}: {
  projects: ProjectProps[];
  rootProjectId: number | null;
}) {
  const rootProject = projects.find((project) => project.id === rootProjectId);

  const renderProjectsRecursively = (parentId: number) => {
    return projects
      .filter((project) => project.parentId === parentId)
      .map((project) => (
        <View key={project.id} style={styles.childProject}>
          <Project project={project} rootProjectId={rootProjectId} />
          {renderProjectsRecursively(project.id)}
        </View>
      ));
  };

  return (
    <View style={styles.section}>
      {rootProject ? (
        <View style={styles.projectContainer}>
          <Project project={rootProject} rootProjectId={rootProjectId} />
          {renderProjectsRecursively(rootProject.id)}
        </View>
      ) : (
        <Text style={styles.headerText}>No task found</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    flexShrink: 1,
    flexGrow: 1,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#333333",
    backgroundColor: "#1c1c1e",
    marginBottom: 20,
  },
  projectContainer: {
    flexDirection: "column",
    alignSelf: "stretch",
  },
  headerText: {
    color: "white",
  },
  childProject: {
    paddingLeft: 20,
    backgroundColor: "#2c2c2e",
  },
});