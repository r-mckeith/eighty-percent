import React from 'react';
import { View, Text, useColorScheme } from 'react-native';
import { addDays } from 'date-fns';
import { Icon } from '../shared';
import { StyleSheet } from 'react-native';
import { getColors } from '../../src/colors';

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
      return 'Today';
    } else if (selected.getTime() === yesterday.getTime()) {
      return 'Yesterday';
    } else if (selected.getTime() === tomorrow.getTime()) {
      return 'Tomorrow';
    } else {
      return selectedDate.toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    }
  }

  const dayDisplay = formatDateRelative(selectedDate);

  function renderArrowForward() {
    if (dayDisplay !== 'Today') {
      return (
        <Icon name={'chevron-right'} size={24} style={{ marginHorizontal: 10 }} opacity={0.2} onPress={incrementDate} />
      );
    } else {
      return <View style={{ marginHorizontal: 20 }} />;
    }
  }

  return (
    <View style={[styles.datePicker, colors.background]}>
      <View style={styles.datePickerContainer}>
        <Icon name={'chevron-left'} size={24} style={{ marginHorizontal: 10 }} opacity={0.2} onPress={decrementDate} />
        <Text style={colors.text}>{dayDisplay}</Text>
        {renderArrowForward()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  datePicker: {
    alignSelf: 'flex-end',
    marginRight: 4,
    marginBottom: 15,
  },
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
