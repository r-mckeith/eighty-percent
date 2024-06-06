import React from 'react';
import { View, useColorScheme } from 'react-native';
import { addDays } from 'date-fns';
import { Appbar } from 'react-native-paper';
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

  return (
    <View>
      <View style={[{ paddingBottom: 10 }, colors.background]}>
        <Appbar mode='center-aligned' style={[colors.background, colors.border, { borderBottomWidth: 1 }]}>
          <Appbar.Action icon='chevron-left' style={{ paddingLeft: 35 }} onPress={decrementDate} />
          <Appbar.Content title={dayDisplay} />
          <Appbar.Action
            icon='chevron-right'
            style={{ paddingRight: 35 }}
            onPress={incrementDate}
            disabled={dayDisplay === 'Today' ? true : false}
          />
        </Appbar>
      </View>
    </View>
  );
}
