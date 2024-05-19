import React from 'react';
import { View, StyleSheet, Text, useColorScheme } from 'react-native';
import { getColors } from '../../src/colors';

type SectionTitle = {
  title: string;
  children?: any;
};

export default function SectionTitle({ title, children }: SectionTitle) {
  const scheme = useColorScheme();
  const colors = getColors(scheme);

  return (
    <View style={[styles.sectionName, colors.background]}>
      <Text style={[styles.sectionTitle, colors.text]}>{title}</Text>
      <View style={styles.children}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionName: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  sectionTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  children: {
    paddingRight: 5,
  },
});
