import React from "react";
import { View, StyleSheet, Text } from "react-native";

export default function StatsHeader() {
  return (
    <View style={styles.statsHeader}>
      <Text style={styles.headerCellHabitName}></Text>
      <Text style={styles.headerCell}>Day</Text>
      <Text style={styles.headerCell}>Week</Text>
      <Text style={styles.headerCell}>Month</Text>
      <Text style={styles.headerCell}>Year</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
