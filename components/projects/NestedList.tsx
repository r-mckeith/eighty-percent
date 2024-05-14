import React from 'react';
import { View, StyleSheet, useColorScheme } from 'react-native';
import Project from './Project';
import { HabitProps as ProjectProps } from '../../src/types/HabitTypes';
import { Section, RowText } from '../shared';
import { getColors } from '../../src/colors';

export default function NestedList({
  projects,
  rootProjectId,
}: {
  projects: ProjectProps[];
  rootProjectId: number | null;
}) {
  const scheme = useColorScheme();
  const colors = getColors(scheme);

  const rootProject = projects.find(project => project.id === rootProjectId);

  const renderProjectsRecursively = (parentId: number) => {
    return projects
      .filter(project => project.parentId === parentId)
      .map((project, index) => (
        <View key={project.id} style={[colors.row, styles.childProject]}>
          <Project
            project={project}
            rootProjectId={rootProjectId}
            first={true}
            last={true}
          />
          {renderProjectsRecursively(project.id)}
        </View>
      ));
  };

  return (
    <Section>
      {rootProject ? (
        <View>
          <Project project={rootProject} rootProjectId={rootProjectId} first={true} last={true}/>
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
  },
});
