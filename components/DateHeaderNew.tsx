import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { addDays } from "date-fns";
import DatePicker from "./DatePicker";
import { StyleSheet } from "react-native";

type HeaderProps = {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
};

export default function DateHeaderNew({
  selectedDate,
  onDateChange,
}: HeaderProps) {
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

  const dayOfWeek = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
  }).format(selectedDate);

  return (
    <View style={styles.datePickerContainer}>
      <TouchableOpacity onPress={decrementDate} style={styles.iconButton}>
        <MaterialCommunityIcons name="chevron-left" size={24} color={"white"} />
      </TouchableOpacity>
      <Text style={styles.headerText}>{dayDisplay}</Text>
      {/* <DatePicker
          selectedDate={selectedDate}
          onDateChange={onDateChange}
        /> */}
      <TouchableOpacity onPress={incrementDate} style={styles.iconButton}>
        <MaterialCommunityIcons
          name="chevron-right"
          size={24}
          color={"white"}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerText: {
    textTransform: "capitalize",
    color: "white",
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
