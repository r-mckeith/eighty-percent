import React from "react";
import { View, StyleSheet } from "react-native";
import { HabitProps } from "../../src/types/HabitTypes";
import Project from "./Project";

type ProjectSection = {
  projects: HabitProps[];
  setSelected: (arg0: number) => void;
};

export default function ProjectSection({ projects, setSelected }: ProjectSection) {
  return (
    <View style={styles.section}>
      <View style={styles.projectContainer}>
        {projects.map((project, index) => (
          <Project
            key={index}
            project={project}
            setSelected={setSelected}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    flexShrink: 1,
    flexGrow: 1,
    borderRadius: 10,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: "#333333",
    backgroundColor: "#1c1c1e",
    marginBottom: 20,
  },
  projectContainer: {
    flexDirection: "column",
    alignSelf: "stretch",
  },
});
