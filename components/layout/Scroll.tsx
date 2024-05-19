import React from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { getColors } from '../../src/colors';

export default function Scroll({ children }: any) {
  console.log(children)
  const scheme = useColorScheme();
  const colors = getColors(scheme);

  return (
    <ScrollView style={[styles.scrollView, colors.background]} keyboardShouldPersistTaps='handled'>
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    padding: 16,
  },
});
