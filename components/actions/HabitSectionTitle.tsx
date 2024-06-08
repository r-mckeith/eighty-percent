import React from 'react';
import { View, StyleSheet, useColorScheme } from 'react-native';
import { getColors } from '../../src/colors';
import { AddButton } from '../shared';
import { Text } from 'react-native-paper';

export default function StatsHeader({ groupId }: { groupId: number }) {
  const scheme = useColorScheme();
  const colors = getColors(scheme);

  return (
    <View style={[styles.header, colors.background]}>
      <View style={styles.title}>
        <Text variant='headlineMedium' style={{ color: '#0E5FFF', paddingRight: 10 }}>
          Habits
        </Text>
        <AddButton sectionName='habits' type='habit' groupId={groupId} />
      </View>

      <Text variant='bodyMedium' style={[styles.cell, { color: '#0E5FFF' }]}>
        Day
      </Text>
      <Text variant='bodyMedium' style={[styles.cell, { color: '#0E5FFF' }]}>
        Week
      </Text>
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
  },
});
