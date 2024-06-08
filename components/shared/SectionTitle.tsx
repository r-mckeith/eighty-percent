import React from 'react';
import { View, StyleSheet, useColorScheme } from 'react-native';
import { getColors } from '../../src/colors';
import { Text } from 'react-native-paper';

type SectionTitle = {
  title: string;
  children?: any;
};

export default function SectionTitle({ title, children }: SectionTitle) {
  const scheme = useColorScheme();
  const colors = getColors(scheme);

  return (
    <View style={[colors.background, {paddingVertical: 5}]}>
      <View style={styles.sectionName}>
        <Text variant='headlineSmall'>
          {title}
        </Text>
        <View style={styles.children}>{children}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionName: {
    flexDirection: 'row',
    marginBottom: 5,
    paddingBottom: 10,
    alignItems: 'center',
  },
  children: {
    paddingRight: 5,
  },
});
