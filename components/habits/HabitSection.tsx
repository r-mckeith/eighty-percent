import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
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
  const [projectData, setProjectData] = useState<any>();
  const { projectsTableData } = useAggregatedData();

  useEffect(() => {
    const data = projectsTableData;
    if (data !== undefined) {
      setProjectData(data);
    } else {
      setProjectData(null);
    }
  }, [projectsTableData]);

  return (
    <View style={styles.section}>
      <View style={styles.habitContainer}>
        <StatsHeader />

        {habits.map((tag, index) => (
          <Habit key={index} habit={tag} sectionName={sectionName} isEditMode={false} />
        ))}
      </View>
      {sectionName === "today" && projectsTableData && (
        <View style={styles.row}>
            <ProjectStats name={''} data ={projectsTableData} />
        </View>
      )}
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
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#2c2c2e",
    borderBottomWidth: 1,
    borderColor: "#333",
    alignSelf: "stretch",
  },
});
