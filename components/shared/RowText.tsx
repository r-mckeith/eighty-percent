import React from "react";
import { Text, StyleSheet } from "react-native";

type RowText = {
  text: string;
  style?: any;
  fontSize?: number;
};

export default function RowText({ text, style, fontSize = 16 }: RowText) {
  return <Text style={[styles.text, {fontSize: fontSize}, style ? style : null]}>{text}</Text>;
}

const styles = StyleSheet.create({
  text: {
    marginLeft: 7,
    color: "#FFF",
    fontWeight: "bold",
    flex: 3.5,
  },
});
