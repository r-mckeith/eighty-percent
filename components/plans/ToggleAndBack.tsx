import React from 'react';
import { View, StyleSheet, useColorScheme } from 'react-native';
import { Icon, Toggle } from '../shared';
import { getColors } from '../../src/colors';

type ToggleAndBack = {
  onPressBack: () => void;
  onToggle: any;
  showCompleted: boolean;
};

export default function ToggleAndBack({ onPressBack, onToggle, showCompleted }: ToggleAndBack) {
  const scheme = useColorScheme();
  const colors = getColors(scheme);

  return (
    <View style={[styles.toggleAndBackContainer, colors.background]}>
      <Icon name='chevron-left' size={30} opacity={0.2} onPress={onPressBack} />
      <Toggle onToggle={onToggle} value={showCompleted} label={'Show completed'} />
    </View>
  );
}

const styles = StyleSheet.create({
  toggleAndBackContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    paddingTop: 20,
  },
});
