import React from "react";
import { Text, StyleSheet } from "react-native";

type RowText = {
  text: string;
  style?: any;
};

export default function RowText({ text, style }: RowText) {
  return <Text style={[styles.text, style ? style : null]}>{text}</Text>;
}

const styles = StyleSheet.create({
  text: {
    marginLeft: 7,
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 18,
    flex: 3.5,
  },
});
