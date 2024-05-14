import React from "react";
import { View, Text, StyleSheet, useColorScheme } from "react-native";
import { getColors } from "../../src/colors";

type StatsText = {
  day: string | number;
  week: string | number;
  children?: any;
  style?: any;
};

export default function StatsText({ day, week, children, style }: StatsText) {
  const scheme = useColorScheme();
  const colors = getColors(scheme);

  return (
    <View style={styles.statsContainer}>
      <Text style={[styles.statsText, colors.accentText, style]}>{day}</Text>
      <Text style={[styles.statsText, colors.accentText, style]}>{week}</Text>
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
    flex: 1,
    textAlign: "center",
  },
});
