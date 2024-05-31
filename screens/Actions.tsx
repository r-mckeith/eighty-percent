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
import { PlanProps } from '../src/types/shared';
import { WeeklyReviewButton } from '../components/shared';
import { Scroll, SectionTitle } from '../components/layout';
import { DateSelector, Focus, HabitSection, PlanSection } from '../components/actions';
import StatsHeader from '../components/actions/StatsHeader';

export default function Actions() {
  const { selectedDate, setSelectedDate } = useDateContext();

  const { groups } = useGroupContext();
  const { habits } = useHabitContext();
  const { plans } = usePlanContext();
  const { reviews } = useReviewContext();
  const { tasks } = useTaskContext();

  const scheme = useColorScheme();
  const colors = getColors(scheme);

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

  function getBreadcrumbTrail(plan: PlanProps, planMap: { [key: string]: PlanProps }) {
    let breadcrumb = [];
    let currentPlan: PlanProps | undefined = plan;

    while (currentPlan) {
      breadcrumb.unshift(currentPlan.name);
      currentPlan = currentPlan.parentId ? planMap[currentPlan.parentId] : undefined;
    }

    breadcrumb.pop();

    return breadcrumb.length > 0 ? breadcrumb.join(' > ') : null;
  }

  const planMap = plans.reduce((acc: { [key: string]: PlanProps }, plan: PlanProps) => {
    acc[plan.id] = plan;
    return acc;
  }, {});

  const plansWithBreadcrumbs = planSection.map((plan: PlanProps) => ({
    ...plan,
    breadcrumb: getBreadcrumbTrail(plan, planMap),
  }));

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
    if (plansWithBreadcrumbs.length > 0) {
      return <SectionTitle title='Plans' />;
    }
  }

  function renderPlanSection() {
    if (plansWithBreadcrumbs.length > 0) {
      return <PlanSection plans={plansWithBreadcrumbs} />;
    }
  }

  function getStickyIndices() {
    if (lastReview && plansWithBreadcrumbs.length > 0) {
      return [1, 3];
    } else if (lastReview && plansWithBreadcrumbs.length === 0) {
      return [1];
    } else if (!lastReview && plansWithBreadcrumbs.length > 0) {
      return [0, 2];
    } else if (!lastReview && plansWithBreadcrumbs.length === 0) {
      return [0];
    }
  }

  return (
    <>

      <View style={colors.background}>
        <DateSelector selectedDate={selectedDate} onDateChange={setSelectedDate} />
      </View>
      <Scroll stickyIndices={getStickyIndices()}>
        {renderFocus()}
        {renderPlanSectionTitle()}
        {renderPlanSection()}
        <StatsHeader />
        <HabitSection habits={habitSection} sectionName='habits' groupId={groupId} />
        <WeeklyReviewButton />
      </Scroll>
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
