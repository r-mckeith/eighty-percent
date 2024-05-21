import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { HabitProps } from '../../src/types/shared';
import { selectHabit } from '../../src/api/Habits';
import { useDateContext, useHabitDataContext } from '../../src/contexts';
import { useAggregatedData } from '../../src/hooks/aggregateData';
import { Row, RowText, Swipe, StatsText, Section} from '../layout';
import RightSwipe from '../rightSwipe/RightSwipe';
import StatsHeader from './StatsHeader';

type Habits = {
  habits: HabitProps[];
  sectionName: string;
  groupId: number;
};

export default function Habits({ habits}: Habits) {
  const { dispatch: habitDataDispatch } = useHabitDataContext();
  const { habitsTableData } = useAggregatedData();
  const { selectedDate } = useDateContext();

  const swipeableRow = useRef<Swipeable | null>(null);

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

  return (
    <Section>
      {habits.length > 0 && <StatsHeader />}
      {sortedHabits.map((habit, index) => {
        const { habitData } = habit;

        return (
          <Swipe
            key={habit.id}
            swipeableRow={swipeableRow}
            renderRightActions={() => (
              <RightSwipe item={habit} habitData={habitData} showData={true} swipeableRow={swipeableRow} type={'habit'} />
            )}
          >
            <Row
              key={index}
              opacity={0.2}
              onPress={() => handleSelectHabit(habit)}
              first={false}
              last={index === habits.length - 1 || habits.length === 1}
            >
              <View style={styles.rowLayout}>
                <RowText text={habit.name} flex={3.5} maxLength={25} />
                <StatsText
                  day={habitData ? (habitData.day > 0 ? habitData.day : '0') : '0'}
                  week={habitData ? (habitData.week > 0 ? habitData.week : '0') : '0'}
                />
              </View>
            </Row>
          </Swipe>
        );
      })}
    </Section>
  );
}

const styles = StyleSheet.create({
  rowLayout: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
});
