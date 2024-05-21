import React from 'react';
import { Text, StyleSheet, useColorScheme } from 'react-native';
import { getColors } from '../../src/colors';

type RowText = {
  text: string;
  style?: any;
  fontSize?: number;
  disabled?: boolean;
  completed?: boolean;
  flex?: number;
  maxLength?: number;
};

export function truncateText(text: string, maxLength: number) {
  const lastSpaceIndex = text.lastIndexOf(' ', maxLength);
  if (lastSpaceIndex === -1) {
    return `${text.substring(0, maxLength)}...`;
  }
  return `${text.substring(0, lastSpaceIndex)}...`;
}

export default function RowText({ text, style, fontSize = 16, disabled, completed, flex, maxLength }: RowText) {
  const scheme = useColorScheme();
  const colors = getColors(scheme);

  const textColor = disabled ? colors.disabledText : colors.text;
  const completedText = completed ? styles.completed : {};

  const truncatedText = maxLength && text.length > maxLength ? truncateText(text, maxLength) : text;

  return (
    <Text
      style={[
        styles.text,
        textColor,
        completedText,
        { fontSize: fontSize },
        { flex: flex ? flex : null },
        style ? style : null,
      ]}>
      {truncatedText}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
  },
  completed: {
    textDecorationLine: 'line-through',
  },
});
