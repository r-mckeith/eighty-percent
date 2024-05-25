import React from "react";
import { View, StyleSheet, Text, Switch, useColorScheme } from "react-native";
import { getColors } from "../../src/colors";

type Toggle = {
  onToggle: any;
  value: boolean;
  label: string;
  style?: any;
};

export default function Toggle({ onToggle, value, label, style }: Toggle) {
  const scheme = useColorScheme();
  const colors = getColors(scheme);

  return (
    <View style={[styles.toggleContainer, colors.background, style ? style : {}]}>
      <Text style={[styles.toggleLabel, colors.text]}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onToggle}
        ios_backgroundColor={colors.background.backgroundColor}
        trackColor={{ true: "#3a3a3c" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  toggleLabel: {
    marginRight: 8,
  },
});
