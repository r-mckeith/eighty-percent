import React from "react";
import { ActivityIndicator, View, StyleSheet, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { format } from 'date-fns';
import { useHabitContext } from "../src/contexts/habits/UseHabitContext";
import { useDateContext } from "../src/contexts/date/useDateContext";
import { useGroupContext } from "../src/contexts/groups/UseGroupContext";
import { HabitProps } from "../src/types/HabitTypes";
import HabitSection from "../components/habits/HabitSection";
import AddButton from "../components/shared/AddButton";
import DateSelector from "../components/habits/DateSelector";
import ReviewButton from "../components/shared/ReviewButton";

export default function Habits() {
  const { selectedDate, selectedDateString, setSelectedDate, setSelectedDateString } = useDateContext();
  const { habits } = useHabitContext();
  const { groups } = useGroupContext();

  function filterHabits(
    groupName: string,
    groupHabits: HabitProps[],
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

  function handleChangeDate(date: Date) {
    setSelectedDate(date)
    setSelectedDateString(format(date, 'yyyy-MM-dd'))
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
            );

            if (filteredHabits) {
              return (
                <View key={group.id}>
                  {group.name === "today" && (
                    <View style={styles.datePicker}>
                      <DateSelector
                        selectedDate={selectedDate}
                        onDateChange={handleChangeDate}
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
            type={'review'}
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
    marginBottom: 5,
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
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  addButton: {
    alignSelf: "flex-end",
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
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
  },
});
