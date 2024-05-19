import React from 'react';
import { View, StyleSheet, Text, useColorScheme } from 'react-native';
import { getColors } from '../../src/colors';

export default function StatsHeader() {
  const scheme = useColorScheme();
  const colors = getColors(scheme);

  return (
    <View style={[styles.statsHeader, colors.background, colors.border]}>
      <Text style={[styles.headerCellHabitName, colors.text]}></Text>
      <Text style={[styles.headerCell, colors.text]}>Day</Text>
      <Text style={[styles.headerCell, colors.text]}>Week</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  statsHeader: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
    // borderWidth: 1,
    // borderTopLeftRadius: 10,
    // borderTopRightRadius: 10,
    borderBottomWidth: 1,
  },
  headerCell: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 12,
  },
  headerCellHabitName: {
    flex: 3.5,
    textAlign: 'left',
    fontWeight: 'bold',
  },
});
