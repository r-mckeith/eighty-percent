import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { getColors } from '../../src/colors';

type TargetSelector = {
  times: number | null;
  timeframe: string | null;
  setTimes: (arg0: number) => void;
  setTimeframe: (arg0: string) => void;
};

export default function TargetSelector({ times, timeframe, setTimes, setTimeframe }: TargetSelector) {
  const scheme = useColorScheme();
  const colors = getColors(scheme);

  const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: colors.border.borderColor,
      borderRadius: 4,
      color: colors.text.color,
      paddingRight: 30,
    },
  });
  
  return (
    <View style={[styles.dropdownContainer, colors.background]}>
      <RNPickerSelect
        style={pickerSelectStyles}
        value={times}
        onValueChange={value => setTimes(value)}
        items={[...Array(10).keys()].map(i => ({ label: (i + 1).toString(), value: (i + 1).toString() }))}
      />
      <Text style={[styles.inlineLabel, colors.text]}>times per</Text>
      <RNPickerSelect
        style={pickerSelectStyles}
        value={timeframe}
        onValueChange={value => setTimeframe(value)}
        items={[
          { label: 'Day', value: 'day' },
          { label: 'Week', value: 'week' },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  dropdownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
  },
  inlineLabel: {
    marginHorizontal: 10,
    fontSize: 16,
  },
});
