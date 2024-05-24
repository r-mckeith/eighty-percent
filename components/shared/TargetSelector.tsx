import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

type TargetSelector = {
  times: number | null;
  timeframe: string | null;
  setTimes: (arg0: number) => void;
  setTimeframe: (arg0: string) => void;
};

export default function TargetSelector({ times, timeframe, setTimes, setTimeframe }: TargetSelector) {
  return (
    <View style={styles.dropdownContainer}>
      <RNPickerSelect
        style={pickerSelectStyles}
        value={times}
        onValueChange={value => setTimes(value)}
        items={[...Array(10).keys()].map(i => ({ label: (i + 1).toString(), value: (i + 1).toString() }))}
      />
      <Text style={styles.inlineLabel}>times per</Text>
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

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
  },
});
