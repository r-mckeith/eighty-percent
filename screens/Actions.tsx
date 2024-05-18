import React from 'react';
import { ActivityIndicator, View, StyleSheet, useColorScheme } from 'react-native';
import { useDateContext, useHabitContext, useGroupContext, useTaskContext } from '../src/contexts';
import { TaskProps } from '../src/types/HabitTypes';
import ActionSection from '../components/actions/ActionSection';
import AddButton from '../components/shared/AddButton';
import ReviewButton from '../components/reviews/ReviewButton';
import DateSelector from '../components/actions/DateSelector';
import { Scroll, SectionTitle } from '../components/shared';
import { getColors } from '../src/colors';

export default function Habits() {
  const { selectedDate, setSelectedDate } = useDateContext();

  const { habits } = useHabitContext();
  const { groups } = useGroupContext();
  const { tasks } = useTaskContext();

  const scheme = useColorScheme();
  const colors = getColors(scheme);

  console.log(tasks);

  const selectedDateString = selectedDate.toLocaleDateString('en-CA');
  const filteredTasks = filterTasks(tasks, selectedDateString);

  function filterTasks(tasks: TaskProps[], selectedDateString: string) {
    return tasks.filter(task => {
      const isInScopeForTodayOrFuture =
        task.inScopeDay === selectedDateString || (task.inScopeDay && task.inScopeDay < selectedDateString);
      const isIncompleteOrCompletedAfter = !task.completed || (task.completed && task.completed >= selectedDateString);
      return isInScopeForTodayOrFuture && isIncompleteOrCompletedAfter;
    });
  }

  if (groups.length === 0) {
    return (
      <View style={[styles.activityContainer, styles.activityHorizontal]}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  return (
    <>
      <View style={colors.background}>
        <DateSelector selectedDate={selectedDate} onDateChange={setSelectedDate} />
      </View>

      <Scroll>
        {groups.map(group => {
          const habitSection = habits.filter(habit => habit.section === group.name);

          return (
            <View key={group.id}>
              <SectionTitle title={group.name === 'today' ? 'plans' : group.name}>
                {group.name !== 'today' && <AddButton sectionName={group.name} groupId={group.id} type={'habit'} />}
              </SectionTitle>
              <ActionSection habits={habitSection} sectionName={group.name} groupId={group.id} />
            </View>
          );
        })}

        <AddButton type={'group'} />
      </Scroll>
      <ReviewButton />
    </>
  );
}

const styles = StyleSheet.create({
  activityContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  activityHorizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
