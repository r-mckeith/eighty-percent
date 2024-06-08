import React from 'react';
import { View, useColorScheme, TouchableOpacity } from 'react-native';
import { addDays } from 'date-fns';
import { Text, Icon } from 'react-native-paper';
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
  const disabled = dayDisplay === 'Today'

  return (
    <View
      style={[
        colors.background,
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingVertical: 10,
          paddingRight: 10,
        },
      ]}>
      <TouchableOpacity onPress={decrementDate}>
        <Icon source='chevron-left' size={25} />
      </TouchableOpacity>
      <Text variant='headlineSmall'>{dayDisplay}</Text>
      <TouchableOpacity onPress={incrementDate} disabled={disabled}>
        <Icon source='chevron-right' size={25} color={disabled ? 'grey' : colors.text.color} />
      </TouchableOpacity>
    </View>
  );
}
