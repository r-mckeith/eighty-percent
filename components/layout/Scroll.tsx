import React from 'react';
import { useColorScheme } from 'react-native';
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
      style={[{ paddingHorizontal: 16 }, colors.background]}
      keyboardShouldPersistTaps='handled'
      showsVerticalScrollIndicator={false}
      automaticallyAdjustKeyboardInsets={true}
      stickyHeaderIndices={stickyIndices}>
      {children}
    </ScrollView>
  );
}
