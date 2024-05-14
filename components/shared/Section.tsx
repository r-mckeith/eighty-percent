import React from "react";
import { View, StyleSheet, useColorScheme } from "react-native";
import { getColors } from "../../src/colors";

type Section = {
  children: any;
  style?: any;
};

export default function Section({ children, style }: Section) {
  const scheme = useColorScheme();
  const colors = getColors(scheme);

  return (
    <View style={[styles.section, colors.border, style]}>
        {children}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginVertical: 10,
    marginBottom: 20,
  },
});
