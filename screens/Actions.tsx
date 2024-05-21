import React from 'react';
import { ActivityIndicator, View, StyleSheet, useColorScheme } from 'react-native';
import {
  useDateContext,
  useGroupContext,
  useHabitContext,
  usePlanContext,
  useReviewContext,
  useTaskContext,
} from '../src/contexts';
import { getColors } from '../src/colors';
import { ReviewButton, AddButton } from '../components/shared';
import { Scroll, SectionTitle } from '../components/layout';
import { DateSelector, Focus, HabitSection, PlanSection, ReviewButtonRow } from '../components/actions';

export default function Habits() {
  const { selectedDate, setSelectedDate } = useDateContext();

  const { groups } = useGroupContext();
  const { habits } = useHabitContext();
  const { plans } = usePlanContext();
  const { reviews } = useReviewContext();
  const { tasks } = useTaskContext();

  const scheme = useColorScheme();
  const colors = getColors(scheme);

  const weeklyReview = true;

  const selectedDateString = selectedDate.toLocaleDateString('en-CA');
  const habitGroup = groups.filter(group => group.name === 'habits');
  const groupId = habitGroup && habitGroup[0]?.id;
  const planSection = filterPlans(plans, selectedDateString);
  const habitSection = habits.filter(habit => habit.section === 'habits');
  const lastReview = reviews && reviews[0]?.response ? reviews[0]?.response : null;


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

  function renderFocus() {
    if (lastReview) {
      return <Focus review={lastReview.improve} />;
    }
  }

  function renderPlanSectionTitle() {
    if (planSection.length > 0) {
      return <SectionTitle title={planSection.length > 0 || weeklyReview ? 'Plans' : ''} />;
    }
  }

  function renderPlanSection() {
    if (planSection.length > 0) {
      return (
        <PlanSection plans={planSection} hasReview={weeklyReview}>
          <ReviewButtonRow first={planSection.length === 0 ? true : false} />
        </PlanSection>
      );
    }
  }

  function getStickyIndices() {
    if (lastReview && planSection.length > 0) {
      return [2, 4];
    } else if (lastReview && planSection.length === 0) {
      return [2];
    } else if (!lastReview && planSection.length > 0) {
      return [1, 3];
    } else if (!lastReview && planSection.length === 0) {
      return [1];
    }
  }

  return (
    <Scroll stickyIndices={getStickyIndices()}>
      <View style={colors.background}>
        <DateSelector selectedDate={selectedDate} onDateChange={setSelectedDate} />
      </View>
      {renderFocus()}
      {renderPlanSectionTitle()}
      {renderPlanSection()}

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
