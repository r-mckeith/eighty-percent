import React from "react";
import { View, Text, StyleSheet } from "react-native";

type StatsText = {
  day: string | number;
  week: string | number;
  children?: any;
  style?: any;
};

export default function StatsText({ day, week, children, style }: StatsText) {
  return (
    <View style={styles.statsContainer}>
      <Text style={[styles.statsText, style]}>{day}</Text>
      <Text style={[styles.statsText, style]}>{week}</Text>
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
