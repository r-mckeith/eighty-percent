import React from 'react';
import { View, StyleSheet, useColorScheme } from 'react-native';
import { getColors } from '../../src/colors';
import { Divider, Text } from 'react-native-paper';

type SectionTitle = {
  title: string;
  children?: any;
};

export default function SectionTitle({ title, children }: SectionTitle) {
  const scheme = useColorScheme();
  const colors = getColors(scheme);

  return (
    <View style={colors.background}>
      <View style={[styles.sectionName, colors.background]}>
        <Text variant='headlineMedium' style={{color: '#0E5FFF'}}>
          {title}
        </Text>
        <View style={styles.children}>{children}</View>
      </View>
      <Divider bold={true} style={colors.background} />
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
