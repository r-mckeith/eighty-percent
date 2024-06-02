import React, { useRef } from 'react';
import { View, StyleSheet, useColorScheme } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { HabitProps } from '../../src/types/shared';
import { selectHabit } from '../../src/api/Habits';
import { useDateContext, useHabitDataContext } from '../../src/contexts';
import { useAggregatedData } from '../../src/hooks/aggregateData';
import { Swipe } from '../layout';
import RightSwipe from '../rightSwipe/RightSwipe';
import { DataTable, ProgressBar, MD3Colors } from 'react-native-paper';
import { getColors } from '../../src/colors';

type Habits = {
  habits: HabitProps[];
  sectionName: string;
  groupId: number;
};

export default function Habits({ habits }: Habits) {
  const { dispatch: habitDataDispatch } = useHabitDataContext();
  const { habitsTableData } = useAggregatedData();
  const { selectedDate } = useDateContext();

  const swipeableRow = useRef<Swipeable | null>(null);

  const scheme = useColorScheme();
  const colors = getColors(scheme);

  const habitsWithData = habits.map(habit => ({
    ...habit,
    habitData: habitsTableData.find(data => data.tag_id === habit.id),
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
    <DataTable>
      {sortedHabits.map((habit, index) => {
        const { habitData, target } = habit;

        const dayPercentage =
          target && habitData && target.timeframe === 'day' ? calculatePercentage(habitData.day, target.times) : null;

        const weeklyTargetFromDaily = target && target.timeframe === 'day' ? target.times * 7 : null;
        const weekPercentage =
          target && habitData && weeklyTargetFromDaily && target.timeframe === 'day'
            ? calculatePercentage(habitData.week, weeklyTargetFromDaily)
            : null;

        const actualWeekPercentage =
          target && habitData && target.timeframe === 'week'
            ? calculatePercentage(habitData.week, target.times)
            : weekPercentage;

        const weekAverage = actualWeekPercentage || 0;
        const dayAverage = dayPercentage || 0;

        return (
          <>
            <Swipe
              key={index}
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
              <DataTable.Row onPress={() => handleSelectHabit(habit)} style={colors.background}>
                <DataTable.Cell style={{ flex: 6 }}>{habit.name}</DataTable.Cell>
                <DataTable.Cell style={{ flex: 1.5, paddingRight: 10 }}>
                  {habitData?.day ? habitData.day : 0}
                </DataTable.Cell>
                <DataTable.Cell style={{ flex: 0.5 }}>{habitData?.week ? habitData.week : 0}</DataTable.Cell>
              </DataTable.Row>
            </Swipe>
            <ProgressBar progress={dayAverage} color={MD3Colors.error50} style={styles.progressBar} />
            <ProgressBar progress={weekAverage} color={MD3Colors.primary40} style={styles.progressBar} />
          </>
        );
      })}
    </DataTable>
  );
}

const styles = StyleSheet.create({
  progressBar: {
    marginHorizontal: 16,
    marginTop: 4,
    marginBottom: 8,
  },
});
