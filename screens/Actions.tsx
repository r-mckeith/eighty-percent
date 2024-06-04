import React, { useState } from 'react';
import { ActivityIndicator, View, StyleSheet, useColorScheme } from 'react-native';
import {
  useDailyReviewContext,
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
import { DateSelector, HabitSection, HabitSectionTitle, PlanSection } from '../components/actions';
import { Banner, Card, Text } from 'react-native-paper';
import DailyReview from '../components/reviews/DailyReview';
import DailyReviewButton from '../components/shared/DailyReviewButton';

export default function Actions() {
  const { selectedDate, setSelectedDate } = useDateContext();
  const { groups } = useGroupContext();
  const { habits } = useHabitContext();
  const { plans } = usePlanContext();
  const { reviews } = useReviewContext();
  const { dailyReviews } = useDailyReviewContext();
  const { tasks } = useTaskContext();

  const scheme = useColorScheme();
  const colors = getColors(scheme);

  const selectedDateString = selectedDate.toLocaleDateString('en-CA');
  const habitGroup = groups.filter(group => group.name === 'habits');
  const groupId = habitGroup && habitGroup[0]?.id;
  const planSection = filterPlans(plans, selectedDateString);
  const habitSection = habits.filter(habit => habit.section === 'habits');
  const lastReview = reviews && reviews[0]?.response ? reviews[0]?.response : null;
  const lastDailyReview = dailyReviews && dailyReviews[0]?.created_at === selectedDateString;

  const [dailyReview, setDailyReview] = useState(false)
  const [dailyReviewBanner, setDailyReviewBaner] = useState(!lastDailyReview);

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

  function renderFocusTitle() {
    if (lastReview?.improve) {
      return <SectionTitle title='Focus' />;
    }
  }

  function renderFocus() {
    if (lastReview?.improve) {
      return (
        <View style={{ paddingBottom: 30 }}>
          <Card mode={'outlined'} style={colors.background}>
            <Card.Content>
              <Text variant='bodyMedium'>{lastReview.improve}</Text>
            </Card.Content>
          </Card>
        </View>
      );
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

  function handleCompleteDailyReview() {
    setDailyReviewBaner(false);
    setDailyReview(true);
  }

  function getStickyIndices() {
    if (lastReview && plansWithBreadcrumbs.length > 0) {
      return [1, 3, 5];
    } else if (lastReview && plansWithBreadcrumbs.length === 0) {
      return [1, 3];
    } else if (!lastReview && plansWithBreadcrumbs.length > 0) {
      return [1, 3];
    } else if (!lastReview && plansWithBreadcrumbs.length === 0) {
      return [1];
    }
  }

  return (
    <Scroll stickyIndices={getStickyIndices()}>
      <DateSelector selectedDate={selectedDate} onDateChange={setSelectedDate} />
      <Banner
        visible={dailyReviewBanner}
        actions={[
          {
            label: 'Complete',
            onPress: () => handleCompleteDailyReview(),
          },
          {
            label: 'Skip',
            onPress: () => setDailyReviewBaner(false),
          },
        ]}>
        Complete yesterday's review
      </Banner>
      <View style={{ opacity: dailyReviewBanner ? 0.25 : 1 }}>
        <View pointerEvents={dailyReviewBanner ? 'none' : 'auto'}>
          {renderFocusTitle()}
          {renderFocus()}
          {renderPlanSectionTitle()}
          {renderPlanSection()}
          <HabitSectionTitle groupId={groupId} />
          <HabitSection habits={habitSection} />
          <DailyReviewButton habits={habitSection} plans={planSection} />
          <WeeklyReviewButton />
        </View>
      </View>
      <DailyReview visible={dailyReview} onClose={() => setDailyReview(false)} habits={habitSection} plans={planSection}/>
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
