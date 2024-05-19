import React, { useState } from "react";
import { TextInput, StyleSheet, useColorScheme } from "react-native";
import { getColors } from "../../src/colors";

type Input = {
  placeholder: string;
  value: string;
  autoFocus: boolean;
  handleChangeText: (arg0: string) => void;
  multiline?: boolean;
  numberOfLines?: number;
};

export default function Input({ placeholder, value, autoFocus, handleChangeText, multiline, numberOfLines }: Input) {
  const scheme = useColorScheme();
  const colors = getColors(scheme);
  return (
      <TextInput
        style={[styles.textInput, colors.background, colors.border]}
        placeholder={placeholder}
        placeholderTextColor={colors.text.color}
        value={value}
        onChangeText={(text) => handleChangeText(text)}
        autoFocus={autoFocus}
        returnKeyType="done"
        multiline={multiline}
        numberOfLines={numberOfLines}
      />
  );
}

const styles = StyleSheet.create({
  textInput: {
    marginTop: 30,
    paddingLeft: 10,
    paddingBottom: 5,
    alignSelf: "stretch",
    height: 30,
    borderRadius: 10,
    borderBottomWidth: 1,
  },
});
