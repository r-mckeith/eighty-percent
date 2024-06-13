import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { DataTable, ProgressBar, MD3Colors, Text, Divider } from 'react-native-paper';
import { selectHabit } from '../../src/api/Habits';
import { HabitProps } from '../../src/types';
import { useDateContext, useHabitDataContext } from '../../src/contexts';
import { useDailyHabitData } from '../../src/hooks/dailyHabitData';
import { Swipe } from '../shared';
import RightSwipe from '../rightSwipe/RightSwipe';

type Habits = {
  habits: HabitProps[];
  sectionName?: string;
  groupId?: number;
};

export default function Habits({ habits }: Habits) {
  const { dispatch: habitDataDispatch } = useHabitDataContext();
  const { selectedDate } = useDateContext();
  const { dailyHabitData } = useDailyHabitData();

  const swipeableRow = useRef<Swipeable | null>(null);

  const habitsWithData = habits.map(habit => ({
    ...habit,
    habitData: dailyHabitData.find(data => data.tag_id === habit.id),
  }));

  const sortedHabits = habitsWithData.sort((a, b) => {
    const weekA = a.habitData ? a.habitData.week : 0;
    const weekB = b.habitData ? b.habitData.week : 0;
    return weekB - weekA;
  });

  const handleSelectHabit = async (selectedHabit: HabitProps) => {
    try {
      const updatedHabitData = await selectHabit(selectedHabit, selectedDate);
      habitDataDispatch({
        type: 'UPDATE_HABIT_DATA',
        payload: updatedHabitData,
      });
    } catch (error) {
      console.error('Error selecting habit:', error);
    }
  };

  const calculatePercentage = (actual: number, target: number) => {
    return target > 0 ? actual / target : 0;
  };

  return (
    <View>
      {sortedHabits.map(habit => {
        const { habitData, target } = habit;

        const dayPercentage =
          target && habitData && target.timeframe === 'day'
            ? calculatePercentage(habitData.day, target.times)
            : target && habitData && target.timeframe === 'week'
            ? calculatePercentage(habitData.day, target.times / 7)
            : 0;

        const weekPercentage =
          target && habitData && target.timeframe === 'week'
            ? calculatePercentage(habitData.week, target.times)
            : target && habitData && target.timeframe === 'day'
            ? calculatePercentage(habitData.week, target.times * 7)
            : 0;

        return (
          <View key={habit.id}>
            <Swipe
              swipeableRow={swipeableRow}
              renderRightActions={() => (
                <RightSwipe
                  item={habit}
                  habitData={habitData}
                  showData={true}
                  swipeableRow={swipeableRow}
                  type={'habit'}
                />
              )}>
              <View style={{ flexDirection: 'row' }}>
                <Text variant='bodyMedium' style={{ flex: 6, paddingLeft: 15, paddingTop: 5 }} onPress={() => handleSelectHabit(habit)}>
                  {habit.name}
                </Text>
                <Text style={{ flex: 1, paddingRight: 10, color: '#0E9FFF', paddingTop: 5 }}>
                  {habitData?.day ? habitData.day : 0}
                </Text>
                <Text style={{ flex: 1, color: '#0E5FFF', paddingLeft: 10, paddingTop: 5 }}>
                  {habitData?.week ? habitData.week : 0}
                </Text>
              </View>
              <ProgressBar progress={dayPercentage} color='#0E9FFF' style={styles.progressBar} />
              <ProgressBar
                progress={weekPercentage}
                color='#0E5FFF'
                style={[styles.progressBar, { marginBottom: 10 }]}
              />
            </Swipe>
            <Divider style={{marginBottom: 10}} />
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  progressBar: {
    marginHorizontal: 16,
    marginTop: 4,
  },
});
