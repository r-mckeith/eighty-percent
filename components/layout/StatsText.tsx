import React from "react";
import { View, Text, StyleSheet } from "react-native";

type StatsText = {
  day: string | number;
  week: string | number;
  children?: any;
};

export default function StatsText({ day, week, children }: StatsText) {
  return (
    <View style={styles.statsContainer}>
      <Text style={styles.statsText}>{day}</Text>
      <Text style={styles.statsText}>{week}</Text>
      {children && <View style={styles.statsText}>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: "row",
    flex: 2,
  },
  statsText: {
    paddingHorizontal: 5,
    color: "#DDD",
    flex: 1,
    textAlign: "center",
  },
});
