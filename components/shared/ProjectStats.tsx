import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useAggregatedData } from "../../src/hooks/aggregateData";

export default function ProjectStats() {
  const { projectsTableData } = useAggregatedData();

  return (
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
  );
}

const styles = StyleSheet.create({
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
