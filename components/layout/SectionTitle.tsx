import React from "react";
import { View, StyleSheet, Text } from "react-native";

type SectionTitle = {
  title: string;
};

export default function SectionTitle({ title }: SectionTitle) {
  return (
    <View style={styles.sectionName}>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionName: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  sectionTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
    textTransform: "capitalize",
  },
});
