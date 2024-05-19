import React from 'react';
import { View, TextInput, StyleSheet, useColorScheme } from 'react-native';
import { RowText } from '../shared';
import { getColors } from '../../src/colors';

type TextBox = {
  value: string;
  question: string;
  category: string;
  handleChange: (key: string, e: string) => void;
};

export default function TextBox({ value, question, category, handleChange }: TextBox) {
  const scheme = useColorScheme();
  const colors = getColors(scheme);

  return (
    <View style={styles.reviewContainer}>
      <RowText text={question} style={{ marginLeft: 10, marginBottom: 10 }} />
      <TextInput
        style={[styles.textInput, colors.text, colors.border]}
        placeholderTextColor='white'
        value={value}
        onChangeText={e => handleChange(category, e)}
        autoFocus={false}
        returnKeyType='done'
        multiline={true}
        numberOfLines={4}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  reviewContainer: {
    marginTop: 30,
  },
  textInput: {
    paddingLeft: 10,
    alignSelf: "stretch",
    height: 30,
    borderRadius: 10,
    borderBottomWidth: 1,
  },
});
