import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

type TextBox = {
  value: string;
  question: string;
  category: string;
  handleChange: (key: string, e: string) => void;
};

export default function TextBox({ value, question, category, handleChange }: TextBox) {
  return (
    <View style={styles.reviewContainer}>
      <Text style={styles.buttonText}>{question}</Text>
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
  buttonText: {
    fontWeight: "bold",
    color: "white",
  },
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
    width: "100%",
  },
});
