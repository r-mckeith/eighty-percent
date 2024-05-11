import React from "react";
import { View, StyleSheet } from "react-native";

type Section = {
  children: any
};

export default function Section({ children }: Section) {
  return (
    <View style={styles.section}>
      <View style={styles.column}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    flexShrink: 1,
    flexGrow: 1,
    borderRadius: 10,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: "#333333",
    backgroundColor: "#1c1c1e",
    marginBottom: 20,
  },
  column: {
    flexDirection: "column",
    alignSelf: "stretch",
  },
});
