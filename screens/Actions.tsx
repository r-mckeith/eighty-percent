import React from 'react';
import { ActivityIndicator, View, StyleSheet, useColorScheme } from 'react-native';
import { useDateContext, useHabitContext, useGroupContext, usePlanContext, useTaskContext } from '../src/contexts';
import { HabitProps, PlanProps, TaskProps } from '../src/types/HabitTypes';
import AddButton from '../components/shared/AddButton';
import ReviewButton from '../components/reviews/ReviewButton';
import DateSelector from '../components/actions/DateSelector';
import { Scroll } from '../components/shared';
import { getColors } from '../src/colors';
import PlanSection from '../components/actions/PlanSection';
import HabitSection from '../components/actions/HabitSection';

export default function Habits() {
  const { selectedDate, setSelectedDate } = useDateContext();

  const { groups } = useGroupContext();
  const { habits } = useHabitContext();
  const { plans } = usePlanContext();
  const { tasks } = useTaskContext();

  const scheme = useColorScheme();
  const colors = getColors(scheme);

  const selectedDateString = selectedDate.toLocaleDateString('en-CA');

  // will be implemented after plans tab is updated to use plans table
  const planSection = filterPlans(plans, selectedDateString);

  function filterPlans(plans: any, selectedDateString: string) {
    return plans.filter((plan: any) => {
      const isInScopeForTodayOrFuture =
        plan.inScopeDay === selectedDateString || (plan.inScopeDay && plan.inScopeDay < selectedDateString);
      const isIncompleteOrCompletedAfter = !plan.completed || (plan.completed && plan.completed >= selectedDateString);
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
      <Scroll>
        <View style={colors.background}>
          <DateSelector selectedDate={selectedDate} onDateChange={setSelectedDate} />
        </View>

        <PlanSection plans={planSection} />

        {groups.map(group => {
          const habitSection = habits.filter(habit => habit.section === group.name);

          // until old projects are removed from habits in the db
          if (group.name === 'today') {
            return;
          }

          return <HabitSection habits={habitSection} sectionName={group.name} groupId={group.id} />;
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