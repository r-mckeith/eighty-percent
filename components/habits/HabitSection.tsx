import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { HabitProps } from "../../src/types/HabitTypes";
import Tag from "./Habit";
import { useAggregatedData } from "../../src/hooks/aggregateData";

type SectionProps = {
  habits: HabitProps[];
  sectionName: string;
};

export default function HabitSection({ habits, sectionName }: SectionProps) {
  const { projectsTableData } = useAggregatedData();

  return (
    <View style={styles.section}>
      <View style={styles.addHabitContainer}></View>
      <View style={styles.habitContainer}>
        <View style={styles.statsHeader}>
          <Text style={styles.headerCellHabitName}></Text>
          <Text style={styles.headerCell}>Day</Text>
          <Text style={styles.headerCell}>Week</Text>
          <Text style={styles.headerCell}>Month</Text>
          <Text style={styles.headerCell}>Year</Text>
        </View>

        {habits.map((tag, index) => (
          <Tag
            key={index}
            habit={tag}
            sectionName={sectionName}
            isEditMode={false}
          />
        ))}
      </View>
      {sectionName === "today" && projectsTableData && (
        <View style={styles.statsContainer}>
          <Text style={styles.habitText}></Text>
          <Text style={styles.statsText}>
            {projectsTableData.today > 0 && projectsTableData.today}
          </Text>
          <Text style={styles.statsText}>
            {projectsTableData.last7Days > projectsTableData.today &&
              projectsTableData.last7Days}
          </Text>
          <Text style={styles.statsText}>
            {projectsTableData.last30Days > projectsTableData.last7Days &&
              projectsTableData.last30Days}
          </Text>
          <Text style={styles.statsText}>
            {projectsTableData.last365Days > projectsTableData.last30Days &&
              projectsTableData.last365Days}
          </Text>
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
  addHabitContainer: {
    position: "absolute",
    top: -5,
    right: -5,
  },
  habitContainer: {
    flexDirection: "column",
    alignSelf: "stretch",
  },
  statsHeader: {
    flexDirection: "row",
    backgroundColor: "#333",
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#404040",
  },
  headerCell: {
    flex: 1,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
  headerCellHabitName: {
    flex: 3.5,
    textAlign: "left",
    color: "white",
    fontWeight: "bold",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: "center",
    backgroundColor: "#333",
  },
  statsText: {
    flex: 1,
    textAlign: "center",
    color: "#DDD",
  },
  habitText: {
    flex: 3.5,
    color: "transparent",
  },
});
