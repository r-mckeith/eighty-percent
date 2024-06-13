import React, { useState } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { Banner, Text } from 'react-native-paper';
import {
  useDailyReviewContext,
  useDateContext,
  useGroupContext,
  useHabitContext,
  usePlanContext,
  useReviewContext,
} from '../src/contexts';
import { PlanProps } from '../src/types';
import { WeeklyReviewButton, Scroll, SectionTitle } from '../components/shared';
import { DateSelector, HabitSection, HabitSectionTitle, PlanSection } from '../components/actions';
import { DailyReview, DailyReviewButton } from '../components/reviews';

export default function Actions() {
  const [dailyReview, setDailyReview] = useState(false);

  const { selectedDate, setSelectedDate, selectedDateString, todayString, yesterdayString } = useDateContext();
  const { groups } = useGroupContext();
  const { habits } = useHabitContext();
  const { plans } = usePlanContext();
  const { reviews } = useReviewContext();
  const { dailyReviews } = useDailyReviewContext();

  const habitGroup = groups.filter(group => group.name === 'habits');
  const groupId = habitGroup && habitGroup[0]?.id;
  const planSection = filterPlans(plans, selectedDateString);
  const habitSection = habits.filter(habit => habit.section === 'habits');
  const lastWeekReview = reviews && reviews[0]?.response ? reviews[0]?.response : null;
  const yesterdayReview = dailyReviews.filter(review => review.date.toString() === yesterdayString);
  const incompleteYesterdayReview = yesterdayReview.length === 0 && selectedDateString === todayString;

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

    if (breadcrumb.length > 0) {
      breadcrumb[breadcrumb.length - 1] += ' > ';
    }

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

  function renderFocusTitle() {
    if (lastWeekReview?.improve) {
      return <SectionTitle title='Focus' />;
    }
  }

  function renderFocus() {
    if (lastWeekReview?.improve) {
      return (
        <View style={{ paddingBottom: 30 }}>
          <Text variant='bodyMedium' style={{ paddingLeft: 20 }}>
            What's your plan to improve:
          </Text>
          <Text variant='bodyMedium' style={{ paddingLeft: 20, paddingVertical: 10 }}>
            {lastWeekReview.good}
          </Text>
        </View>
      );
    }
  }

  function renderPlanSectionTitle() {
    if (plansWithBreadcrumbs.length > 0) {
      return <SectionTitle title="Today's plans" />;
    }
  }

  function renderPlanSection() {
    if (plansWithBreadcrumbs.length > 0) {
      return <PlanSection plans={plansWithBreadcrumbs} />;
    }
  }

  function handleCompleteDailyReview() {
    setDailyReview(true);
  }

  return (
    <>
      <DateSelector selectedDate={selectedDate} onDateChange={setSelectedDate} />
      <Scroll stickyIndices={[1, 3, 5]}>
        <Banner
          visible={incompleteYesterdayReview}
          actions={[
            {
              label: 'Complete',
              onPress: () => handleCompleteDailyReview(),
            },
          ]}>
          Complete yesterday's review
        </Banner>
        <View style={{ opacity: incompleteYesterdayReview ? 0.25 : 1 }}>
          <View pointerEvents={incompleteYesterdayReview ? 'none' : 'auto'}>{renderFocusTitle()}</View>
        </View>
        <View style={{ opacity: incompleteYesterdayReview ? 0.25 : 1 }}>
          <View pointerEvents={incompleteYesterdayReview ? 'none' : 'auto'}>{renderFocus()}</View>
        </View>
        <View style={{ opacity: incompleteYesterdayReview ? 0.25 : 1 }}>
          <View pointerEvents={incompleteYesterdayReview ? 'none' : 'auto'}>{renderPlanSectionTitle()}</View>
        </View>
        <View style={{ opacity: incompleteYesterdayReview ? 0.25 : 1 }}>
          <View pointerEvents={incompleteYesterdayReview ? 'none' : 'auto'}>{renderPlanSection()}</View>
        </View>
        <View style={{ opacity: incompleteYesterdayReview ? 0.25 : 1 }}>
          <View pointerEvents={incompleteYesterdayReview ? 'none' : 'auto'}>
            <HabitSectionTitle groupId={groupId} />
          </View>
        </View>
        <View style={{ opacity: incompleteYesterdayReview ? 0.25 : 1 }}>
          <View pointerEvents={incompleteYesterdayReview ? 'none' : 'auto'}>
            <HabitSection habits={habitSection} />
          </View>
        </View>
        <View style={{ paddingBottom: 30 }}>
          <DailyReviewButton habits={habitSection} plans={planSection} isYesterdayReview={incompleteYesterdayReview} />
          <WeeklyReviewButton />
        </View>

        <DailyReview
          visible={dailyReview}
          onClose={() => setDailyReview(false)}
          habits={habitSection}
          plans={planSection}
          isYesterdayReview={incompleteYesterdayReview}
        />
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
