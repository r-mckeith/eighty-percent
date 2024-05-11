import React from "react";
import { View, StyleSheet, Text } from "react-native";

type SectionTitle = {
  title: string;
  children?: any;
};

export default function SectionTitle({ title, children }: SectionTitle) {
  return (
    <View style={styles.sectionName}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.children}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionName: {
    flexDirection: "row",
    marginBottom: 5,
  },
  sectionTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
    textTransform: "capitalize",
  },
  children: {
    paddingRight: 5
  }
});
