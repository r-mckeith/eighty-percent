import React from "react";
import { View, StyleSheet } from "react-native";
import Project from "./Project";
import { HabitProps as ProjectProps } from "../../src/types/HabitTypes";
import { Section, RowText } from "../shared";

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
    <Section>
      {rootProject ? (
        <View>
          <Project project={rootProject} rootProjectId={rootProjectId} />
          {renderProjectsRecursively(rootProject.id)}
        </View>
      ) : (
        <RowText text='No task found' />
      )}
    </Section>
  );
}

const styles = StyleSheet.create({
  childProject: {
    paddingLeft: 20,
    backgroundColor: "#2c2c2e",
  },
});
