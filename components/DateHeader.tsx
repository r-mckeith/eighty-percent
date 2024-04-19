import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { addDays } from 'date-fns';
import DatePicker from './DatePicker';
import { StyleSheet } from 'react-native';

type HeaderProps = {
  title: string;
  selectedDate: Date;
  onDateChange: (date: Date) => void;
};

export default function Header({ title, selectedDate, onDateChange }: HeaderProps) {
  const decrementDate = () => {
    const previousDay = addDays(selectedDate, -1);
    onDateChange(previousDay);
  };

  const incrementDate = () => {
    const nextDay = addDays(selectedDate, 1);
    onDateChange(nextDay);
  };

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>{title}</Text>
      <View style={styles.datePickerContainer}>
        <TouchableOpacity onPress={decrementDate} style={styles.iconButton}>
          <MaterialCommunityIcons name="chevron-left" size={24} />
        </TouchableOpacity>
        <DatePicker
          selectedDate={selectedDate}
          onDateChange={onDateChange}
        />
        <TouchableOpacity onPress={incrementDate} style={styles.iconButton}>
          <MaterialCommunityIcons name="chevron-right" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles=StyleSheet.create({
  headerContainer: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 18,
    textTransform: "capitalize",
  },
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButton: {
    marginHorizontal: 10,
  },
});
