import React from "react";
import { View, StyleSheet } from "react-native";
import { HabitProps } from "../../src/types/HabitTypes";
import Habit from "./Habit";
import StatsHeader from "../shared/StatsHeader";
import ProjectStats from "../shared/ProjectStats";
import { useAggregatedData } from "../../src/hooks/aggregateData";

type SectionProps = {
  habits: HabitProps[];
  sectionName: string;
};

export default function HabitSection({ habits, sectionName }: SectionProps) {
  const { projectsTableData } = useAggregatedData();

  return (
    <View style={styles.section}>
      <View style={styles.habitContainer}>
        <StatsHeader />

        {habits.map((tag, index) => (
          <Habit
            key={index}
            habit={tag}
            sectionName={sectionName}
            isEditMode={false}
          />
        ))}
      </View>
      {sectionName === "today" && projectsTableData && <ProjectStats />}
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
  habitContainer: {
    flexDirection: "column",
    alignSelf: "stretch",
  },
});
