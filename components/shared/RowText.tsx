import React from "react";
import { Text, StyleSheet, useColorScheme } from "react-native";
import { getColors } from "../../src/colors";

type RowText = {
  text: string;
  style?: any;
  fontSize?: number;
  disabled?: boolean;
  completed?: boolean;
};

export default function RowText({ text, style, fontSize = 16, disabled, completed }: RowText) {
  const scheme = useColorScheme();
  const colors = getColors(scheme)

  const textColor = disabled ? colors.disabledText : colors.text
  const completedText = completed ? styles.completed : {}

  return <Text style={[styles.text, textColor, completedText, {fontSize: fontSize}, style ? style : null]}>{text}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontWeight: "bold",
    flex: 3.5,
  },
  completed: {
    textDecorationLine: "line-through",
  }
});
