import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { useHabitContext } from "../src/contexts/habits/UseHabitContext";
import { useDateContext } from "../src/contexts/date/useDateContext";
import { useGroupContext } from "../src/contexts/groups/UseGroupContext";
import { HabitProps } from "../src/types/HabitTypes";
import HabitSection from "../components/habits/HabitSection";
import AddButton from "../components/shared/AddButton";
import ReviewButton from "../components/reviews/ReviewButton";
import DateSelector from "../components/habits/DateSelector";
import { Scroll } from "../components/layout";

export default function Habits() {
  const { selectedDate, setSelectedDate } = useDateContext();

  const { habits } = useHabitContext();
  const { groups } = useGroupContext();

  const selectedDateString = selectedDate.toLocaleDateString("en-CA");

  function filterHabits(groupName: string, groupHabits: HabitProps[], selectedDateString: string) {
    if (groupName.toLowerCase() === "today") {
      return groupHabits.filter((tag) => {
        const isInScopeForTodayOrFuture =
          tag.inScopeDay === selectedDateString ||
          (tag.inScopeDay && tag.inScopeDay < selectedDateString);
        const isUncompletedOrCompletedAfter =
          !tag.completed || (tag.completed && tag.completed >= selectedDateString);
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
      <Scroll>
        {groups.map((group) => {
          const groupTags = habits.filter((habit) => habit.section === group.name);
          const filteredHabits = filterHabits(group.name, groupTags, selectedDateString);

          if (filteredHabits) {
            return (
              <View key={group.id}>
                {group.name === "today" && (
                  <DateSelector selectedDate={selectedDate} onDateChange={setSelectedDate} />
                )}
                <HabitSection habits={filteredHabits} sectionName={group.name} groupId={group.id} />
              </View>
            );
          }

          return null;
        })}

        <AddButton
            type={'group'}
          />
      </Scroll>
      <ReviewButton />
    </>
  );
}

const styles = StyleSheet.create({
  activityContainer: {
    flex: 1,
    justifyContent: "center",
  },
  activityHorizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
