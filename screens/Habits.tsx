import React, { useState } from "react";
import { ActivityIndicator, View, StyleSheet, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useHabitContext } from "../src/contexts/habits/UseHabitContext";
import { useDateContext } from "../src/contexts/date/useDateContext";
import { useGroupContext } from "../src/contexts/groups/UseGroupContext";
import { HabitProps } from "../src/types/HabitTypes";
import HabitSection from "../components/habits/HabitSection";
import AddButton from "../components/shared/AddButton";
import ReviewButton from "../components/shared/ReviewButton";
import DateSelector from "../components/habits/DateSelector";

export default function Habits() {
  const { selectedDate, setSelectedDate } = useDateContext();

  const { habits } = useHabitContext();
  const { groups } = useGroupContext();

  const selectedDateString = selectedDate.toLocaleDateString("en-CA");

  function filterHabits(
    groupName: string,
    groupHabits: HabitProps[],
    selectedDateString: string
  ) {
    if (groupName.toLowerCase() === "today") {
      return groupHabits.filter((tag) => {
        const isInScopeForTodayOrFuture =
          tag.inScopeDay === selectedDateString ||
          (tag.inScopeDay && tag.inScopeDay < selectedDateString);
        const isUncompletedOrCompletedAfter =
          !tag.completed ||
          (tag.completed && tag.completed >= selectedDateString);
        return isInScopeForTodayOrFuture && isUncompletedOrCompletedAfter;
      });
    }
    return groupHabits;
  }

  if (groups.length === 0) {
    return (
      <View style={[styles.activityContainer, styles.activityHorizontal]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="handled">
        <View style={styles.sectionsContainer}>
          {groups.map((group) => {
            const groupTags = habits.filter(
              (habit) => habit.section === group.name
            );
            const filteredHabits = filterHabits(
              group.name,
              groupTags,
              selectedDateString
            );

            if (filteredHabits) {
              return (
                <View key={group.id}>
                  {group.name === "today" && (
                    <View style={styles.datePicker}>
                      <DateSelector
                        selectedDate={selectedDate}
                        onDateChange={setSelectedDate}
                      />
                    </View>
                  )}
                  <View style={styles.sectionName}>
                    <Text style={styles.sectionTitle}>
                      {group.name === "today" ? "projects" : group.name}
                    </Text>
                    <View style={styles.addButton}>
                      {group.name !== "today" && (
                        <AddButton sectionName={group.name} groupId={group.id} type={'habit'} />
                      )}
                    </View>
                  </View>
                  <HabitSection habits={filteredHabits} sectionName={group.name} />
                </View>
              );
            }

            return null;
          })}

          {/* <AddButton
            type={'group'}
          /> */}
        </View>
      </ScrollView>
      <ReviewButton />
    </>
  );
}

const styles = StyleSheet.create({
  datePicker: {
    alignSelf: "flex-end",
    marginRight: 4,
    marginBottom: 15,
  },
  activityContainer: {
    flex: 1,
    justifyContent: "center",
  },
  activityHorizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  sectionName: {
    flexDirection: "row",
    marginBottom: 5,
  },
  addButton: {
    paddingRight: 5
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#000",
  },
  sectionsContainer: {
    padding: 16,
  },
  sectionTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
    textTransform: "capitalize",
  },
  editableSection: {
    padding: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
  },
});
