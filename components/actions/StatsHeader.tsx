import React from 'react';
import { View, StyleSheet, Text, useColorScheme } from 'react-native';
import { getColors } from '../../src/colors';
import { AddButton } from '../shared';

export default function StatsHeader() {
  const scheme = useColorScheme();
  const colors = getColors(scheme);

  return (
    <View style={[styles.statsHeader, colors.background, colors.border]}>
      <View style={styles.headerCellHabitName}>
      <Text style={[colors.text, styles.text, {paddingRight: 10}]}>Habits</Text>
      <AddButton sectionName='habits' type='habit' groupId={0} />
      </View>

      <Text style={[styles.headerCell, colors.text]}>Day</Text>
      <Text style={[styles.headerCell, colors.text]}>Week</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  statsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
  },
  headerCell: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 12,
  },
  headerCellHabitName: {
    flex: 3.5,
    flexDirection: 'row',
    alignItems: 'center',

  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  }
});
