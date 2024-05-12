import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

type Row = {
  children: any;
  style?: any;
  opacity: number;
  onPress?: () => void;
};

export default function Row({ children, style, opacity, onPress }: Row) {
  return (
      <View style={style ? style : {}}>
        <TouchableOpacity
          activeOpacity={opacity}
          style={styles.row}
          onPress={onPress}
        >
          {children}
        </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#2c2c2e",
    borderBottomWidth: 1,
    borderColor: "#333",
    alignSelf: "stretch",
  },
});
