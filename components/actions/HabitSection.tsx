import React, { useRef } from 'react';
import { StyleSheet, useColorScheme, View } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { DataTable, ProgressBar, MD3Colors } from 'react-native-paper';
import { getColors } from '../../src/colors';
import { HabitProps } from '../../src/types/shared';
import { selectHabit } from '../../src/api/Habits';
import { useDateContext, useHabitDataContext } from '../../src/contexts';
import { useAggregatedData } from '../../src/hooks/aggregateData';
import { Swipe } from '../layout';
import RightSwipe from '../rightSwipe/RightSwipe';

type Habits = {
  habits: HabitProps[];
  sectionName?: string;
  groupId?: number;
};

export default function Habits({ habits }: Habits) {
  const { dispatch: habitDataDispatch } = useHabitDataContext();
  const { selectedDate } = useDateContext();
  const { habitsTableData } = useAggregatedData(selectedDate);


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
              <DataTable.Row onPress={() => handleSelectHabit(habit)} style={colors.background}>
                <DataTable.Cell style={{ flex: 6 }}>{habit.name}</DataTable.Cell>
                <DataTable.Cell style={{ flex: 1.5, paddingRight: 10 }}>
                  {habitData?.day ? habitData.day : 0}
                </DataTable.Cell>
                <DataTable.Cell style={{ flex: 0.5 }}>{habitData?.week ? habitData.week : 0}</DataTable.Cell>
              </DataTable.Row>
            </Swipe>
            <ProgressBar progress={dayPercentage} color={MD3Colors.error50} style={styles.progressBar} />
            <ProgressBar progress={weekPercentage} color={MD3Colors.primary40} style={styles.progressBar} />
          </View>
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
