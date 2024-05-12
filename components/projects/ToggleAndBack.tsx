import React from "react";
import { View, StyleSheet } from "react-native";
import { Icon, Toggle } from "../layout";

type ToggleAndBack = {
  onPressBack: () => void;
  onToggle: any;
  showCompleted: boolean;
};

export default function ToggleAndBack({ onPressBack, onToggle, showCompleted }: ToggleAndBack) {
  return (
    <View style={styles.toggleAndBackContainer}>
        <Icon name="chevron-left" size={30} opacity={0.2} onPress={onPressBack} />
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
