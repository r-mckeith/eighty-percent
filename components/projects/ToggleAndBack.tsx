import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Icon, Toggle } from "../layout";

type ToggleAndBack = {
  onPressBack: () => void;
  onToggle: any;
  showCompleted: boolean;
};

export default function ToggleAndBack({ onPressBack, onToggle, showCompleted }: ToggleAndBack) {
  return (
    <View style={styles.toggleAndBackContainer}>
      <TouchableOpacity onPress={onPressBack}>
        <Icon name="chevron-left" size={30} />
      </TouchableOpacity>
      <Toggle onToggle={onToggle} value={showCompleted} label={"Show completed"} />
    </View>
  );
}

const styles = StyleSheet.create({
  toggleAndBackContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#000",
    padding: 10,
    paddingTop: 20,
  },
});
