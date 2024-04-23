import React from "react";
import { View, StyleSheet, Text } from "react-native";

export default function ProjectStats({ name, data }: { name: string, data: any }) {
  return (
    <View style={styles.rowContent}>
      <Text style={[styles.name]}>{name}</Text>
      {data && (
        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>{data.day > 0 && data.day}</Text>
          <Text style={styles.statsText}>{data.week > data.day && data.week}</Text>
          <Text style={styles.statsText}>
            {data.month > data.week && data.month}
          </Text>
          <Text style={styles.statsText}>{data.year > data.month && data.year}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  rowContent: {
    flexDirection: "row",
    color: "#FFF",
    flex: 1,
    justifyContent: "space-between",
  },
  statsContainer: {
    flexDirection: "row",
    flex: 3,
    justifyContent: "space-between",
  },
  statsText: {
    paddingHorizontal: 5,
    color: "#DDD",
    flex: 1,
    textAlign: "center",
  },
  name: {
    flex: 2.75,
    fontWeight: "bold",
    color: "white",
    textAlign: "left",
  },
});
