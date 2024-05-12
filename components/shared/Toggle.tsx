import React from "react";
import { View, StyleSheet, Text, Switch } from "react-native";

type Toggle = {
  onToggle: any;
  value: boolean;
  label: string;
  style?: any;
};

export default function Toggle({ onToggle, value, label, style }: Toggle) {
  return (
    <View style={[styles.toggleContainer, style ? style : {}]}>
      <Text style={styles.toggleLabel}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onToggle}
        ios_backgroundColor={"#FFF"}
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
    color: "#FFF",
  },
});
