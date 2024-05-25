import React from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { getColors } from '../../src/colors';

type Scroll = {
  children: any;
  stickyIndices?: number[];
};

export default function Scroll({ children, stickyIndices }: Scroll) {
  const scheme = useColorScheme();
  const colors = getColors(scheme);

  return (
    <ScrollView
      style={[styles.scrollView, colors.background]}
      keyboardShouldPersistTaps='handled'
      showsVerticalScrollIndicator={false}
      stickyHeaderIndices={stickyIndices}>
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
