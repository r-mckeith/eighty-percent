import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { RowText } from "../shared";

type TextBox = {
  value: string;
  question: string;
  category: string;
  handleChange: (key: string, e: string) => void;
};

export default function TextBox({ value, question, category, handleChange }: TextBox) {
  return (
    <View style={styles.reviewContainer}>
      <RowText text={question} style={{marginLeft: 10}} />
      <TextInput
        style={styles.textInput}
        placeholderTextColor="white"
        value={value}
        onChangeText={(e) => handleChange(category, e)}
        autoFocus={true}
        returnKeyType="done"
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
    alignSelf: "stretch",
    height: 30,
    color: "white",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#bbb",
    paddingHorizontal: 15,
    paddingVertical: 15,
    width: "90%",
    marginLeft: 10
  },
});
