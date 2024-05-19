import React from 'react';
import { View, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { getColors } from '../../src/colors';

type Row = {
  children: any;
  style?: any;
  opacity: number;
  disabled?: boolean;
  selected?: boolean;
  first?: boolean;
  last?: boolean;
  onPress?: () => void;
};

export default function Row({ children, style, opacity, disabled, selected, first, last, onPress }: Row) {
  const scheme = useColorScheme();
  const colors = getColors(scheme);

  const rowColor = disabled ? colors.disabledRow : selected ? colors.selectedRow : colors.row;
  const borderRadius = first && last ? [styles.first, styles.last] : first ? styles.first : last ? styles.last : {};
  const bottomBorderWidth = { borderBottomWidth: last ? 1 : 0 };

  return (
    <View style={style ? style : {}}>
      <TouchableOpacity
        activeOpacity={opacity}
        style={[styles.row, rowColor, { borderBottomWidth: 1}, colors.border]}
        onPress={onPress}>
        {children}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 0,
    // borderTopWidth: 1,
    // borderLeftWidth: 1,
    // borderRightWidth: 1,
    alignSelf: 'stretch',
  },
  first: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  last: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});
