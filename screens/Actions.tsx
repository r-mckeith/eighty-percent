import React from 'react';
import { ActivityIndicator, View, StyleSheet, useColorScheme } from 'react-native';
import { useDateContext, useHabitContext, useGroupContext, usePlanContext, useTaskContext } from '../src/contexts';
import { PlanProps, TaskProps } from '../src/types/HabitTypes';
import ActionSection from '../components/actions/ActionSection';
import AddButton from '../components/shared/AddButton';
import ReviewButton from '../components/reviews/ReviewButton';
import DateSelector from '../components/actions/DateSelector';
import { Scroll, SectionTitle } from '../components/shared';
import { getColors } from '../src/colors';

export default function Habits() {
  const { selectedDate, setSelectedDate } = useDateContext();

  const { groups } = useGroupContext();
  const { habits } = useHabitContext();
  const { plans } = usePlanContext();
  const { tasks } = useTaskContext();

  const scheme = useColorScheme();
  const colors = getColors(scheme);

  const selectedDateString = selectedDate.toLocaleDateString('en-CA');
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
      <View style={colors.background}>
        <DateSelector selectedDate={selectedDate} onDateChange={setSelectedDate} />
      </View>

      <Scroll>
        <View>
          <SectionTitle title={'Plans'}>{<AddButton sectionName={'Plans'} groupId={0} type={'plan'} />}</SectionTitle>
          {/* need to filter plans after testing */}
          <ActionSection items={plans} sectionName={'Plans'} />
        </View>

        {groups.map(group => {
          const habitSection = habits.filter(habit => habit.section === group.name);

          if (group.name === 'today') {
            return;
          }

          return (
            <View key={group.id}>
              <SectionTitle title={group.name}>
                {<AddButton sectionName={group.name} groupId={group.id} type={'habit'} />}
              </SectionTitle>
              <ActionSection items={habitSection} sectionName={group.name} />
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
