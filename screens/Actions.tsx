import React from 'react';
import { ActivityIndicator, View, StyleSheet, useColorScheme } from 'react-native';
import { useDateContext, useHabitContext, useGroupContext, usePlanContext, useTaskContext } from '../src/contexts';
import { getColors } from '../src/colors';
import { ReviewButton, AddButton } from '../components/shared';
import { Scroll, SectionTitle } from '../components/layout';
import { Focus } from '../components/reviews';
import { DateSelector, HabitSection, PlanSection } from '../components/actions';

export default function Habits() {
  const { selectedDate, setSelectedDate } = useDateContext();

  const { groups } = useGroupContext();
  const { habits } = useHabitContext();
  const { plans } = usePlanContext();
  const { tasks } = useTaskContext();

  const scheme = useColorScheme();
  const colors = getColors(scheme);

  const selectedDateString = selectedDate.toLocaleDateString('en-CA');
  const habitGroup = groups.filter(group => group.name === 'habits');
  const groupId = habitGroup && habitGroup[0]?.id;
  const planSection = filterPlans(plans, selectedDateString);
  const habitSection = habits.filter(habit => habit.section === 'habits');
  const stickyIndices = planSection.length > 0 ? [2, 4] : [3];

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
    <Scroll stickyIndices={stickyIndices}>
      <View style={colors.background}>
        <DateSelector selectedDate={selectedDate} onDateChange={setSelectedDate} />
      </View>
      <Focus />
      <SectionTitle title={planSection.length > 0 ? 'Plans' : ''} />
      {planSection.length > 0 && <PlanSection plans={planSection} />}

      <SectionTitle title={'Habits'}>
        {<AddButton sectionName={'habits'} type={'habit'} groupId={groupId} />}
      </SectionTitle>
      <HabitSection habits={habitSection} sectionName={'habits'} groupId={groupId} />
      <ReviewButton />
    </Scroll>
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
