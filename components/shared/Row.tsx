import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function row({
  activeOpacity,
  onPress,
  name,
  data,
  selectedRow,
  disabledRow,
  selectedText,
  disabledText,
}: any) {
  const rowStyle = selectedRow ? [styles.selectedRow] : disabledRow ? [styles.disabledRow] : {};
  const textStyle = selectedText
    ? [styles.selectedText]
    : disabledText
    ? [styles.disabledText]
    : {};

  return (
    <TouchableOpacity activeOpacity={activeOpacity} onPress={onPress}>
      <View style={[styles.row, rowStyle]}>
        <View style={styles.rowContent}>
          <Text style={[styles.rowName, textStyle]}>{name}</Text>

          {data && (
            <View style={styles.statsContainer}>
              <Text style={styles.statsText}>{data.day > 0 && data.day || data.week && data.day}</Text>
              <Text style={styles.statsText}>{data.week > data.day && data.week}</Text>
              <Text style={styles.statsText}>{data.month > data.week && data.month}</Text>
              <Text style={styles.statsText}>{data.year > data.month && data.year}</Text>
            </View>
          )}
          {selectedRow && <MaterialCommunityIcons name="check" size={16} color="white" />}
          {disabledRow && <MaterialCommunityIcons name="arrow-right" size={16} color="white" />}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#2c2c2e",
    borderBottomWidth: 1,
    borderColor: "#333",
    alignSelf: "stretch",
  },
  selectedRow: {
    backgroundColor: "#3a3a3c",
  },
  disabledRow: {
    backgroundColor: "#3a3a3c",
    borderColor: "#505050",
  },
  rowContent: {
    flexDirection: "row",
    color: "#FFF",
    flex: 1,
    justifyContent: "space-between",
  },
  rowName: {
    flex: 2.75,
    fontWeight: "bold",
    color: "white",
    textAlign: "left",
  },
  selectedText: {
    textDecorationLine: "line-through",
    color: "#b1b1b3",
  },
  disabledText: {
    color: "#b1b1b3",
  },
  statsContainer: {
    flexDirection: "row",
    flex: 3,
    justifyContent: "space-between",
  },
  statsText: {
    paddingHorizontal: 5,
    color: "#DDD",
    flex: 1,
    textAlign: "center",
  },
});
