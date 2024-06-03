import React from 'react';
import { View, StyleSheet, Text, useColorScheme } from 'react-native';
import { getColors } from '../../src/colors';
import { AddButton } from '../shared';

export default function StatsHeader({ groupId }: { groupId: number }) {
  const scheme = useColorScheme();
  const colors = getColors(scheme);

  return (
    <View style={[styles.header, colors.background]}>
      <View style={styles.title}>
        <Text style={[colors.text, styles.text]}>Habits</Text>
        <AddButton sectionName='habits' type='habit' groupId={groupId} />
      </View>

      <Text style={[styles.cell, colors.text]}>Day</Text>
      <Text style={[styles.cell, colors.text]}>Week</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
  },
  title: {
    flex: 3.5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 12,
  },
  text: {
    fontSize: 28,
    fontWeight: '400',
    lineHeight: 32,
    letterSpacing: 0.18,
    textTransform: 'capitalize',
    paddingRight: 5
  },
});
