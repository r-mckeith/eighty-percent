import React, { useState } from "react";
import { TextInput, StyleSheet, useColorScheme } from "react-native";
import { getColors } from "../../src/colors";

type Input = {
  placeholder: string;
  value: string;
  autoFocus: boolean;
  handleChangeText: (arg0: string) => void;
  onSave: () => void;
};

export default function Input({ placeholder, value, autoFocus, handleChangeText, onSave }: Input) {
  const scheme = useColorScheme();
  const colors = getColors(scheme);
  return (
      <TextInput
        style={[styles.textInput, colors.background, colors.border, colors.text]}
        placeholder={placeholder}
        placeholderTextColor={colors.text.color}
        value={value}
        onChangeText={(text) => handleChangeText(text)}
        autoFocus={autoFocus}
        returnKeyType="done"
        onSubmitEditing={onSave}
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
