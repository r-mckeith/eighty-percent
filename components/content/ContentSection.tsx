import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import Content from "./Content";
import HowToUse from "./HowToUse";

const videos = ["How to use the app", "Habits", "Projects"];
const templates = ['Set up app', 'Start a business', 'Buy a house']
const lockedSections = ["Get in shape", "Start a business"];

export default function ContentSection() {
  const [selected, setSelected] = useState<string | null>(null);

  function handlePressBack() {
    setSelected(null)
  }

  if (selected === null)
    return (
      <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="handled">
        <View style={styles.sectionsContainer}>
          <View style={styles.sectionName}>
            <Text style={styles.sectionTitle}>Videos</Text>
          </View>
          <View style={styles.section}>
            <View style={styles.habitContainer}>
              {videos.map((section, index) => (
                <Content key={index} name={section} setSelected={setSelected} />
              ))}
            </View>
          </View>
          <View style={styles.sectionName}>
            <Text style={styles.sectionTitle}>Templates</Text>
          </View>
          <View style={styles.section}>
            <View style={styles.habitContainer}>
              {templates.map((section, index) => (
                <Content key={index} name={section} setSelected={setSelected} />
              ))}
            </View>
          </View>
          <View style={styles.sectionName}>
            <Text style={styles.sectionTitle}>Available</Text>
          </View>
          <View style={styles.section}>
            <View style={styles.habitContainer}>
              {lockedSections.map((section, index) => (
                <Content key={index} name={section} isLocked={true} setSelected={setSelected} />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    );

    if (selected === 'How to use the app') 
    return (
      <HowToUse handlePressBack={handlePressBack}/>
    )
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 40,
  },
  sectionsContainer: {
    padding: 16,
  },
  sectionName: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  sectionTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
    textTransform: "capitalize",
  },
  section: {
    flexShrink: 1,
    flexGrow: 1,
    borderRadius: 10,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: "#333333",
    backgroundColor: "#1c1c1e",
    marginBottom: 20,
  },
  habitContainer: {
    flexDirection: "column",
    alignSelf: "stretch",
  },
});
