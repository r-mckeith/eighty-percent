import React from 'react';
import { View, useColorScheme } from 'react-native';
import { addDays } from 'date-fns';
import { Icon } from '../shared';
import { StyleSheet } from 'react-native';
import { getColors } from '../../src/colors';
import { Text } from 'react-native-paper';

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
    return (
      <Icon
        name={'chevron-right'}
        size={24}
        style={{ marginHorizontal: 10 }}
        opacity={dayDisplay === 'Today' ? 0.2 : 1}
        onPress={dayDisplay !== 'Today' ? incrementDate : () => {}}
      />
    );
  }

  return (
    <View style={[styles.datePicker, colors.background]}>
      <View style={styles.datePickerContainer}>
        <Icon name={'chevron-left'} size={24} style={{ marginHorizontal: 10 }} opacity={0.2} onPress={decrementDate} />
        <Text variant='bodyMedium' style={colors.text}>
          {dayDisplay ? dayDisplay : ''}
        </Text>
        {renderArrowForward()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  datePicker: {
    alignSelf: 'flex-end',
    marginBottom: 15,
  },
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
