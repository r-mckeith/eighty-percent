import React from "react";
import { View, TouchableOpacity, Text, useColorScheme } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { addDays } from "date-fns";
import { StyleSheet } from "react-native";
import { getColors } from "../../src/colors";

type DateSelector = {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
};

export default function DateSelector({ selectedDate, onDateChange }: DateSelector) {
  const scheme = useColorScheme();
  const colors = getColors(scheme);

  const decrementDate = () => {
    const previousDay = addDays(selectedDate, -1);
    onDateChange(previousDay);
  };

  const incrementDate = () => {
    const nextDay = addDays(selectedDate, 1);
    onDateChange(nextDay);
  };

  function formatDateRelative(selectedDate: Date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const selected = new Date(selectedDate);
    selected.setHours(0, 0, 0, 0);

    if (selected.getTime() === today.getTime()) {
      return "Today";
    } else if (selected.getTime() === yesterday.getTime()) {
      return "Yesterday";
    } else if (selected.getTime() === tomorrow.getTime()) {
      return "Tomorrow";
    } else {
      return selectedDate.toLocaleDateString("en-US", { weekday: "long" });
    }
  }

  const dayDisplay = formatDateRelative(selectedDate);

  return (
    <View style={styles.datePicker}>
      <View style={styles.datePickerContainer}>
        <TouchableOpacity onPress={decrementDate} style={styles.iconButton}>
          <MaterialCommunityIcons name="chevron-left" size={24} color={colors.text.color} />
        </TouchableOpacity>
        <Text style={[styles.headerText, colors.text]}>{dayDisplay}</Text>
        <TouchableOpacity onPress={incrementDate} style={styles.iconButton}>
          <MaterialCommunityIcons name="chevron-right" size={24} color={colors.text.color} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  datePicker: {
    alignSelf: "flex-end",
    marginRight: 4,
    marginBottom: 15,
  },
  headerText: {
    textTransform: "capitalize",
  },
  datePickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  iconButton: {
    marginHorizontal: 10,
  },
});
