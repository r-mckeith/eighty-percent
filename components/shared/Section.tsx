import React from 'react';
import { View, StyleSheet, useColorScheme } from 'react-native';
import { getColors } from '../../src/colors';
import SectionTitle from './SectionTitle';
import AddButton from './AddButton';

type Section = {
  title?: string;
  children: any;
  style?: any;
};

export default function Section({ title, children, style }: Section) {
  const scheme = useColorScheme();
  const colors = getColors(scheme);

  return (
    <>
      {title && <SectionTitle title={title} />}
      <View style={[styles.section, colors.border, style]}>{children}</View>
    </>
  );
}

const styles = StyleSheet.create({
  section: {
    marginVertical: 10,
    marginBottom: 20,
  },
});
