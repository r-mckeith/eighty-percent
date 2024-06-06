import React, { useState, useEffect } from 'react';
import { useColorScheme, View } from 'react-native';
import { addDailyReview } from '../../src/api/DailyReviews';
import { useDateContext, useDailyReviewContext, usePlanContext, useHabitDataContext } from '../../src/contexts';
import { markPlanAsComplete } from '../../src/api/Plans';
import { SectionTitle } from '../layout';
import { Modal } from '../shared';
import { useDailyHabitData } from '../../src/hooks/dailyHabitData';
import { TextInput, Button, Card, List, Divider, IconButton, MD3Colors, Text } from 'react-native-paper';
import { HabitProps, PlanProps } from '../../src/types';
import { getColors } from '../../src/colors';
import { editHabitData } from '../../src/api/Habits';

type DailyReview = {
  habits: HabitProps[];
  plans: PlanProps[];
  visible: boolean;
  isYesterdayReview: boolean;
  onClose: () => void;
};

export default function DailyReview({ habits, plans, visible, isYesterdayReview, onClose }: DailyReview) {
  const [answer, setAnswer] = useState({ answer: '' });
  const [habitCounts, setHabitCounts] = useState<any>({});
  const [changedHabits, setChangedHabits] = useState({});

  const { dailyReviews, dispatch } = useDailyReviewContext();
  const { selectedDate, yesterday} = useDateContext();
  const reviewDate = isYesterdayReview ? yesterday : selectedDate;
  const { dailyHabitData } = useDailyHabitData();
  const { dispatch: planDispatch } = usePlanContext();
  // still have to dispatch habit data updates
  const { dispatch: habitDataDispatch } = useHabitDataContext();

  const scheme = useColorScheme();
  const colors = getColors(scheme);

  const lastReview = dailyReviews && dailyReviews[0]?.response;
  const isAnswered = answer.answer !== '' || Object.keys(changedHabits).length > 0;
  const completedPlans = plans.filter(plan => plan.completed);
  const incompletePlans = plans.filter(plan => !plan.completed);

  const habitsWithData = habits.map(habit => ({
    ...habit,
    habitData: dailyHabitData.find((data: any) => data.tag_id === habit.id),
  }));

  const sortedHabits = habitsWithData.sort((a, b) => {
    const weekA = a.habitData ? a.habitData.day : 0;
    const weekB = b.habitData ? b.habitData.day : 0;
    return weekB - weekA;
  });

  useEffect(() => {
    if (habitsWithData.length === 0) return;

    const updatedHabitCounts: any = {};
    habitsWithData.forEach(habit => {
      updatedHabitCounts[habit.id] = habit.habitData
        ? { day: habit.habitData.day, yesterday: habit.habitData.yesterday }
        : {};
    });
    setHabitCounts(updatedHabitCounts);
  }, [dailyHabitData]);

  function handleIncrement(habitId: number) {
    setHabitCounts((prevCounts: any) => ({
      ...prevCounts,
      [habitId]: {
        ...prevCounts[habitId],
        [isYesterdayReview ? 'yesterday' : 'day']:
          (prevCounts[habitId]?.[isYesterdayReview ? 'yesterday' : 'day'] || 0) + 1,
      },
    }));
    setChangedHabits(prevChanges => ({
      ...prevChanges,
      [habitId]: true,
    }));
  }

  function handleDecrement(habitId: number) {
    setHabitCounts((prevCounts: any) => ({
      ...prevCounts,
      [habitId]: {
        ...prevCounts[habitId],
        [isYesterdayReview ? 'yesterday' : 'day']: Math.max(
          0,
          (prevCounts[habitId]?.[isYesterdayReview ? 'yesterday' : 'day'] || 0) - 1
        ),
      },
    }));

    setChangedHabits(prevChanges => ({
      ...prevChanges,
      [habitId]: true,
    }));
  }

  async function handleUpdate() {
    const updates = Object.keys(changedHabits).map(async habitId => {
      const habit = habitsWithData.find(habit => habit.id === Number(habitId));
      const updatedCount = habitCounts[habitId]?.[isYesterdayReview ? 'yesterday' : 'day'];
      if (habit) {
        try {
          await editHabitData(habit, reviewDate, updatedCount);
        } catch (error) {
          console.error(`Failed to update habit with ID ${habitId}`, error);
        }
      }
    });

    try {
      await Promise.all(updates);
      setChangedHabits({});
    } catch (error) {
      console.error('Failed to update some habits', error);
    }
  }

  async function handleSaveReview(): Promise<void> {
    onClose();
    handleUpdate();
    const dateString = reviewDate.toISOString().split('T')[0];

    if (answer) {
      try {
        const newReview = await addDailyReview(answer.answer, dateString);
        dispatch({ type: 'ADD_REVIEW', payload: newReview, date: dateString });
        setAnswer({ answer: '' });
        onClose();
      } catch (error) {
        console.error('Failed to add review:', error);
      }
    }
  }

  function handleCancel() {
    onClose();
  }

  async function handleToggleCompleted(plan: PlanProps) {
    planDispatch({ type: 'TOGGLE_COMPLETED', id: plan.id, selectedDate: reviewDate });
    try {
      const updatedPlan = await markPlanAsComplete(plan.id, reviewDate);

      if (updatedPlan) {
      } else {
        console.error('Failed to toggle complete');
      }
    } catch (error) {
      console.error('Failed to toggle complete', error);
    }
  }

  const handleChange = (key: string, value: string) => {
    setAnswer(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <Modal
      visible={visible}
      onClose={handleCancel}
      onSave={handleSaveReview}
      disabled={!isAnswered}
      stickyIndices={[0, 2, 4, 6]}>
      {lastReview && <SectionTitle title='Last review' />}
      {lastReview && (
        <Card mode='outlined' style={[colors.background, { paddingBottom: 30 }]}>
          <Card.Content style={{ paddingBottom: 10 }}>
            <Text variant='bodyMedium' style={{ paddingBottom: 10 }}>
              {lastReview}
            </Text>
          </Card.Content>
        </Card>
      )}

      {completedPlans.length > 0 && <SectionTitle title='Completed plans' />}
      {completedPlans.length > 0 && (
        <Card mode='outlined' style={[colors.background, { paddingBottom: 30 }]}>
          {completedPlans.map((plan, index) => {
            return (
              <View key={index}>
                <List.Item title={plan.name} style={{ paddingVertical: 15 }} />
                <Divider />
              </View>
            );
          })}
        </Card>
      )}

      {incompletePlans.length > 0 && <SectionTitle title='Incomplete plans' />}
      {incompletePlans.length > 0 && (
        <Card mode='outlined' style={[colors.background, { paddingBottom: 30 }]}>
          {incompletePlans.map((plan, index) => {
            return (
              <View key={index}>
                <List.Item
                  titleStyle={{ textAlign: 'center' }}
                  title={plan.name}
                  left={props => (
                    <IconButton
                      {...props}
                      style={{ paddingLeft: 20 }}
                      icon='check'
                      iconColor={MD3Colors.primary40}
                      size={20}
                      onPress={() => handleToggleCompleted(plan)}
                    />
                  )}
                  right={props => (
                    <IconButton
                      {...props}
                      style={{ paddingRight: 20 }}
                      icon='arrow-right'
                      iconColor={MD3Colors.error50}
                      size={20}
                      onPress={() => {}}
                    />
                  )}
                />
                <Divider />
              </View>
            );
          })}
        </Card>
      )}

      {habitsWithData.length > 0 && Object.keys(habitCounts).length > 0 && <SectionTitle title='Habits' />}
      {habitsWithData.length > 0 && Object.keys(habitCounts).length > 0 && (
        <Card mode='outlined' style={[colors.background, { paddingBottom: 30 }]}>
          {sortedHabits.map((habit: any, index: number) => {
            return (
              <View key={index}>
                <Card.Content>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text variant='bodyMedium'>{habit.name}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                      <IconButton
                        icon='minus'
                        iconColor={MD3Colors.error50}
                        onPress={() => handleDecrement(habit.id)}
                      />
                      <Text>{isYesterdayReview ? habitCounts[habit.id].yesterday : habitCounts[habit.id].day}</Text>
                      <IconButton
                        icon='plus'
                        iconColor={MD3Colors.primary40}
                        onPress={() => handleIncrement(habit.id)}
                      />
                    </View>
                  </View>
                </Card.Content>
                <Divider />
              </View>
            );
          })}
        </Card>
      )}

      <SectionTitle title={'Review'} />
      <TextInput
        style={{ marginBottom: 10 }}
        placeholder='Notes'
        value={answer.answer}
        mode='flat'
        dense={true}
        onChangeText={e => handleChange('answer', e)}
        autoFocus={true}
        // multiline={true}
        numberOfLines={4}
        returnKeyType='done'
      />
      <Button mode='contained' style={{ marginTop: 10 }} onPress={handleSaveReview}>
        Submit
      </Button>
    </Modal>
  );
}
