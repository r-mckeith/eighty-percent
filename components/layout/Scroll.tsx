import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Switch, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";


export default function Scroll({ children }: any) {
  return (
    <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="handled">
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#000",
    padding: 16,
  },
});
